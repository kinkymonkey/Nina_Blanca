import { NextRequest, NextResponse } from "next/server";
import { CUSTOM_MAX_USD, CUSTOM_MIN_USD, phpCentavosFromUsd, phpFromUsd } from "@/lib/donate";
import { getUsdToPhpRate, paymongoConfigured } from "@/lib/donate-server";

export const runtime = "nodejs";

const PRESETS = new Set([5, 10, 20]);

function parseUsd(body: unknown): number | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { usd?: unknown }).usd;
  const usd = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(usd)) return null;
  const rounded = Math.round(usd * 100) / 100;
  if (PRESETS.has(rounded)) return rounded;
  if (rounded >= CUSTOM_MIN_USD && rounded <= CUSTOM_MAX_USD) return Math.round(rounded);
  return null;
}

function originFrom(request: NextRequest): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "http";
  if (host) return `${proto}://${host}`;
  return request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  if (!paymongoConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Checkout is not available right now.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  const usd = parseUsd(body);
  if (usd === null) {
    return NextResponse.json(
      {
        ok: false,
        error: `Choose $5, $10, or $20, or a custom amount between $${CUSTOM_MIN_USD} and $${CUSTOM_MAX_USD}.`,
      },
      { status: 400 },
    );
  }

  const origin = originFrom(request);
  const rate = await getUsdToPhpRate();
  const php = phpFromUsd(usd, rate);
  const secret = process.env.PAYMONGO_SECRET_KEY!.trim();
  const auth = Buffer.from(`${secret}:`).toString("base64");

  const response = await fetch("https://api.paymongo.com/v2/checkout_sessions", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      data: {
        attributes: {
          line_items: [
            {
              name: `Niña Blanca offering ($${usd})`,
              amount: phpCentavosFromUsd(usd, rate),
              currency: "PHP",
              quantity: 1,
            },
          ],
          payment_method_types: ["card", "gcash", "qrph"],
          success_url: `${origin}/support/thank-you?usd=${usd}`,
          cancel_url: `${origin}/support`,
          description: `Voluntary support for Niña Blanca ($${usd})`,
          send_email_receipt: true,
        },
      },
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as {
    data?: { attributes?: { checkout_url?: string } };
    errors?: { detail?: string }[];
  };

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Checkout did not open. No charge was made.",
      },
      { status: 502 },
    );
  }

  const url = payload.data?.attributes?.checkout_url;
  if (!url) {
    return NextResponse.json(
      { ok: false, error: "Checkout did not open. No charge was made." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, checkout_url: url, usd, php, rate });
}
