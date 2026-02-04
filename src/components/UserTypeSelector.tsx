import { Building2, User } from "lucide-react";

type UserType = "client" | "business";

interface UserTypeSelectorProps {
  value: UserType;
  onChange: (value: UserType) => void;
}

export const UserTypeSelector = ({ value, onChange }: UserTypeSelectorProps) => {
  return (
    <div className="flex items-center justify-center gap-1 p-1 rounded-full bg-muted/50 border border-border max-w-xs mx-auto">
      <button
        type="button"
        onClick={() => onChange("client")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
          value === "client"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <User className="w-4 h-4" />
        Client
      </button>
      <button
        type="button"
        onClick={() => onChange("business")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
          value === "business"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Building2 className="w-4 h-4" />
        Business
      </button>
    </div>
  );
};
