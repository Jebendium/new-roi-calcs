/**
 * Shared type definitions for calculators
 */

import { BenefitType, CalculationResult } from './calculation-functions';

/**
 * Common calculator types
 */
export type CalculatorType = 
  | 'employer-ni' 
  | 'employee-savings' 
  | 'p11d-ev-car' 
  | 'childcare-vouchers' 
  | 'holiday-trading' 
  | 'business-roi'
  | 'hris-roi'
  | 'payroll-roi'
  | 'combined-payroll';

/**
 * Common form values interface
 */
export interface FormValues {
  // Generic fields that can be used across calculators
  [key: string]: string | number | boolean | undefined;
  
  // Common fields (optional since not all calculators use them)
  taxYear?: string;
  region?: string;
  employeeCount?: number | string;
  averageSalary?: number | string;
}

/**
 * Employer NI Calculator Results
 */
export interface EmployerNIResult {
  annualSavings: number;
  savingsPerEmployee: number;
  originalNI: number;
  reducedNI: number;
  benefitBreakdown?: Record<string, any>;
}

/**
 * Employee Savings Calculator Results
 */
export interface EmployeeSavingsResult {
  monthlyTakeHomeIncrease: number;
  annualTaxSavings: number;
  annualNISavings: number;
  totalAnnualSavings: number;
  contributionAmount: number;
}

/**
 * P11D EV Car Calculator Results
 */
export interface P11dEvCarResult {
  p11dValue: number;
  benefitInKindPercentage: number;
  benefitInKindValue: number;
  taxableAmount: number;
  basicRateTaxLiability: number;
  higherRateTaxLiability: number;
  netSalaryImpact: number;
}

/**
 * Childcare Vouchers Calculator Results
 */
export interface ChildcareVouchersResult {
  annualTaxSavings: number;
  annualNISavings: number;
  totalAnnualSavings: number;
  monthlySavings: number;
  annualVoucherValue: number;
}

/**
 * Holiday Trading Calculator Results
 */
export interface HolidayTradingResult {
  grossImpact: number;
  taxSaving: number;
  niSaving: number;
  netImpact: number;
  daysTraded: number;
  tradeType: string;
}

/**
 * Business ROI Calculator Results
 */
export interface BusinessRoiResult {
  annualROI: number;
  paybackPeriodMonths: number;
  fiveYearSavings: number;
  productivityValue: number;
  timeSavingsValue: number;
  totalAnnualBenefit: number;
}

/**
 * HRIS ROI Calculator Results
 */
export interface HRISRoiResult {
  firstYearROI: number;
  threeYearROI: number;
  fiveYearROI: number;
  paybackPeriodMonths: number;
  totalSavings: number;
  timeSavings: number;
  errorSavings: number;
  paperSavings: number;
  wageSavings: number;
  productivityGains: number;
}

/**
 * Payroll ROI Calculator Results
 */
export interface PayrollRoiResult {
  firstYearROI: number;
  threeYearROI: number;
  fiveYearROI: number;
  paybackPeriodMonths: number;
  totalSavings: number;
  timeSavings: number;
  errorSavings: number;
  paperSavings: number;
  complianceSavings: number;
}

/**
 * Combined ROI Calculator Results
 */
export interface CombinedRoiResult {
  payrollSystemResults: PayrollRoiResult;
  managedPayrollResults: PayrollRoiResult;
  comparison: {
    bestROI: 'system' | 'managed' | 'equal';
    roiDifference: number;
    costDifference: number;
    savingsDifference: number;
  };
}

/**
 * Scenario type for storing calculator configurations
 */
export type Scenario =
  | { id: string; name: string; calculator: 'employer-ni'; formValues: FormValues | null; calcResult: EmployerNIResult | null; }
  | { id: string; name: string; calculator: 'employee-savings'; formValues: FormValues | null; calcResult: EmployeeSavingsResult | null; }
  | { id: string; name: string; calculator: 'p11d-ev-car'; formValues: FormValues | null; calcResult: P11dEvCarResult | null; }
  | { id: string; name: string; calculator: 'childcare-vouchers'; formValues: FormValues | null; calcResult: ChildcareVouchersResult | null; }
  | { id: string; name: string; calculator: 'holiday-trading'; formValues: FormValues | null; calcResult: HolidayTradingResult | null; }
  | { id: string; name: string; calculator: 'business-roi'; formValues: FormValues | null; calcResult: BusinessRoiResult | null; }
  | { id: string; name: string; calculator: 'hris-roi'; formValues: FormValues | null; calcResult: HRISRoiResult | null; }
  | { id: string; name: string; calculator: 'payroll-roi'; formValues: FormValues | null; calcResult: PayrollRoiResult | null; }
  | { id: string; name: string; calculator: 'combined-payroll'; formValues: FormValues | null; calcResult: CombinedRoiResult | null; };

/**
 * Calculator metadata for UI display
 */
export interface CalculatorInfo {
  type: CalculatorType;
  title: string;
  description: string;
  iconSvg: string;
  gradient: string;
  benefits: string[];
}

/**
 * Common props for form components
 */
export interface FormProps {
  onSubmit: (values: FormValues) => void;
  initialValues?: FormValues;
}

/**
 * Result display props
 */
export interface ResultProps {
  result: any;
  onReset?: () => void;
  onExport?: () => void;
}