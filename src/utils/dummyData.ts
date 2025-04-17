// Simulated data since we can't run the actual Python models in JavaScript
// Real data URLs for reference:
// - Content Data: https://biumlunxzojlrivmfkyz.supabase.co/storage/v1/object/sign/socialmedia/content_data.csv
// - Influencer Data: https://biumlunxzojlrivmfkyz.supabase.co/storage/v1/object/sign/socialmedia/influencer_data.csv
// - Sentiment Data: https://biumlunxzojlrivmfkyz.supabase.co/storage/v1/object/sign/socialmedia/sentiment_data.csv

// Influencer Impact Data
export const generateInfluencerData = (n = 200) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    const followers = Math.floor(Math.random() * 999000) + 1000;
    const engagementRate = Math.random() * 0.14 + 0.01;
    const nicheScore = Math.random();
    const contentQuality = Math.random();
    const influencerScore = followers * engagementRate * (0.4 * nicheScore + 0.6 * contentQuality);
    const highSales = influencerScore > 0.6 ? 1 : 0;
    
    data.push({
      followers,
      engagementRate,
      nicheScore,
      contentQuality,
      highSales
    });
  }
  return data;
};

// Content Performance Data
export const generateContentData = (n = 200) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    const length = Math.floor(Math.random() * 180) + 20;
    const engagement = Math.random();
    const novelty = Math.random();
    const shares = Math.floor(length * 0.5 + engagement * 1000 + novelty * 500 + (Math.random() * 200 - 100));
    
    data.push({
      length,
      engagement,
      novelty,
      shares
    });
  }
  return data;
};

// Sentiment Analysis Data
export const generateSentimentData = (n = 200) => {
  const texts = [
    'great product', 'bad experience', 'loved it', 'terrible service', 
    'excellent quality', 'worst ever', 'amazing', 'not good', 'fantastic', 'horrible'
  ];
  const sentiments = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
  
  const data = [];
  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * texts.length);
    data.push({
      text: texts[index],
      sentiment: sentiments[index]
    });
  }
  return data;
};

// Model prediction functions
export const predictInfluencerImpact = (
  followers: number, 
  engagementRate: number, 
  nicheScore: number, 
  contentQuality: number
) => {
  const influencerScore = followers * engagementRate * (0.4 * nicheScore + 0.6 * contentQuality);
  const threshold = 40000; // Simulate the model's decision boundary
  return influencerScore > threshold ? 1 : 0;
};

export const predictContentShares = (
  length: number,
  engagement: number,
  novelty: number
) => {
  return Math.floor(length * 0.5 + engagement * 1000 + novelty * 500 + (Math.random() * 100));
};

export const predictSentiment = (text: string) => {
  const positiveWords = ['great', 'loved', 'excellent', 'amazing', 'fantastic', 'good'];
  const negativeWords = ['bad', 'terrible', 'worst', 'horrible', 'not'];
  
  const lowercaseText = text.toLowerCase();
  let positive = 0;
  let negative = 0;
  
  positiveWords.forEach(word => {
    if (lowercaseText.includes(word)) positive++;
  });
  
  negativeWords.forEach(word => {
    if (lowercaseText.includes(word)) negative++;
  });
  
  return positive > negative ? 1 : 0;
};

// Model metrics (simulated)
export const modelMetrics = {
  influencerAccuracy: 87.5,
  contentR2Score: 0.82,
  sentimentAccuracy: 92.0
};
