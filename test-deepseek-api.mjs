// Test script for DeepSeek API
import { config } from 'dotenv';
import OpenAI from 'openai';

// Load environment variables from .env.local
config({ path: '.env.local' });

// Initialize DeepSeek client using OpenAI SDK
const deepseekClient = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

async function testDeepSeekAPI() {
  try {
    console.log('Testing DeepSeek API...');
    console.log('API Key:', process.env.DEEPSEEK_API_KEY?.substring(0, 5) + '...');
    
    const response = await deepseekClient.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: "Hello, this is a test message. Please respond with a short greeting."
        }
      ],
      temperature: 0.7,
      max_tokens: 50
    });
    
    console.log('DeepSeek API Response:');
    console.log(response.choices[0].message);
    console.log('\nAPI test successful!');
  } catch (error) {
    console.error('Error testing DeepSeek API:');
    console.error(error);
  }
}

// Run the test
testDeepSeekAPI();
