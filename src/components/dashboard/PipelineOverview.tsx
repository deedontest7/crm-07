import { cn } from "@/lib/utils";

const stages = [
  { name: "Discovery", count: 24, value: "$180,000", color: "bg-muted-foreground" },
  { name: "Qualification", count: 18, value: "$245,000", color: "bg-accent" },
  { name: "Proposal", count: 12, value: "$320,000", color: "bg-warning" },
  { name: "Negotiation", count: 8, value: "$185,000", color: "bg-primary" },
  { name: "Closed Won", count: 5, value: "$125,000", color: "bg-success" },
];

const totalValue = stages.reduce((sum, stage) => {
  return sum + parseInt(stage.value.replace(/[$,]/g, ""));
}, 0);

export function PipelineOverview() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Pipeline Overview</h3>
          <p className="text-sm text-muted-foreground mt-1">Current quarter performance</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">${(totalValue / 1000).toFixed(0)}K</p>
          <p className="text-sm text-muted-foreground">Total Value</p>
        </div>
      </div>

      {/* Pipeline Bar */}
      <div className="flex h-4 rounded-full overflow-hidden mb-6">
        {stages.map((stage, index) => {
          const width = (parseInt(stage.value.replace(/[$,]/g, "")) / totalValue) * 100;
          return (
            <div
              key={stage.name}
              className={cn(stage.color, "transition-all duration-500")}
              style={{ 
                width: `${width}%`,
                animationDelay: `${400 + index * 100}ms`
              }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-5 gap-4">
        {stages.map((stage) => (
          <div key={stage.name} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className={cn("w-2 h-2 rounded-full", stage.color)} />
              <span className="text-xs font-medium text-muted-foreground">{stage.name}</span>
            </div>
            <p className="text-lg font-bold text-foreground">{stage.count}</p>
            <p className="text-xs text-muted-foreground">{stage.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
