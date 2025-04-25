import React from 'react';
import { 
  Typography, 
  Paper, 
  Button, 
  Box, 
  Tooltip, 
  IconButton,
  Tabs,
  Tab,
  Snackbar,
  Alert
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CalculateIcon from '@mui/icons-material/Calculate';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

// Import the calculator state hook
import useCalculatorState from './hooks/useCalculatorState';

// Import Tab Components
import TabPanel from './shared/TabPanel';
import ValidationWarnings from './shared/ValidationWarnings';

// Import Input Components
import CompanyInfoInputs from './InputTabs/CompanyInfoInputs';
import CurrentPayrollCostsInputs from './InputTabs/CurrentPayrollCostsInputs';
import EfficiencyGainsInputs from './InputTabs/EfficiencyGainsInputs';
import ReworkReductionInputs from './InputTabs/ReworkReductionInputs';
import PaperCostSavingsInputs from './InputTabs/PaperCostSavingsInputs';
import SystemCostsInputs from './InputTabs/SystemCostsInputs';

// Import Results Components
import PayrollSystemResults from './ResultsTabs/PayrollSystemResults';
import ManagedPayrollResults from './ResultsTabs/ManagedPayrollResults';
import ComparisonResults from './ResultsTabs/ComparisonResults';

/**
 * Combined Payroll ROI Calculator
 * This component provides a unified interface for calculating ROI for both
 * Payroll System implementations and Managed Payroll services.
 * 
 * @returns JSX.Element The combined calculator component
 */
const CombinedPayrollCalculator: React.FC = () => {
  const {
    activeTab,
    showResults,
    inputs,
    payrollSystemResults,
    managedPayrollResults,
    validationWarnings,
    hasErrors,
    snackbarOpen,
    snackbarMessage,
    handleTabChange,
    handleInputChange,
    handleCalculate,
    handleReset,
    handleExportPDF,
    setSnackbarOpen
  } = useCalculatorState();

  // PDF export is handled by the useCalculatorState hook

  // Create input tabs
  const inputTabs = [
    { label: "Company Info", id: "tab-0", component: <CompanyInfoInputs inputs={inputs} onChange={handleInputChange} /> },
    { label: "Current Costs", id: "tab-1", component: <CurrentPayrollCostsInputs inputs={inputs} onChange={handleInputChange} /> },
    { label: "Efficiency Gains", id: "tab-2", component: <EfficiencyGainsInputs inputs={inputs} onChange={handleInputChange} /> },
    { label: "Rework Reduction", id: "tab-3", component: <ReworkReductionInputs inputs={inputs} onChange={handleInputChange} /> },
    { label: "Paper Savings", id: "tab-4", component: <PaperCostSavingsInputs inputs={inputs} onChange={handleInputChange} /> },
    { label: "System Costs", id: "tab-5", component: <SystemCostsInputs inputs={inputs} onChange={handleInputChange} /> }
  ];

  // Create results tabs (only show if results are available)
  const resultsTabs = showResults ? [
    { label: "Payroll System", id: "tab-6", component: <PayrollSystemResults results={payrollSystemResults} inputs={{ employeeCount: inputs.employeeCount, currentAnnualCost: inputs.currentStaffCosts + inputs.currentSoftwareCosts + inputs.currentTrainingCosts + inputs.currentInfrastructureCosts + inputs.currentOtherCosts }} /> },
    { label: "Managed Payroll", id: "tab-7", component: <ManagedPayrollResults results={managedPayrollResults} inputs={{ employeeCount: inputs.employeeCount, currentAnnualCost: inputs.currentStaffCosts + inputs.currentSoftwareCosts + inputs.currentTrainingCosts + inputs.currentInfrastructureCosts + inputs.currentOtherCosts }} /> },
    { label: "Comparison", id: "tab-8", component: <ComparisonResults payrollSystemResults={payrollSystemResults} managedPayrollResults={managedPayrollResults} inputs={inputs} /> }
  ] : [];

  // Combine tabs based on whether results are shown
  const allTabs = [...inputTabs, ...resultsTabs];

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Payroll ROI Calculator
        <Tooltip title="Compare the ROI of implementing a new payroll system vs. using a managed payroll service">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      
      <Typography variant="body1" paragraph>
        This calculator helps you compare the financial benefits of implementing a new payroll system 
        versus outsourcing to a managed payroll service. Enter your company details and current 
        costs to see which option provides the best return on investment.
      </Typography>
      
      {/* Show validation warnings if there are any */}
      {validationWarnings.length > 0 && (
        <ValidationWarnings warnings={validationWarnings} />
      )}
      
      {/* Tabs navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Calculator tabs"
        >
          {allTabs.map((tab, index) => (
            <Tab 
              key={tab.id} 
              label={tab.label} 
              id={tab.id} 
              aria-controls={`tabpanel-${index}`} 
            />
          ))}
        </Tabs>
      </Box>
      
      {/* Tab panels */}
      <div id="combined-payroll-report">
        {allTabs.map((tab, index) => (
          <TabPanel key={tab.id} value={activeTab} index={index}>
            {tab.component}
          </TabPanel>
        ))}
      </div>
      
      {/* Action buttons */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        {!showResults ? (
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<CalculateIcon />} 
            onClick={handleCalculate}
            disabled={hasErrors}
          >
            Calculate ROI
          </Button>
        ) : (
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<PictureAsPdfIcon />} 
            onClick={handleExportPDF}
          >
            Export PDF Report
          </Button>
        )}
        
        <Button 
          variant="outlined" 
          color="secondary" 
          startIcon={<RestartAltIcon />} 
          onClick={handleReset}
        >
          Reset Calculator
        </Button>
      </Box>
      
      {/* Link to methodology page */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button 
          variant="text" 
          color="primary" 
          component="a" 
          href="/roi/combined-payroll/methodology"
        >
          How does this calculator work?
        </Button>
      </Box>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={hasErrors ? "error" : "success"} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CombinedPayrollCalculator;
