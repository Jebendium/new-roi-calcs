import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Divider,
  InputAdornment,
  Paper
} from '@mui/material';
import { CombinedPayrollInputs } from '../../../../types/combinedPayrollTypes';

/**
 * Props for the SystemCostsInputs component
 */
interface SystemCostsInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  errors?: Record<string, string>;
}

/**
 * Component for capturing system costs inputs
 * 
 * @param props - The component props
 * @returns A form component for system costs
 */
const SystemCostsInputs: React.FC<SystemCostsInputsProps> = ({
  inputs,
  onChange,
  errors
}) => {
  // Handler for numeric input changes
  const handleNumericChange = (field: keyof CombinedPayrollInputs) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    onChange(field, value);
  };
  
  // Calculate annual and total costs
  const monthlyServiceCosts = inputs.monthlyCost + inputs.additionalMonthlyCosts;
  const annualServiceCosts = monthlyServiceCosts * 12;
  const totalAnnualCosts = annualServiceCosts + inputs.additionalAnnualCosts;
  const totalFirstYearCosts = totalAnnualCosts + inputs.additionalOneOffCosts;
  
  // Calculate per employee costs if applicable
  const monthlyPerEmployee = inputs.employeeCount > 0 ? 
    monthlyServiceCosts / inputs.employeeCount : 0;
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        System Costs
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Enter the costs for your selected payroll system or managed payroll service.
      </Typography>
      
      <Grid container spacing={3}>
        {/* System Costs */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Cost Details
          </Typography>
          
          <TextField
            label="Monthly Cost"
            type="text"
            fullWidth
            value={inputs.monthlyCost === 0 ? '0' : inputs.monthlyCost}
            onChange={handleNumericChange('monthlyCost')}
            error={!!errors?.monthlyCost}
            helperText={errors?.monthlyCost || 'Base monthly subscription fee or service charge'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    £
                  </Typography>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Additional Monthly Costs"
            type="text"
            fullWidth
            value={inputs.additionalMonthlyCosts === 0 ? '0' : inputs.additionalMonthlyCosts}
            onChange={handleNumericChange('additionalMonthlyCosts')}
            error={!!errors?.additionalMonthlyCosts}
            helperText={errors?.additionalMonthlyCosts || 'Any other monthly fees (add-ons, premium features, etc.)'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    £
                  </Typography>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Additional Annual Costs"
            type="text"
            fullWidth
            value={inputs.additionalAnnualCosts === 0 ? '0' : inputs.additionalAnnualCosts}
            onChange={handleNumericChange('additionalAnnualCosts')}
            error={!!errors?.additionalAnnualCosts}
            helperText={errors?.additionalAnnualCosts || 'Annual fees not included in monthly costs (e.g., annual maintenance)'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    £
                  </Typography>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Additional One-Off Costs"
            type="text"
            fullWidth
            value={inputs.additionalOneOffCosts === 0 ? '0' : inputs.additionalOneOffCosts}
            onChange={handleNumericChange('additionalOneOffCosts')}
            error={!!errors?.additionalOneOffCosts}
            helperText={errors?.additionalOneOffCosts || 'Implementation, data migration, training, etc.'}
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
        
        {/* Wage Savings */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Wage Savings & Cost Summary
          </Typography>
          
          <TextField
            label="Wage Savings"
            type="text"
            fullWidth
            value={inputs.wageSavings === 0 ? '0' : inputs.wageSavings}
            onChange={handleNumericChange('wageSavings')}
            error={!!errors?.wageSavings}
            helperText={errors?.wageSavings || 'Annual savings from reduced payroll staff or redeployment'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    £
                  </Typography>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: 'background.default', 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              mb: 3
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Cost Summary:
            </Typography>
            <Typography variant="body2">
              Monthly Service Cost: £{monthlyServiceCosts.toFixed(2)}
            </Typography>
            <Typography variant="body2">
              Annual Service Cost: £{annualServiceCosts.toFixed(2)}
            </Typography>
            <Typography variant="body2">
              Total Annual Cost: £{totalAnnualCosts.toFixed(2)}
            </Typography>
            <Typography variant="body2" fontWeight={500} sx={{ mt: 1 }}>
              First Year Cost: £{totalFirstYearCosts.toFixed(2)}
            </Typography>
          </Paper>
          
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: monthlyPerEmployee > 0 ? 'info.light' : 'background.default', 
              color: monthlyPerEmployee > 0 ? 'info.contrastText' : 'text.primary',
              border: monthlyPerEmployee > 0 ? 'none' : '1px solid',
              borderColor: 'divider',
              borderRadius: 1
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Per Employee Metrics:
            </Typography>
            <Typography variant="body2">
              Monthly Cost Per Employee: £{monthlyPerEmployee.toFixed(2)}
            </Typography>
            <Typography variant="body2">
              Annual Cost Per Employee: £{(monthlyPerEmployee * 12).toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Industry Benchmarks:
        </Typography>
        <Typography variant="body2" paragraph>
          • Modern cloud-based payroll systems typically cost £2-£6 per employee per month
        </Typography>
        <Typography variant="body2" paragraph>
          • Implementation costs typically range from £1,000-£10,000 depending on company size
        </Typography>
        <Typography variant="body2" paragraph>
          • Managed payroll services typically cost £4-£12 per employee per month
        </Typography>
        <Typography variant="body2">
          • Managed service transition costs are typically 50-75% lower than full system implementation
        </Typography>
      </Box>
    </Box>
  );
};

export default SystemCostsInputs;