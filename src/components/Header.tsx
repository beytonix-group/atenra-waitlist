import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-8 absolute top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="https://atenra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <img
              src="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20id%3D%22Horizontal%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%203197.48%20622.19%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%231e95ad;%7D%3C/style%3E%3C/defs%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M760.92%2C446.95c11.98-12.67%2C22.38-24.07%2C31.6-32.87...%22/%3E%3C/svg%3E"
              alt="Atenra Logo"
              className="h-12 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};