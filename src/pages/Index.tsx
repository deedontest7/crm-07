import { DollarSign, Users, TrendingUp, Target } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentLeads } from "@/components/dashboard/RecentLeads";
import { PipelineOverview } from "@/components/dashboard/PipelineOverview";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";

const stats = [
  { 
    title: "Total Revenue", 
    value: "$248,500", 
    change: "+12.5% from last month", 
    changeType: "positive" as const,
    icon: DollarSign 
  },
  { 
    title: "Active Leads", 
    value: "156", 
    change: "+8 new this week", 
    changeType: "positive" as const,
    icon: Users 
  },
  { 
    title: "Conversion Rate", 
    value: "24.8%", 
    change: "+2.3% from last month", 
    changeType: "positive" as const,
    icon: TrendingUp 
  },
  { 
    title: "Quota Progress", 
    value: "78%", 
    change: "$55K remaining", 
    changeType: "neutral" as const,
    icon: Target 
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8 transition-all duration-300">
        <Header 
          title="Dashboard" 
          subtitle="Welcome back! Here's what's happening with your sales today."
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} delay={index * 100} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Pipeline & Leads */}
          <div className="lg:col-span-2 space-y-6">
            <PipelineOverview />
            <RecentLeads />
          </div>

          {/* Right Column - Quick Actions & Activity */}
          <div className="space-y-6">
            <QuickActions />
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
