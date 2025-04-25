# ROI Calculator Suite Component Usage Guide

This guide provides an overview of the standardized UI components and how to use them in the ROI Calculator Suite.

## Core Components

### Card

Used for containing related content with consistent styling.

```tsx
import { Card } from '../../components/ui';

// Basic usage
<Card>Content goes here</Card>

// With variants
<Card variant="default">Default card</Card>
<Card variant="active">Active card with blue border</Card>
<Card variant="inactive">Inactive card</Card>
<Card variant="highlight">Highlighted card (blue background)</Card>

// With additional className
<Card className="mb-6">Card with bottom margin</Card>
```

### InfoBox

Used for providing contextual information, tips, or explanations.

```tsx
import { InfoBox } from '../../components/ui';

// Basic usage
<InfoBox title="Important Information">
  This is important information for the user.
</InfoBox>

// With variants
<InfoBox title="Did you know?" variant="info">Blue info box</InfoBox>
<InfoBox title="Success!" variant="success">Green success box</InfoBox>
<InfoBox title="Attention" variant="warning">Amber warning box</InfoBox>

// Without title
<InfoBox variant="info">Information without a title</InfoBox>
```

### InfoTooltip

Used for providing help text for form fields or other elements.

```tsx
import { InfoTooltip } from '../../components/ui';

// Basic usage
<InfoTooltip content="This is helper text that appears on hover" />

// Used within form labels
<label className="flex items-center">
  Field Name
  <InfoTooltip content="Help text for this field" />
</label>
```

### FormField

Standardized form field wrapper that includes label, input, and tooltip.

```tsx
import { FormField } from '../../components/ui';
import NumberInput from '../../shared/components/NumberInput';

// Basic usage
<FormField 
  label="Number of Employees" 
  htmlFor="employee-count"
  tooltip="The total number of employees in your organisation"
>
  <NumberInput
    id="employee-count"
    value={employeeCount}
    onChange={handleEmployeeCountChange}
    min={1}
  />
</FormField>

// With error message
<FormField 
  label="Salary" 
  htmlFor="salary"
  tooltip="Annual salary before tax"
  error={errors.salary}
>
  <CurrencyInput
    id="salary"
    value={salary}
    onChange={handleSalaryChange}
  />
</FormField>
```

### ResultHighlight

Used for emphasizing important metric results.

```tsx
import { ResultHighlight } from '../../components/ui';
import { formatCurrency } from '../../utils/formatting';

// Basic usage
<ResultHighlight
  title="Annual Savings"
  value={formatCurrency(annualSavings)}
  variant="primary"
/>

// With description
<ResultHighlight
  title="Payback Period"
  value="6.5 months"
  description="Time to recover your investment"
  variant="info"
/>

// Available variants
<ResultHighlight title="Primary" value="£1,234" variant="primary" />
<ResultHighlight title="Success" value="£1,234" variant="success" />
<ResultHighlight title="Info" value="£1,234" variant="info" />
<ResultHighlight title="Secondary" value="£1,234" variant="secondary" />
<ResultHighlight title="Default" value="£1,234" variant="default" />
```

### BenefitCard

Used for configuring individual benefits with toggle and input fields.

```tsx
import { BenefitCard } from '../../components/ui';

// Basic usage
<BenefitCard
  title="Pension"
  description="Configure pension contributions as a percentage of salary"
  isEnabled={benefitConfig.pension.enabled}
  onToggle={(enabled) => handleToggle('pension', enabled)}
  tooltip="Tax and NI savings on pension contributions"
>
  {/* Input field goes here */}
  <FormField
    label="Contribution (%)"
    htmlFor="pension-contribution"
  >
    <PercentageInput
      id="pension-contribution"
      value={benefitConfig.pension.value}
      onChange={(value) => handleValueChange('pension', value)}
      disabled={!benefitConfig.pension.enabled}
    />
  </FormField>
</BenefitCard>
```

