## Plan: Refactor News Feature with Mediastack API

**Objective:** Replace the current unreliable RSS feed aggregation with a daily, scheduled data pull from the Mediastack API to improve reliability, performance, and maintainability of the Industry News section.

**API Key:** `7acff57b316c792f424c3d47850e15a5` (To be stored as an environment variable)
**Mediastack Documentation:** [https://mediastack.com/documentation](https://mediastack.com/documentation)

---

### Phase 1: Backend Refactoring - Daily Data Ingestion & Storage

1.  **Environment Variable Setup:**
    *   **Action:** Securely store the Mediastack API key.
    *   **How:**
        *   Add `MEDIASTACK_API_KEY="7acff57b316c792f424c3d47850e15a5"` to Vercel project environment variables.
        *   Create/update `.env.local` in the project root with `MEDIASTACK_API_KEY="7acff57b316c792f424c3d47850e15a5"`.
        *   Ensure `.env.local` is listed in `.gitignore`.

2.  **Create New API Route for Daily Cron Job:**
    *   **Purpose:** This route will be triggered by a cron job to fetch, process, and store news data daily.
    *   **File:** `src/app/api/update-news/route.ts`
    *   **Method:** Implement as a `POST` request.
        *   **Security:** Protect this endpoint. Consider requiring a secret key passed in the `Authorization` header (e.g., `Bearer YOUR_CRON_SECRET`) from the cron job request. This secret should also be an environment variable.
    *   **Initial Structure:**
        ```typescript
        // src/app/api/update-news/route.ts
        import { NextResponse } from 'next/server';
        import { kv } from '@vercel/kv';
        // Import your AI processing functions and types
        // import { processArticleWithAI, generateMasterSummary, generateTrendingTopics } from './ai-processing'; // Placeholder
        import type { ProcessedArticle, EnhancedFeedResponse } from '../../../types/news-types'; // Adjust path

        export async function POST(request: Request) {
          const authHeader = request.headers.get('authorization');
          if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
          }

          try {
            console.log('Starting daily news update job...');
            const apiKey = process.env.MEDIASTACK_API_KEY;
            if (!apiKey) {
              throw new Error('Mediastack API key not configured.');
            }

            // 1. Define Category Queries
            // 2. Fetch Data from Mediastack for each category
            // 3. Transform Mediastack articles to ProcessedArticle format
            // 4. Apply AI Processing (Summaries, Sentiment, Topics)
            // 5. Generate Master Summary & Trending Topics
            // 6. Assemble EnhancedFeedResponse
            // 7. Store in Vercel KV

            console.log('Daily news update job completed successfully.');
            return NextResponse.json({ message: 'News update successful' });
          } catch (error) {
            console.error('Error in daily news update job:', error);
            return NextResponse.json({ message: 'News update failed', error: (error as Error).message }, { status: 500 });
          }
        }
        ```

3.  **Implement Mediastack Fetching Logic (in `src/app/api/update-news/route.ts`):**
    *   **Define Category Queries:**
        *   Map your application's categories to Mediastack query parameters.
        *   Example:
            ```typescript
            const categoryQueries: Record<string, { keywords: string; countries: string; limit: number; categories?: string, languages?: string }> = {
              'UK HR': { keywords: 'human resources, HR, employment law, personnel, CIPD', countries: 'gb', limit: 25, languages: 'en' },
              'Payroll': { keywords: 'payroll, HMRC, CIPP, PAYE, wages', countries: 'gb', limit: 25, languages: 'en' },
              'Employee Benefits': { keywords: 'employee benefits, staff rewards, workplace perks, REBA', countries: 'gb', limit: 25, languages: 'en' },
              'HR Legal': { keywords: 'employment tribunal, HR legislation, workplace disputes, discrimination law, ACAS', countries: 'gb', limit: 25, languages: 'en' },
            };
            ```
        *   **Note:** The Mediastack `categories` parameter is quite general (e.g., `business`, `health`). Rely more on `keywords` for specificity. `limit` is max 100 on free/standard plans.
    *   **Fetch Data:**
        *   Iterate through `categoryQueries`.
        *   Construct URL: `http://api.mediastack.com/v1/news?access_key=${apiKey}&...params`.
        *   Use `fetch` to get data. Handle potential errors and non-OK responses.
        *   Collect all articles, ensuring no duplicates if keywords overlap significantly (though fetching by category should minimize this).

4.  **Adapt AI Processing (integrate into `src/app/api/update-news/route.ts`):**
    *   **Transform Data:** Map Mediastack article fields to your `ProcessedArticle` interface.
        *   `title` -> `article.title`
        *   `url` -> `article.link`
        *   `published_at` -> `article.pubDate` (ensure correct date parsing)
        *   `description` -> `article.content` (Mediastack's `description` is often a summary; full content is rare on free tiers)
        *   `source` (publisher name) -> `article.source`
        *   Assign your internal category name.
    *   **AI Functions:** Reuse or adapt your existing AI summarization, sentiment analysis, and topic extraction logic. These will now operate on the articles fetched from Mediastack.
        *   Consider batching AI calls if you have many articles to process to stay within API rate limits of your AI provider.
    *   **Master Summary & Trending Topics:** Generate these based on the full set of processed articles for the day.

5.  **Store Processed Data (in `src/app/api/update-news/route.ts`):**
    *   **Technology:** Vercel KV.
    *   **Action:** Install `@vercel/kv` (`npm install @vercel/kv` or `pnpm install @vercel/kv`).
    *   **Logic:**
        *   Assemble the complete `EnhancedFeedResponse` object, including the `timestamp` of the update.
        *   Store this object under a consistent key, e.g., `"dailyNewsData"`.
            ```typescript
            // At the end of the try block in src/app/api/update-news/route.ts
            const finalResponse: EnhancedFeedResponse = {
              feedsByCategory: { /* ... populate this based on fetched & processed articles ... */ },
              allArticles: allProcessedArticles, // Array of all ProcessedArticle
              trendingTopics: generatedTrendingTopics,
              masterSummary: generatedMasterSummary,
              timestamp: new Date().toISOString(),
            };
            await kv.set('dailyNewsData', finalResponse);
            ```

---

### Phase 2: Backend Refactoring - Serving Stored News

1.  **Modify Existing News API Route (`src/app/api/enhanced-rss/route.ts`):**
    *   **Purpose:** This route will now serve the pre-processed data from Vercel KV.
    *   **Action:**
        *   Remove all old RSS fetching logic.
        *   Import `kv` from `@vercel/kv`.
        *   The `GET` handler should:
            *   Retrieve `"dailyNewsData"` from KV.
            *   If data exists, return it.
            *   If no data (e.g., cron hasn't run), return a valid empty `EnhancedFeedResponse` structure with a message.
    *   **Code:**
        ```typescript
        // src/app/api/enhanced-rss/route.ts
        import { NextResponse } from 'next/server';
        import { kv } from '@vercel/kv';
        import type { EnhancedFeedResponse } from '../../../types/news-types'; // Adjust path as needed

        export async function GET() {
          try {
            const newsData = await kv.get<EnhancedFeedResponse>('dailyNewsData');
            if (!newsData) {
              // Return an empty but valid structure if no data is found
              return NextResponse.json({
                feedsByCategory: {},
                allArticles: [],
                trendingTopics: [],
                masterSummary: '',
                timestamp: new Date().toISOString(), // Or perhaps null/undefined
                message: 'News data is currently being updated or is not yet available. Please check back shortly.'
              }, { status: 200 });
            }
            return NextResponse.json(newsData);
          } catch (error) {
            console.error('Error fetching news data from KV:', error);
            return NextResponse.json({ message: 'Failed to retrieve news data.' }, { status: 500 });
          }
        }
        ```
    *   **Type Definitions:** Ensure `ProcessedArticle` and `EnhancedFeedResponse` types (e.g., in `src/types/news-types.ts` or a similar shared location) are accurate and used by both API routes.

---

### Phase 3: Scheduling & Deployment

1.  **Set up Vercel Cron Job:**
    *   Create or update `vercel.json` at the project root:
        ```json
        {
          "crons": [
            {
              "path": "/api/update-news", // Must match the daily update route
              "schedule": "0 5 * * *"    // Daily at 5:00 AM UTC (adjust time as needed)
            }
          ]
        }
        ```
    *   **Note:** The cron job will send a `GET` request by default. If you strictly use `POST` for `/api/update-news` and protect it with a secret, you'll need to configure the cron job to send a `POST` with the appropriate header. Vercel Cron Jobs currently only support `GET`. A common workaround is to have the `GET` handler in the cron route trigger the actual processing, still checking a secret if passed as a query parameter for simple protection, or use a third-party cron service that allows `POST` with headers.
    *   **Alternative for POST:** If Vercel Cron's direct POST is an issue, consider a simple GET endpoint for the cron that's hard to guess and internally calls the POST logic, or use an external scheduler. For simplicity with Vercel Cron, you might make `/api/update-news` a GET route and protect it with a secret query parameter.
        *   Example GET cron route: `/api/update-news?cron_secret=YOUR_CRON_SECRET_ENV_VAR`

2.  **Deployment:**
    *   Deploy the project to Vercel. The cron job will be scheduled upon successful deployment.
    *   Ensure all necessary environment variables (`MEDIASTACK_API_KEY`, `CRON_SECRET`) are set in the Vercel project settings.

---

### Phase 4: Frontend Adjustments (`src/app/resources/news/page.tsx`)

1.  **Mediastack Attribution:**
    *   **Requirement:** Mediastack's free plan requires attribution.
    *   **Action:** Add a "Powered by Mediastack" or similar link to your news page.
        ```html
        <p className="text-xs text-slate-500 mt-8 text-center">
          News data powered by <a href="https://mediastack.com/" target="_blank" rel="noopener noreferrer" className="underline">mediastack.com</a>
        </p>
        ```
        Place this appropriately (e.g., in the footer of the news section).
2.  **Review Data Mapping:**
    *   Ensure `article.source` (now the publisher from Mediastack) displays well.
    *   Verify `article.link` (from `article.url` in Mediastack) works correctly.
    *   Confirm date formatting for `article.pubDate` (from `article.published_at`) is robust.
3.  **Error Handling:** The existing error handling for `fetch('/api/enhanced-rss')` should still work. The "No feeds available" or "Failed to load feeds" messages will now reflect issues fetching from KV or if KV is empty.

---

### Phase 5: Cleanup

1.  **Delete Obsolete Files & Code:**
    *   `src/app/api/enhanced-rss/feeds-config.ts`
    *   `src/app/api/enhanced-rss/feed-fetcher.ts` (unless its AI logic is being modularized and reused directly by the new cron job)
    *   `src/app/api/enhanced-rss/incremental-updater.ts` (similar to above)
2.  **Remove Old Types:** Any TypeScript types solely related to the old RSS parsing.
3.  **Review Dependencies:** If any npm packages were only for RSS parsing (e.g., `rss-parser`), they can be removed.

---

### Testing Strategy

1.  **Local `update-news` Route Test:**
    *   Temporarily allow `GET` for `/api/update-news` or use a tool like Postman/Insomnia to send a `POST` request (with the cron secret if implemented).
    *   Verify it fetches from Mediastack, processes articles (mock AI calls if necessary initially), and stores data in your local Vercel KV setup (requires Vercel CLI login and linking project).
2.  **Local `enhanced-rss` Route Test:**
    *   After successfully running the update job locally, hit `/api/enhanced-rss` via browser or tool to see if it serves the stored data.
3.  **Frontend Integration Test:**
    *   Run the Next.js app locally.
    *   Navigate to the news page. Verify data display, categories, summaries, and attribution.
4.  **Vercel Deployment & Cron Monitoring:**
    *   Deploy to Vercel.
    *   Check Vercel dashboard for cron job status and logs after its scheduled run time.
    *   Verify the live news page.

---

This plan outlines the major steps. Each step will involve detailed coding and testing. Remember to refer to the Mediastack documentation for specifics on their API (rate limits, parameters, data format).
