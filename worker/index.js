addEventListener('fetch', (event) => {
  event.respondWith(handle(event.request));
});

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || ""; // set via Wrangler secrets
const CONTACT_EMAIL = 'contact@atenra.com';
const FROM_EMAIL = 'no-reply@atenra.com';
const DOUBLE_OPT_IN_SECRET = process.env.DOUBLE_OPT_IN_SECRET || '';

function base64url(input) {
  return Buffer.from(input).toString('base64').replace(/=+$/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64urlFromBuffer(buf) {
  return Buffer.from(buf).toString('base64').replace(/=+$/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function importKey(secret) {
  const enc = new TextEncoder();
  const keyData = enc.encode(secret);
  return await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

async function signPayload(payload) {
  const key = await importKey(DOUBLE_OPT_IN_SECRET);
  const data = new TextEncoder().encode(payload);
  const sig = await crypto.subtle.sign('HMAC', key, data);
  return base64urlFromBuffer(sig);
}

async function verifyPayload(payload, signature) {
  const key = await importKey(DOUBLE_OPT_IN_SECRET);
  const data = new TextEncoder().encode(payload);
  const sigBuf = Buffer.from(signature.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
  return await crypto.subtle.verify('HMAC', key, sigBuf, data);
}

async function createToken(obj) {
  const payload = JSON.stringify(obj);
  const sig = await signPayload(payload);
  return `${base64url(payload)}.${sig}`;
}

function parseToken(token) {
  const [payloadB64, sig] = token.split('.');
  if (!payloadB64 || !sig) return null;
  const payloadJson = Buffer.from(payloadB64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString();
  return { payloadJson, sig };
}

async function handle(request) {
  const url = new URL(request.url);

  if (request.method === 'POST' && url.pathname === '/api/waitlist') {
    try {
      const data = await request.json();

      if (!data || !data.email || !data.name) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      if (!data.consent) {
        return new Response(JSON.stringify({ error: 'Consent required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      // create token with short expiry (24h)
      const now = Math.floor(Date.now() / 1000);
      const payload = {
        email: data.email,
        name: data.name,
        userType: data.userType || 'client',
        businessName: data.businessName || '',
        phone: data.phone || '',
        purpose: data.purpose || 'waitlist',
        iat: now,
        exp: now + 60 * 60 * 24,
      };

      const token = await createToken(payload);

      const origin = request.headers.get('origin') || (new URL(request.url)).origin;
      const confirmUrl = `${origin}/confirm?token=${encodeURIComponent(token)}`;

      // Send confirmation email to user
      const subject = `Confirm your ${payload.purpose} subscription`;
      const body = `Hi ${payload.name},\n\nPlease confirm your subscription by clicking the link below:\n\n${confirmUrl}\n\nThis link expires in 24 hours.\n\nIf you did not sign up, ignore this email.`;

      const sendgridRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: payload.email }], subject }],
          from: { email: FROM_EMAIL, name: 'Atenra' },
          content: [{ type: 'text/plain', value: body }],
        }),
      });

      if (!sendgridRes.ok) {
        const text = await sendgridRes.text();
        return new Response(text || 'Email provider error', { status: 502 });
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
      return new Response(String(err.message || err), { status: 500 });
    }
  }

  if (request.method === 'POST' && url.pathname === '/api/confirm') {
    try {
      const { token } = await request.json();
      if (!token) return new Response(JSON.stringify({ error: 'Missing token' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

      const parsed = parseToken(token);
      if (!parsed) return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

      const { payloadJson, sig } = parsed;
      const verified = await verifyPayload(payloadJson, sig);
      if (!verified) return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

      const payload = JSON.parse(payloadJson);
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        return new Response(JSON.stringify({ error: 'Token expired' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      // send notification to site contact (finalize subscription)
      const subject = `Atenra Waitlist Confirmed - ${payload.userType || 'client'}`;
      const bodyLines = [
        'Confirmed Waitlist Signup',
        '',
        `Type: ${payload.userType || 'client'}`,
        `Name: ${payload.name || ''}`,
        payload.businessName ? `Business Name: ${payload.businessName}` : '',
        `Email: ${payload.email || ''}`,
        `Phone: ${payload.phone || 'Not provided'}`,
      ].filter(Boolean).join('\n');

      const sendgridRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: CONTACT_EMAIL }], subject }],
          from: { email: FROM_EMAIL, name: 'Atenra' },
          content: [{ type: 'text/plain', value: bodyLines }],
        }),
      });

      if (!sendgridRes.ok) {
        const text = await sendgridRes.text();
        return new Response(text || 'Email provider error', { status: 502 });
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
      return new Response(String(err.message || err), { status: 500 });
    }
  }

  return new Response('Not found', { status: 404 });
}
