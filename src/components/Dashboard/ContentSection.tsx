
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, BarChart, Bar } from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileText, TrendingUp, Share2 } from "lucide-react";
import { generateContentData, predictContentShares } from "@/utils/dummyData";
import MetricCard from "./MetricCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const ContentSection = () => {
  const [length, setLength] = useState<string>("100");
  const [engagement, setEngagement] = useState<string>("0.7");
  const [novelty, setNovelty] = useState<string>("0.6");
  const [predictedShares, setPredictedShares] = useState<number | null>(null);

  // Generate dummy data
  const contentData = generateContentData(50);
  
  // Calculate metrics
  const avgLength = Math.floor(contentData.reduce((acc, item) => acc + item.length, 0) / contentData.length);
  const avgShares = Math.floor(contentData.reduce((acc, item) => acc + item.shares, 0) / contentData.length);
  const maxShares = Math.max(...contentData.map(item => item.shares));
  
  // Create histogram data for shares distribution
  const histogramData = [];
  const min = Math.min(...contentData.map(item => item.shares));
  const max = Math.max(...contentData.map(item => item.shares));
  const range = max - min;
  const bucketSize = range / 15; // More bins to match reference histogram
  
  for (let i = 0; i < 15; i++) {
    const lowerBound = min + i * bucketSize;
    const upperBound = min + (i + 1) * bucketSize;
    const count = contentData.filter(item => item.shares >= lowerBound && item.shares < upperBound).length;
    histogramData.push({
      range: `${Math.floor(lowerBound)}`,
      count,
    });
  }

  // Create scatter plot data for length vs. shares
  const scatterData = contentData.map(item => ({
    length: item.length,
    shares: item.shares,
  }));

  const handlePredict = () => {
    try {
      const prediction = predictContentShares(
        parseFloat(length),
        parseFloat(engagement),
        parseFloat(novelty)
      );
      setPredictedShares(prediction);
    } catch (error) {
      setPredictedShares(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Content Performance Analytics</h2>
      
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Average Content Length"
          value={avgLength}
          description="Words per content piece"
          icon={<FileText size={18} />}
        />
        <MetricCard
          title="Average Shares"
          value={avgShares.toLocaleString()}
          description="Shares per content piece"
          icon={<Share2 size={18} />}
        />
        <MetricCard
          title="Top Performing Content"
          value={maxShares.toLocaleString()}
          description="Most shares on a single piece"
          icon={<TrendingUp size={18} />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribution Chart - Updated to look more like reference image */}
        <Card>
          <CardHeader>
            <CardTitle>Content Shares Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                count: { color: "#4353ff" },
                kde: { color: "#ff7c43" }
              }}
              className="chart-container"
            >
              <BarChart data={histogramData} layout="vertical" barCategoryGap={1}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="range" type="category" scale="band" tickCount={10} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="count" 
                  fill="#4353ff" 
                  name="Frequency" 
                  barSize={15}
                  radius={[0, 0, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Prediction Form */}
        <Card>
          <CardHeader>
            <CardTitle>Predict Content Shares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Content Length (words)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="e.g. 100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engagement">Engagement Quality (0-1)</Label>
                  <Input
                    id="engagement"
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={engagement}
                    onChange={(e) => setEngagement(e.target.value)}
                    placeholder="e.g. 0.7"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="novelty">Content Novelty (0-1)</Label>
                  <Input
                    id="novelty"
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={novelty}
                    onChange={(e) => setNovelty(e.target.value)}
                    placeholder="e.g. 0.6"
                  />
                </div>
              </div>
              
              <Button onClick={handlePredict} className="w-full">Predict Shares</Button>
              
              {predictedShares !== null && (
                <div className="bg-blue-100 border border-blue-300 text-blue-800 p-3 rounded-md mt-4">
                  Predicted shares: <span className="font-bold">{predictedShares.toLocaleString()}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Content Length vs Shares Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Content Length vs. Shares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis 
                  type="number" 
                  dataKey="length" 
                  name="Length" 
                  unit=" words" 
                  label={{ value: 'Content Length (words)', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="shares" 
                  name="Shares" 
                  label={{ value: 'Shares Count', angle: -90, position: 'insideLeft' }}
                />
                <ZAxis type="number" range={[60, 60]} />
                <ChartTooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Length vs Shares" data={scatterData} fill="#4353ff" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Separator />
    </div>
  );
};

export default ContentSection;
