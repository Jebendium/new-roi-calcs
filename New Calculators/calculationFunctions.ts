// UK Tax Constants for different tax years
const TAX_CONSTANTS = {
  // Tax year specific constants
  "2023-2024": {
    EMPLOYER_NI_RATE: 0.138, // 13.8%
    EMPLOYER_NI_THRESHOLD: 9100, // Annual Secondary Threshold
    EMPLOYEE_NI_RATE: 0.12, // 12% up to upper earnings limit
    EMPLOYEE_NI_HIGHER_RATE: 0.02, // 2% above upper earnings limit
    NI_PRIMARY_THRESHOLD: 12570, // Annual Primary Threshold
    NI_UPPER_EARNINGS_LIMIT: 50270, // Annual Upper Earnings Limit
  },
  
  "2024-2025": {
    EMPLOYER_NI_RATE: 0.138, // 13.8%
    EMPLOYER_NI_THRESHOLD: 9100, // Annual Secondary Threshold
    EMPLOYEE_NI_RATE: 0.12, // 12% up to upper earnings limit
    EMPLOYEE_NI_HIGHER_RATE: 0.02, // 2% above upper earnings limit
    NI_PRIMARY_THRESHOLD: 12570, // Annual Primary Threshold
    NI_UPPER_EARNINGS_LIMIT: 50270, // Annual Upper Earnings Limit
  },
  
  "2025-2026": {
    EMPLOYER_NI_RATE: 0.15, // 15%
    EMPLOYER_NI_THRESHOLD: 5000, // Annual Secondary Threshold
    EMPLOYEE_NI_RATE: 0.12, // 12% up to upper earnings limit
    EMPLOYEE_NI_HIGHER_RATE: 0.02, // 2% above upper earnings limit
    NI_PRIMARY_THRESHOLD: 12570, // Annual Primary Threshold
    NI_UPPER_EARNINGS_LIMIT: 50270, // Annual Upper Earnings Limit
  },
};

// Income tax rates
const INCOME_TAX_RATES = {
  // UK Income Tax Rates
  UK_INCOME_TAX: {
    PERSONAL_ALLOWANCE: 12570,
    BASIC_RATE_THRESHOLD: 50270,
    HIGHER_RATE_THRESHOLD: 125140,
    BASIC_RATE: 0.2, // 20%
    HIGHER_RATE: 0.4, // 40%
    ADDITIONAL_RATE: 0.45, // 45%
  },
  
  // Scottish Income Tax Rates
  SCOTLAND_INCOME_TAX: {
    PERSONAL_ALLOWANCE: 12570,
    STARTER_RATE_THRESHOLD: 14732,
    BASIC_RATE_THRESHOLD: 25688,
    INTERMEDIATE_RATE_THRESHOLD: 43662,
    HIGHER_RATE_THRESHOLD: 125140,
    STARTER_RATE: 0.19, // 19%
    BASIC_RATE: 0.20, // 20%
    INTERMEDIATE_RATE: 0.21, // 21%
    HIGHER_RATE: 0.41, // 41%
    ADDITIONAL_RATE: 0.46, // 46%
  }
};
  
// Define benefit types
export enum BenefitType {
  PENSION = 'pension',
  CYCLE_TO_WORK = 'cycle',
  EV_CAR_SCHEME = 'car',
  CHILDCARE = 'childcare',
  HOLIDAY_TRADING = 'holiday'
}

// Define benefit configuration interface
export interface BenefitConfig {
  enabled: boolean;
  participationRate: number; // Percentage
  contributionValue: number; // Amount or percentage depending on benefit type
  p11dValue?: number; // P11D value for EV cars
}

// Define multi-benefit configuration interface
export interface MultiBenefitConfig {
  [BenefitType.PENSION]: BenefitConfig;
  [BenefitType.CYCLE_TO_WORK]: BenefitConfig;
  [BenefitType.EV_CAR_SCHEME]: BenefitConfig;
  [BenefitType.CHILDCARE]: BenefitConfig;
  [BenefitType.HOLIDAY_TRADING]: BenefitConfig;
}

// Define benefit savings result interface
export interface BenefitSavingsResult {
  niSavings: number;
  additionalSavings: number; // For holiday trading wage savings
  totalSavings: number;
}

