# Industry News Page Implementation

This document outlines the implementation of the industry news page in the ROI Calculators application.

## Overview

The industry news page is designed to provide users with the latest news and trends in HR, employee benefits, and payroll. It features categorised sources, AI-generated summaries, sentiment analysis, and trending topics visualisation.

## Implemented Features

### Feed Aggregation Improvements

- **Categorised Sources**: News sources are categorised into different groups (HR News, Benefits Focused, Payroll Specific, Workplace Insights).
- **Content Deduplication**: A sophisticated algorithm detects and removes duplicate articles based on title and content similarity.
- **Incremental Cache Updates**: The system only refreshes feeds that need updating instead of rebuilding the entire cache.

### UI Enhancements

- **Topic Clustering**: Related articles are grouped by topic for easier navigation.
- **Sentiment Analysis**: Articles are categorised as positive, negative, or neutral based on their content.
- **Trending Topics Visualisation**: A visual representation of trending topics with heat-map style colouring.
- **Multiple View Options**: Users can switch between category-based and topic-based views.
- **Filtering System**: Content can be filtered by category, sentiment, and search query.

### Performance Optimisation

- **Worker Threads**: Parallel processing of RSS feeds using Node.js worker threads.
- **Batch Processing**: Feeds are processed in batches to optimise performance.
- **Incremental Updates**: Only changed feeds are updated, reducing processing time.
- **Intelligent Caching**: Cache is maintained with timestamps for each feed to determine update necessity.

## Technical Implementation

### Front-End (React/Next.js)

The front-end is implemented using React with Next.js, featuring:

- Dynamic state management for different view modes
- Responsive design for all device sizes
- Interactive UI elements for filtering and searching
- Real-time content categorisation and classification

### Back-End (Next.js API Routes)

The back-end processing is handled by Next.js API routes:

- `/api/enhanced-rss`: Main endpoint with worker thread support and incremental cache updates
- Worker threads for parallel processing of RSS feeds
- Hugging Face integration for AI-powered summarisation and sentiment analysis

### AI Features

- **Summarisation**: Uses Hugging Face's BART-large-CNN model to generate concise summaries of articles
- **Sentiment Analysis**: Analyses article sentiment using DistilBERT model
- **Topic Extraction**: Identifies key topics across articles using keyphrase extraction
- **Master Summary**: Creates an executive summary of all news trends

## Usage

The industry news page can be accessed at `/resources/industry-news`. Users can:

1. Browse news by category or topic
2. Filter content by sentiment (positive, negative, neutral)
3. Search for specific topics
4. View trending industry topics
5. Read AI-generated summaries of articles
6. Access original articles via direct links

## File Structure

- `src/app/resources/industry-news/page.tsx` - Main React component for the industry news page
- `src/app/api/enhanced-rss/route.ts` - API route for processing RSS feeds with improved features
- `src/workers/rss-worker.js` - Worker thread for parallel processing of RSS feeds

## Implementation Notes

### Category Definitions

The system defines four main categories for RSS sources:

1. **HR News**: General HR industry news from sources like Personnel Today, HR Magazine, etc.
2. **Benefits Focused**: Sources specifically focused on employee benefits
3. **Payroll Specific**: Sources dedicated to payroll news and updates
4. **Workplace Insights**: Broader workplace trends and insights

### Deduplication Algorithm

The deduplication algorithm works by:

1. Creating a "fingerprint" for each article using its title words and content preview
2. Comparing new articles against previously seen ones to find similarities
3. If similarity is found, keeping only the most recent version
4. This helps prevent the same story from appearing multiple times from different sources

### Incremental Cache Updates

The system intelligently updates the cache by:

1. Tracking when each feed was last updated
2. Only refreshing feeds that haven't been updated in the last 30 minutes
3. Merging new content with existing cached content
4. Only regenerating the master summary and trends when there are significant changes

### Worker Thread Implementation

Worker threads improve performance by:

1. Processing multiple feeds in parallel based on system capabilities
2. Handling CPU-intensive tasks like text summarisation in separate threads
3. Maintaining responsiveness of the main application thread
4. Scaling dynamically based on the available CPU cores

## Maintenance

The news feeds are automatically updated hourly, with manual refresh available via the UI. The worker threads architecture ensures efficient processing without slowing down the application.