import { User, Bell, Shield, Palette, CreditCard, Users } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "team", label: "Team", icon: Users },
];

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8 transition-all duration-300">
        <Header 
          title="Settings" 
          subtitle="Manage your account and preferences"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-card rounded-xl border border-border shadow-card p-2 animate-slide-up">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                    section.id === "profile" 
                      ? "bg-accent/10 text-accent" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <section.icon className="h-5 w-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Section */}
            <div className="bg-card rounded-xl border border-border shadow-card p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <h3 className="text-lg font-semibold text-foreground mb-6">Profile Information</h3>
              
              <div className="flex items-start gap-6 mb-8">
                <Avatar className="h-20 w-20 border-4 border-accent/20">
                  <AvatarFallback className="bg-accent/10 text-accent text-xl font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-foreground">Profile Photo</h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    JPG, GIF or PNG. Max size 2MB.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">Upload New</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" defaultValue="Senior Sales Representative" />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button variant="accent">Save Changes</Button>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-card rounded-xl border border-border shadow-card p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <h3 className="text-lg font-semibold text-foreground mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email updates about your leads</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Get notified about important activities</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Deal Alerts</p>
                    <p className="text-sm text-muted-foreground">Notify when deals progress or close</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">Receive weekly performance summaries</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-card rounded-xl border border-border shadow-card p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <h3 className="text-lg font-semibold text-foreground mb-6">Security Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-4">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div />
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">Update Password</Button>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
