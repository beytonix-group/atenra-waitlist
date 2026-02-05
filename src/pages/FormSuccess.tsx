import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";

const FormSuccess = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />


        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17931350697"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-17931350697');
        </script>

      <section className="flex items-center justify-center py-20 sm:py-32 px-4">
        <div className="text-center max-w-md animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 sm:mb-8">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4">Thank You!</h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
            We've received your submission and we're excited to have you on the Atenra waitlist. We'll reach out to you soon with updates.
          </p>
          <Link to="/">
            <Button className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FormSuccess;
