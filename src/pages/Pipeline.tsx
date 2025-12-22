import { MoreHorizontal, Plus } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const stages = [
  {
    id: "discovery",
    name: "Discovery",
    color: "bg-muted-foreground",
    deals: [
      { id: 1, name: "TechCorp Enterprise", company: "TechCorp Inc.", value: "$45,000", owner: "SJ", daysInStage: 3 },
      { id: 2, name: "Cloud Migration", company: "Global Solutions", value: "$32,000", owner: "MC", daysInStage: 5 },
      { id: 3, name: "Platform Upgrade", company: "StartUp Hub", value: "$18,000", owner: "LA", daysInStage: 2 },
    ]
  },
  {
    id: "qualification",
    name: "Qualification",
    color: "bg-accent",
    deals: [
      { id: 4, name: "Annual Contract", company: "Enterprise Co.", value: "$55,000", owner: "JW", daysInStage: 7 },
      { id: 5, name: "SaaS Implementation", company: "Innovate Ltd.", value: "$28,500", owner: "ED", daysInStage: 4 },
    ]
  },
  {
    id: "proposal",
    name: "Proposal",
    color: "bg-warning",
    deals: [
      { id: 6, name: "Enterprise Suite", company: "MegaCorp", value: "$85,000", owner: "DB", daysInStage: 6 },
      { id: 7, name: "Security Package", company: "NexGen Tech", value: "$42,000", owner: "JL", daysInStage: 3 },
      { id: 8, name: "Data Analytics", company: "Acme Industries", value: "$67,000", owner: "RT", daysInStage: 8 },
    ]
  },
  {
    id: "negotiation",
    name: "Negotiation",
    color: "bg-primary",
    deals: [
      { id: 9, name: "Premium Support", company: "Alpha Systems", value: "$38,000", owner: "KM", daysInStage: 4 },
    ]
  },
  {
    id: "closed",
    name: "Closed Won",
    color: "bg-success",
    deals: [
      { id: 10, name: "Q4 Renewal", company: "Beta Corp", value: "$125,000", owner: "SJ", daysInStage: 1 },
    ]
  },
];

const Pipeline = () => {
  const totalValue = stages.reduce((sum, stage) => 
    sum + stage.deals.reduce((s, d) => s + parseInt(d.value.replace(/[$,]/g, "")), 0), 0
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8 transition-all duration-300">
        <Header 
          title="Pipeline" 
          subtitle={`Total pipeline value: $${(totalValue / 1000).toFixed(0)}K`}
        />

        {/* Pipeline Board */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {stages.map((stage, stageIndex) => {
            const stageValue = stage.deals.reduce((sum, deal) => 
              sum + parseInt(deal.value.replace(/[$,]/g, "")), 0
            );
            
            return (
              <div 
                key={stage.id}
                className="flex-shrink-0 w-80 animate-slide-up"
                style={{ animationDelay: `${stageIndex * 100}ms` }}
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full", stage.color)} />
                    <h3 className="font-semibold text-foreground">{stage.name}</h3>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {stage.deals.length}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    ${(stageValue / 1000).toFixed(0)}K
                  </span>
                </div>

                {/* Deals Column */}
                <div className="space-y-3">
                  {stage.deals.map((deal, dealIndex) => (
                    <div
                      key={deal.id}
                      className="bg-card rounded-xl border border-border p-4 shadow-card card-hover cursor-pointer"
                      style={{ animationDelay: `${stageIndex * 100 + dealIndex * 50}ms` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-foreground">{deal.name}</h4>
                          <p className="text-sm text-muted-foreground">{deal.company}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-1">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-foreground">{deal.value}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {deal.daysInStage}d
                          </span>
                          <Avatar className="h-7 w-7 border border-border">
                            <AvatarFallback className="bg-accent/10 text-accent text-xs font-medium">
                              {deal.owner}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Deal Button */}
                  <Button 
                    variant="ghost" 
                    className="w-full border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-accent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Deal
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Pipeline;
