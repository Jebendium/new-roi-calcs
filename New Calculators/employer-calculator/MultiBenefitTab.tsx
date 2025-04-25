import React from 'react';
import { 
  Grid, 
  Box, 
  Button 
} from '@mui/material';
import { BenefitType, BenefitConfig } from '../../lib/calculationFunctions';
import MultiBenefitConfig from './MultiBenefitConfig';
import CalculatorForm from './CalculatorForm';
import { SelectChangeEvent } from '@mui/material';

interface MultiBenefitTabProps {
  taxYear: string;
  employeeCount: string;
  averageSalary: string;
  benefitConfig: {
    [key in BenefitType]: BenefitConfig;
  };
  onTaxYearChange: (event: SelectChangeEvent) => void;
  onEmployeeCountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAverageSalaryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBenefitConfigChange: (benefitType: BenefitType, config: BenefitConfig) => void;
  onCalculate: () => void;
  onReset: () => void;
}

/**
 * Component for the Multi-Benefit tab
 */
const MultiBenefitTab: React.FC<MultiBenefitTabProps> = ({
  taxYear,
  employeeCount,
  averageSalary,
  benefitConfig,
  onTaxYearChange,
  onEmployeeCountChange,
  onAverageSalaryChange,
  onBenefitConfigChange,
  onCalculate,
  onReset
}) => {
  return (
    <>
      <CalculatorForm
        taxYear={taxYear}
        employeeCount={employeeCount}
        averageSalary={averageSalary}
        onTaxYearChange={onTaxYearChange}
        onEmployeeCountChange={onEmployeeCountChange}
        onAverageSalaryChange={onAverageSalaryChange}
      />
      
      <Grid item xs={12}>
        <MultiBenefitConfig 
          benefitConfig={benefitConfig}
          onChange={onBenefitConfigChange}
        />
      </Grid>
      
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onReset}>
            Reset
          </Button>
          <Button variant="contained" onClick={onCalculate}>
            Calculate Savings
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default MultiBenefitTab;
