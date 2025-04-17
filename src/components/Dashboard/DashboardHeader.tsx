
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-4xl font-bold text-primary">{title}</h1>
        <Badge variant="secondary" className="ml-2 text-xs">
          <Activity className="w-3 h-3 mr-1" />
          <span>ML Powered</span>
        </Badge>
      </div>
      <p className="text-muted-foreground text-lg">{description}</p>
    </div>
  );
};

export default DashboardHeader;
