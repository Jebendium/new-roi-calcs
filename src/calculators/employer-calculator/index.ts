/**
 * Employer NI Calculator Module
 * 
 * This module contains components for calculating employer National Insurance savings
 * from salary sacrifice pension schemes and other benefits.
 */

// Main calculator component
export { default as EmployerNICalculator } from './EmployerNICalculator';

// Form components
// Remove obsolete export
// export { default as EmployerNIForm } from './components/EmployerNIForm';
// export { default as BenefitConfigPanel } from './components/BenefitConfigPanel';

// Results components
export { default as EmployerNIResults } from './components/EmployerNIResults';
export { default as EmployerNICharts } from './components/EmployerNICharts';

// Tab components
export { default as MultiBenefitTab } from './tabs/MultiBenefitTab';
export { default as SalaryBandsTab } from './tabs/SalaryBandsTab';
// export { default as MultiYearProjectionTab } from './tabs/MultiYearProjectionTab';
export { default as WhatIfScenarioTab } from './tabs/WhatIfScenarioTab';

// Methodology
// export { default as EmployerNIMethodology } from './methodology/EmployerNIMethodologyPage';