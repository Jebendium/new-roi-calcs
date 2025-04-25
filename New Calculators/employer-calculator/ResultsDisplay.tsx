import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { CalculationResult } from '../../lib/calculationFunctions';
import EmployerNIResults from './EmployerNIResults';

interface ResultsDisplayProps {
  showResults: boolean;
  calculationResult: CalculationResult | null;
  employeeCount: string;
  averageSalary: string;
  taxYear: string;
  showScenarioResults: boolean;
  scenarioResult: CalculationResult | null;
  onGenerateReport: () => void;
  resultsRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Component to display calculation results using core components
 */
const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  showResults,
  calculationResult,
  employeeCount,
  averageSalary,
  taxYear,
  showScenarioResults,
  scenarioResult,
  onGenerateReport,
  resultsRef
}) => {
  if (!showResults && !showScenarioResults) {
    return null;
  }

  return (
    <div id="results-container" ref={resultsRef}>
      {/* Main Results */}
      {showResults && calculationResult && !showScenarioResults && (
        <Box sx={{ mb: 0 }}>
          <EmployerNIResults
            result={calculationResult}
            employeeCount={Number(employeeCount)}
            averageSalary={Number(averageSalary)}
            taxYear={taxYear}
          />
          
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              color="secondary"
              startIcon={<PictureAsPdfIcon />}
              onClick={onGenerateReport}
            >
              Generate Report
            </Button>
          </Box>
        </Box>
      )}
      
      {/* What-If Scenario Results */}
      {showScenarioResults && scenarioResult && calculationResult && (
        <Box>
          <Typography variant="h5" gutterBottom>Original Configuration Results</Typography>
          <Box sx={{ mb: 4 }}>
            <EmployerNIResults
              result={calculationResult}
              employeeCount={Number(employeeCount)}
              averageSalary={Number(averageSalary)}
              taxYear={taxYear}
            />
          </Box>
          
          <Typography variant="h5" gutterBottom>What-If Scenario Results</Typography>
          <Box sx={{ mb: 2 }}>
            <EmployerNIResults
              result={scenarioResult}
              employeeCount={Number(employeeCount)}
              averageSalary={Number(averageSalary)}
              taxYear={taxYear}
            />
          </Box>
          
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              color="secondary"
              startIcon={<PictureAsPdfIcon />}
              onClick={onGenerateReport}
            >
              Generate Comparison Report
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default ResultsDisplay;