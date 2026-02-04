import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Building2, User, Mail, Phone, Shield, CheckCircle2 } from "lucide-react";

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
  const [isHuman, setIsHuman] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isHuman) {
      toast({
        title: "Verification Required",
        description: "Please confirm you are human to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.email) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name and email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Create mailto link for form submission
    const subject = encodeURIComponent(`Atenra Waitlist - ${userType === "business" ? "Business Partner" : "Client"}`);
    const body = encodeURIComponent(
      `New Waitlist Signup\n\nType: ${userType === "business" ? "Business Owner" : "Client"}\nName: ${formData.name}\n${userType === "business" ? `Business Name: ${formData.businessName}\n` : ""}Email: ${formData.email}\nPhone: ${formData.phone || "Not provided"}`
    );
    
    // Open email client
    window.location.href = `mailto:contact@atenra.com?subject=${subject}&body=${body}`;

    // Simulate delay for UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "You're on the list!",
      description: "We'll notify you when Atenra launches.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">You're on the list!</h3>
        <p className="text-muted-foreground mb-6">
          We'll reach out to you when Atenra is ready for launch.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: "", businessName: "", email: "", phone: "" });
            setIsHuman(false);
          }}
        >
          Sign up another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="h-12"
            required
          />
        </div>

        {userType === "business" && (
          <div className="space-y-2 animate-fade-in">
            <Label htmlFor="businessName" className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              Business Name
            </Label>
            <Input
              id="businessName"
              name="businessName"
              placeholder="Acme Inc."
              value={formData.businessName}
              onChange={handleChange}
              className="h-12"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            className="h-12"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
            className="h-12"
          />
        </div>
      </div>

      <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50 border border-border">
        <Checkbox
          id="human"
          checked={isHuman}
          onCheckedChange={(checked) => setIsHuman(checked === true)}
          className="mt-0.5"
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="human"
            className="flex items-center gap-2 font-medium cursor-pointer"
          >
            <Shield className="w-4 h-4 text-muted-foreground" />
            I'm not a robot
          </Label>
          <p className="text-sm text-muted-foreground">
            Please verify you are human to join the waitlist.
          </p>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium group"
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