### TabNavigation

Used for creating multi-step interfaces with tabs.

```tsx
import { TabNavigation } from '../../components/ui';

// Define tab labels
const TAB_LABELS = [
  'Personal Details',
  'Benefits Configuration',
  'Results'
];

// State to track active tab
const [activeTab, setActiveTab] = useState(0);

// Usage within component
<TabNavigation
  tabs={TAB_LABELS}
  activeTabIndex={activeTab}
  onTabChange={setActiveTab}
  className="mb-6"
/>

// Then render content based on active tab
{activeTab === 0 && <PersonalDetailsTab />}
{activeTab === 1 && <BenefitsConfigTab />}
{activeTab === 2 && <ResultsTab />}
```

### ResultsSection

Used for grouping related results with a consistent header.

```tsx
import { ResultsSection } from '../../components/ui';

// Basic usage
<ResultsSection title="Annual Savings">
  <div className="grid grid-cols-2 gap-4">
    <ResultHighlight title="Tax Savings" value="£1,234" variant="primary" />
    <ResultHighlight title="NI Savings" value="£567" variant="info" />
  </div>
</ResultsSection>

// With additional className
<ResultsSection title="Payback Analysis" className="mt-6">
  {/* Content */}
</ResultsSection>
```

## Formatting Utilities

Always use the provided formatting utilities to ensure consistent display of values across all calculators.

```tsx
import { 
  formatCurrency, 
  formatPercentage, 
  formatNumber, 
  formatDate,
  formatTaxYear,
  formatMonths
} from '../../utils/formatting';

// Currency formatting (£1,234.56)
formatCurrency(1234.56); // "£1,234.56"

// Percentage formatting (12.5%)
formatPercentage(12.5); // "12.5%"

// Number with thousands separators (1,234,567)
formatNumber(1234567); // "1,234,567"

// UK date format (01/01/2025)
formatDate(new Date(2025, 0, 1)); // "01/01/2025"

// Tax year formatting (2025-2026)
formatTaxYear(2025); // "2025-2026"

// Months formatting (6.5 months)
formatMonths(6.5); // "6.5 months"
```

## Typography Standards

Maintain consistent typography across all calculators:

| Element | Class | Example |
|---------|-------|---------|
| Page Titles | `text-2xl font-bold text-slate-800` | `<h1 className="text-2xl font-bold text-slate-800">Calculator Title</h1>` |
| Section Headings | `text-lg font-semibold text-slate-800` | `<h3 className="text-lg font-semibold text-slate-800">Section Title</h3>` |
| Form Labels | `text-sm font-medium text-slate-700` | `<label className="text-sm font-medium text-slate-700">Label Text</label>` |
| Helper Text | `text-xs text-slate-500` | `<p className="text-xs text-slate-500">Helper text goes here</p>` |

## Color System

Use the standardized color system across all calculators:

| Purpose | Tailwind Class | Use Case |
|---------|---------------|----------|
| Primary Actions | `bg-blue-600` | Primary buttons, active tabs |
| Success/Positive | `bg-green-600` | Success messages, positive metrics |
| Warning/Alert | `bg-amber-500` | Warning messages, alerts |
| Info | `bg-blue-500` | Informational content |
| Neutral | `bg-slate-100` to `bg-slate-800` | Background, text, borders |

## Best Practices

1. **Group Related Fields**: Always use Card components to group related form fields
2. **Provide Context**: Use InfoBox components to explain concepts or provide guidance
3. **Highlight Key Metrics**: Use ResultHighlight for important calculation results
4. **Consistent Spacing**: Maintain consistent spacing with margins and paddings
5. **UK English**: Follow the UK English style guide for all user-facing text
6. **Responsive Design**: Ensure all calculators work on different screen sizes
7. **Form Validation**: Provide clear error messages for invalid inputs

By following these guidelines, you'll ensure all ROI calculators maintain a consistent, professional look and feel.