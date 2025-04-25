import React from 'react';
import { 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Divider,
  Typography,
  SelectChangeEvent
} from '@mui/material';

interface CalculatorFormProps {
  taxYear: string;
  employeeCount: string;
  averageSalary: string;
  onTaxYearChange: (event: SelectChangeEvent) => void;
  onEmployeeCountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAverageSalaryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Common calculator form component with tax year, employee count, and average salary inputs
 */
const CalculatorForm: React.FC<CalculatorFormProps> = ({
  taxYear,
  employeeCount,
  averageSalary,
  onTaxYearChange,
  onEmployeeCountChange,
  onAverageSalaryChange
}) => {
  return (
    <Grid container spacing={3} sx={{ px: 2 }}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Tax Year</InputLabel>
          <Select
            value={taxYear}
            label="Tax Year"
            onChange={onTaxYearChange}
          >
            <MenuItem value="2023-2024">2023-2024</MenuItem>
            <MenuItem value="2024-2025">2024-2025</MenuItem>
            <MenuItem value="2025-2026">2025-2026 (Projected)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12}>
        <Divider />
        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          Company Details
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Number of Employees"
          type="number"
          value={employeeCount}
          onChange={onEmployeeCountChange}
          InputProps={{ inputProps: { min: 1 } }}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Average Annual Salary (£)"
          type="number"
          value={averageSalary}
          onChange={onAverageSalaryChange}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </Grid>
    </Grid>
  );
};

export default CalculatorForm;
