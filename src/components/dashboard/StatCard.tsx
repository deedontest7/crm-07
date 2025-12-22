import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  delay?: number;
}

export function StatCard({ title, value, change, changeType, icon: Icon, delay = 0 }: StatCardProps) {
  return (
    <div 
      className="stat-card rounded-xl p-6 border border-border shadow-card card-hover animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          <p className={cn(
            "text-sm font-medium mt-2",
            changeType === "positive" && "text-success",
            changeType === "negative" && "text-destructive",
            changeType === "neutral" && "text-muted-foreground"
          )}>
            {change}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
          <Icon className="h-6 w-6 text-accent" />
        </div>
      </div>
    </div>
  );
}
