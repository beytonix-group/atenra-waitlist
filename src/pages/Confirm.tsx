import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Confirm = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'pending'|'success'|'error'>('pending');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      return;
    }

    (async () => {
      try {
        const res = await fetch('/api/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        if (res.ok) {
          setStatus('success');
          setTimeout(() => navigate('/form-success'), 2400);
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    })();
  }, [navigate, searchParams]);

  return (
    <main className="max-w-3xl mx-auto py-20 px-6 prose prose-neutral">
      {status === 'pending' && <p>Verifying your email — please wait...</p>}
      {status === 'success' && <>
        <h1>Email Confirmed</h1>
        <p>Thanks — your subscription is confirmed. Redirecting...</p>
      </>}
      {status === 'error' && <>
        <h1>Verification Failed</h1>
        <p>We couldn't confirm your subscription. Please retry or contact contact@atenra.com.</p>
      </>}
    </main>
  );
};

export default Confirm;
