export interface Article {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  summary: string;
  source: string;
  category: string;
  sentiment: string;
  sentimentScore: number;
  topics?: string[];
}

export interface Feed {
  title: string;
  description: string;
  link: string;
  items: Article[];
  category: string;
}

export interface TopicItem {
  name: string;
  count: number;
  sentiment: number;
}

export interface FeedResponse {
  feeds: Feed[];
  masterSummary: string;
  timestamp: string;
  topics?: {
    trendingTopics: TopicItem[];
  };
}
