import { Phone, Mail, Calendar, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  { 
    type: "call", 
    title: "Call with Sarah Johnson", 
    description: "Discussed pricing options", 
    time: "10 min ago",
    icon: Phone 
  },
  { 
    type: "email", 
    title: "Email sent to Michael Chen", 
    description: "Proposal document attached", 
    time: "1 hour ago",
    icon: Mail 
  },
  { 
    type: "meeting", 
    title: "Demo scheduled", 
    description: "With Global Solutions team", 
    time: "2 hours ago",
    icon: Calendar 
  },
  { 
    type: "note", 
    title: "Note added", 
    description: "Emily requested follow-up next week", 
    time: "3 hours ago",
    icon: MessageSquare 
  },
];

const iconStyles = {
  call: "bg-success/10 text-success",
  email: "bg-accent/10 text-accent",
  meeting: "bg-warning/10 text-warning",
  note: "bg-primary/10 text-primary",
};

export function ActivityFeed() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground mt-1">Your team's latest actions</p>
      </div>
      <div className="p-4 space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
              iconStyles[activity.type as keyof typeof iconStyles]
            )}>
              <activity.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
