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
 * Props for the CurrentPayrollCostsInputs component
 */
interface CurrentPayrollCostsInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  errors?: Record<string, string>;
}

/**
 * Component for capturing current payroll costs
 * 
 * @param props - The component props
 * @returns A form component for current payroll costs
 */
const CurrentPayrollCostsInputs: React.FC<CurrentPayrollCostsInputsProps> = ({
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
  
  // Calculate total current costs
  const totalCurrentCosts = useMemo(() => {
    return (
      inputs.currentStaffCosts +
      inputs.currentSoftwareCosts +
      inputs.currentTrainingCosts +
      inputs.currentInfrastructureCosts +
      inputs.currentOtherCosts
    );
  }, [
    inputs.currentStaffCosts,
    inputs.currentSoftwareCosts,
    inputs.currentTrainingCosts,
    inputs.currentInfrastructureCosts,
    inputs.currentOtherCosts
  ]);
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Current Payroll Costs
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Please provide information about your current annual payroll processing costs.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Current Staff Costs */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Current Payroll Staff Costs"
            type="text"
            fullWidth
            value={inputs.currentStaffCosts === 0 ? '0' : inputs.currentStaffCosts}
            onChange={handleNumericChange('currentStaffCosts')}
            error={!!errors?.currentStaffCosts}
            helperText={errors?.currentStaffCosts || 'Total annual salaries for payroll staff'}
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
        
        {/* Current Software Costs */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Current Payroll Software Costs"
            type="text"
            fullWidth
            value={inputs.currentSoftwareCosts === 0 ? '0' : inputs.currentSoftwareCosts}
            onChange={handleNumericChange('currentSoftwareCosts')}
            error={!!errors?.currentSoftwareCosts}
            helperText={errors?.currentSoftwareCosts || 'Annual license fees, maintenance, etc.'}
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
        
        {/* Current Training Costs */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Current Payroll Training Costs"
            type="text"
            fullWidth
            value={inputs.currentTrainingCosts === 0 ? '0' : inputs.currentTrainingCosts}
            onChange={handleNumericChange('currentTrainingCosts')}
            error={!!errors?.currentTrainingCosts}
            helperText={errors?.currentTrainingCosts || 'Annual training, certifications, etc.'}
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
        
        {/* Current Infrastructure Costs */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Current Payroll Infrastructure Costs"
            type="text"
            fullWidth
            value={inputs.currentInfrastructureCosts === 0 ? '0' : inputs.currentInfrastructureCosts}
            onChange={handleNumericChange('currentInfrastructureCosts')}
            error={!!errors?.currentInfrastructureCosts}
            helperText={errors?.currentInfrastructureCosts || 'Hardware, cloud hosting, etc.'}
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
        
        {/* Current Other Costs */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Other Current Payroll Costs"
            type="text"
            fullWidth
            value={inputs.currentOtherCosts === 0 ? '0' : inputs.currentOtherCosts}
            onChange={handleNumericChange('currentOtherCosts')}
            error={!!errors?.currentOtherCosts}
            helperText={errors?.currentOtherCosts || 'Any other annual costs related to payroll'}
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
      
      {/* Total Current Costs Summary */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mt: 2, 
          bgcolor: 'primary.light', 
          color: 'primary.contrastText',
          borderRadius: 1
        }}
      >
        <Typography variant="subtitle1" fontWeight={500}>
          Total Current Annual Payroll Processing Cost:
        </Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          £{totalCurrentCosts.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
        </Typography>
      </Paper>
    </Box>
  );
};

export default CurrentPayrollCostsInputs;