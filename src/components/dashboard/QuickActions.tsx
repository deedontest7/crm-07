import { Phone, Mail, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { icon: Phone, label: "Log Call", variant: "default" as const },
  { icon: Mail, label: "Send Email", variant: "secondary" as const },
  { icon: Calendar, label: "Schedule", variant: "secondary" as const },
  { icon: FileText, label: "Create Quote", variant: "secondary" as const },
];

export function QuickActions() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            className="h-auto py-4 flex-col gap-2"
          >
            <action.icon className="h-5 w-5" />
            <span className="text-sm">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
