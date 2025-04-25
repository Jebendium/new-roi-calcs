import React from 'react';
import { 
  Grid, 
  Box, 
  Button, 
  Typography, 
  Divider, 
  Alert,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import CalculatorForm from './CalculatorForm';
import { SelectChangeEvent } from '@mui/material';

interface SalaryBandsTabProps {
  taxYear: string;
  employeeCount: string;
  averageSalary: string;
  useSalaryBands: boolean;
  onTaxYearChange: (event: SelectChangeEvent) => void;
  onEmployeeCountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAverageSalaryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUseSalaryBandsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCalculate: () => void;
  onReset: () => void;
}

/**
 * Component for the Salary Bands tab
 */
const SalaryBandsTab: React.FC<SalaryBandsTabProps> = ({
  taxYear,
  employeeCount,
  averageSalary,
  useSalaryBands,
  onTaxYearChange,
  onEmployeeCountChange,
  onAverageSalaryChange,
  onUseSalaryBandsChange,
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
        <Divider />
        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          Salary Band Settings
        </Typography>
        <Alert severity="info" sx={{ mb: 3 }}>
          Salary band calculation allows for more accurate estimates by accounting for different salary ranges within your organisation.
        </Alert>
        <FormControlLabel
          control={
            <Checkbox
              checked={useSalaryBands}
              onChange={onUseSalaryBandsChange}
            />
          }
          label="Use detailed salary bands for calculation"
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

export default SalaryBandsTab;
