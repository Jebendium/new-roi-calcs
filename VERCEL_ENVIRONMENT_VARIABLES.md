# Vercel Environment Variables - UPDATED

## Required Environment Variables for Vercel Dashboard:

Set these in your Vercel project settings under Environment Variables:

```
MEDIASTACK_API_KEY=7acff57b316c792f424c3d47850e15a5
CRON_SECRET=mediastack_cron_2025_secure_key
DEEPSEEK_API_KEY=sk-497e8039ae2b433e84eb84057cb9b457
```

## ✅ Build Issue Fixed

**Issue:** Build was failing with "OPENAI_API_KEY environment variable is missing"
**Solution:** Implemented lazy initialization of DeepSeek client to prevent evaluation during build time

## 🚀 Ready for Deployment

The build now completes successfully. You can now deploy to Vercel:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Fixed OpenAI client initialization for Vercel build"
   git push origin master
   ```

2. **Set Environment Variables in Vercel Dashboard**
3. **Deploy** - Should now build successfully on Vercel

## ✅ Verification Steps After Deployment:

1. Check that build completes without errors
2. Verify cron job is scheduled in Vercel dashboard
3. Test manual API call: `yoursite.com/api/update-news?cron_secret=mediastack_cron_2025_secure_key`
4. Check news page loads: `yoursite.com/resources/news`

The build issue has been resolved!