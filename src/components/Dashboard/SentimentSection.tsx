
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { MessageSquareText, ThumbsUp, ThumbsDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { generateSentimentData, predictSentiment } from "@/utils/dummyData";
import MetricCard from "./MetricCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const SentimentSection = () => {
  const [text, setText] = useState<string>("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [sentimentClass, setSentimentClass] = useState<string>("bg-gray-100");

  // Generate dummy data
  const sentimentData = generateSentimentData(100);
  
  // Calculate metrics
  const positiveCount = sentimentData.filter(item => item.sentiment === 1).length;
  const negativeCount = sentimentData.filter(item => item.sentiment === 0).length;
  const positivePercentage = Math.round((positiveCount / sentimentData.length) * 100);
  
  // Bar chart data - to match reference image
  const barData = [
    { name: "Negative (0)", value: negativeCount },
    { name: "Positive (1)", value: positiveCount },
  ];
  
  // Pie chart data
  const pieData = [
    { name: "Positive", value: positiveCount },
    { name: "Negative", value: negativeCount },
  ];
  
  const COLORS = ["#4CAF50", "#FF5722"];

  // Commonly found words
  const commonPositive = ["great", "amazing", "excellent", "fantastic", "loved"];
  const commonNegative = ["bad", "terrible", "worst", "horrible", "poor"];

  const handlePredict = () => {
    if (text.trim() === "") {
      setSentiment("Please enter some text to analyze");
      setSentimentClass("bg-yellow-100 border-yellow-300 text-yellow-800");
      return;
    }
    
    try {
      const prediction = predictSentiment(text);
      
      if (prediction === 1) {
        setSentiment("Positive Sentiment Detected");
        setSentimentClass("bg-green-100 border-green-300 text-green-800");
      } else {
        setSentiment("Negative Sentiment Detected");
        setSentimentClass("bg-red-100 border-red-300 text-red-800");
      }
    } catch (error) {
      setSentiment("Error in sentiment analysis");
      setSentimentClass("bg-red-100 border-red-300 text-red-800");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Sentiment Analysis</h2>
      
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Feedback Analyzed"
          value={sentimentData.length}
          description="Number of analyzed comments"
          icon={<MessageSquareText size={18} />}
        />
        <MetricCard
          title="Positive Feedback"
          value={`${positivePercentage}%`}
          description="Percentage of positive comments"
          icon={<ThumbsUp size={18} />}
        />
        <MetricCard
          title="Negative Feedback"
          value={`${100 - positivePercentage}%`}
          description="Percentage of negative comments"
          icon={<ThumbsDown size={18} />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sentiment Bar Chart - Updated to match reference image */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Label Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                value: { color: "#4353ff" }
              }}
              className="chart-container"
            >
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  label={{ value: 'Sentiment', position: 'insideBottom', offset: -10 }} 
                />
                <YAxis 
                  label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip formatter={(value) => [value, "Count"]} />
                <Bar 
                  dataKey="value" 
                  name="Count"
                >
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Prediction Form */}
        <Card>
          <CardHeader>
            <CardTitle>Analyze Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter text to analyze sentiment (e.g., 'Great product, loved it!')"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
              />
              
              <Button onClick={handlePredict} className="w-full">Analyze Sentiment</Button>
              
              {sentiment && (
                <div className={`p-3 rounded-md mt-4 border ${sentimentClass}`}>
                  {sentiment}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sentiment Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Count"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Common Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Common Positive Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {commonPositive.map((term, index) => (
                <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {term}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Common Negative Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {commonNegative.map((term, index) => (
                <div key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                  {term}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Separator />
    </div>
  );
};

export default SentimentSection;
