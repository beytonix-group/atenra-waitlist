import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Building2, User, Mail, Phone, CheckCircle2 } from "lucide-react";

type UserType = "client" | "business";

interface WaitlistFormProps {
  userType: UserType;
}

export const WaitlistForm = ({ userType }: WaitlistFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const openMailClientFallback = () => {
    const subject = encodeURIComponent(
      `Atenra Waitlist - ${userType === "business" ? "Business Partner" : "Client"}`
    );
    const bodyContent = [
      `New Waitlist Signup`,
      ``,
      `Type: ${userType === "business" ? "Business Owner" : "Client"}`,
      `Name: ${formData.name}`,
      ...(userType === "business" ? [`Business Name: ${formData.businessName}`] : []),
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || "Not provided"}`,
    ].join("\n");
    const body = encodeURIComponent(bodyContent);
    window.location.href = `mailto:contact@atenra.com?subject=${subject}&body=${body}`;
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

    setIsSubmitting(true);

    // Try to POST to a serverless endpoint (Cloudflare Worker) first.
    try {
      console.log('[Form] Submitting to /api/waitlist', { userType, ...formData });
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userType, ...formData }),
      });
      console.log('[Form] Response status:', res.status, res.ok);

      if (res.ok) {
        setIsSubmitted(true);
        toast({ title: "You're on the list!", description: "We'll notify you when Atenra launches." });
      } else {
        // Fallback to mailto when server endpoint is unavailable or returns error
        openMailClientFallback();
        toast({ title: "Opened email client", description: "Please send the pre-filled email to contact@atenra.com." });
      }
    } catch (err) {
      // Network error -> fallback to mailto
      console.error('[Form] Fetch error:', err);
      openMailClientFallback();
      toast({ title: "Opened email client", description: "Please send the pre-filled email to contact@atenra.com." });
    }

    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 sm:py-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 sm:mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">You're on the list!</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
          We'll reach out to you when Atenra is ready for launch.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: "", businessName: "", email: "", phone: "" });
          }}
        >
          Sign up another
        </Button>
      </div>
    );
  }

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
