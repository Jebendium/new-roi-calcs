## Testing Different Hugging Face Models

To verify if the issue is with specific models or with the overall API endpoint structure, you can try these alternative models:

### Sentiment Analysis Alternatives:

```bash
# Test newer sentiment analysis model
curl -X POST ^
  https://router.huggingface.co/tensorflow/distilbert-base-uncased-mnli ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -H "Content-Type: application/json" ^
  -d "{\"inputs\": \"I love this product, it's fantastic!\"}"

# Another common sentiment analysis model
curl -X POST ^
  https://router.huggingface.co/cardiffnlp/twitter-roberta-base-sentiment ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -H "Content-Type: application/json" ^
  -d "{\"inputs\": \"I love this product, it's fantastic!\"}"
```

### Topic Extraction Alternatives:

```bash
# Alternative keyword extraction model
curl -X POST ^
  https://router.huggingface.co/yanekyuk/bert-uncased-keyword-extractor ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -H "Content-Type: application/json" ^
  -d "{\"inputs\": \"Articles about employee benefits and workplace trends\"}"

# General text analysis model that can extract topics
curl -X POST ^
  https://router.huggingface.co/facebook/bart-large-mnli ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -H "Content-Type: application/json" ^
  -d "{\"inputs\": \"Articles about employee benefits and workplace trends\"}"
```

If any of these models work, update the corresponding model name in your code.

### Testing Inference Client Library

Another approach is to use the official Hugging Face Inference Client library, which might handle API routing better:

```javascript
// Install the package first:
// npm install @huggingface/inference

// Then use it like this:
import { InferenceClient } from '@huggingface/inference';

const client = new InferenceClient(process.env.HUGGING_FACE_TOKEN);

// For sentiment analysis
const result = await client.textClassification({
  model: "distilbert-base-uncased-finetuned-sst-2-english",
  inputs: text.substring(0, 500)
});

// For topic extraction
const result = await client.featureExtraction({
  model: "ml6team/keyphrase-extraction-kbir-inspec",
  inputs: combinedContent.substring(0, 2000)
});
```

This library will automatically handle the correct API endpoint structure and versioning.