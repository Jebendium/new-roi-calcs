import React from 'react';
import { 
  Grid, 
  Box, 
  Button, 
  Typography, 
  Divider, 
  Slider 
} from '@mui/material';
import CalculatorForm from './CalculatorForm';
import { SelectChangeEvent } from '@mui/material';

interface MultiYearProjectionTabProps {
  taxYear: string;
  employeeCount: string;
  averageSalary: string;
  projectionYears: number;
  employeeGrowthRate: number;
  salaryGrowthRate: number;
  contributionGrowthRate: number;
  onTaxYearChange: (event: SelectChangeEvent) => void;
  onEmployeeCountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAverageSalaryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onProjectionYearsChange: (event: Event, value: number | number[]) => void;
  onEmployeeGrowthRateChange: (event: Event, value: number | number[]) => void;
  onSalaryGrowthRateChange: (event: Event, value: number | number[]) => void;
  onContributionGrowthRateChange: (event: Event, value: number | number[]) => void;
  onCalculate: () => void;
  onReset: () => void;
}

/**
 * Component for the Multi-Year Projection tab
 */
const MultiYearProjectionTab: React.FC<MultiYearProjectionTabProps> = ({
  taxYear,
  employeeCount,
  averageSalary,
  projectionYears,
  employeeGrowthRate,
  salaryGrowthRate,
  contributionGrowthRate,
  onTaxYearChange,
  onEmployeeCountChange,
  onAverageSalaryChange,
  onProjectionYearsChange,
  onEmployeeGrowthRateChange,
  onSalaryGrowthRateChange,
  onContributionGrowthRateChange,
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
          Projection Settings
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Typography gutterBottom>Projection Years: {projectionYears}</Typography>
        <Slider
          value={projectionYears}
          onChange={onProjectionYearsChange}
          step={1}
          marks
          min={1}
          max={5}
          valueLabelDisplay="auto"
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Typography gutterBottom>Annual Employee Growth Rate: {employeeGrowthRate}%</Typography>
        <Slider
          value={employeeGrowthRate}
          onChange={onEmployeeGrowthRateChange}
          step={1}
          marks
          min={0}
          max={20}
          valueLabelDisplay="auto"
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Typography gutterBottom>Annual Salary Growth Rate: {salaryGrowthRate}%</Typography>
        <Slider
          value={salaryGrowthRate}
          onChange={onSalaryGrowthRateChange}
          step={0.5}
          marks
          min={0}
          max={10}
          valueLabelDisplay="auto"
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Typography gutterBottom>Annual Contribution Growth Rate: {contributionGrowthRate}%</Typography>
        <Slider
          value={contributionGrowthRate}
          onChange={onContributionGrowthRateChange}
          step={0.5}
          marks
          min={0}
          max={10}
          valueLabelDisplay="auto"
        />
      </Grid>
      
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onReset}>
            Reset
          </Button>
          <Button variant="contained" onClick={onCalculate}>
            Calculate Projections
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default MultiYearProjectionTab;
