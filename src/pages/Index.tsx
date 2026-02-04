import { useState } from "react";
import { Header } from "@/components/Header";
import { WaitlistForm } from "@/components/WaitlistForm";
import { UserTypeSelector } from "@/components/UserTypeSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users, Building, Shield, Zap, Home, Truck, Heart, Briefcase, Code } from "lucide-react";

type UserType = "client" | "business";

const Index = () => {
  const [userType, setUserType] = useState<UserType>("client");

  const emailSubject = encodeURIComponent("Atenra Waitlist Interest");
  const emailBody = encodeURIComponent(
    "Hi Atenra Team,\n\nI'm interested in joining the waitlist for Atenra.\n\nName:\nBusiness Name (if applicable):\nPhone:\n\nPlease add me to your list!\n\nBest regards"
  );

  const industries = [
    { icon: Home, name: "Home & Maintenance", services: "Plumbing, Electrical, Carpentry, Landscaping, Renovation" },
    { icon: Truck, name: "Logistics & Transport", services: "Moving, Courier, Freight, Auto Transport, Storage" },
    { icon: Heart, name: "Wellness & Health", services: "Fitness, Therapy, Nutrition, Home Care, Spa & Recovery" },
    { icon: Briefcase, name: "Professional Services", services: "Accounting, Legal, Consulting, Marketing, Admin Support" },
    { icon: Code, name: "Tech & Creative", services: "Web Development, Design, Photography, IT Services, Software" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />



      {/* Hero Section with Toggle + Form */}
      <section className="relative pt-32 pb-12 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-muted/50 to-transparent rounded-full blur-3xl opacity-60 animate-float" />
        
      {/* About Section */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-4 animate-fade-in">
            Atenra
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
            Your Personal & Business Assistant, On Demand
          </p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover trusted professionals through intelligent matching — where technology meets genuine human insight.
          </p>
          <p className="text-base text-foreground/80 max-w-2xl mx-auto mt-4">
            At Atenra, every connection is <strong>hand-verified</strong>, thoughtfully matched, and designed to make your life easier.
          </p>
        </div>
      </section>

        <div className="max-w-md mx-auto relative z-10">
          {/* User Type Selector - First Thing Centered */}
          <div className="mb-6 animate-fade-in">
            <UserTypeSelector value={userType} onChange={setUserType} />
          </div>

          {/* Waitlist Form directly under toggle */}
          <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">
                {userType === "client" ? "Get Started" : "Partner With Us"}
              </CardTitle>
              <CardDescription>
                {userType === "client"
                  ? "Join our waitlist to find trusted professionals"
                  : "Join our waitlist to grow your customer base"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <WaitlistForm userType={userType} />
              
              {/* Email Alternative */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground text-center mb-3">
                  Prefer email instead?
                </p>
                <Button variant="secondary" className="w-full gap-2" asChild>
                  <a href={`mailto:contact@atenra.com?subject=${emailSubject}&body=${emailBody}`}>
                    <Mail className="w-4 h-4" />
                    Email Us Directly
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Stats */}
      <section className="py-8 px-4 sm:px-8 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 rounded-xl bg-muted/30">
              <Users className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold text-lg">1000+</p>
              <p className="text-sm text-muted-foreground">Verified Professionals</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-muted/30">
              <Building className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold text-lg">20+</p>
              <p className="text-sm text-muted-foreground">Service Categories</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-muted/30">
              <Shield className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold text-lg">100%</p>
              <p className="text-sm text-muted-foreground">Hand-Verified</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-muted/30">
              <Zap className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold text-lg">24/7</p>
              <p className="text-sm text-muted-foreground">Support Ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-3">Industries We Serve</h2>
          <p className="text-muted-foreground text-center mb-8">
            Connect with verified professionals across multiple industries
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="p-5 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <industry.icon className="w-8 h-8 mb-3 text-muted-foreground" />
                <h3 className="font-semibold mb-2">{industry.name}</h3>
                <p className="text-sm text-muted-foreground">{industry.services}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 px-4 sm:px-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Atenra. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
