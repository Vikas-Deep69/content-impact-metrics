
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, Rectangle, HeatMapProps } from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, TrendingUp, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generateInfluencerData, predictInfluencerImpact } from "@/utils/dummyData";
import MetricCard from "./MetricCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const InfluencerSection = () => {
  const [followers, setFollowers] = useState<string>("50000");
  const [engagementRate, setEngagementRate] = useState<string>("0.05");
  const [nicheScore, setNicheScore] = useState<string>("0.7");
  const [contentQuality, setContentQuality] = useState<string>("0.8");
  const [predictionResult, setPredictionResult] = useState<string | null>(null);
  const [predictionColor, setPredictionColor] = useState<string>("bg-gray-100");

  // Generate dummy data for the chart
  const influencerData = generateInfluencerData(50);
  
  // Calculate average metrics
  const avgFollowers = Math.floor(influencerData.reduce((acc, item) => acc + item.followers, 0) / influencerData.length);
  const avgEngagement = (influencerData.reduce((acc, item) => acc + item.engagementRate, 0) / influencerData.length).toFixed(2);
  
  // Transform data for the chart
  const chartData = [
    { name: 'High Sales', yes: influencerData.filter(d => d.highSales === 1).length, no: influencerData.filter(d => d.highSales === 0).length },
  ];

  // Process data for correlation chart - matching correlation heatmap from the reference
  const correlationData = [
    { name: 'followers', followers: 1.0, engagementRate: 0.21, nicheScore: 0.15, contentQuality: 0.18, highSales: 0.62 },
    { name: 'engagementRate', followers: 0.21, engagementRate: 1.0, nicheScore: 0.08, contentQuality: 0.12, highSales: 0.83 },
    { name: 'nicheScore', followers: 0.15, engagementRate: 0.08, nicheScore: 1.0, contentQuality: 0.05, highSales: 0.41 },
    { name: 'contentQuality', followers: 0.18, engagementRate: 0.12, contentQuality: 0.05, nicheScore: 1.0, highSales: 0.75 },
    { name: 'highSales', followers: 0.62, engagementRate: 0.83, nicheScore: 0.41, contentQuality: 0.75, highSales: 1.0 },
  ];

  const featureImportanceData = [
    { name: 'Engagement Rate', value: 0.83 },
    { name: 'Content Quality', value: 0.75 },
    { name: 'Followers', value: 0.62 },
    { name: 'Niche Score', value: 0.41 },
  ];

  const handlePredict = () => {
    try {
      const prediction = predictInfluencerImpact(
        parseFloat(followers),
        parseFloat(engagementRate),
        parseFloat(nicheScore),
        parseFloat(contentQuality)
      );
      
      if (prediction === 1) {
        setPredictionResult("High Sales Impact Likely");
        setPredictionColor("bg-green-100 border-green-300 text-green-800");
      } else {
        setPredictionResult("Low Sales Impact Predicted");
        setPredictionColor("bg-yellow-100 border-yellow-300 text-yellow-800");
      }
    } catch (error) {
      setPredictionResult("Error in prediction. Check your inputs.");
      setPredictionColor("bg-red-100 border-red-300 text-red-800");
    }
  };

  // Function to generate color based on correlation value
  const getCorrelationColor = (value: number) => {
    // Blues color palette similar to reference image
    if (value >= 0.9) return "#08306b";
    if (value >= 0.7) return "#08519c";
    if (value >= 0.5) return "#2171b5";
    if (value >= 0.3) return "#4292c6";
    if (value >= 0.1) return "#6baed6";
    if (value >= -0.1) return "#9ecae1";
    if (value >= -0.3) return "#c6dbef";
    if (value >= -0.5) return "#deebf7";
    return "#f7fbff";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Influencer Impact Analysis</h2>
      
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Average Followers"
          value={avgFollowers.toLocaleString()}
          description="Across all analyzed influencers"
          icon={<Users size={18} />}
        />
        <MetricCard
          title="Average Engagement"
          value={`${(parseFloat(avgEngagement) * 100).toFixed(1)}%`}
          description="Engagement rate across accounts"
          icon={<TrendingUp size={18} />}
        />
        <MetricCard
          title="High Impact Rate"
          value={`${Math.round((influencerData.filter(d => d.highSales === 1).length / influencerData.length) * 100)}%`}
          description="Percentage with significant sales impact"
          icon={<AlertCircle size={18} />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Correlation Heatmap - Based on reference image */}
        <Card>
          <CardHeader>
            <CardTitle>Influencer Features Correlation Heatmap</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="chart-container">
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-6 gap-1">
                  <div className="text-xs"></div>
                  {correlationData.map((row, idx) => (
                    <div key={idx} className="text-xs font-semibold transform -rotate-45 origin-left translate-y-3">
                      {row.name}
                    </div>
                  ))}
                  
                  {correlationData.map((row, rowIdx) => (
                    <>
                      <div key={`row-${rowIdx}`} className="text-xs font-semibold">
                        {row.name}
                      </div>
                      {Object.entries(row)
                        .filter(([key]) => key !== 'name')
                        .map(([key, value], colIdx) => (
                          <div 
                            key={`cell-${rowIdx}-${colIdx}`} 
                            className="w-10 h-10 flex items-center justify-center text-xs font-semibold"
                            style={{ backgroundColor: getCorrelationColor(value as number) }}
                          >
                            {(value as number).toFixed(2)}
                          </div>
                        ))
                      }
                    </>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prediction Form */}
        <Card>
          <CardHeader>
            <CardTitle>Predict Influencer Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="followers">Followers Count</Label>
                  <Input
                    id="followers"
                    type="number"
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                    placeholder="e.g. 50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engagement">Engagement Rate (0-1)</Label>
                  <Input
                    id="engagement"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={engagementRate}
                    onChange={(e) => setEngagementRate(e.target.value)}
                    placeholder="e.g. 0.05"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="niche">Niche Relevance (0-1)</Label>
                  <Input
                    id="niche"
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={nicheScore}
                    onChange={(e) => setNicheScore(e.target.value)}
                    placeholder="e.g. 0.7"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quality">Content Quality (0-1)</Label>
                  <Input
                    id="quality"
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={contentQuality}
                    onChange={(e) => setContentQuality(e.target.value)}
                    placeholder="e.g. 0.8"
                  />
                </div>
              </div>
              
              <Button onClick={handlePredict} className="w-full">Predict Impact</Button>
              
              {predictionResult && (
                <div className={`p-3 rounded-md mt-4 ${predictionColor}`}>
                  {predictionResult}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Feature Importance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Importance for Sales Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            config={{
              value: { color: "#2171b5" }
            }}
            className="chart-container"
          >
            <BarChart 
              data={featureImportanceData} 
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 1]} tickCount={6} />
              <YAxis dataKey="name" type="category" width={90} />
              <Tooltip 
                formatter={(value) => [`${(Number(value) * 100).toFixed(0)}%`, 'Importance']}
                cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              />
              <Bar 
                dataKey="value" 
                fill="#2171b5" 
                background={{ fill: '#eee' }}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Separator />
    </div>
  );
};

export default InfluencerSection;
