import React, { useMemo } from 'react';
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
  
  // Calculate total annual recurring costs
  const totalAnnualCosts = useMemo(() => {
    return (inputs.monthlyCost * 12) + 
           (inputs.additionalMonthlyCosts * 12) + 
           inputs.additionalAnnualCosts;
  }, [
    inputs.monthlyCost,
    inputs.additionalMonthlyCosts,
    inputs.additionalAnnualCosts
  ]);
  
  // Calculate total investment in first year
  const totalFirstYearCosts = useMemo(() => {
    return totalAnnualCosts + inputs.additionalOneOffCosts;
  }, [totalAnnualCosts, inputs.additionalOneOffCosts]);
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        System Costs
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Enter the costs associated with the new payroll system or managed payroll service.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Monthly Cost */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Monthly Cost"
            type="number"
            fullWidth
            value={inputs.monthlyCost === 0 ? '' : inputs.monthlyCost}
            onChange={handleNumericChange('monthlyCost')}
            error={!!errors?.monthlyCost}
            helperText={errors?.monthlyCost || 'Core monthly subscription or service fee'}
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
        
        {/* Additional Monthly Costs */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Additional Monthly Costs"
            type="number"
            fullWidth
            value={inputs.additionalMonthlyCosts === 0 ? '' : inputs.additionalMonthlyCosts}
            onChange={handleNumericChange('additionalMonthlyCosts')}
            error={!!errors?.additionalMonthlyCosts}
            helperText={errors?.additionalMonthlyCosts || 'Add-on modules, additional services, etc.'}
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
        
        {/* Additional Annual Costs */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Additional Annual Costs"
            type="number"
            fullWidth
            value={inputs.additionalAnnualCosts === 0 ? '' : inputs.additionalAnnualCosts}
            onChange={handleNumericChange('additionalAnnualCosts')}
            error={!!errors?.additionalAnnualCosts}
            helperText={errors?.additionalAnnualCosts || 'Annual maintenance, compliance updates, etc.'}
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
        
        {/* One-off Costs */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Additional One-off Costs"
            type="number"
            fullWidth
            value={inputs.additionalOneOffCosts === 0 ? '' : inputs.additionalOneOffCosts}
            onChange={handleNumericChange('additionalOneOffCosts')}
            error={!!errors?.additionalOneOffCosts}
            helperText={errors?.additionalOneOffCosts || 'Implementation, data migration, etc.'}
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
          <TextField
            label="Wage Savings"
            type="number"
            fullWidth
            value={inputs.wageSavings === 0 ? '' : inputs.wageSavings}
            onChange={handleNumericChange('wageSavings')}
            error={!!errors?.wageSavings}
            helperText={errors?.wageSavings || 'Annual salary savings from staff reduction or reallocation'}
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
      
      {/* Cost Summary */}
      <Typography variant="subtitle1" gutterBottom>
        Cost Summary
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              borderRadius: 1
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Annual Recurring Costs:
            </Typography>
            <Typography variant="h6" color="text.primary">
              £{totalAnnualCosts.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Monthly: £{((inputs.monthlyCost + inputs.additionalMonthlyCosts) || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: 'warning.light',
              color: 'warning.contrastText',
              borderRadius: 1
            }}
          >
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.9 }}>
              First Year Total Costs:
            </Typography>
            <Typography variant="h6" color="inherit">
              £{totalFirstYearCosts.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
            <Typography variant="caption" color="inherit" sx={{ opacity: 0.9 }}>
              One-off: £{(inputs.additionalOneOffCosts || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SystemCostsInputs;