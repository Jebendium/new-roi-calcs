# Secondary Threshold Update

## Changes Made

We've updated the National Insurance Secondary Threshold value from the incorrect value of £9,100 to the correct value of £5,000 per annum. This change affects the employer NI savings calculations throughout the application.

### Files Modified:

1. `src/calculators/employer-calculator/EmployerNICalculator.tsx`
   - Updated the mockTaxData.niSecondaryThreshold from 9100 to 5000

2. `src/calculators/employer-calculator/components/EmployerNIResults.tsx`
   - Updated the explanatory text from "£9,100 per annum" to "£5,000 per annum"
   
3. `src/utils/uk-english-style-guide.ts`
   - Added a section documenting the correct tax constants, including the Secondary Threshold value

## Impact on Calculations

This change will impact the employer NI savings calculations by:

1. Increasing the amount of earnings subject to National Insurance contributions
2. Therefore increasing the potential NI savings from salary sacrifice benefits
3. Making the calculator more accurate and aligned with current UK tax regulations

## Testing Requirements

After implementing these changes, please test the following:

- Run the Employer NI Savings calculator with various benefit configurations
- Verify that the results use the new Secondary Threshold value (£5,000)
- Check that the explanatory text in the results correctly mentions "£5,000 per annum"
- Confirm that the calculations accurately reflect the increased NI contributions

## Background Information

The Secondary Threshold is the point at which employers start paying National Insurance contributions for their employees. It's important that this value is correctly set to ensure accurate calculations in our ROI calculators.