// Define calculation result interface with benefit breakdown
export interface CalculationResult {
  annualSavings: number;
  savingsPerEmployee: number;
  originalNI: number;
  reducedNI: number;
  benefitBreakdown: {
    [key in BenefitType]?: BenefitSavingsResult;
  };
}

// Calculate Employer National Insurance savings
export const calculateEmployerNISavings = (
  employeeCount: number,
  averageSalary: number,
  monthlyContribution: number,
  taxYear: string = '2023-2024'
) => {
  // Get tax constants for the specified tax year
  const yearConstants = TAX_CONSTANTS[taxYear as keyof typeof TAX_CONSTANTS] || TAX_CONSTANTS["2023-2024"];
  
  // Monthly contribution annualized
  const annualContribution = monthlyContribution * 12;
  
  // Calculate NI without salary sacrifice (on full salary)
  const originalNI = employeeCount * Math.max(0, (averageSalary - yearConstants.EMPLOYER_NI_THRESHOLD) * yearConstants.EMPLOYER_NI_RATE);
  
  // Calculate NI with salary sacrifice (on reduced salary)
  const reducedSalary = averageSalary - annualContribution;
  const reducedNI = employeeCount * Math.max(0, (reducedSalary - yearConstants.EMPLOYER_NI_THRESHOLD) * yearConstants.EMPLOYER_NI_RATE);
    
    const savings = originalNI - reducedNI;
    
    return {
      annualSavings: savings,
      savingsPerEmployee: savings / employeeCount,
      originalNI,
      reducedNI
    };
  };
  
  // Calculate Employee Tax and NI savings
  export const calculateEmployeeSavings = (
    annualSalary: number,
    contributionPercentage: number,
    isScottish: boolean = false,
    taxYear: string = '2023-2024'
  ) => {
    // Calculate contribution amount
    const annualContribution = annualSalary * (contributionPercentage / 100);
    
    // Calculate income tax without salary sacrifice
    const taxRates = isScottish ? INCOME_TAX_RATES.SCOTLAND_INCOME_TAX : INCOME_TAX_RATES.UK_INCOME_TAX;
    const originalTax = calculateIncomeTax(annualSalary, taxRates);
    
    // Calculate income tax with salary sacrifice
    const reducedSalary = annualSalary - annualContribution;
    const reducedTax = calculateIncomeTax(reducedSalary, taxRates);
    
    // Calculate NI without salary sacrifice
    const originalNI = calculateEmployeeNI(annualSalary, taxYear);
    
    // Calculate NI with salary sacrifice
    const reducedNI = calculateEmployeeNI(reducedSalary, taxYear);
    
    // Calculate total savings
    const taxSavings = originalTax - reducedTax;
    const niSavings = originalNI - reducedNI;
    const totalSavings = taxSavings + niSavings;
    
    return {
      monthlyTakeHomeIncrease: totalSavings / 12,
      annualTaxSavings: taxSavings,
      annualNISavings: niSavings,
      totalAnnualSavings: totalSavings,
      contributionAmount: annualContribution
    };
  };
  
  // Define UK tax rates interface
  interface UKTaxRates {
    PERSONAL_ALLOWANCE: number;
    BASIC_RATE_THRESHOLD: number;
    HIGHER_RATE_THRESHOLD: number;
    BASIC_RATE: number;
    HIGHER_RATE: number;
    ADDITIONAL_RATE: number;
  }

  // Define Scottish tax rates interface
  interface ScottishTaxRates extends UKTaxRates {
    STARTER_RATE_THRESHOLD: number;
    INTERMEDIATE_RATE_THRESHOLD: number;
    STARTER_RATE: number;
    INTERMEDIATE_RATE: number;
  }

  // Union type for tax rates
  type TaxRates = UKTaxRates | ScottishTaxRates;

  // Helper function to calculate income tax
  const calculateIncomeTax = (salary: number, taxRates: TaxRates) => {
    let tax = 0;
    
    if (salary <= taxRates.PERSONAL_ALLOWANCE) {
      return 0;
    }
    
    if (isScottishRates(taxRates)) {
      // Scottish tax calculation with type assertion
      const scottishRates = taxRates as ScottishTaxRates;
      
      if (salary > scottishRates.PERSONAL_ALLOWANCE) {
        const starterBand = Math.min(
          scottishRates.STARTER_RATE_THRESHOLD - scottishRates.PERSONAL_ALLOWANCE, 
          Math.max(0, salary - scottishRates.PERSONAL_ALLOWANCE)
        );
        tax += starterBand * scottishRates.STARTER_RATE;
      }
      
      if (salary > scottishRates.STARTER_RATE_THRESHOLD) {
        const basicBand = Math.min(
          scottishRates.BASIC_RATE_THRESHOLD - scottishRates.STARTER_RATE_THRESHOLD, 
          Math.max(0, salary - scottishRates.STARTER_RATE_THRESHOLD)
        );
        tax += basicBand * scottishRates.BASIC_RATE;
      }
      
      if (salary > scottishRates.BASIC_RATE_THRESHOLD) {
        const intermediateBand = Math.min(
          scottishRates.INTERMEDIATE_RATE_THRESHOLD - scottishRates.BASIC_RATE_THRESHOLD, 
          Math.max(0, salary - scottishRates.BASIC_RATE_THRESHOLD)
        );
        tax += intermediateBand * scottishRates.INTERMEDIATE_RATE;
      }
      
      if (salary > scottishRates.INTERMEDIATE_RATE_THRESHOLD) {
        const higherBand = Math.min(
          scottishRates.HIGHER_RATE_THRESHOLD - scottishRates.INTERMEDIATE_RATE_THRESHOLD, 
          Math.max(0, salary - scottishRates.INTERMEDIATE_RATE_THRESHOLD)
        );
        tax += higherBand * scottishRates.HIGHER_RATE;
      }
      
      if (salary > taxRates.HIGHER_RATE_THRESHOLD) {
        const additionalBand = Math.max(0, salary - taxRates.HIGHER_RATE_THRESHOLD);
        tax += additionalBand * taxRates.ADDITIONAL_RATE;
      }
    } else {
      // UK tax calculation
      if (salary > taxRates.PERSONAL_ALLOWANCE) {
        const basicBand = Math.min(taxRates.BASIC_RATE_THRESHOLD - taxRates.PERSONAL_ALLOWANCE, Math.max(0, salary - taxRates.PERSONAL_ALLOWANCE));
        tax += basicBand * taxRates.BASIC_RATE;
      }
      
      if (salary > taxRates.BASIC_RATE_THRESHOLD) {
        const higherBand = Math.min(taxRates.HIGHER_RATE_THRESHOLD - taxRates.BASIC_RATE_THRESHOLD, Math.max(0, salary - taxRates.BASIC_RATE_THRESHOLD));
        tax += higherBand * taxRates.HIGHER_RATE;
      }
      
      if (salary > taxRates.HIGHER_RATE_THRESHOLD) {
        const additionalBand = Math.max(0, salary - taxRates.HIGHER_RATE_THRESHOLD);
        tax += additionalBand * taxRates.ADDITIONAL_RATE;
      }
    }
    
    return tax;
  };
  
  // Helper function to determine if tax rates are Scottish
  const isScottishRates = (taxRates: TaxRates): taxRates is ScottishTaxRates => {
    return 'STARTER_RATE' in taxRates;
  };
  
