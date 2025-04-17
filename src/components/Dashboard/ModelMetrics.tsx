
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { modelMetrics } from "@/utils/dummyData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const ModelMetrics = () => {
  // Prepare bar chart data
  const metricsData = [
    { name: "Influencer Impact Model", value: modelMetrics.influencerAccuracy, label: "Accuracy", color: "#4353ff" },
    { name: "Content Performance Model", value: modelMetrics.contentR2Score * 100, label: "R² Score", color: "#00a3c4" },
    { name: "Sentiment Analysis Model", value: modelMetrics.sentimentAccuracy, label: "Accuracy", color: "#4CAF50" }
  ];

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
              <Progress value={modelMetrics.influencerAccuracy} className="h-2" indicatorClassName="bg-blue-600" />
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
              <Progress value={modelMetrics.contentR2Score * 100} className="h-2" indicatorClassName="bg-teal-600" />
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
              <Progress value={modelMetrics.sentimentAccuracy} className="h-2" indicatorClassName="bg-green-600" />
              <p className="text-xs text-muted-foreground mt-2">
                Classification performance on test data
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add model metrics visualization chart */}
      <Card>
        <CardHeader>
          <CardTitle>Model Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            config={{
              value: { color: "#2171b5" }
            }}
            className="chart-container"
          >
            <BarChart
              data={metricsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value, name, props) => {
                  const item = metricsData[props.payload.index];
                  return [`${value.toFixed(1)}%`, item.label];
                }}
              />
              <Bar dataKey="value">
                {metricsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelMetrics;
