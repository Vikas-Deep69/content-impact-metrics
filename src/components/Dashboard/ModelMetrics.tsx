
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { modelMetrics } from "@/utils/dummyData";

const ModelMetrics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Model Performance Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Influencer Impact Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Accuracy</span>
                <span className="font-medium">{modelMetrics.influencerAccuracy}%</span>
              </div>
              <Progress value={modelMetrics.influencerAccuracy} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Classification performance on test data
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Content Performance Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>R² Score</span>
                <span className="font-medium">{modelMetrics.contentR2Score}</span>
              </div>
              <Progress value={modelMetrics.contentR2Score * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Regression performance on test data
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Accuracy</span>
                <span className="font-medium">{modelMetrics.sentimentAccuracy}%</span>
              </div>
              <Progress value={modelMetrics.sentimentAccuracy} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Classification performance on test data
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModelMetrics;
