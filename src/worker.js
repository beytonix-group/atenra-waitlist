import html from "../dist/index.html?raw";

function formatEmailBody(data) {
  return `New waitlist submission:\n\nName: ${data.name || ''}\nBusiness: ${data.businessName || ''}\nEmail: ${data.email || ''}\nPhone: ${data.phone || ''}\nUser Type: ${data.userType || ''}\n\nFull payload:\n${JSON.stringify(data, null, 2)}`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/api/waitlist') {
      let data;
      try {
        data = await request.json();
      } catch (e) {
        return new Response('Invalid JSON', { status: 400 });
      }

      const SENDGRID_API_KEY = env.SENDGRID_API_KEY;
      if (!SENDGRID_API_KEY) {
        // If no API key configured, still return success so frontend can fallback to mailto if needed.
        return new Response(JSON.stringify({ ok: false, error: 'Missing SENDGRID_API_KEY' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }

      const body = {
        personalizations: [
          {
            to: [{ email: 'contact@atenra.com' }],
            subject: `Atenra waitlist: ${data.name || data.email || 'new signup'}`,
          },
        ],
        from: { email: 'no-reply@atenra.com', name: 'Atenra Waitlist' },
        content: [
          {
            type: 'text/plain',
            value: formatEmailBody(data),
          },
        ],
      };

      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        return new Response(JSON.stringify({ ok: false, status: res.status, body: text }), { status: 502, headers: { 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Serve the built SPA index for other GET requests (simple static serving)
    if (request.method === 'GET') {
      return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } });
    }

    return new Response('Not found', { status: 404 });
  },
};
