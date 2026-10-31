import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

function verifySignature(payload, header, secret) {
  if (!header || !secret) return false;
  let t = '';
  const sigs = [];
  header.split(',').forEach((part) => {
    const i = part.indexOf('=');
    const k = part.slice(0, i);
    const v = part.slice(i + 1);
    if (k === 't') t = v;
    if (k === 'v1') sigs.push(v);
  });
  if (!t || sigs.length === 0) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(t + '.' + payload)
    .digest('hex');
  return sigs.some((s) => {
    try {
      return crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expected));
    } catch (e) {
      return false;
    }
  });
}

export async function POST(request) {
  const payload = await request.text();
  const header = request.headers.get('stripe-signature');
  if (!verifySignature(payload, header, process.env.STRIPE_WEBHOOK_SECRET)) {
    return new Response('Signature invalide', { status: 400 });
  }

  const event = JSON.parse(payload);

  if (event.type === 'invoice.paid') {
    const invoice = event.data.object;
    const subId =
      invoice.subscription ||
      (invoice.parent &&
        invoice.parent.subscription_details &&
        invoice.parent.subscription_details.subscription);

    let userId = null;
    if (
      invoice.parent &&
      invoice.parent.subscription_details &&
      invoice.parent.subscription_details.metadata
    ) {
      userId = invoice.parent.subscription_details.metadata.user_id;
    }
    if (!userId && subId) {
      const res = await fetch('https://api.stripe.com/v1/subscriptions/' + subId, {
        headers: { Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY },
      });
      const sub = await res.json();
      userId = sub.metadata && sub.metadata.user_id;
    }

    const line = invoice.lines && invoice.lines.data && invoice.lines.data[0];
    const periodEnd = line && line.period && line.period.end;

    if (userId && periodEnd) {
      const until = new Date((periodEnd + 86400) * 1000).toISOString();
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      await supabase
        .from('profiles')
        .update({ is_premium: true, premium_until: until })
        .eq('id', userId);
    }
  }

  return new Response('ok', { status: 200 });
}
