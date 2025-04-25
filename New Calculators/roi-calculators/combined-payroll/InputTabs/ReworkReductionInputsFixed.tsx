import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Slider,
  Divider,
  InputAdornment,
  Paper
} from '@mui/material';
import { CombinedPayrollInputs } from '../../../../types/combinedPayrollTypes';

/**
 * Props for the ReworkReductionInputs component
 */
interface ReworkReductionInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  errors?: Record<string, string>;
}

/**
 * Component for capturing rework reduction inputs (previously error reduction)
 * 
 * @param props - The component props
 * @returns A form component for rework reduction
 */
const ReworkReductionInputs: React.FC<ReworkReductionInputsProps> = ({
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
  
  // Handler for slider changes
  const handleSliderChange = (field: keyof CombinedPayrollInputs) => (
    event: Event,
    value: number | number[]
  ) => {
    onChange(field, value as number);
  };
  
  // Calculate current costs
  const currentErrorCost = inputs.annualPayrollErrors * inputs.avgReworkCost;
  const currentComplianceCost = inputs.annualComplianceIssues * inputs.avgComplianceCost;
  const totalCurrentCost = currentErrorCost + currentComplianceCost;
  
  // Calculate potential savings
  const errorSavings = currentErrorCost * (inputs.errorReduction / 100);
  const complianceSavings = currentComplianceCost * (inputs.complianceReduction / 100);
  const totalSavings = errorSavings + complianceSavings;
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Rework Reduction
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Enter information about payroll errors and compliance issues, and potential reductions with a new system.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Current Error Costs */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Current Rework & Compliance Costs
          </Typography>
          
          <TextField
            label="Annual Payroll Errors"
            type="text"
            fullWidth
            value={inputs.annualPayrollErrors === 0 ? '0' : inputs.annualPayrollErrors}
            onChange={handleNumericChange('annualPayrollErrors')}
            error={!!errors?.annualPayrollErrors}
            helperText={errors?.annualPayrollErrors || 'Number of payroll errors per year requiring correction'}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Average Rework Cost"
            type="text"
            fullWidth
            value={inputs.avgReworkCost === 0 ? '0' : inputs.avgReworkCost}
            onChange={handleNumericChange('avgReworkCost')}
            error={!!errors?.avgReworkCost}
            helperText={errors?.avgReworkCost || 'Average cost to correct a payroll error (staff time, etc.)'}
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
            label="Annual Compliance Issues"
            type="text"
            fullWidth
            value={inputs.annualComplianceIssues === 0 ? '0' : inputs.annualComplianceIssues}
            onChange={handleNumericChange('annualComplianceIssues')}
            error={!!errors?.annualComplianceIssues}
            helperText={errors?.annualComplianceIssues || 'Number of payroll compliance issues per year'}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Average Compliance Cost"
            type="text"
            fullWidth
            value={inputs.avgComplianceCost === 0 ? '0' : inputs.avgComplianceCost}
            onChange={handleNumericChange('avgComplianceCost')}
            error={!!errors?.avgComplianceCost}
            helperText={errors?.avgComplianceCost || 'Average cost per compliance issue (penalties, remediation)'}
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
        
        {/* Reduction Estimates */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Reduction Estimates
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>
              Error Reduction: {inputs.errorReduction}%
            </Typography>
            <Slider
              value={inputs.errorReduction}
              onChange={handleSliderChange('errorReduction')}
              valueLabelDisplay="auto"
              step={5}
              marks
              min={0}
              max={95}
            />
            <Typography variant="body2" color="text.secondary">
              Estimated reduction in payroll errors with new system
            </Typography>
          </Box>
          
          <Box>
            <Typography gutterBottom>
              Compliance Issue Reduction: {inputs.complianceReduction}%
            </Typography>
            <Slider
              value={inputs.complianceReduction}
              onChange={handleSliderChange('complianceReduction')}
              valueLabelDisplay="auto"
              step={5}
              marks
              min={0}
              max={95}
            />
            <Typography variant="body2" color="text.secondary">
              Estimated reduction in compliance issues with new system
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      {/* Cost and Savings Summary */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: 'background.default', 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Current Annual Costs:
            </Typography>
            <Typography variant="body2">
              Error Costs: £{currentErrorCost.toFixed(0)}
            </Typography>
            <Typography variant="body2">
              Compliance Costs: £{currentComplianceCost.toFixed(0)}
            </Typography>
            <Typography variant="body1" fontWeight={500} sx={{ mt: 1 }}>
              Total: £{totalCurrentCost.toFixed(0)}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: 'success.light', 
              color: 'success.contrastText',
              borderRadius: 1
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Potential Annual Savings:
            </Typography>
            <Typography variant="body2">
              Error Savings: £{errorSavings.toFixed(0)}
            </Typography>
            <Typography variant="body2">
              Compliance Savings: £{complianceSavings.toFixed(0)}
            </Typography>
            <Typography variant="body1" fontWeight={500} sx={{ mt: 1 }}>
              Total Savings: £{totalSavings.toFixed(0)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReworkReductionInputs;