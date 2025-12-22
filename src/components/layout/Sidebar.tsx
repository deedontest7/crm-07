import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  Phone, 
  BarChart3, 
  Settings,
  ChevronLeft,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Leads", path: "/leads" },
  { icon: Target, label: "Pipeline", path: "/pipeline" },
  { icon: Phone, label: "Activities", path: "/activities" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 z-50 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
          <Zap className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-xl font-bold text-sidebar-foreground animate-fade-in">
            SalesFlow
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-primary" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive && "text-sidebar-primary"
              )} />
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary animate-scale-in" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-sidebar-border hover:bg-sidebar-accent/50 transition-colors"
      >
        <ChevronLeft className={cn(
          "h-5 w-5 transition-transform duration-300",
          collapsed && "rotate-180"
        )} />
      </button>
    </aside>
  );
}
