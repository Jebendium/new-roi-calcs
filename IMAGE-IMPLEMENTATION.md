# Image Background Implementation Guide

## Adding the Background Image to Your Project

To include the team meeting image in your Hero section with 50% transparency, follow these steps:

### 1. Save the Image to Your Project

1. Download the team meeting image from its source
2. Save it in your project's `/public/images/` directory as `topherosection.jpg`
3. Make sure the image path exactly matches: `/public/images/topherosection.jpg`

### 2. Pushing to GitHub

When pushing your changes to GitHub, make sure to include the image:

```bash
# Navigate to your project directory
cd C:\Users\danie\Documents\New-ROI-Calculators

# Add all changes including the new image
git add .

# Commit your changes
git commit -m "Add team meeting background to hero section"

# Push to your GitHub repository
git push origin main  # or your branch name
```

### 3. Vercel Deployment

Vercel will automatically handle the image file when you deploy your project:

1. If your GitHub repository is already connected to Vercel, a new push will trigger an automatic deployment
2. If not, go to [Vercel](https://vercel.com/) and connect your repository
3. During deployment, Vercel will copy the public directory and make the image available at `/images/team-meeting.jpg`

### 4. Troubleshooting

If the image doesn't appear:

1. Check if the image is properly uploaded to GitHub in the `/public/images/` directory
2. Verify the image path in your Hero component matches the file location
3. Ensure the image is named exactly `topherosection.jpg`
4. If deploying to Vercel manually, make sure to include the entire `/public` directory

### 5. Image Attribution

If the image requires attribution, make sure to include appropriate credits in your footer or on an about page.

## Technical Implementation

The image background is implemented with:

1. An absolute positioned container that covers the entire section
2. The background image itself set to cover the container
3. A semi-transparent (50% opacity) black overlay to ensure text readability
4. Z-index management to place the content above the background
5. Text color adjustments to ensure visibility against the darker background

```tsx
// Hero component background implementation
<section className="py-16 md:py-24 bg-white relative overflow-hidden w-full shadow-md">
  {/* Background Image with 50% opacity */}
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
    <img 
      src="/images/topherosection.jpg"
      alt=""
      className="w-full h-full object-cover"
    />
  </div>
  
  <div className="container mx-auto px-0 sm:px-4 md:px-6 max-w-none w-full relative z-20">
    {/* Content goes here */}
  </div>
</section>
```