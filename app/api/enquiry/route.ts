import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { enquirySchema } from '@/lib/enquiry-schema';
import { enquiryOptions } from '@/data/machinery';
import { allow } from '@/lib/ratelimit';
import { SITE_URL } from '@/lib/env';

export const runtime = 'nodejs';

/**
 * Enquiry endpoint. Delivers by email through the Resend HTTP API when
 * RESEND_API_KEY, ENQUIRY_TO_EMAIL and ENQUIRY_FROM_EMAIL are set.
 * Without them it answers 503 `not_configured` and the form tells the visitor
 * the message was NOT sent. It never reports success for an undelivered enquiry.
 * Logs carry a request id and outcome only, never visitor details.
 */
function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    const host = new URL(origin).host;
    return host === new URL(SITE_URL).host || host === req.headers.get('host');
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const reqId = randomUUID();

  if (!sameOrigin(req)) return NextResponse.json({ code: 'forbidden' }, { status: 403 });
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json({ code: 'bad_request' }, { status: 415 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anon';
  if (!allow(ip, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ code: 'rate_limited' }, { status: 429, headers: { 'retry-after': '900' } });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: 'bad_request' }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? '_');
      fieldErrors[key] ??= issue.message;
    }
    // A filled honeypot is a bot: answer like a validation error, send nothing.
    return NextResponse.json({ code: 'validation', fieldErrors }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!key || !to || !from) {
    console.error(JSON.stringify({ evt: 'enquiry.not_configured', reqId }));
    return NextResponse.json({ code: 'not_configured' }, { status: 503 });
  }

  const d = parsed.data;
  const machineryLabel = enquiryOptions.find((o) => o.value === d.machinery)?.label ?? d.machinery;
  const text = [
    `New website enquiry (ref ${reqId.slice(0, 8)})`,
    '',
    `Name: ${d.name}`,
    `Company: ${d.company || '-'}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email || '-'}`,
    `Machinery: ${machineryLabel}`,
    '',
    'Requirement:',
    d.message,
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Website enquiry: ${machineryLabel}`,
        text,
        ...(d.email ? { reply_to: d.email } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(JSON.stringify({ evt: 'enquiry.send_failed', reqId, status: res.status }));
      return NextResponse.json({ code: 'send_failed' }, { status: 502 });
    }
  } catch (err) {
    console.error(JSON.stringify({ evt: 'enquiry.send_failed', reqId, err: err instanceof Error ? err.name : 'unknown' }));
    return NextResponse.json({ code: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ code: 'ok', ref: reqId.slice(0, 8).toUpperCase() });
}
