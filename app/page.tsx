// app/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <span className="text-xl font-semibold">vidly<span className="text-blue-500">.</span></span>
        <div className="flex items-center gap-3">
          <Link href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-2">Pricing</Link>
          <Link href="/auth" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2">Sign in</Link>
          <Link href="/auth?tab=signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Start free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-6">
          ✦ AI-powered · no video skills needed
        </div>
        <h1 className="text-5xl font-semibold leading-tight mb-5 tracking-tight">
          Turn any product photo into a<br />
          <span className="text-blue-600">TikTok-ready video</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
          Paste your product image or URL. Vidly writes the script, builds the video, and formats it for TikTok, Reels, or Shorts — in under 60 seconds.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/auth?tab=signup" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-blue-700 transition-colors">
            Get 3 free videos
          </Link>
          <Link href="#pricing" className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl text-base font-medium hover:bg-gray-50 transition-colors">
            See pricing
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-4">No credit card. No editing skills. No video footage needed.</p>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">How it works</p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { n: "1", title: "Add your product", desc: "Upload an image or paste your store URL" },
              { n: "2", title: "Pick a style", desc: "Hook reel, benefits list, review-style, and more" },
              { n: "3", title: "Download and post", desc: "Script and video ready in under 60 seconds" },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center mx-auto mb-3">{s.n}</div>
                <p className="text-sm font-medium text-gray-900 mb-1">{s.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Features</p>
        <h2 className="text-2xl font-semibold mb-2">Everything a seller needs</h2>
        <p className="text-gray-500 text-sm mb-8">Built for dropshippers, Shopify stores, and ecommerce brands.</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: "🖼️", title: "No video footage needed", desc: "Vidly animates your product photo into a scroll-stopping clip." },
            { icon: "✍️", title: "AI script generation", desc: "Hooks, body, and CTAs trained on viral ecom content." },
            { icon: "📱", title: "Platform-optimized", desc: "9:16 format, correct lengths for TikTok, Reels, and Shorts." },
            { icon: "🎬", title: "6 video styles", desc: "Hook reel, benefits, review, gift idea, problem/solution, and trending." },
            { icon: "📦", title: "Works with any store", desc: "Shopify, WooCommerce, Amazon, TikTok Shop, CJ Dropshipping." },
            { icon: "⚡", title: "Bulk generation (Pro)", desc: "Upload your whole catalog and generate videos for every product." },
          ].map((f) => (
            <div key={f.title} className="border border-gray-100 rounded-xl p-5">
              <div className="text-2xl mb-3">{f.icon}</div>
              <p className="text-sm font-medium text-gray-900 mb-1">{f.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">What sellers say</p>
        <h2 className="text-2xl font-semibold mb-6">Real results from real store owners</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { quote: "I posted my first Vidly video on a Tuesday and had my first TikTok sale by Thursday. I had no idea what I was doing with video before this.", name: "Jordan R.", role: "Dropshipping · Shopify + TikTok Shop" },
            { quote: "I was spending $300/mo on a video editor. Vidly does the same job for $19. The scripts are honestly better than what I was getting custom-written.", name: "Maya T.", role: "Beauty brand · Instagram + TikTok" },
          ].map((t) => (
            <div key={t.name} className="border border-gray-100 rounded-xl p-5">
              <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex items-center justify-center">{t.name.split(" ").map(w => w[0]).join("")}</div>
                <div>
                  <p className="text-xs font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 pb-16">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Pricing</p>
        <h2 className="text-2xl font-semibold mb-1">Start free. Pay when you&apos;re ready.</h2>
        <p className="text-sm text-gray-500 mb-8">No contracts. Cancel anytime.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-2xl p-6">
            <p className="text-base font-semibold mb-2">Free</p>
            <p className="text-4xl font-semibold mb-1">$0<span className="text-sm font-normal text-gray-400">/mo</span></p>
            <p className="text-xs text-gray-500 mb-5">Try it out — no card needed</p>
            <ul className="text-xs text-gray-600 space-y-2 mb-6">
              {["3 videos per month", "AI script generation", "3 video styles", "TikTok and Reels export"].map(f => (
                <li key={f} className="flex items-center gap-2"><span className="text-green-500">✓</span>{f}</li>
              ))}
            </ul>
            <Link href="/auth?tab=signup" className="block text-center border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Start free
            </Link>
          </div>
          <div className="border-2 border-blue-500 rounded-2xl p-6">
            <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block mb-3">Most popular</div>
            <p className="text-base font-semibold mb-2">Pro</p>
            <p className="text-4xl font-semibold mb-1">$19<span className="text-sm font-normal text-gray-400">/mo</span></p>
            <p className="text-xs text-gray-500 mb-5">For serious sellers</p>
            <ul className="text-xs text-gray-600 space-y-2 mb-6">
              {["Unlimited videos", "AI script + video animation", "All 6 video styles", "All platforms + HD export", "No watermark", "Bulk generate from catalog", "Priority processing"].map(f => (
                <li key={f} className="flex items-center gap-2"><span className="text-green-500">✓</span>{f}</li>
              ))}
            </ul>
            <Link href="/auth?tab=signup" className="block text-center bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Start for $19/mo
            </Link>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">Cancel anytime. No contracts. Billed monthly.</p>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-gray-100 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-2">Ready to make your first video?</h2>
        <p className="text-sm text-gray-500 mb-6">Join thousands of sellers posting more content without hiring an editor.</p>
        <Link href="/auth?tab=signup" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl text-base font-medium hover:bg-blue-700 transition-colors">
          Get 3 free videos — no card needed
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 max-w-5xl mx-auto px-6 flex justify-between items-center">
        <p className="text-xs text-gray-400">© 2026 Vidly</p>
        <div className="flex gap-5 text-xs text-gray-400">
          <Link href="#" className="hover:text-gray-600">Privacy</Link>
          <Link href="#" className="hover:text-gray-600">Terms</Link>
          <Link href="mailto:hello@vidly.app" className="hover:text-gray-600">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
