import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-8 absolute top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-semibold">Atenra</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" asChild className="gap-2">
            <a href="https://atenra.com" target="_blank" rel="noopener noreferrer">
              Visit Atenra
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
