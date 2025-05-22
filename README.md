This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

This project, "new-roi-calculators," is a web application built with Next.js (v15.3.1), React (v19.0.0), and TypeScript. It aims to provide various ROI (Return on Investment) calculators. Key features and technologies include:

- **Frontend:** Next.js, React, Material UI, Tailwind CSS
- **Charting/Visualization:** Chart.js, D3.js, recharts
- **Utilities:** html2canvas (for capturing screenshots/exports), rss-parser (for handling RSS feeds)
- **Linting/Formatting:** ESLint, PostCSS
- **Development Server:** `npm run dev`

## Technologies Used

This project leverages a modern tech stack to deliver a robust and user-friendly experience:

*   **Core Framework:** Next.js (v15.3.1)
*   **UI Library:** React (v19.0.0)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, Material UI (`@mui/material`)
*   **Charting & Visualization:** Chart.js, D3.js, recharts
*   **Server-Side Environment:** Node.js (inherent to Next.js)
*   **API Development:** Next.js API Routes
*   **Data Fetching & Parsing:** `rss-parser` (for news feeds)
*   **Utility for Export:** `html2canvas` (for capturing UI elements)
*   **Code Quality:** ESLint (linting), PostCSS (CSS processing)

## Key Features

The New ROI Calculators platform offers a range of powerful features:

*   **Comprehensive Suite of ROI Calculators:**
    *   Employee Savings Calculator
    *   Employer NI Savings Calculator
    *   HRIS ROI Calculator
    *   Combined Payroll ROI Calculator
    *   P11D EV Car Calculator
    *   Childcare Vouchers Calculator
    *   Holiday Trading Calculator
    *   General Business System ROI Calculator
*   **In-Depth Calculation Engine:** Accurately models ROI by considering various factors including current tax constants (2023-2026), specific benefit configurations, time savings, efficiency gains, and cost analyses.
*   **Scenario Analysis:** Users can create and compare multiple calculation scenarios to evaluate different strategies and outcomes.
*   **Interactive Data Visualization:** Results are presented using dynamic charts and graphs, making complex data easier to understand.
*   **Export Capabilities:** Allows users to export calculator results (e.g., as images via `html2canvas`).
*   **Responsive and Modern UI:** Designed with Tailwind CSS and Material UI for a clean, accessible, and consistent user experience across all devices.
*   **Informative Resources Section:**
    *   Aggregated industry news fetched from multiple RSS feeds.
    *   AI-generated summaries for news articles to provide quick insights.
*   **Standardized User Experience:** Consistent navigation, form inputs, and results presentation across all calculators.
*   **Developer-Friendly:** Built with TypeScript for type safety and maintainability, and includes linting and formatting tools.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter and Poppins, custom Google Fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure

The project is organized as follows:

*   **`src/`**: Contains the main source code for the application.
    *   **`app/`**: Core Next.js application structure (pages, layouts, API routes).
    *   **`calculation-engine/`**: Houses the primary logic for ROI calculations.
    *   **`calculators/`**: Likely contains UI components and specific logic for different calculators.
    *   **`components/`**: Reusable UI components.
    *   **`data/`**: Static data, configurations, and constants.
    *   **`types/`**: TypeScript type definitions and interfaces.
    *   **`utils/`**: Utility functions and helper modules.

### ROI Calculation Engine (`src/calculation-engine/roi/`)

This directory contains the core logic for various ROI calculations. Key files include:

*   **`business-system.ts`**: Provides functions to calculate ROI for general business systems, HRIS systems, and payroll systems. It considers factors like cost savings, time savings, productivity gains, implementation costs, and maintenance costs.
*   **`hris.ts`**: Contains detailed ROI calculation logic specifically for HRIS (Human Resources Information Systems). This includes calculations for time savings in HR processes, error reduction, and strategic value (e.g., improved employee turnover).
*   **`payroll.ts`**: Focuses on ROI calculations for payroll systems, including both in-house systems and managed payroll services. It analyzes efficiency gains, error reduction, and cost comparisons between different payroll solutions.

These modules typically take various input parameters (e.g., employee count, system costs, efficiency gains) and return comprehensive ROI metrics, including payback period, net annual benefit, and multi-year ROI.

### `src/calculators/`

This directory houses the specific UI and logic for the different ROI calculators offered by the application. It's further broken down into subdirectories for each type of calculator and shared components.

