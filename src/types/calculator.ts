// Common types used across calculator components
import { CombinedPayrollInputs, PayrollSystemResults, ManagedPayrollResults } from './combinedPayrollTypes';

export type CalculatorType = 'employer-ni' | 'employee-savings' | 'p11d-ev-car' | 'childcare-vouchers' | 'holiday-trading' | 'business-roi' | 'combined-payroll';

export interface FormValues {
  grossSalary?: number | string;
  salarySacrifice?: number | string;
  region?: 'uk' | 'scotland';
  taxYear?: string;
  numEmployees?: number;
  annualSystemCost?: number | string;
  annualCostSavings?: number | string;
  annualTimeSavingsHours?: number | string;
  productivityGainPercent?: number | string;
  avgHourlyRate?: number | string;
  listPrice?: number | string;
  bikRate?: number | string;
  voucherAmount?: number | string;
  daysTraded?: number | string;
  dailyRate?: number | string;
  tradeType?: string;
}

export interface EmployerNIResult {
  niSavings: number;
  breakdown: Record<string, any>;
}

export interface EmployeeSavingsResult {
  totalSavings: number;
  breakdown: Record<string, any>;
}

export interface P11dEvCarResult {
  taxSavings: number;
}

export interface ChildcareVouchersResult {
  taxSavings: number;
  niSavings: number;
}

export interface HolidayTradingResult {
  netImpact: number;
}

export interface BusinessRoiResult {
  roi: number;
  paybackPeriod: number;
}

export interface CombinedPayrollResult {
  payrollSystemResults: PayrollSystemResults;
  managedPayrollResults: ManagedPayrollResults;
}

export type Scenario =
  | { id: string; name: string; calculator: 'employer-ni'; formValues: FormValues | null; calcResult: EmployerNIResult | null; }
  | { id: string; name: string; calculator: 'employee-savings'; formValues: FormValues | null; calcResult: EmployeeSavingsResult | null; }
  | { id: string; name: string; calculator: 'p11d-ev-car'; formValues: FormValues | null; calcResult: P11dEvCarResult | null; }
  | { id: string; name: string; calculator: 'childcare-vouchers'; formValues: FormValues | null; calcResult: ChildcareVouchersResult | null; }
  | { id: string; name: string; calculator: 'holiday-trading'; formValues: FormValues | null; calcResult: HolidayTradingResult | null; }
  | { id: string; name: string; calculator: 'business-roi'; formValues: FormValues | null; calcResult: BusinessRoiResult | null; }
  | { id: string; name: string; calculator: 'combined-payroll'; formValues: CombinedPayrollInputs | null; calcResult: CombinedPayrollResult | null; };