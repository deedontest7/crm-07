import { TrendingUp, TrendingDown, DollarSign, Users, Target, Clock } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 45000, target: 50000 },
  { month: "Feb", revenue: 52000, target: 50000 },
  { month: "Mar", revenue: 48000, target: 55000 },
  { month: "Apr", revenue: 61000, target: 55000 },
  { month: "May", revenue: 55000, target: 60000 },
  { month: "Jun", revenue: 72000, target: 60000 },
  { month: "Jul", revenue: 68000, target: 65000 },
  { month: "Aug", revenue: 85000, target: 70000 },
  { month: "Sep", revenue: 78000, target: 75000 },
  { month: "Oct", revenue: 92000, target: 80000 },
  { month: "Nov", revenue: 98000, target: 85000 },
  { month: "Dec", revenue: 110000, target: 90000 },
];

const leadsData = [
  { source: "Website", leads: 145 },
  { source: "LinkedIn", leads: 98 },
  { source: "Referral", leads: 72 },
  { source: "Cold Email", leads: 58 },
  { source: "Events", leads: 45 },
];

const conversionData = [
  { name: "Won", value: 35, color: "hsl(142, 71%, 45%)" },
  { name: "Lost", value: 25, color: "hsl(0, 84%, 60%)" },
  { name: "In Progress", value: 40, color: "hsl(174, 62%, 47%)" },
];

const metrics = [
  { label: "Total Revenue", value: "$864K", change: "+18.2%", trend: "up", icon: DollarSign },
  { label: "Deals Closed", value: "142", change: "+12%", trend: "up", icon: Target },
  { label: "New Leads", value: "418", change: "+24%", trend: "up", icon: Users },
  { label: "Avg Deal Cycle", value: "28 days", change: "-3 days", trend: "up", icon: Clock },
];

const Reports = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8 transition-all duration-300">
        <Header 
          title="Reports" 
          subtitle="Analyze your sales performance and trends"
        />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div 
              key={metric.label}
              className="bg-card rounded-xl border border-border shadow-card p-6 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <metric.icon className="h-5 w-5 text-accent" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  metric.trend === "up" ? "text-success" : "text-destructive"
                )}>
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {metric.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-card p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Revenue vs Target</h3>
                <p className="text-sm text-muted-foreground mt-1">Monthly performance comparison</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-sm text-muted-foreground">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <span className="text-sm text-muted-foreground">Target</span>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(174, 62%, 47%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(174, 62%, 47%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} tickFormatter={(v) => `$${v/1000}K`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(0, 0%, 100%)", 
                      border: "1px solid hsl(214, 32%, 91%)",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [`$${(value/1000).toFixed(0)}K`, ""]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(215, 16%, 47%)" 
                    strokeDasharray="4 4"
                    fill="none"
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(174, 62%, 47%)" 
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Pie Chart */}
          <div className="bg-card rounded-xl border border-border shadow-card p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <h3 className="text-lg font-semibold text-foreground mb-2">Deal Status</h3>
            <p className="text-sm text-muted-foreground mb-6">Current pipeline breakdown</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conversionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {conversionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {conversionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-card rounded-xl border border-border shadow-card p-6 animate-slide-up" style={{ animationDelay: "400ms" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Lead Sources</h3>
              <p className="text-sm text-muted-foreground mt-1">Where your leads are coming from</p>
            </div>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" horizontal={false} />
                <XAxis type="number" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                <YAxis dataKey="source" type="category" stroke="hsl(215, 16%, 47%)" fontSize={12} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(0, 0%, 100%)", 
                    border: "1px solid hsl(214, 32%, 91%)",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="leads" fill="hsl(174, 62%, 47%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