*   **`core/`**: Contains core types and utility functions shared across different calculators.
    *   `calculator-utils.ts`: Utility functions for formatting, safe number conversions, and getting calculator titles.
    *   `types.ts`: Defines shared TypeScript types and interfaces for calculator inputs, results, and configurations (e.g., `FormValues`, `EmployerNIResult`, `Scenario`).
*   **`employee-calculator/`**: Components and logic for the "Employee Savings Calculator".
    *   `EmployeeSavingsCalculator.tsx`: Main component for this calculator.
    *   `components/`: Contains sub-components like `PersonalDetailsTab.tsx`, `BenefitsConfigTab.tsx`, and `EmployeeSavingsResults.tsx`.
*   **`employer-calculator/`**: Components and logic for the "Employer NI Savings Calculator".
    *   `EmployerNICalculator.tsx`: Main component.
    *   `CalculatorForm.tsx`: A standardized form for company details, reused across calculators.
    *   `components/`: Sub-components like `EmployerNIResults.tsx` and `EmployerNICharts.tsx`.
    *   `tabs/`: Components for different tabs within this calculator, like `MultiBenefitTab.tsx`.
*   **`hris-calculator/`**: Components and logic for the "HRIS ROI Calculator".
    *   `components/`: Contains tab components like `CompanyInfoTab.tsx`, `TimeSavingsTab.tsx`, `CostInputsTab.tsx`, and `HRISResults.tsx`.
*   **`roi-calculators/`**: Likely contains more complex ROI calculators, potentially combining aspects of others.
    *   `combined-payroll/`: Contains the "Combined Payroll ROI Calculator", including hooks like `useCalculatorState.tsx` for managing its complex state and logic.
    *   `index.ts`: Exports calculators from this subdirectory.
*   **`shared/`**: Contains components and types that are shared among multiple calculators but are not core enough to be in `src/calculators/core/`.
    *   `components/`: Reusable UI elements like `CurrencyInput.tsx`, `NumberInput.tsx`, `ResultCard.tsx`, and `ExportButton.tsx`.
    *   `types/index.ts`: Shared type definitions specific to these shared calculator components.

The files within `src/calculators/` define the user interface for inputting data, the specific calculation logic (often delegating to `src/calculation-engine/` or `src/utils/calculatorLogic.ts`), and the presentation of results for each calculator.

### `src/components/`

This directory contains globally reusable UI components and components that make up the main layout and pages of the application. Unlike `src/calculators/shared/components`, these are not necessarily tied to calculator functionality but rather to the overall application structure and appearance.

