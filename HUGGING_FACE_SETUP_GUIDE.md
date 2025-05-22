# Hugging Face API Integration Guide

This guide explains how to fix the sentiment analysis and topic extraction features in the Industry News section, which are currently experiencing issues with the Hugging Face API.

## Step 1: Set Up Your Hugging Face API Key

1. **Create a Hugging Face Account**:
   - Go to [https://huggingface.co/](https://huggingface.co/) and sign up for an account if you don't already have one.

2. **Generate an API Token**:
   - After logging in, go to your profile settings
   - Navigate to "Access Tokens" (or visit [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens))
   - Click "New Token"
   - Give it a name (e.g., "ROI-Calculator-API")
   - Select "Read" permission
   - Click "Generate a token"
   - Copy the generated token

3. **Add the Token to Your Environment Variables**:
   - Open `.env.local` in the root of your project
   - Add or update the following line with your token:
     ```
     HUGGING_FACE_TOKEN="your_token_here"
     HUGGINGFACE_API_KEY="your_token_here"
     ```
   - Save the file

## Step 2: Verify the API Connection

1. **Start Your Development Server**:
   ```
   npm run dev
   ```

2. **Monitor for API Errors**:
   - Open your browser's developer console
   - Navigate to the Industry News page
   - Look for any errors related to the Hugging Face API

## Step 3: Troubleshoot Common Issues

If you still encounter errors after setting up your API key, try these troubleshooting steps:

1. **Check Your API Token**:
   - Ensure your token is valid and has the correct permissions
   - Try generating a new token if necessary

2. **Test Alternative Models**:
   - If specific models are unavailable, edit the API endpoints in `api-services.ts` to use alternative models:
     - For sentiment analysis: `cardiffnlp/twitter-roberta-base-sentiment`
     - For topic extraction: `yanekyuk/bert-uncased-keyword-extractor`
     - For summarization: `sshleifer/distilbart-cnn-12-6`

3. **Check Rate Limits**:
   - Hugging Face has rate limits that could affect API calls
   - Consider implementing request throttling if necessary

## Additional Notes

- The Hugging Face API endpoints have been updated to use the latest router format (`https://router.huggingface.co/{model_name}`) 
- Both environment variable names (`HUGGING_FACE_TOKEN` and `HUGGINGFACE_API_KEY`) are supported for compatibility
- Error handling has been improved to better handle API response variations

If you continue to experience issues, consider using the Hugging Face Inference client library or implementing local fallbacks for these features.
