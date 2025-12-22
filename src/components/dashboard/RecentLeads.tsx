import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const leads = [
  { 
    name: "Sarah Johnson", 
    company: "TechCorp Inc.", 
    value: "$45,000", 
    status: "hot",
    initials: "SJ"
  },
  { 
    name: "Michael Chen", 
    company: "Global Solutions", 
    value: "$32,000", 
    status: "warm",
    initials: "MC"
  },
  { 
    name: "Emily Davis", 
    company: "Innovate Ltd.", 
    value: "$28,500", 
    status: "hot",
    initials: "ED"
  },
  { 
    name: "James Wilson", 
    company: "Enterprise Co.", 
    value: "$55,000", 
    status: "cold",
    initials: "JW"
  },
  { 
    name: "Lisa Anderson", 
    company: "StartUp Hub", 
    value: "$18,000", 
    status: "warm",
    initials: "LA"
  },
];

const statusStyles = {
  hot: "bg-destructive/10 text-destructive border-destructive/20",
  warm: "bg-warning/10 text-warning border-warning/20",
  cold: "bg-muted text-muted-foreground border-border",
};

export function RecentLeads() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Leads</h3>
        <p className="text-sm text-muted-foreground mt-1">Latest prospects added this week</p>
      </div>
      <div className="divide-y divide-border">
        {leads.map((lead, index) => (
          <div 
            key={lead.name} 
            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
            style={{ animationDelay: `${300 + index * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border-2 border-accent/20">
                <AvatarFallback className="bg-accent/10 text-accent font-medium">
                  {lead.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{lead.name}</p>
                <p className="text-sm text-muted-foreground">{lead.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-foreground">{lead.value}</span>
              <Badge 
                variant="outline" 
                className={cn("capitalize", statusStyles[lead.status as keyof typeof statusStyles])}
              >
                {lead.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