*   **`AddScenarioModal.tsx`**: A modal component for adding new scenarios to a calculator.
*   **`CalculatorContent.tsx`**: Responsible for rendering the main content area of a selected calculator, switching between input forms and results display.
*   **`CalculatorSelect.tsx`**: A component that likely displays a list or grid of available calculators for the user to choose from.
*   **`Card.tsx`**: A generic card component used for displaying content in a structured way. (Note: there's also a `Card.tsx` in `src/components/ui` which seems to be the more standardized one).
*   **`HomePage.tsx`**: The main component for the application's homepage, likely composing other components from `src/components/homepage/`.
*   **`ResultHighlight.tsx`**: A component to prominently display key results or metrics. (Note: there's also a `ResultHighlight.tsx` in `src/components/ui` which seems to be the more standardized one).
*   **`ScenarioTabs.tsx`**: Component for displaying and managing different calculation scenarios using tabs.
*   **`Sidebar.tsx`**: The main sidebar navigation component for the application, allowing users to switch between calculators or go home.
*   **`TopNavigation.tsx`**: The top navigation bar component, potentially including branding, main navigation links, and a calculator dropdown.
*   **`WizardShell.tsx`**: A shell or layout component that wraps the main content, providing the top navigation and footer for a consistent wizard-like experience through the calculators.

*   **`charts/`**: This subdirectory likely contains reusable chart components, possibly wrappers around a charting library like Chart.js or Recharts, used to visualize calculator results.
*   **`homepage/`**: Contains components specifically designed for the homepage.
    *   `BenefitsSection.tsx`: A section to highlight the benefits of using the ROI calculators.
    *   `CalculatorsGrid.tsx`: Displays the available calculators in a grid layout on the homepage.
    *   `CtaSection.tsx`: A Call-to-Action section.
    *   `FaqSection.tsx`: An FAQ section.
    *   `HeroBanner.tsx`: The main hero banner for the homepage.
*   **`icons/`**: Contains various SVG icon components used throughout the application, including `ResultIcons.tsx` which likely provides icons specific to different result types.
*   **`ui/`**: This important subdirectory contains a library of standardized, low-level UI components used to build the interface consistently across the application. This is a key part of the UI/UX standardization efforts.
    *   `BenefitCard.tsx`: A standardized card for configuring individual benefits within calculators.
    *   `Card.tsx`: A standardized card component (likely preferred over the one in `src/components/`).
    *   `FormField.tsx`: A component for creating form fields with consistent styling and validation.
    *   `InfoBox.tsx`: A box for displaying informational messages.
    *   `InfoTooltip.tsx`: A tooltip for providing additional information on hover.
    *   `ResultHighlight.tsx`: A component for highlighting key results.
    *   `ResultsSection.tsx`: A section for displaying calculation results.
    *   `TabNavigation.tsx`: A component for tabbed navigation.

### `src/data/`

The `src/data/` directory stores static data, configurations, and constants used throughout the application. This includes:

*   **`benefit-configs.json`**: Likely contains configuration data for various employee benefits, such as default values, limits, or calculation parameters. This data would be used by calculators that involve benefit calculations.
*   **`calculatorData.ts`**: This TypeScript file exports an array of `CalculatorInfo` objects. Each object defines metadata for a specific calculator, including its `type`, `title`, `description`, `iconSvg` (SVG markup for an icon), `gradient` (for styling), and an array of `benefits` (as strings, describing the advantages of using that calculator). This file is crucial for dynamically generating the list of available calculators on the homepage and providing their descriptive content.
*   **`tax-constants-2023-2026.json`**: This JSON file stores tax-related constants for the years 2023 to 2026. This would include tax brackets, rates, allowances, and other figures necessary for accurate tax and NI calculations within the various calculators. Centralizing this data makes it easier to update as tax laws change.

### `src/types/`

The `src/types/` directory contains TypeScript type definitions and interfaces used across the application, ensuring type safety and improving code maintainability. The key files are:

*   **`calculator.ts`**: This file likely defines core types and interfaces related to the calculators themselves. This could include:
    *   `CalculatorType`: An important union type that enumerates all available calculator types (e.g., `'employer-ni'`, `'employee-savings'`, `'hris-roi'`). This is used throughout the application to identify and manage different calculators.
    *   `FormValues`: A generic interface or a set of interfaces for the input form values of different calculators.
    *   Interfaces for the results objects of each calculator (e.g., `EmployerNIResult`, `EmployeeSavingsResult`, `P11dEvCarResult`, `ChildcareVouchersResult`, `HolidayTradingResult`, `BusinessRoiResult`, `CombinedPayrollResult`). These define the structure of the data returned by the calculation logic.
    *   `Scenario`: A type representing a saved calculation scenario, allowing users to store and compare different inputs and results.
*   **`combinedPayrollTypes.ts`**: This file appears to define types specifically for the "Combined Payroll ROI Calculator," which likely has a more complex data structure involving comparisons between different payroll solutions (e.g., in-house vs. managed service).

These type definitions are crucial for maintaining a robust and understandable codebase, especially as the complexity of the calculators and their interactions grows.

### `src/utils/`

The `src/utils/` directory provides a collection of utility functions and modules that are used throughout the application to perform common tasks, encapsulate business logic, and ensure consistency.

*   **`calculator.ts`**: This file contains general utility functions related to calculator operations.
    *   `safeNum()`: A function to safely convert string or number inputs (potentially with formatting like commas) into numerical values, providing a fallback if the conversion is not possible. This is essential for handling user input reliably.
    *   `formatCurrency()`: A utility to format numerical values as GBP currency strings (e.g., "£1,234.56").
    *   `getCalculatorTitle()`: A function to retrieve a user-friendly title for a given calculator type.
*   **`calculatorLogic.ts`**: This crucial file appears to house the primary logic for performing calculations for various calculators. It contains functions like:
    *   `calculateEmployerNISavings()`
    *   `calculateEmployeeSavings()`
    *   `calculateP11dEvCar()`
    *   `calculateChildcareVouchers()`
    *   `calculateHolidayTrading()`
    *   `calculateBusinessSystemROI()`
    It likely takes `FormValues` and a `CalculatorType` as input and returns the structured result object for that specific calculator. This centralizes the core calculation logic, making it easier to manage and update.
*   **`formatting.ts`**: This module provides a suite of functions for formatting various data types into user-friendly strings, ensuring consistent presentation across the UI. This includes:
    *   `formatCurrency()`: (Potentially duplicated or a more specific version than in `utils/calculator.ts`) For displaying monetary values.
    *   `formatPercentage()`: For displaying percentage values.
    *   `formatNumber()`: For formatting numbers with thousand separators.
    *   `formatDate()`: For formatting dates (e.g., DD/MM/YYYY).
    *   `formatTaxYear()`: For displaying tax years in a consistent format (e.g., "2023-2024").
    *   `formatMonths()`: For displaying time periods in months.
    The file might also define or export constants related to formatting, such as `UK_TAX_CONSTANTS`.
*   **`uk-english-style-guide.ts`**: This file seems to serve as a reference or a set of constants/rules for maintaining UK English style and terminology in user-facing text. It might also include notes on specific phrasing or important numerical constants (like tax thresholds) to ensure accuracy and consistency in the language used within the application.

These utility modules play a vital role in separating concerns, promoting code reuse, and ensuring that data is processed and presented consistently and accurately throughout the ROI calculator suite.

### `src/app/` - Next.js Application Structure

The `src/app/` directory is central to the Next.js application, following the App Router paradigm. It defines the application's routes, UI structure, and server-side logic.

*   **`layout.tsx`**: This is the root layout for the entire application. It defines the main HTML structure (<html>, <body> tags) and typically includes global styles (`globals.css`), metadata (site title, description), and any persistent UI elements common to all pages (though in this project, `WizardShell.tsx` seems to handle much of the persistent UI like navigation and footers within specific contexts).
*   **`page.tsx`**: This file defines the content for the homepage (root route `/`) of the application. It likely imports and uses the `HomePage.tsx` component from `src/components/` to render the main landing page content, wrapped within the `WizardShell` for consistent navigation.
*   **`globals.css`**: Contains global CSS styles and Tailwind CSS `@tailwind` directives. It also imports `calculator-card-styles.css`, indicating specific styles for calculator cards are defined separately and applied globally.
*   **`favicon.ico`**: The favicon for the application.

*   **`calculator/`**: This subdirectory defines routes related to the calculator functionalities.
    *   **`layout.tsx`**: A layout specific to the `/calculator/*` routes. It wraps the content of individual calculator pages, potentially providing a consistent structure or context for all calculators.
    *   **`page.tsx`**: This page likely serves as an index or selection page for the various calculators, accessible at `/calculator`. It probably displays a list or grid of available calculators (using `calculatorData.ts`) and allows users to navigate to a specific one. It uses `WizardShell` for overall page structure.
    *   **`[calculator-type]/page.tsx` (e.g., `employee-savings/page.tsx`, `employer-ni/page.tsx`, `business-roi/page.tsx`)**: These are dynamic route segments representing individual calculator pages. For example, `/calculator/employee-savings` would render the `EmployeeSavingsPage` component, which in turn uses the corresponding calculator component from `src/calculators/`. These pages use `WizardShell` and often include a "Back to Calculators" link.

*   **`resources/`**: This section handles informational content.
    *   **`page.tsx`**: The main page for the resources section (`/resources`). It likely provides links to news, guides, and other helpful content, using `WizardShell` for structure.
    *   **`news/page.tsx`**: This page (`/resources/news`) displays aggregated industry news. It fetches data from the `/api/rss` route, shows loading/error states, allows filtering by news source, and presents articles with AI-generated summaries. It uses `WizardShell`.

*   **`api/`**: This directory contains server-side API route handlers.
    *   **`rss/route.ts`**: Defines a GET request handler for the `/api/rss` endpoint. This API route is responsible for:
        *   Fetching data from multiple external RSS feeds (defined in `feedUrls`).
        *   Parsing the RSS data.
        *   Generating AI summaries for each article using a Hugging Face model (`facebook/bart-large-cnn`).
        *   Generating a master summary of all articles.
        *   Implementing a caching mechanism (`CACHE_EXPIRATION`) to avoid refetching and reprocessing data too frequently.
        *   Returning the processed feed data and summaries as JSON.

This structure leverages Next.js features like file-system routing, layouts, and API routes to create a well-organized and maintainable application.
