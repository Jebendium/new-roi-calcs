import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Divider,
  InputAdornment,
  Box,
  Tooltip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { CombinedPayrollInputs } from '../../../../types/combinedPayrollTypes';

/**
 * Props for the CompanyInfoInputs component
 */
interface CompanyInfoInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  errors?: Record<string, string>;
}

/**
 * Component for capturing company information inputs
 * 
 * @param props - The component props
 * @returns A form component for company information
 */
const CompanyInfoInputs: React.FC<CompanyInfoInputsProps> = ({ 
  inputs, 
  onChange,
  errors
}) => {
  // Handler for numeric input changes
  const handleNumericChange = (field: keyof CombinedPayrollInputs) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Convert empty string to 0 and non-empty to number
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    onChange(field, value);
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Company Information
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Please provide basic information about your company and payroll operations.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Employee Count */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Number of Employees"
            type="text"
            fullWidth
            value={inputs.employeeCount === 0 ? '0' : inputs.employeeCount}
            onChange={handleNumericChange('employeeCount')}
            error={!!errors?.employeeCount}
            helperText={errors?.employeeCount}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    #
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        {/* Payroll Staff */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Number of Payroll Staff"
            type="text"
            fullWidth
            value={inputs.payrollStaffCount === 0 ? '0' : inputs.payrollStaffCount}
            onChange={handleNumericChange('payrollStaffCount')}
            error={!!errors?.payrollStaffCount}
            helperText={errors?.payrollStaffCount}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    #
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        {/* Payroll Staff Salary */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Average Payroll Staff Annual Salary"
            type="text"
            fullWidth
            value={inputs.payrollStaffSalary === 0 ? '0' : inputs.payrollStaffSalary}
            onChange={handleNumericChange('payrollStaffSalary')}
            error={!!errors?.payrollStaffSalary}
            helperText={errors?.payrollStaffSalary}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    £
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6">
          Payroll Frequency
        </Typography>
        <Tooltip title="Indicate the number of each type of payroll you run">
          <InfoIcon color="info" sx={{ ml: 1, fontSize: '1rem' }} />
        </Tooltip>
      </Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        Enter the number of each type of payroll you run for your employees.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Monthly Payrolls */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Monthly Payrolls"
            type="text"
            fullWidth
            value={inputs.monthlyPayrollsCount === 0 ? '0' : inputs.monthlyPayrollsCount}
            onChange={handleNumericChange('monthlyPayrollsCount')}
            error={!!errors?.monthlyPayrollsCount}
            helperText={errors?.monthlyPayrollsCount || '12 pay runs per year'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    #
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        {/* 4-Weekly Payrolls */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="4-Weekly Payrolls"
            type="text"
            fullWidth
            value={inputs.fourWeeklyPayrollsCount === 0 ? '0' : inputs.fourWeeklyPayrollsCount}
            onChange={handleNumericChange('fourWeeklyPayrollsCount')}
            error={!!errors?.fourWeeklyPayrollsCount}
            helperText={errors?.fourWeeklyPayrollsCount || '13 pay runs per year'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    #
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        {/* Weekly Payrolls */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Weekly Payrolls"
            type="text"
            fullWidth
            value={inputs.weeklyPayrollsCount === 0 ? '0' : inputs.weeklyPayrollsCount}
            onChange={handleNumericChange('weeklyPayrollsCount')}
            error={!!errors?.weeklyPayrollsCount}
            helperText={errors?.weeklyPayrollsCount || '52 pay runs per year'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    #
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        {/* Fortnightly Payrolls */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Fortnightly Payrolls"
            type="text"
            fullWidth
            value={inputs.fortnightlyPayrollsCount === 0 ? '0' : inputs.fortnightlyPayrollsCount}
            onChange={handleNumericChange('fortnightlyPayrollsCount')}
            error={!!errors?.fortnightlyPayrollsCount}
            helperText={errors?.fortnightlyPayrollsCount || '26 pay runs per year'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    #
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyInfoInputs;