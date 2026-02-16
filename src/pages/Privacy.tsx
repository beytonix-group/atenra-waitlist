import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <main className="max-w-3xl mx-auto py-20 px-6 prose prose-neutral">
      <h1>Privacy Policy</h1>
      <p>
        This site collects basic contact information (name, email, phone, and optional business
        name) to add you to our waitlist. We use your email only to send waitlist updates, early
        access invitations, and related communications you explicitly consent to receive. We will
        never sell your email address.
      </p>

      <h2>Data usage</h2>
      <ul>
        <li>Purpose: waitlist updates and early access information only.</li>
        <li>Retention: we retain your data for the purpose of the waitlist and communications.</li>
        <li>Access: only authorized Atenra staff and the email provider have access to stored
          information.</li>
      </ul>

      <h2>Consent & double opt-in</h2>
      <p>
        We require explicit consent before adding you to our communications. After signing up you
        will receive a confirmation email — you must click the link in that email to verify and
        complete your subscription (double opt-in).
      </p>

      <h2>COPPA (Children under 13)</h2>
      <p>
        Our services are not intended for children under 13. We do not knowingly collect personal
        information from children under 13 without verified parental consent. If you believe we have
        collected such information, contact us at contact@atenra.com and we will take prompt action.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access, correction, or deletion of your personal data by contacting us at
        contact@atenra.com. You may withdraw consent at any time; withdrawing consent will stop
        future communications but will not remove records required for legal or administrative
        purposes.
      </p>

      <p>
        For questions, email <a href="mailto:contact@atenra.com">contact@atenra.com</a>.
      </p>

      <p>
        Return to the <Link to="/">homepage</Link>.
      </p>
    </main>
  );
};

export default Privacy;
