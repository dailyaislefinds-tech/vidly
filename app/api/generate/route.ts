// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const FREE_LIMIT = 3;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in to generate videos" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Reset monthly counter if needed
  const now = new Date();
  const reset = new Date(user.monthResetDate);
  if (now.getMonth() !== reset.getMonth() || now.getFullYear() !== reset.getFullYear()) {
    await prisma.user.update({
      where: { id: userId },
      data: { videosUsedThisMonth: 0, monthResetDate: now },
    });
    user.videosUsedThisMonth = 0;
  }

  // Enforce free limit
  if (user.plan === "FREE" && user.videosUsedThisMonth >= FREE_LIMIT) {
    return NextResponse.json({ error: "free_limit_reached" }, { status: 403 });
  }

  const { product, price, platform, style } = await req.json();
  if (!product) return NextResponse.json({ error: "Product name required" }, { status: 400 });

  const prompt = `You are a TikTok video script expert for ecommerce sellers. Write a punchy ${style} video script.

Product: ${product}${price ? ` — ${price}` : ""}
Platform: ${platform}

Respond ONLY with valid JSON, no markdown, no explanation:
{
  "script": "full script with Hook / Body / CTA sections",
  "hooks": ["Hook option A", "Hook option B", "Hook option C"],
  "caption": "ready-to-post caption with hashtags"
}

Rules: Script reads aloud in 15-30 seconds. Hooks are under 8 words. Be specific and conversion-focused. No quotes inside JSON string values.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = (message.content[0] as any).text.replace(/```json|```/g, "").trim();
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "AI parsing error, try again" }, { status: 500 });
  }

  // Save video and increment counter
  const [video] = await Promise.all([
    prisma.video.create({
      data: {
        userId,
        product,
        platform,
        style,
        script: parsed.script,
        hooks: JSON.stringify(parsed.hooks),
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { videosUsedThisMonth: { increment: 1 } },
    }),
  ]);

  return NextResponse.json({ ...parsed, videoId: video.id });
}
