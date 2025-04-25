'use client';

import React, { useState } from 'react';
import CompanyInfoTab from './components/CompanyInfoTab';
import TimeSavingsTab from './components/TimeSavingsTab';
import ErrorReductionTab from './components/ErrorReductionTab';
import StrategicValueTab from './components/StrategicValueTab';
import CostInputsTab from './components/CostInputsTab';
import HRISResults from './components/HRISResults';
import { TabNavigation, Card, InfoBox, InfoTooltip } from '../../components/ui';

const TAB_LABELS = [
  'Company Info',
  'Time Savings',
  'Error Reduction',
  'Strategic Value',
  'System Costs',
];

// Initial state for calculator
const defaultTimeSavings = {
  employeeCount: 100,
  hrStaffCount: 2,
  hrHourlyRate: 25,
  managerHourlyRate: 40,
  employeeHourlyRate: 20,
  onboardingTime: 4,
  reportingTime: 10,
  dataEntryTime: 5,
  timeOffManagementTime: 4,
  payrollProcessingTime: 8,
  complianceTime: 6,
  improvementPercentage: 60
};

const defaultErrorReduction = {
  payrollErrorRate: 5,
  errorCorrectionTime: 2,
  complianceRiskCost: 5000,
  dataAccuracyImprovement: 70,
  payrollAccuracyImprovement: 80,
  complianceRiskReduction: 60
};

const defaultStrategicValue = {
  employeeEngagementValue: 1000,
  retentionImprovementPercent: 15,
  annualTurnoverPercent: 20,
  replacementCostMultiplier: 1.5,
  workflowAutomationPercent: 75,
  insightQualityImprovement: 60,
  decisionSpeedImprovement: 50
};

const defaultCostInputs = {
  implementationCost: 15000,
  annualSubscriptionCost: 12000,
  trainingCost: 3000,
  maintenanceCost: 2000,
  employeeCount: 100,
  annualSalaryBill: 5000000
};

interface HRISCalculatorProps {
  onSaveScenario?: (name: string, formValues: any, result: any) => void;
  initialValues?: any;
  showMethodologyLink?: boolean;
}