// Helper function to calculate employee NI
const calculateEmployeeNI = (salary: number, taxYear: string = '2023-2024') => {
  // Get tax constants for the specified tax year
  const yearConstants = TAX_CONSTANTS[taxYear as keyof typeof TAX_CONSTANTS] || TAX_CONSTANTS['2023-2024'];
  
  if (salary <= yearConstants.NI_PRIMARY_THRESHOLD) {
    return 0;
  }
  
  let ni = 0;
  
  if (salary <= yearConstants.NI_UPPER_EARNINGS_LIMIT) {
    ni = (salary - yearConstants.NI_PRIMARY_THRESHOLD) * yearConstants.EMPLOYEE_NI_RATE;
  } else {
    ni = (yearConstants.NI_UPPER_EARNINGS_LIMIT - yearConstants.NI_PRIMARY_THRESHOLD) * yearConstants.EMPLOYEE_NI_RATE;
    ni += (salary - yearConstants.NI_UPPER_EARNINGS_LIMIT) * yearConstants.EMPLOYEE_NI_HIGHER_RATE;
  }
    
    return ni;
  };
  
// Projection calculation for retirement savings
export const calculateRetirementProjection = (
  annualSalary: number,
  contributionPercentage: number,
  years: number = 30,
  annualGrowthRate: number = 0.05  // 5% annual growth
) => {
  const annualContribution = annualSalary * (contributionPercentage / 100);
  let potValue = 0;
  
  for (let year = 1; year <= years; year++) {
    potValue = (potValue + annualContribution) * (1 + annualGrowthRate);
  }
  
  return {
    potValue,
    totalContributions: annualContribution * years
  };
};

