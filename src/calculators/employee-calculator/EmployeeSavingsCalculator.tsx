'use client';

import React, { useState } from 'react';
import { BenefitType, BenefitConfig } from '../../calculation-engine/types';
import PersonalDetailsTab from './components/PersonalDetailsTab';
import BenefitsConfigTab from './components/BenefitsConfigTab';
import EmployeeSavingsResults from './components/EmployeeSavingsResults';
import { TabNavigation, Card, InfoBox } from '../../components/ui';
import { formatCurrency } from '../../utils/formatting';

// Define the tab labels
const TAB_LABELS = [
  'Personal Details',
  'Benefits Configuration',
];

// Default benefit configuration structure
const getDefaultEmployeeBenefitConfig = () => {
  return {
    [BenefitType.PENSION]: {
      enabled: true,
      contributionValue: 5
    },
    [BenefitType.CYCLE_TO_WORK]: {
      enabled: false,
      contributionValue: 100
    },
    [BenefitType.EV_CAR_SCHEME]: {
      enabled: false,
      contributionValue: 450
    },
    [BenefitType.CHILDCARE]: {
      enabled: false,
      contributionValue: 250
    },
    [BenefitType.HOLIDAY_TRADING]: {
      enabled: false,
      contributionValue: 5
    }
  };
};

interface EmployeeSavingsCalculatorProps {
  onSaveScenario?: (name: string, formValues: any, result: any) => void;
  initialValues?: any;
  showMethodologyLink?: boolean;
}

