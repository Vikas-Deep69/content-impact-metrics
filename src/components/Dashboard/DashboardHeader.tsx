
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  const datasets = {
    content: "https://biumlunxzojlrivmfkyz.supabase.co/storage/v1/object/sign/socialmedia/content_data.csv?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzEyNWFhNWYwLWRmYzctNDIyMS04NWNiLWMyNDgxM2IzM2IxMiJ9.eyJ1cmwiOiJzb2NpYWxtZWRpYS9jb250ZW50X2RhdGEuY3N2IiwiaWF0IjoxNzQ0ODgyNTQyLCJleHAiOjE3NDU0ODczNDJ9.fYfG0ebryvjkKbzdEQTghUuPwbDS9PpbAEQN8lw6pRo",
    influencer: "https://biumlunxzojlrivmfkyz.supabase.co/storage/v1/object/sign/socialmedia/influencer_data.csv?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzEyNWFhNWYwLWRmYzctNDIyMS04NWNiLWMyNDgxM2IzM2IxMiJ9.eyJ1cmwiOiJzb2NpYWxtZWRpYS9pbmZsdWVuY2VyX2RhdGEuY3N2IiwiaWF0IjoxNzQ0ODgyNTY1LCJleHAiOjE3NDU0ODczNjV9.GWlIokETDwIuoR4l1tD54qZk8uD2bjs0r-ln0Nqu52w",
    sentiment: "https://biumlunxzojlrivmfkyz.supabase.co/storage/v1/object/sign/socialmedia/sentiment_data.csv?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzEyNWFhNWYwLWRmYzctNDIyMS04NWNiLWMyNDgxM2IzM2IxMiJ9.eyJ1cmwiOiJzb2NpYWxtZWRpYS9zZW50aW1lbnRfZGF0YS5jc3YiLCJpYXQiOjE3NDQ4ODI1NzksImV4cCI6MTc0NTQ4NzM3OX0.TpNpadF2FwMnysCGleBR1LxeqKddkGa_48I18DM-9pk"
  };

  const handleDownloadCSV = (type: keyof typeof datasets) => {
    window.open(datasets[type], '_blank');
  };
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-4xl font-bold text-primary">{title}</h1>
        <Badge variant="secondary" className="ml-2 text-xs">
          <Activity className="w-3 h-3 mr-1" />
          <span>ML Powered</span>
        </Badge>
      </div>
      <p className="text-muted-foreground text-lg mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mt-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => handleDownloadCSV('content')}
              >
                <Database className="w-3 h-3" />
                Content Dataset
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download content performance data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => handleDownloadCSV('influencer')}
              >
                <Database className="w-3 h-3" />
                Influencer Dataset
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download influencer impact data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => handleDownloadCSV('sentiment')}
              >
                <Database className="w-3 h-3" />
                Sentiment Dataset
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download sentiment analysis data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DashboardHeader;
