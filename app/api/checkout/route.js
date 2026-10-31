import { createClient } from '@supabase/supabase-js';

const SITE = 'https://raplike-509.vercel.app';
const PLANS = {
  month: { amount: 499, interval: 'month', name: 'RAPLIKE 509 Premium (mensuel)' },
  year: { amount: 3900, interval: 'year', name: 'RAPLIKE 509 Premium (annuel)' },
};

export async function POST(request) {
  try {
    const token = (request.headers.get('authorization') || '').replace('Bearer ', '');
    if (!token) {
      return Response.json({ error: 'Non connecté' }, { status: 401 });
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data || !data.user) {
      return Response.json({ error: 'Non connecté' }, { status: 401 });
    }
    const user = data.user;
    const body = await request.json();
    const p = PLANS[body.plan];
    if (!p) {
      return Response.json({ error: 'Plan invalide' }, { status: 400 });
    }

    const params = new URLSearchParams();
    params.append('mode', 'subscription');
    params.append('success_url', SITE + '/?premium=ok');
    params.append('cancel_url', SITE + '/?premium=annule');
    params.append('client_reference_id', user.id);
    if (user.email) params.append('customer_email', user.email);
    params.append('line_items[0][quantity]', '1');
    params.append('line_items[0][price_data][currency]', 'usd');
    params.append('line_items[0][price_data][unit_amount]', String(p.amount));
    params.append('line_items[0][price_data][recurring][interval]', p.interval);
    params.append('line_items[0][price_data][product_data][name]', p.name);
    params.append('subscription_data[metadata][user_id]', user.id);

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    const session = await res.json();
    if (!res.ok) {
      return Response.json(
        { error: (session.error && session.error.message) || 'Erreur Stripe' },
        { status: 500 }
      );
    }
    return Response.json({ url: session.url });
  } catch (e) {
    return Response.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
