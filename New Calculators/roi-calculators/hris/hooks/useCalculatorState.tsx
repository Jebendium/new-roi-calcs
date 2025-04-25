import { useState } from 'react';
import { 
  TimeSavingsInput, 
  ErrorReductionInput, 
  StrategicValueInput, 
  HRISCostInput, 
  HRISROIResults 
} from '../../../../types/roiCalculatorTypes';
import { useHRISCalculations } from './useHRISCalculations';

export const useCalculatorState = () => {
  // State for tab control
  const [tabValue, setTabValue] = useState(0);
  
  // State for user inputs
  const [timeSavings, setTimeSavings] = useState<TimeSavingsInput>({
    hrStaffCount: 2,
    avgHourlyRate: 20,
    adminHoursPerWeek: 10,
    dataEntryHoursPerWeek: 8,
    reportingHoursPerWeek: 5,
    queryHandlingHoursPerWeek: 7,
    adminTimeReduction: 70,
    dataEntryTimeReduction: 80,
    reportingTimeReduction: 60,
    queryReduction: 70
  });

  const [errorReduction, setErrorReduction] = useState<ErrorReductionInput>({
    annualPayrollErrors: 120,
    avgErrorCost: 70,
    payrollErrorReduction: 50,
    annualComplianceIssues: 4,
    avgComplianceCost: 10000,
    complianceIssueReduction: 75
  });

  const [strategicValue, setStrategicValue] = useState<StrategicValueInput>({
    annualEmployeeTurnover: 15,
    avgReplacementCost: 10000,
    turnoverReduction: 20,
    improvedDecisionMakingValue: 15000
  });

  const [costInputs, setCostInputs] = useState<HRISCostInput>({
    implementationCost: 5000,
    trainingCost: 2000,
    annualLicenseFee: 6000,
    employeeCount: 100,
    initialCost: 0,
    annualMaintenanceFee: 0,
    annualSupportFee: 0,
    initialSoftwareCost: 3000,
    dataMigrationCost: 1000,
    annualSupportCost: 1500
  });

  // State for calculation results
  const [results, setResults] = useState<HRISROIResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [useIndustryBenchmarks, setUseIndustryBenchmarks] = useState(true);

  // Get calculation function
  const { calculateResults } = useHRISCalculations();

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Toggle industry benchmarks
  const toggleIndustryBenchmarks = () => {
    setUseIndustryBenchmarks(!useIndustryBenchmarks);
    if (!useIndustryBenchmarks) {
      // Apply industry benchmarks
      setTimeSavings({
        hrStaffCount: 2,
        avgHourlyRate: 20,
        adminHoursPerWeek: 10,
        dataEntryHoursPerWeek: 8,
        reportingHoursPerWeek: 5,
        queryHandlingHoursPerWeek: 7,
        adminTimeReduction: 70,
        dataEntryTimeReduction: 80,
        reportingTimeReduction: 60,
        queryReduction: 70
      });
      setErrorReduction({
        annualPayrollErrors: 120,
        avgErrorCost: 70,
        payrollErrorReduction: 50,
        annualComplianceIssues: 4,
        avgComplianceCost: 10000,
        complianceIssueReduction: 75
      });
      setStrategicValue({
        annualEmployeeTurnover: 15,
        avgReplacementCost: 10000,
        turnoverReduction: 20,
        improvedDecisionMakingValue: 15000
      });
    }
  };

  // Calculate ROI
  const calculateROI = () => {
    const calculatedResults = calculateResults(timeSavings, errorReduction, strategicValue, costInputs);
    setResults(calculatedResults);
    setShowResults(true);
    // Switch to results tab
    setTabValue(5);
  };

  // Reset calculator
  const resetCalculator = () => {
    setTimeSavings({
      hrStaffCount: 2,
      avgHourlyRate: 20,
      adminHoursPerWeek: 10,
      dataEntryHoursPerWeek: 8,
      reportingHoursPerWeek: 5,
      queryHandlingHoursPerWeek: 7,
      adminTimeReduction: 70,
      dataEntryTimeReduction: 80,
      reportingTimeReduction: 60,
      queryReduction: 70
    });
    
    setErrorReduction({
      annualPayrollErrors: 120,
      avgErrorCost: 70,
      payrollErrorReduction: 50,
      annualComplianceIssues: 4,
      avgComplianceCost: 10000,
      complianceIssueReduction: 75
    });
    
    setStrategicValue({
      annualEmployeeTurnover: 15,
      avgReplacementCost: 10000,
      turnoverReduction: 20,
      improvedDecisionMakingValue: 15000
    });
    
    setCostInputs({
      implementationCost: 5000,
      trainingCost: 2000,
      annualLicenseFee: 6000,
      employeeCount: 100,
      initialCost: 0,
      annualMaintenanceFee: 0,
      annualSupportFee: 0,
      initialSoftwareCost: 3000,
      dataMigrationCost: 1000,
      annualSupportCost: 1500
    });
    
    setResults(null);
    setShowResults(false);
    setUseIndustryBenchmarks(true);
    // Switch to first tab
    setTabValue(0);
  };

  return {
    tabValue,
    timeSavings,
    errorReduction,
    strategicValue,
    costInputs,
    results,
    showResults,
    useIndustryBenchmarks,
    setTimeSavings,
    setErrorReduction,
    setStrategicValue,
    setCostInputs,
    handleTabChange,
    toggleIndustryBenchmarks,
    calculateROI,
    resetCalculator
  };
};