const EmployeeSavingsCalculator: React.FC<EmployeeSavingsCalculatorProps> = ({
  onSaveScenario,
  initialValues,
  showMethodologyLink = true
}) => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Initialize state for personal details
  const [taxYear, setTaxYear] = useState('2025-2026');
  const [taxRegion, setTaxRegion] = useState('uk');
  const [grossSalary, setGrossSalary] = useState('35000');
  
  // Initialize benefit configuration
  const [benefitConfig, setBenefitConfig] = useState(getDefaultEmployeeBenefitConfig());
  
  // Initialize result state
  const [result, setResult] = useState<any>(null);
  const [includeProjection, setIncludeProjection] = useState(true);

  // Handlers for personal details
  const handleTaxYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTaxYear(e.target.value);
  };
  
  const handleTaxRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTaxRegion(e.target.value);
  };
  
  const handleGrossSalaryChange = (value: string) => {
    setGrossSalary(value);
  };

  // Handler for benefit config changes
  const handleBenefitConfigChange = (benefitType: BenefitType, config: BenefitConfig) => {
    setBenefitConfig(prev => ({ ...prev, [benefitType]: config }));
  };
  
  // Handler for tab changes
  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
  };

  // Handler to navigate to Benefits Configuration tab
  const navigateToBenefitsTab = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab(1);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Tax data for calculation
    const taxData = {
      personalAllowance: 12570,
      basicRate: 0.20,
      basicThreshold: 50270,
      higherRate: 0.40,
      higherThreshold: 125140,
      additionalRate: 0.45,
      niPrimaryRate: 0.12,
      niSecondaryRate: 0.15,
      niUpperEarningsLimit: 50270,
      niPrimaryUpperRate: 0.02,
      niSecondaryUpperRate: 0.15,
      niPrimaryThreshold: 12570,
      niSecondaryThreshold: 5000 // Updated from 9100 to 5000
    };
    
    // For Scotland, we would use different tax rates if needed
    const scotlandTaxData = {
      ...taxData,
      basicRate: 0.19,
      // Add other Scotland-specific rates here
    };
    
    // Select appropriate tax data based on region
    const selectedTaxData = taxRegion === 'scotland' ? scotlandTaxData : taxData;
    
    try {
      // Calculate tax savings
      let annualTaxSavings = 0;
      let annualNISavings = 0;
      let monthlyTakeHomeIncrease = 0;
      
      // Benefit breakdown for detailed results
      const benefitBreakdown: Record<string, any> = {};
      
      // Calculate for each enabled benefit
      for (const [type, config] of Object.entries(benefitConfig)) {
        if (config.enabled) {
          const benefitType = type as BenefitType;
          let taxSavings = 0;
          let niSavings = 0;
          let takeHomeIncrease = 0;
          
          // Different calculation methods based on benefit type
          switch (benefitType) {
            case BenefitType.PENSION:
              const pensionContribution = Number(grossSalary) * (config.contributionValue / 100);
              taxSavings = calculateTaxSavings(pensionContribution, selectedTaxData, Number(grossSalary));
              niSavings = pensionContribution * selectedTaxData.niPrimaryRate;
              takeHomeIncrease = taxSavings + niSavings - pensionContribution;
              break;
              
            case BenefitType.CYCLE_TO_WORK:
              taxSavings = calculateTaxSavings(config.contributionValue, selectedTaxData, Number(grossSalary));
              niSavings = config.contributionValue * selectedTaxData.niPrimaryRate;
              takeHomeIncrease = taxSavings + niSavings - config.contributionValue;
              break;
              
            case BenefitType.EV_CAR_SCHEME:
              // EV car schemes have BIK rates that need to be considered
              const bikValue = 35000 * 0.02; // Assuming 2% BIK rate for EVs
              taxSavings = calculateTaxSavings(config.contributionValue, selectedTaxData, Number(grossSalary));
              niSavings = config.contributionValue * selectedTaxData.niPrimaryRate;
              
              // BIK tax reduces the savings
              const bikTax = getTaxRateForSalary(Number(grossSalary), selectedTaxData) * bikValue;
              takeHomeIncrease = taxSavings + niSavings - config.contributionValue - bikTax;
              break;
              
            case BenefitType.CHILDCARE:
              // Childcare vouchers typically have fixed values
              taxSavings = calculateTaxSavings(config.contributionValue, selectedTaxData, Number(grossSalary));
              niSavings = config.contributionValue * selectedTaxData.niPrimaryRate;
              takeHomeIncrease = taxSavings + niSavings - config.contributionValue;
              break;
              
            case BenefitType.HOLIDAY_TRADING:
              // Holiday trading is based on daily rate
              const dailyRate = Number(grossSalary) / 260; // Assuming 260 working days per year
              const holidayValue = dailyRate * config.contributionValue;
              taxSavings = calculateTaxSavings(holidayValue, selectedTaxData, Number(grossSalary));
              niSavings = holidayValue * selectedTaxData.niPrimaryRate;
              takeHomeIncrease = taxSavings + niSavings - holidayValue;
              break;
          }
          
          // Add to total
          annualTaxSavings += taxSavings;
          annualNISavings += niSavings;
          monthlyTakeHomeIncrease += takeHomeIncrease;
          
          // Store benefit breakdown
          benefitBreakdown[benefitType] = {
            taxSavings,
            niSavings,
            totalSavings: taxSavings + niSavings,
            takeHomeIncrease
          };
        }
      }
      
      // Calculate pension projection if needed
      let projectionResults = null;
      if (includeProjection && benefitConfig[BenefitType.PENSION].enabled) {
        const pensionContribution = Number(grossSalary) * (benefitConfig[BenefitType.PENSION].contributionValue / 100);
        const years = 30;
        const annualGrowthRate = 1.05; // 5% annual growth
        
        const totalContributions = pensionContribution * years;
        
        // Simple compound interest formula for projection
        let potValue = 0;
        for (let i = 0; i < years; i++) {
          potValue = (potValue + pensionContribution) * annualGrowthRate;
        }
        
        projectionResults = {
          totalContributions,
          potValue: Math.round(potValue)
        };
      }
      
      // Set the result
      setResult({
        annualTaxSavings,
        annualNISavings,
        totalAnnualSavings: annualTaxSavings + annualNISavings,
        monthlyTakeHomeIncrease: monthlyTakeHomeIncrease / 12,
        benefitBreakdown,
        projectionResults
      });
      
      // Show results tab
      setActiveTab(2);
      
    } catch (error) {
      console.error('Calculation error:', error);
      // Handle error scenario
    }
  };
  
  // Helper function to calculate tax savings based on salary, sacrifice amount and tax data
  const calculateTaxSavings = (amount: number, taxData: any, salary: number) => {
    const taxRate = getTaxRateForSalary(salary, taxData);
    return amount * taxRate;
  };
  
  // Helper function to get the applicable tax rate for a given salary
  const getTaxRateForSalary = (salary: number, taxData: any) => {
    if (salary <= taxData.personalAllowance) {
      return 0;
    } else if (salary <= taxData.basicThreshold) {
      return taxData.basicRate;
    } else if (salary <= taxData.higherThreshold) {
      return taxData.higherRate;
    } else {
      return taxData.additionalRate;
    }
  };
  
  // Reset the calculator
  const handleReset = () => {
    setTaxYear('2025-2026');
    setTaxRegion('uk');
    setGrossSalary('35000');
    setBenefitConfig(getDefaultEmployeeBenefitConfig());
    setResult(null);
  };
  
  // Handle saving the scenario
  const handleSaveScenario = (name: string) => {
    if (result && onSaveScenario) {
      onSaveScenario(name, {
        taxYear,
        taxRegion,
        grossSalary,
        benefitConfig
      }, result);
    }
  };

  // Format results for display
  const formatResults = (result: any) => {
    if (!result) return {};
    
    return {
      annualTaxSavings: formatCurrency(result.annualTaxSavings),
      annualNISavings: formatCurrency(result.annualNISavings),
      totalAnnualSavings: formatCurrency(result.totalAnnualSavings),
      monthlyTakeHomeIncrease: formatCurrency(result.monthlyTakeHomeIncrease)
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-8">
      
      {/* Tab Navigation with standardized component */}
      <TabNavigation
        tabs={result ? [...TAB_LABELS, 'Results'] : TAB_LABELS}
        activeTabIndex={activeTab}
        onTabChange={handleTabChange}
        className="mb-6"
      />
      
      {/* Tab Content */}
      <div>
        {activeTab === 0 && (
          <PersonalDetailsTab
            taxYear={taxYear}
            taxRegion={taxRegion}
            grossSalary={grossSalary}
            onTaxYearChange={handleTaxYearChange}
            onTaxRegionChange={handleTaxRegionChange}
            onGrossSalaryChange={handleGrossSalaryChange}
            onCalculate={navigateToBenefitsTab}
            onReset={handleReset}
          />
        )}
        
        {activeTab === 1 && (
          <BenefitsConfigTab
            benefitConfig={benefitConfig}
            onBenefitConfigChange={handleBenefitConfigChange}
            includeProjection={includeProjection}
            onIncludeProjectionChange={(value) => setIncludeProjection(value)}
            onCalculate={handleSubmit}
            onReset={handleReset}
          />
        )}
        
        {activeTab === 2 && result && (
          <EmployeeSavingsResults
            result={result}
            formValues={{
              taxYear,
              taxRegion,
              grossSalary,
              includeProjection
            }}
            formattedResults={formatResults(result)}
            onReset={handleReset}
            onSaveScenario={onSaveScenario ? handleSaveScenario : undefined}
            showMethodologyLink={showMethodologyLink}
          />
        )}
      </div>
      
      {/* Information about calculator */}
      <InfoBox title="About this calculator" variant="info" className="mt-6">
        <p>
          This calculator helps you understand how salary sacrifice benefits can reduce your tax and National Insurance contributions. 
          By sacrificing part of your salary before tax, you can make significant savings whilst still receiving valuable benefits.
        </p>
        <p className="mt-2">
          All calculations use the latest UK tax rates and thresholds for the {taxYear} tax year.
        </p>
      </InfoBox>
    </div>
  );
};

export default EmployeeSavingsCalculator;