const HRISCalculator: React.FC<HRISCalculatorProps> = ({
  onSaveScenario,
  initialValues,
  showMethodologyLink = true
}) => {
  // Tab state
  const [activeTab, setActiveTab] = useState(0);
  
  // State for using industry benchmarks
  const [useIndustryBenchmarks, setUseIndustryBenchmarks] = useState(false);
  
  // Form state for each tab
  const [timeSavings, setTimeSavings] = useState(defaultTimeSavings);
  const [errorReduction, setErrorReduction] = useState(defaultErrorReduction);
  const [strategicValue, setStrategicValue] = useState(defaultStrategicValue);
  const [costInputs, setCostInputs] = useState(defaultCostInputs);
  
  // Results state
  const [result, setResult] = useState<any>(null);
  
  // Toggle for industry benchmarks
  const toggleIndustryBenchmarks = () => {
    const newValue = !useIndustryBenchmarks;
    setUseIndustryBenchmarks(newValue);
    
    // If turning on benchmarks, apply industry average values
    if (newValue) {
      setTimeSavings({
        ...timeSavings,
        onboardingTime: 8,
        reportingTime: 16,
        dataEntryTime: 10,
        timeOffManagementTime: 6,
        payrollProcessingTime: 12,
        complianceTime: 10,
        improvementPercentage: 65
      });
      
      setErrorReduction({
        ...errorReduction,
        payrollErrorRate: 8,
        errorCorrectionTime: 3,
        complianceRiskCost: 8000,
        dataAccuracyImprovement: 75,
        payrollAccuracyImprovement: 85,
        complianceRiskReduction: 70
      });
      
      setStrategicValue({
        ...strategicValue,
        employeeEngagementValue: 1200,
        retentionImprovementPercent: 18,
        workflowAutomationPercent: 80,
        insightQualityImprovement: 65,
        decisionSpeedImprovement: 55
      });
    } else {
      // Reset to default values when turning off benchmarks
      setTimeSavings(defaultTimeSavings);
      setErrorReduction(defaultErrorReduction);
      setStrategicValue(defaultStrategicValue);
    }
  };
  
  // Handle tab change
  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
  };
  
  // Calculate ROI
  const calculateROI = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    try {
      // Calculate time savings value
      const annualHRTimeSavingsHours = 
        (timeSavings.onboardingTime * 12) + // Assume 12 new hires per year
        (timeSavings.reportingTime * 12) + // Monthly reporting
        (timeSavings.dataEntryTime * 52) + // Weekly data entry
        (timeSavings.timeOffManagementTime * 26) + // Bi-weekly time off management
        (timeSavings.payrollProcessingTime * 24) + // Bi-monthly payroll
        (timeSavings.complianceTime * 4); // Quarterly compliance
      
      const hrTimeSavingsValue = annualHRTimeSavingsHours * 
        (timeSavings.improvementPercentage / 100) * 
        timeSavings.hrHourlyRate * 
        timeSavings.hrStaffCount;
      
      const managerTimeSavingsValue = annualHRTimeSavingsHours * 0.2 * // Assume managers spend 20% of HR time
        (timeSavings.improvementPercentage / 100) * 
        timeSavings.managerHourlyRate * 
        (timeSavings.employeeCount / 10); // Assume 1 manager per 10 employees
      
      const employeeTimeSavingsValue = 
        (12 * 0.5 * timeSavings.employeeCount) * // 30 min per employee per month
        (timeSavings.improvementPercentage / 100) * 
        timeSavings.employeeHourlyRate;
      
      const totalTimeSavingsValue = hrTimeSavingsValue + managerTimeSavingsValue + employeeTimeSavingsValue;
      
      // Calculate error reduction value
      const annualPayrollErrors = costInputs.employeeCount * 24 * (errorReduction.payrollErrorRate / 100); // Bi-monthly payroll
      const errorCorrectionSavings = annualPayrollErrors * 
        (errorReduction.payrollAccuracyImprovement / 100) * 
        errorReduction.errorCorrectionTime * 
        timeSavings.hrHourlyRate;
      
      const complianceRiskSavings = errorReduction.complianceRiskCost * 
        (errorReduction.complianceRiskReduction / 100);
      
      const dataQualitySavings = costInputs.employeeCount * 50 * // $50 per employee baseline
        (errorReduction.dataAccuracyImprovement / 100);
      
      const totalErrorReductionValue = errorCorrectionSavings + complianceRiskSavings + dataQualitySavings;
      
      // Calculate strategic value
      const turnoverReduction = costInputs.employeeCount * 
        (strategicValue.annualTurnoverPercent / 100) * 
        (strategicValue.retentionImprovementPercent / 100);
      
      const retentionSavings = turnoverReduction * 
        (costInputs.annualSalaryBill / costInputs.employeeCount) * 
        strategicValue.replacementCostMultiplier;
      
      const engagementValue = costInputs.employeeCount * 
        strategicValue.employeeEngagementValue * 
        (strategicValue.workflowAutomationPercent / 100) / 100;
      
      const dataInsightValue = costInputs.annualSalaryBill * 0.005 * // 0.5% baseline value from better decisions
        ((strategicValue.insightQualityImprovement + strategicValue.decisionSpeedImprovement) / 200);
      
      const totalStrategicValue = retentionSavings + engagementValue + dataInsightValue;
      
      // Calculate costs
      const firstYearCost = costInputs.implementationCost + 
        costInputs.annualSubscriptionCost + 
        costInputs.trainingCost + 
        costInputs.maintenanceCost;
      
      const ongoingAnnualCost = costInputs.annualSubscriptionCost + 
        costInputs.maintenanceCost;
      
      // Calculate total value and ROI
      const firstYearValue = totalTimeSavingsValue + totalErrorReductionValue + totalStrategicValue;
      const firstYearROI = ((firstYearValue - firstYearCost) / firstYearCost) * 100;
      const ongoingROI = ((firstYearValue - ongoingAnnualCost) / ongoingAnnualCost) * 100;
      
      // Calculate payback period (in months)
      const paybackPeriod = (firstYearCost / (firstYearValue / 12));
      
      // Calculate 3-year ROI
      const threeYearCost = firstYearCost + (ongoingAnnualCost * 2);
      const threeYearValue = firstYearValue * 3; // Simplified; could model growth
      const threeYearROI = ((threeYearValue - threeYearCost) / threeYearCost) * 100;
      
      // Set result
      const calculationResult = {
        timeSavings: {
          hrTimeSavingsValue,
          managerTimeSavingsValue,
          employeeTimeSavingsValue,
          totalTimeSavingsValue,
          annualHRTimeSavingsHours
        },
        errorReduction: {
          errorCorrectionSavings,
          complianceRiskSavings,
          dataQualitySavings,
          totalErrorReductionValue,
          annualPayrollErrors
        },
        strategicValue: {
          retentionSavings,
          engagementValue,
          dataInsightValue,
          totalStrategicValue,
          turnoverReduction
        },
        costs: {
          firstYearCost,
          ongoingAnnualCost,
          threeYearCost
        },
        overall: {
          firstYearValue,
          firstYearROI,
          ongoingROI,
          paybackPeriod,
          threeYearValue,
          threeYearROI
        }
      };
      
      setResult(calculationResult);
      
      // Show results tab
      setActiveTab(5);
      
    } catch (error) {
      console.error('Calculation error:', error);
      // Handle error
    }
  };
  
  // Format results for display
  const formatResults = (result: any) => {
    if (!result) return {};
    
    const formatCurrency = (value: number) => 
      `£${value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    
    const formatPercentage = (value: number) =>
      `${value.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
    
    const formatMonths = (value: number) =>
      `${value.toFixed(1)} months`;
    
    return {
      firstYearValue: formatCurrency(result.overall.firstYearValue),
      firstYearROI: formatPercentage(result.overall.firstYearROI),
      ongoingROI: formatPercentage(result.overall.ongoingROI),
      paybackPeriod: formatMonths(result.overall.paybackPeriod),
      threeYearValue: formatCurrency(result.overall.threeYearValue),
      threeYearROI: formatPercentage(result.overall.threeYearROI),
      firstYearCost: formatCurrency(result.costs.firstYearCost),
      ongoingAnnualCost: formatCurrency(result.costs.ongoingAnnualCost)
    };
  };
  
  // Handle save scenario
  const handleSaveScenario = (name: string) => {
    if (result && onSaveScenario) {
      onSaveScenario(name, {
        timeSavings,
        errorReduction,
        strategicValue,
        costInputs,
        useIndustryBenchmarks
      }, result);
    }
  };
  
  // Reset calculator
  const handleReset = () => {
    setTimeSavings(defaultTimeSavings);
    setErrorReduction(defaultErrorReduction);
    setStrategicValue(defaultStrategicValue);
    setCostInputs(defaultCostInputs);
    setUseIndustryBenchmarks(false);
    setResult(null);
    setActiveTab(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-8">
      <h1 className="text-2xl font-bold mb-6">HR Systems ROI Calculator</h1>
      
      <div className="mb-6 flex items-center">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox" 
            className="sr-only peer"
            checked={useIndustryBenchmarks}
            onChange={toggleIndustryBenchmarks}
          />
          <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-slate-700">Use CIPD/CIPP industry benchmarks</span>
        </label>
        <InfoTooltip content="Applies industry standards from CIPD and CIPP research for HR processes, error rates, and improvement potentials" />
      </div>
      
      <InfoBox title="About this calculator" variant="info" className="mt-6">
        <p>
          This HR Systems ROI Calculator helps you quantify the potential return on investment from implementing a modern HR system. 
          The calculator considers time savings, error reduction, and strategic value to provide a comprehensive view of potential benefits.
        </p>
        <p className="mt-2">
          For the most accurate results, use real data from your organisation where available. The CIPD/CIPP industry benchmarks 
          option can provide guidance if you're unsure about specific values.
        </p>
      </InfoBox>
      
      {/* Tab Navigation */}
      <TabNavigation
        tabs={result ? [...TAB_LABELS, 'Results'] : TAB_LABELS}
        activeTabIndex={activeTab}
        onTabChange={handleTabChange}
        className="mb-6"
      />
      
      {/* Tab Panels */}
      <Card className="p-6">
        {activeTab === 0 && (
          <CompanyInfoTab
            timeSavings={timeSavings}
            setTimeSavings={setTimeSavings}
            costInputs={costInputs}
            setCostInputs={setCostInputs}
            onCalculate={calculateROI}
            onNextTab={() => setActiveTab(1)}
          />
        )}
        
        {activeTab === 1 && (
          <TimeSavingsTab
            timeSavings={timeSavings}
            setTimeSavings={setTimeSavings}
            onCalculate={calculateROI}
            onNextTab={() => setActiveTab(2)}
          />
        )}
        
        {activeTab === 2 && (
          <ErrorReductionTab
            errorReduction={errorReduction}
            setErrorReduction={setErrorReduction}
            onCalculate={calculateROI}
            onNextTab={() => setActiveTab(3)}
          />
        )}
        
        {activeTab === 3 && (
          <StrategicValueTab
            strategicValue={strategicValue}
            setStrategicValue={setStrategicValue}
            employeeCount={costInputs.employeeCount}
            onCalculate={calculateROI}
            onNextTab={() => setActiveTab(4)}
          />
        )}
        
        {activeTab === 4 && (
          <CostInputsTab
            costInputs={costInputs}
            setCostInputs={setCostInputs}
            onCalculate={calculateROI}
          />
        )}
        
        {activeTab === 5 && result && (
          <HRISResults
            result={result}
            formValues={{
              timeSavings,
              errorReduction,
              strategicValue,
              costInputs,
              useIndustryBenchmarks
            }}
            formattedResults={formatResults(result)}
            onReset={handleReset}
            onSaveScenario={onSaveScenario ? handleSaveScenario : undefined}
            showMethodologyLink={showMethodologyLink}
          />
        )}
      </Card>
    </div>
  );
};

export default HRISCalculator;