// Calculate savings for multiple benefits
export const calculateMultiBenefitSavings = (
  employeeCount: number,
  averageSalary: number,
  benefitConfig: MultiBenefitConfig,
  taxYear: string = '2023-2024'
): CalculationResult => {
  // Get tax constants for the specified tax year
  const yearConstants = TAX_CONSTANTS[taxYear as keyof typeof TAX_CONSTANTS] || TAX_CONSTANTS['2023-2024'];
  
  // Calculate original NI without any salary sacrifice
  const originalNI = employeeCount * Math.max(0, (averageSalary - yearConstants.EMPLOYER_NI_THRESHOLD) * yearConstants.EMPLOYER_NI_RATE);
  
  let totalSavings = 0;
  let reducedNI = originalNI;
  const benefitBreakdown: {[key in BenefitType]?: BenefitSavingsResult} = {};
  
  // Calculate savings for each benefit type
  if (benefitConfig[BenefitType.PENSION].enabled) {
    const result = calculatePensionSavings(
      employeeCount,
      averageSalary,
      benefitConfig[BenefitType.PENSION].participationRate,
      benefitConfig[BenefitType.PENSION].contributionValue,
      yearConstants
    );
    benefitBreakdown[BenefitType.PENSION] = result;
    totalSavings += result.totalSavings;
    reducedNI -= result.niSavings;
  }
  
  if (benefitConfig[BenefitType.CYCLE_TO_WORK].enabled) {
    const result = calculateCycleToWorkSavings(
      employeeCount,
      benefitConfig[BenefitType.CYCLE_TO_WORK].participationRate,
      benefitConfig[BenefitType.CYCLE_TO_WORK].contributionValue,
      yearConstants
    );
    benefitBreakdown[BenefitType.CYCLE_TO_WORK] = result;
    totalSavings += result.totalSavings;
    reducedNI -= result.niSavings;
  }
  
  if (benefitConfig[BenefitType.EV_CAR_SCHEME].enabled) {
    const result = calculateEVCarSchemeSavings(
      employeeCount,
      benefitConfig[BenefitType.EV_CAR_SCHEME].participationRate,
      benefitConfig[BenefitType.EV_CAR_SCHEME].contributionValue,
      yearConstants,
      benefitConfig[BenefitType.EV_CAR_SCHEME].p11dValue
    );
    benefitBreakdown[BenefitType.EV_CAR_SCHEME] = result;
    totalSavings += result.totalSavings;
    reducedNI -= result.niSavings;
  }
  
  if (benefitConfig[BenefitType.CHILDCARE].enabled) {
    const result = calculateChildcareSavings(
      employeeCount,
      benefitConfig[BenefitType.CHILDCARE].participationRate,
      benefitConfig[BenefitType.CHILDCARE].contributionValue,
      yearConstants
    );
    benefitBreakdown[BenefitType.CHILDCARE] = result;
    totalSavings += result.totalSavings;
    reducedNI -= result.niSavings;
  }
  
  if (benefitConfig[BenefitType.HOLIDAY_TRADING].enabled) {
    const result = calculateHolidayTradingSavings(
      employeeCount,
      averageSalary,
      benefitConfig[BenefitType.HOLIDAY_TRADING].participationRate,
      benefitConfig[BenefitType.HOLIDAY_TRADING].contributionValue,
      yearConstants
    );
    benefitBreakdown[BenefitType.HOLIDAY_TRADING] = result;
    totalSavings += result.totalSavings;
    reducedNI -= result.niSavings;
  }
  
  return {
    annualSavings: totalSavings,
    savingsPerEmployee: totalSavings / employeeCount,
    originalNI,
    reducedNI,
    benefitBreakdown
  };
};

