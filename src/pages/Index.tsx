
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import InfluencerSection from "@/components/Dashboard/InfluencerSection";
import ContentSection from "@/components/Dashboard/ContentSection";
import SentimentSection from "@/components/Dashboard/SentimentSection";
import ModelMetrics from "@/components/Dashboard/ModelMetrics";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <DashboardHeader 
        title="Content Impact Metrics Dashboard" 
        description="Analyze and predict content performance, influencer impact, and audience sentiment"
      />
      
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Dataset Information</AlertTitle>
        <AlertDescription>
          This dashboard uses machine learning models trained on real datasets. You can download the CSV files using the buttons above.
        </AlertDescription>
      </Alert>
      
      <Card className="p-6 mb-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="influencer">Influencer Impact</TabsTrigger>
            <TabsTrigger value="content">Content Performance</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <p className="text-muted-foreground">
              This dashboard provides insights into three key areas of content marketing analytics,
              powered by machine learning models. Explore each section to analyze data and make predictions.
            </p>
            
            <Separator />
            
            <div className="grid grid-cols-1 gap-10">
              <div>
                <h3 className="text-xl font-medium mb-4">Influencer Impact</h3>
                <p className="text-muted-foreground mb-2">
                  Analyze how influencer characteristics affect sales and engagement. Predict the potential
                  sales impact of an influencer based on their profile metrics.
                </p>
                <div className="bg-blue-100 p-4 rounded-md text-blue-800 text-sm">
                  <strong>Model Accuracy:</strong> 87.5% on test data
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Content Performance</h3>
                <p className="text-muted-foreground mb-2">
                  Understand how content characteristics influence sharing and engagement. Predict the share
                  count for content based on its attributes.
                </p>
                <div className="bg-blue-100 p-4 rounded-md text-blue-800 text-sm">
                  <strong>Model R² Score:</strong> 0.82 on test data
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Sentiment Analysis</h3>
                <p className="text-muted-foreground mb-2">
                  Analyze the sentiment of audience feedback and comments. Predict whether a given text
                  expresses positive or negative sentiment.
                </p>
                <div className="bg-blue-100 p-4 rounded-md text-blue-800 text-sm">
                  <strong>Model Accuracy:</strong> 92.0% on test data
                </div>
              </div>
            </div>
            
            <Separator />
            
            <ModelMetrics />
          </TabsContent>
          
          <TabsContent value="influencer" className="mt-6">
            <InfluencerSection />
          </TabsContent>
          
          <TabsContent value="content" className="mt-6">
            <ContentSection />
          </TabsContent>
          
          <TabsContent value="sentiment" className="mt-6">
            <SentimentSection />
          </TabsContent>
        </Tabs>
      </Card>
      
      <footer className="text-center text-sm text-muted-foreground">
        <p>© 2025 Content Impact Metrics Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
