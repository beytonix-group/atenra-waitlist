import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Building2, User, Mail, Phone } from "lucide-react";

type UserType = "client" | "business";

interface WaitlistFormProps {
  userType: UserType;
}

export const WaitlistForm = ({ userType }: WaitlistFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleConsent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsent(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name and email.",
        variant: "destructive",
      });
      return;
    }

    if (!consent) {
      toast({
        title: "Consent required",
        description: "Please agree to receive waitlist communications.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Try to POST to a serverless endpoint (Cloudflare Worker) first.
    try {
      console.log('[Form] Submitting to /api/waitlist', { userType, ...formData, consent });
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userType, ...formData, consent, purpose: 'waitlist' }),
      });
      console.log('[Form] Response status:', res.status, res.ok);

      if (res.ok) {
        navigate("/form-success");
        toast({ title: "Please confirm your email", description: "We sent a confirmation email — check your inbox and click the link to complete signup." });
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error('[Form] Server error:', res.status, errorData);
        toast({
          title: "Error submitting",
          description: errorData.error || `Server error: ${res.status}`,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('[Form] Fetch error:', err);
      toast({
        title: "Connection error",
        description: "Could not reach the server. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-sm sm:text-base">
            <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="h-10 sm:h-12 text-sm sm:text-base"
            required
          />
        </div>

        {userType === "business" && (
          <div className="space-y-1.5 sm:space-y-2 animate-fade-in">
            <Label htmlFor="businessName" className="flex items-center gap-2 text-sm sm:text-base">
              <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              Business Name
            </Label>
            <Input
              id="businessName"
              name="businessName"
              placeholder="Acme Inc."
              value={formData.businessName}
              onChange={handleChange}
              className="h-10 sm:h-12 text-sm sm:text-base"
            />
          </div>
        )}

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-sm sm:text-base">
            <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            className="h-10 sm:h-12 text-sm sm:text-base"
            required
          />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-sm sm:text-base">
            <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
            className="h-10 sm:h-12 text-sm sm:text-base"
          />
        </div>
      </div>

      <div id="purpose-desc" className="text-sm text-muted-foreground">
        By joining the waitlist you agree to receive waitlist updates and early access information. We will only use your email for this purpose. See our <a href="/privacy" className="underline">Privacy Policy</a> for details.
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consent"
          name="consent"
          aria-describedby="purpose-desc"
          type="checkbox"
          checked={consent}
          onChange={handleConsent}
          className="mt-1"
        />
        <label htmlFor="consent" className="text-sm">
          I agree to receive waitlist communications (required)
        </label>
      </div>

      <Button
        type="submit"
        className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium group"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Joining...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Join the Waitlist
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        )}
      </Button>
    </form>
  );
};
