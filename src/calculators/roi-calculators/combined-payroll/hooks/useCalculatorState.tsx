'use client';

import { useState, useCallback } from 'react';
import { 
  CombinedPayrollInputs, 
  PayrollSystemResults, 
  ManagedPayrollResults, 
  defaultCombinedPayrollInputs, 
  ValidationWarning 
} from '../../../../types/combinedPayrollTypes';
import useValidation from './useValidation';
import usePayrollSystemCalculations from './usePayrollSystemCalculations';
import useManagedPayrollCalculations from './useManagedPayrollCalculations';
import useComparisonCalculations from './useComparisonCalculations';
import useExportPDF from './useExportPDF';

/**
 * Interface for the calculator state
 */
interface CalculatorState {
  // Tab and display state
  activeTab: number;
  showResults: boolean;
  
  // Input state
  inputs: CombinedPayrollInputs;
  
  // Calculation results
  payrollSystemResults: PayrollSystemResults | null;
  managedPayrollResults: ManagedPayrollResults | null;
  
  // Validation
  validationWarnings: ValidationWarning[];
  hasErrors: boolean;
  
  // Snackbar
  snackbarOpen: boolean;
  snackbarMessage: string;
  
  // Tab navigation helpers
  navigateToNextTab: () => void;
  navigateToPreviousTab: () => void;
  
  // Action handlers
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  handleInputChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  handleCalculate: () => void;
  handleReset: () => void;
  handleExportPDF: () => void;
  setSnackbarOpen: (open: boolean) => void;
  setSnackbarMessage: (message: string) => void;
}

/**
 * Hook to manage the state for the combined payroll calculator
 * 
 * @returns Calculator state and actions
 */
const useCalculatorState = (): CalculatorState => {
  // Tab and display state
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Input state
  const [inputs, setInputs] = useState<CombinedPayrollInputs>(defaultCombinedPayrollInputs);
  
  // Validation
  const validationWarnings = useValidation(inputs);
  const hasErrors = validationWarnings.some(warning => warning.type === 'error');
  
  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  
  // Calculate results using the custom hooks
  const payrollSystemResults = usePayrollSystemCalculations(inputs);
  const managedPayrollResults = useManagedPayrollCalculations(inputs);
  
  // Get comparison between the two results - used in results display
  useComparisonCalculations(
    showResults ? payrollSystemResults : null, 
    showResults ? managedPayrollResults : null
  );
  
  // PDF Export
  const { exportPDF } = useExportPDF(
    inputs,
    showResults ? payrollSystemResults : null,
    showResults ? managedPayrollResults : null,
    setSnackbarOpen,
    setSnackbarMessage
  );
  
  // Tab navigation helpers
  const navigateToNextTab = useCallback(() => {
    const maxInputTabs = 5; // 0-5 are input tabs
    const maxResultsTabs = showResults ? 8 : maxInputTabs; // 6-8 are result tabs if showing
    
    if (activeTab < maxResultsTabs) {
      setActiveTab(activeTab + 1);
    }
  }, [activeTab, showResults]);
  
  const navigateToPreviousTab = useCallback(() => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  }, [activeTab]);
  
  // Handler for tab changes
  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  }, []);
  
  // Handler for input changes
  const handleInputChange = useCallback((field: keyof CombinedPayrollInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
    
    // If results are shown and inputs change, hide the results
    if (showResults) {
      setShowResults(false);
    }
  }, [showResults]);
  
  // Handler for calculate button
  const handleCalculate = useCallback(() => {
    // Check for validation errors
    if (hasErrors) {
      setSnackbarMessage('Please correct the validation errors before calculating');
      setSnackbarOpen(true);
      return;
    }
    
    // Show the results and switch to results tab
    setShowResults(true);
    
    // Switch to first results tab (index 6)
    setActiveTab(6);
    
    // Show success message
    setSnackbarMessage('Calculation complete');
    setSnackbarOpen(true);
  }, [hasErrors]);
  
  // Handler for reset button
  const handleReset = useCallback(() => {
    // Reset inputs to defaults
    setInputs(defaultCombinedPayrollInputs);
    
    // Hide results
    setShowResults(false);
    
    // Return to first tab
    setActiveTab(0);
    
    // Show confirmation message
    setSnackbarMessage('Calculator has been reset');
    setSnackbarOpen(true);
  }, []);
  
  return {
    activeTab,
    showResults,
    inputs,
    payrollSystemResults: showResults ? payrollSystemResults : null,
    managedPayrollResults: showResults ? managedPayrollResults : null,
    validationWarnings,
    hasErrors,
    snackbarOpen,
    snackbarMessage,
    navigateToNextTab,
    navigateToPreviousTab,
    handleTabChange,
    handleInputChange,
    handleCalculate,
    handleReset,
    handleExportPDF: exportPDF,
    setSnackbarOpen,
    setSnackbarMessage
  };
};

export default useCalculatorState;