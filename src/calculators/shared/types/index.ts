import { BenefitType, BenefitConfig } from '../../../calculation-engine/types';

// Basic form values interface
export interface FormValues {
  [key: string]: any;
  taxYear?: string;
  employeeCount?: string | number;
  averageSalary?: string | number;
  pensionContribution?: string | number;
  includeMultiBenefits?: boolean;
}

// Employer NI calculation result interface
export interface EmployerNIResult {
  annualSavings: number;
  savingsPerEmployee: number;
  originalNI: number;
  reducedNI: number;
  niReduction?: number;
  benefitBreakdown?: {
    [key: string]: {
      niSavings: number;
      additionalSavings: number;
      totalSavings: number;
      participationRate?: number;
      contributionValue?: number;
    }
  };
  salaryBands?: {
    bandName: string;
    employeeCount: number;
    averageSalary: number;
    niSavings: number;
  }[];
  projection?: {
    year: string | number;
    employees: number;
    averageSalary: number;
    annualSavings: number;
    cumulativeSavings: number;
  }[];
}

// Component variant types
export type VariantType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
