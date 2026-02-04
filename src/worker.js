import { html, assets } from "./worker-embed.js";

function formatEmailBody(data) {
  return `New waitlist submission:\n\nName: ${data.name || ''}\nBusiness: ${data.businessName || ''}\nEmail: ${data.email || ''}\nPhone: ${data.phone || ''}\nUser Type: ${data.userType || ''}\n\nFull payload:\n${JSON.stringify(data, null, 2)}`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    console.log('[Worker]', request.method, url.pathname);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method === 'POST' && url.pathname === '/api/waitlist') {
      let data;
      try {
        data = await request.json();
        console.log('[Worker] POST /api/waitlist', JSON.stringify(data));
      } catch (e) {
        console.error('[Worker] JSON parse error:', e);
        return new Response('Invalid JSON', { status: 400 });
      }

      const RESEND_API_KEY = env.RESEND_API_KEY;
      if (!RESEND_API_KEY) {
        console.error('[Worker] Missing RESEND_API_KEY');
        return new Response(JSON.stringify({ ok: false, error: 'Missing RESEND_API_KEY' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }

      const body = {
        from: 'Atenra <no-reply@atenra.com>',
        to: ['contact@atenra.com'],
        subject: `Atenra waitlist: ${data.name || data.email || 'new signup'}`,
        text: formatEmailBody(data),
      };

      console.log('[Worker] Sending email via Resend...');
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const resBody = await res.text().catch(() => '');
      console.log('[Worker] Resend response:', res.status, resBody);

      if (!res.ok) {
        return new Response(JSON.stringify({ ok: false, status: res.status, body: resBody }), { status: 502, headers: { 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }

    // Serve assets from the embedded assets map
    if (request.method === 'GET') {
      const pathname = url.pathname;
      // Serve blobbed assets (e.g., /assets/...)
      if (assets && assets[pathname]) {
        const entry = assets[pathname];
        const bytes = Uint8Array.from(atob(entry.base64), c => c.charCodeAt(0));
        return new Response(bytes, {
          status: 200,
          headers: {
            'content-type': entry.type,
            'cache-control': 'public, max-age=31536000, immutable'
          }
        });
      }

      // Fallback to index.html for SPA routes
      return new Response(html, { 
        status: 200,
        headers: { 
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'no-cache, no-store, must-revalidate'
        } 
      });
    }

    return new Response('Not found', { status: 404 });
  },
};
