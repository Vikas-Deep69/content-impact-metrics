
import { Card, CardContent } from "@/components/ui/card";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-primary mb-2">{title}</h1>
      <p className="text-muted-foreground text-lg">{description}</p>
    </div>
  );
};

export default DashboardHeader;
