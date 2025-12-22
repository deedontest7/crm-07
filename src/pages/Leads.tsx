import { useState } from "react";
import { Search, Filter, MoreHorizontal, Mail, Phone } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const leads = [
  { id: 1, name: "Sarah Johnson", email: "sarah@techcorp.com", company: "TechCorp Inc.", value: "$45,000", status: "hot", source: "Website", lastContact: "2 hours ago" },
  { id: 2, name: "Michael Chen", email: "michael@globalsolutions.com", company: "Global Solutions", value: "$32,000", status: "warm", source: "LinkedIn", lastContact: "1 day ago" },
  { id: 3, name: "Emily Davis", email: "emily@innovate.com", company: "Innovate Ltd.", value: "$28,500", status: "hot", source: "Referral", lastContact: "3 hours ago" },
  { id: 4, name: "James Wilson", email: "james@enterprise.co", company: "Enterprise Co.", value: "$55,000", status: "cold", source: "Cold Email", lastContact: "5 days ago" },
  { id: 5, name: "Lisa Anderson", email: "lisa@startuphub.io", company: "StartUp Hub", value: "$18,000", status: "warm", source: "Webinar", lastContact: "1 day ago" },
  { id: 6, name: "David Brown", email: "david@megacorp.com", company: "MegaCorp", value: "$85,000", status: "hot", source: "Trade Show", lastContact: "4 hours ago" },
  { id: 7, name: "Jennifer Lee", email: "jennifer@nexgen.io", company: "NexGen Tech", value: "$42,000", status: "warm", source: "Website", lastContact: "2 days ago" },
  { id: 8, name: "Robert Taylor", email: "robert@acme.com", company: "Acme Industries", value: "$67,000", status: "cold", source: "Partner", lastContact: "1 week ago" },
];

const statusStyles = {
  hot: "bg-destructive/10 text-destructive border-destructive/20",
  warm: "bg-warning/10 text-warning border-warning/20",
  cold: "bg-muted text-muted-foreground border-border",
};

const Leads = () => {
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);

  const toggleLead = (id: number) => {
    setSelectedLeads(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedLeads(prev => 
      prev.length === leads.length ? [] : leads.map(l => l.id)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8 transition-all duration-300">
        <Header 
          title="Leads" 
          subtitle="Manage and track your sales prospects"
        />

        {/* Filters Bar */}
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search leads..." 
                className="pl-10 w-80 bg-card"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {selectedLeads.length > 0 && (
              <span className="text-sm text-muted-foreground mr-2">
                {selectedLeads.length} selected
              </span>
            )}
            <Button variant="secondary">Export</Button>
            <Button variant="accent">Import Leads</Button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-card rounded-xl border border-border shadow-card animate-slide-up">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedLeads.length === leads.length}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead, index) => (
                <TableRow 
                  key={lead.id}
                  className="cursor-pointer transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <Checkbox 
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={() => toggleLead(lead.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border-2 border-accent/20">
                        <AvatarFallback className="bg-accent/10 text-accent text-sm font-medium">
                          {lead.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{lead.company}</TableCell>
                  <TableCell className="font-semibold text-foreground">{lead.value}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn("capitalize", statusStyles[lead.status as keyof typeof statusStyles])}
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.source}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.lastContact}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Leads;