// Type for tax year constants
type TaxYearConstants = typeof TAX_CONSTANTS['2023-2024'];

// Calculate pension savings
const calculatePensionSavings = (
  employeeCount: number,
  averageSalary: number,
  participationRate: number,
  contributionPercentage: number,
  yearConstants: TaxYearConstants
): BenefitSavingsResult => {
  // Calculate annual contribution
  const annualContribution = averageSalary * (contributionPercentage / 100);
  
  // Calculate number of participating employees
  const participatingEmployees = employeeCount * (participationRate / 100);
  
  // Calculate NI savings (on full contribution amount)
  const niSavings = participatingEmployees * annualContribution * yearConstants.EMPLOYER_NI_RATE;
  
  return {
    niSavings,
    additionalSavings: 0,
    totalSavings: niSavings
  };
};

// Calculate Cycle to Work savings
const calculateCycleToWorkSavings = (
  employeeCount: number,
  participationRate: number,
  averageSpend: number,
  yearConstants: TaxYearConstants
): BenefitSavingsResult => {
  // Calculate number of participating employees
  const participatingEmployees = employeeCount * (participationRate / 100);
  
  // Calculate NI savings (on full amount)
  const niSavings = participatingEmployees * averageSpend * yearConstants.EMPLOYER_NI_RATE;
  
  return {
    niSavings,
    additionalSavings: 0,
    totalSavings: niSavings
  };
};

// Calculate EV Car Scheme savings
const calculateEVCarSchemeSavings = (
  employeeCount: number,
  participationRate: number,
  monthlyGrossAmount: number,
  yearConstants: TaxYearConstants,
  p11dValue?: number // Optional P11D value, falls back to monthly amount if not provided
): BenefitSavingsResult => {
  // Calculate number of participating employees
  const participatingEmployees = employeeCount * (participationRate / 100);
  
  // Calculate annual gross amount
  const annualGrossAmount = monthlyGrossAmount * 12;
  
  // Calculate benefit in kind (2% of the P11D value)
  // If P11D value is provided, use it; otherwise, use the monthly amount (backward compatibility)
  const benefitInKind = p11dValue ? p11dValue * 0.02 : annualGrossAmount * 0.02;
  
  // Calculate NI savings (on gross amount minus benefit in kind)
  const niSavings = participatingEmployees * (annualGrossAmount - benefitInKind) * yearConstants.EMPLOYER_NI_RATE;
  
  return {
    niSavings,
    additionalSavings: 0,
    totalSavings: niSavings
  };
};

// Calculate Childcare Vouchers savings
const calculateChildcareSavings = (
  employeeCount: number,
  participationRate: number,
  monthlyAmount: number,
  yearConstants: TaxYearConstants
): BenefitSavingsResult => {
  // Calculate number of participating employees
  const participatingEmployees = employeeCount * (participationRate / 100);
  
  // Calculate annual amount
  const annualAmount = monthlyAmount * 12;
  
  // Calculate NI savings (on full amount)
  const niSavings = participatingEmployees * annualAmount * yearConstants.EMPLOYER_NI_RATE;
  
  return {
    niSavings,
    additionalSavings: 0,
    totalSavings: niSavings
  };
};

// Calculate Holiday Trading savings
const calculateHolidayTradingSavings = (
  employeeCount: number,
  averageSalary: number,
  participationRate: number,
  averageDaysPurchased: number,
  yearConstants: TaxYearConstants
): BenefitSavingsResult => {
  // Calculate number of participating employees
  const participatingEmployees = employeeCount * (participationRate / 100);
  
  // Calculate daily rate (average salary / 52 weeks / 5 days)
  const dailyRate = averageSalary / 52 / 5;
  
  // Calculate annual amount
  const annualAmount = dailyRate * averageDaysPurchased;
  
  // Calculate NI savings (on full amount)
  const niSavings = participatingEmployees * annualAmount * yearConstants.EMPLOYER_NI_RATE;
  
  // Calculate additional wage savings (the actual wage reduction)
  const wageSavings = participatingEmployees * annualAmount;
  
  return {
    niSavings,
    additionalSavings: wageSavings,
    totalSavings: niSavings + wageSavings
  };
};
