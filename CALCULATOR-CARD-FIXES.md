# Calculator Card Standardization

## Overview

This document summarizes the changes made to standardize the calculator cards on the homepage, ensuring they all have the same size and consistent layout regardless of content.

## Changes Made

### 1. Created Standardized CSS Classes

Added the following CSS classes to `calculator-card-styles.css`:

```css
/* Fixed height for all calculator cards */
.calculator-card {
  height: 550px !important; /* Fixed height for all cards */
  display: flex !important;
  flex-direction: column !important;
  background-color: white !important;
  border-radius: 0.75rem !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
  transition: all 0.3s !important;
  border: 1px solid #f1f5f9 !important;
  overflow: hidden !important;
}

.calculator-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  transform: translateY(-3px) !important;
}

/* Fixed height for the header section */
.calculator-card-header {
  height: 180px !important;
  overflow: hidden !important;
  padding: 24px !important;
}

/* Make the content section flexible to fill available space */
.calculator-card-content {
  flex: 1 !important;
  overflow-y: auto !important;
  padding: 24px !important;
}

/* Fix for benefits list */
.calculator-card-content ul {
  min-height: 180px !important;
}

/* Action button container at the bottom */
.calculator-card-footer {
  margin-top: auto !important;
  padding-top: 16px !important;
  padding-bottom: 24px !important;
}
```

### 2. Updated CalculatorsGrid.tsx Component

Modified the component to use our standardized CSS classes:

- Simplified the card div by using only our `calculator-card` class
- Applied `calculator-card-header` class to the gradient header section
- Applied `calculator-card-content` class to the benefits section
- Applied `calculator-card-footer` class to the button container

### 3. Removed Duplicate CSS from globals.css

Removed the `.calculator-card` class definition from globals.css to avoid conflicts and replaced it with a comment pointing to our new standardized CSS file.

## Testing

To test these changes:

1. Open the homepage in different browsers (Chrome, Firefox, Safari, and Edge)
2. Verify all cards have the same height regardless of content
3. Check that the hover effect still works properly
4. Ensure that the header, content, and button sections all align properly
5. Test on different screen sizes to verify responsive behavior

## Future Improvements

If any additional calculators are added to the suite in the future:

1. Ensure they follow the same pattern with these CSS classes
2. Adjust the `min-height` for lists if the benefits lists become longer
3. Consider adding a content overflow indicator if any cards have too much content