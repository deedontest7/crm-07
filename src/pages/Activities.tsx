import { Phone, Mail, Calendar, MessageSquare, Video, CheckCircle2 } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const activities = [
  { 
    id: 1,
    type: "call", 
    title: "Follow-up call with Sarah Johnson", 
    description: "Discuss implementation timeline and resource requirements",
    contact: "Sarah Johnson",
    company: "TechCorp Inc.",
    time: "10:00 AM",
    duration: "30 min",
    completed: false,
    icon: Phone 
  },
  { 
    id: 2,
    type: "meeting", 
    title: "Product demo with Global Solutions", 
    description: "Present enterprise features and security capabilities",
    contact: "Michael Chen",
    company: "Global Solutions",
    time: "11:30 AM",
    duration: "1 hour",
    completed: false,
    icon: Video 
  },
  { 
    id: 3,
    type: "email", 
    title: "Send proposal to Innovate Ltd.", 
    description: "Include custom pricing and SLA details",
    contact: "Emily Davis",
    company: "Innovate Ltd.",
    time: "2:00 PM",
    duration: "-",
    completed: false,
    icon: Mail 
  },
  { 
    id: 4,
    type: "call", 
    title: "Negotiation call with Enterprise Co.", 
    description: "Final pricing discussion and contract terms",
    contact: "James Wilson",
    company: "Enterprise Co.",
    time: "3:30 PM",
    duration: "45 min",
    completed: false,
    icon: Phone 
  },
  { 
    id: 5,
    type: "meeting", 
    title: "Quarterly review with MegaCorp", 
    description: "Review success metrics and expansion opportunities",
    contact: "David Brown",
    company: "MegaCorp",
    time: "4:30 PM",
    duration: "1 hour",
    completed: false,
    icon: Calendar 
  },
];

const completedActivities = [
  { 
    id: 6,
    type: "call", 
    title: "Discovery call with StartUp Hub", 
    outcome: "Qualified - Moving to proposal stage",
    contact: "Lisa Anderson",
    company: "StartUp Hub",
    completedAt: "Yesterday, 4:00 PM",
    icon: Phone 
  },
  { 
    id: 7,
    type: "email", 
    title: "Sent case studies to NexGen Tech", 
    outcome: "Opened and clicked - Follow up scheduled",
    contact: "Jennifer Lee",
    company: "NexGen Tech",
    completedAt: "Yesterday, 2:30 PM",
    icon: Mail 
  },
  { 
    id: 8,
    type: "note", 
    title: "Added notes for Acme Industries", 
    outcome: "Decision maker identified - VP of Engineering",
    contact: "Robert Taylor",
    company: "Acme Industries",
    completedAt: "2 days ago",
    icon: MessageSquare 
  },
];

const iconStyles = {
  call: "bg-success/10 text-success",
  email: "bg-accent/10 text-accent",
  meeting: "bg-warning/10 text-warning",
  note: "bg-primary/10 text-primary",
};

const Activities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8 transition-all duration-300">
        <Header 
          title="Activities" 
          subtitle="Track and manage your daily sales activities"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Activities */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border shadow-card animate-slide-up">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
                  <p className="text-sm text-muted-foreground mt-1">{activities.length} activities planned</p>
                </div>
                <Button variant="accent" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
              <div className="divide-y divide-border">
                {activities.map((activity, index) => (
                  <div 
                    key={activity.id}
                    className="p-4 hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl shrink-0",
                        iconStyles[activity.type as keyof typeof iconStyles]
                      )}>
                        <activity.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-1">
                              {activity.time}
                            </Badge>
                            <p className="text-xs text-muted-foreground">{activity.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                          <Avatar className="h-6 w-6 border border-border">
                            <AvatarFallback className="bg-accent/10 text-accent text-xs">
                              {activity.contact.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            {activity.contact} · {activity.company}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <CheckCircle2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Completed Activities */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border shadow-card animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Completed</h3>
                <p className="text-sm text-muted-foreground mt-1">Recent completed activities</p>
              </div>
              <div className="divide-y divide-border">
                {completedActivities.map((activity, index) => (
                  <div 
                    key={activity.id}
                    className="p-4"
                    style={{ animationDelay: `${300 + index * 50}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg shrink-0 opacity-60",
                        iconStyles[activity.type as keyof typeof iconStyles]
                      )}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-foreground text-sm">{activity.title}</h4>
                        <p className="text-xs text-success mt-1">{activity.outcome}</p>
                        <p className="text-xs text-muted-foreground mt-2">{activity.completedAt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card rounded-xl border border-border shadow-card p-6 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">This Week</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-sm text-muted-foreground">Calls Made</span>
                  </div>
                  <span className="font-bold text-foreground">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground">Emails Sent</span>
                  </div>
                  <span className="font-bold text-foreground">48</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-warning/10 flex items-center justify-center">
                      <Video className="h-4 w-4 text-warning" />
                    </div>
                    <span className="text-sm text-muted-foreground">Meetings</span>
                  </div>
                  <span className="font-bold text-foreground">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Activities;
