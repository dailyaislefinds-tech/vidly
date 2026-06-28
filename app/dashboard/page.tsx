"use client";
// app/dashboard/page.tsx
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const STYLES = [
  "Hook reel — grab attention in 3 seconds",
  "Benefits list — show what it does",
  "Review style — social proof angle",
  "Gift idea — seasonal / emotional",
  "Problem/solution — before and after",
  "Trending — ride the moment",
];

const PLATFORMS = ["TikTok Shop", "Instagram Reels", "YouTube Shorts", "Facebook Reels"];

type Result = { script: string; hooks: string[]; caption: string; videoId: string };

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [platform, setPlatform] = useState("TikTok Shop");
  const [style, setStyle] = useState(STYLES[0]);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgraded, setUpgraded] = useState(false);

  const plan = (session?.user as any)?.plan ?? "FREE";

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth");
  }, [status, router]);

  useEffect(() => {
    if (params.get("upgraded") === "true") setUpgraded(true);
  }, [params]);

  async function generate() {
    if (!product.trim()) { setError("Enter a product name first."); return; }
    setError(""); setResult(null); setLoading(true);

    const messages = [
      "Analyzing your product...",
      "Writing your hook script...",
      "Building video outline...",
      "Adding caption options...",
    ];
    let i = 0;
    setLoadingMsg(messages[0]);
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setLoadingMsg(messages[i]);
    }, 1800);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, price, platform, style }),
      });
      const data = await res.json();

      if (res.status === 403 && data.error === "free_limit_reached") {
        setShowUpgrade(true); setLoading(false); clearInterval(interval); return;
      }
      if (!res.ok) { setError(data.error || "Something went wrong."); setLoading(false); clearInterval(interval); return; }
      setResult(data);
    } catch {
      setError("Network error — try again.");
    }
    clearInterval(interval);
    setLoading(false);
  }

  async function handleUpgrade() {
    const res = await fetch("/api/create-checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <span className="text-lg font-semibold">vidly<span className="text-blue-500">.</span></span>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${plan === "PRO" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-gray-100 text-gray-500"}`}>
            {plan === "PRO" ? "Pro" : "Free plan"}
          </span>
          {plan === "FREE" && (
            <button onClick={handleUpgrade} className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
              Upgrade
            </button>
          )}
          <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-gray-400 hover:text-gray-600">Sign out</button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {upgraded && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 flex items-center gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-sm text-green-700 font-medium">Welcome to Pro! Unlimited videos are now unlocked.</p>
            <button onClick={() => setUpgraded(false)} className="ml-auto text-green-400 hover:text-green-600 text-xs">Dismiss</button>
          </div>
        )}

        <h1 className="text-xl font-semibold mb-1">Create a new video</h1>
        <p className="text-sm text-gray-400 mb-6">Add your product, pick a style, and get a script + video outline in seconds.</p>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2">
              <label className="block text-xs text-gray-500 mb-1.5">Product name</label>
              <input type="text" value={product} onChange={e => setProduct(e.target.value)}
                placeholder="3-in-1 Steam Grooming Brush"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Price (optional)</label>
              <input type="text" value={price} onChange={e => setPrice(e.target.value)}
                placeholder="$29.99"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {PLATFORMS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-500 mb-1.5">Video style</label>
              <select value={style} onChange={e => setStyle(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {STYLES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

          {loading && (
            <div className="mb-4">
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: "70%" }} />
              </div>
              <p className="text-xs text-gray-400 text-center">{loadingMsg}</p>
            </div>
          )}

          <button onClick={generate} disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {loading ? "Generating..." : "✦ Generate script + video outline"}
          </button>

          {plan === "FREE" && (
            <p className="text-xs text-gray-400 text-center mt-3">
              Free plan · 3 videos/month ·{" "}
              <button onClick={handleUpgrade} className="text-blue-500 hover:underline">Upgrade for unlimited</button>
            </p>
          )}
        </div>

        {/* Upgrade prompt */}
        {showUpgrade && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-4">
            <p className="text-sm font-medium text-blue-900 mb-1">You've used all 3 free videos this month</p>
            <p className="text-xs text-blue-600 mb-4">Upgrade to Pro for unlimited videos at $19/mo — cancel anytime.</p>
            <button onClick={handleUpgrade} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Upgrade to Pro — $19/mo
            </button>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                {style.split("—")[0].trim()} · {platform}
              </span>
              <button onClick={() => navigator.clipboard.writeText(result.script)}
                className="text-xs text-gray-400 hover:text-gray-600 border border-gray-100 px-2.5 py-1 rounded-md">
                Copy script
              </button>
            </div>

            <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mb-5 font-sans">{result.script}</pre>

            {result.hooks?.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Hook variations</p>
                {result.hooks.map((h, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-sm text-gray-600 mb-2">{h}</div>
                ))}
              </div>
            )}

            {result.caption && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Ready-to-post caption</p>
                <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-sm text-gray-600">{result.caption}</div>
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t border-gray-50">
              <button onClick={generate} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                Regenerate
              </button>
              <button onClick={() => navigator.clipboard.writeText(result.caption)}
                className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                Copy caption
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                Export
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
