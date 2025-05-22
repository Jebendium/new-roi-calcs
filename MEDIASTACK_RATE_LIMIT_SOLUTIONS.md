# MediaStack Rate Limit Solutions

## 🚨 Issue: MediaStack API Rate Limits

You're hitting MediaStack's rate limits (429 Too Many Requests). Here are the solutions I've implemented:

## ✅ **Immediate Fixes Applied**

### 1. **Reduced API Calls**
- Decreased articles per category: `25 → 15`
- Total daily requests: `100 → 60`

### 2. **Added Rate Limiting**
- Increased delay between categories: `2s → 10s`
- Added retry logic for 429 errors (waits 60s then retries once)

### 3. **Better Error Handling**
- Graceful handling of rate limit errors
- Continues with other categories if one fails

## 🔧 **MediaStack Free Tier Limits**

- **Monthly**: 1,000 requests
- **Hourly**: Typically 100-200 requests
- **Burst**: Very limited

## 💡 **Alternative Solutions**

### **Option 1: Reduce Categories (Quick Fix)**
If rate limits persist, we can reduce to 2 most important categories:

```typescript
const categoryQueries = {
  'UK HR News': { /* ... */ },
  'Employee Benefits News': { /* ... */ }
  // Remove Payroll and Legal to stay under limits
};
```

### **Option 2: Different Schedule**
- Run categories on alternating days
- Monday/Wednesday: HR + Benefits
- Tuesday/Thursday: Payroll + Legal

### **Option 3: Upgrade MediaStack**
- Paid plan: $9.99/month for 10,000 requests
- Would solve all rate limit issues

### **Option 4: Alternative News Sources**
- Switch to NewsAPI (free tier: 1,000 requests/day)
- Use multiple free APIs for different categories
- RSS feeds as backup (your original approach)

## 🧪 **Testing the Fixes**

Try the API again - it should now:
1. Handle rate limits gracefully
2. Wait longer between requests
3. Retry after rate limit delays
4. Continue with other categories if one fails

```
https://your-site.vercel.app/api/update-news?cron_secret=mediastack_cron_2025_secure_key
```

## 📊 **Monitoring Usage**

Check your MediaStack dashboard to see:
- Current request count
- Remaining monthly quota
- Rate limit status

## 🎯 **Recommendation**

Start with the implemented fixes. If you continue hitting limits:

1. **Reduce to 2 categories** temporarily
2. **Consider upgrading** MediaStack if budget allows
3. **Implement RSS backup** for reliability

Let me know if you want me to implement any of these alternatives!