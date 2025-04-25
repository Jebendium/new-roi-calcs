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
 * Props for the EfficiencyGainsInputs component
 */
interface EfficiencyGainsInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  errors?: Record<string, string>;
}

/**
 * Component for capturing efficiency gains inputs
 * 
 * @param props - The component props
 * @returns A form component for efficiency gains
 */
const EfficiencyGainsInputs: React.FC<EfficiencyGainsInputsProps> = ({
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
  
  // Calculate total annual hours
  const totalAnnualPayRuns = 
    (inputs.monthlyPayrollsCount * 12) + 
    (inputs.fourWeeklyPayrollsCount * 13) + 
    (inputs.weeklyPayrollsCount * 52) + 
    (inputs.fortnightlyPayrollsCount * 26) +
    (inputs.lunarPayrollsCount * 13.04);
    
  const annualProcessingHours = inputs.hoursPerPayRun * totalAnnualPayRuns;
  const annualQueryHours = inputs.queryHandlingHoursPerMonth * 12;
  const totalAnnualHours = annualProcessingHours + annualQueryHours;
  
  // Calculate potential savings in processing time
  const hoursSaved = 
    (annualProcessingHours * (inputs.processingTimeReduction / 100)) + 
    (annualQueryHours * (inputs.queryReduction / 100));
    
  const costSavings = hoursSaved * inputs.avgHourlyRate;
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Efficiency Gains
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Enter information about your current payroll processing times and potential improvements with a new system.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Current Processing Times */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Current Processing Times
          </Typography>
          
          <TextField
            label="Hours Per Pay Run"
            type="text"
            fullWidth
            value={inputs.hoursPerPayRun === 0 ? '0' : inputs.hoursPerPayRun}
            onChange={handleNumericChange('hoursPerPayRun')}
            error={!!errors?.hoursPerPayRun}
            helperText={errors?.hoursPerPayRun || 'Average hours spent processing each payroll cycle'}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Query Handling Hours Per Month"
            type="text"
            fullWidth
            value={inputs.queryHandlingHoursPerMonth === 0 ? '0' : inputs.queryHandlingHoursPerMonth}
            onChange={handleNumericChange('queryHandlingHoursPerMonth')}
            error={!!errors?.queryHandlingHoursPerMonth}
            helperText={errors?.queryHandlingHoursPerMonth || 'Hours spent handling employee payroll queries each month'}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Average Hourly Rate"
            type="text"
            fullWidth
            value={inputs.avgHourlyRate === 0 ? '0' : inputs.avgHourlyRate}
            onChange={handleNumericChange('avgHourlyRate')}
            error={!!errors?.avgHourlyRate}
            helperText={errors?.avgHourlyRate || 'Average hourly cost of payroll staff including overhead'}
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
        
        {/* Improvement Estimates */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Improvement Estimates
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>
              Processing Time Reduction: {inputs.processingTimeReduction}%
            </Typography>
            <Slider
              value={inputs.processingTimeReduction}
              onChange={handleSliderChange('processingTimeReduction')}
              valueLabelDisplay="auto"
              step={5}
              marks
              min={0}
              max={95}
            />
            <Typography variant="body2" color="text.secondary">
              Estimated reduction in routine payroll processing time
            </Typography>
          </Box>
          
          <Box>
            <Typography gutterBottom>
              Query Reduction: {inputs.queryReduction}%
            </Typography>
            <Slider
              value={inputs.queryReduction}
              onChange={handleSliderChange('queryReduction')}
              valueLabelDisplay="auto"
              step={5}
              marks
              min={0}
              max={95}
            />
            <Typography variant="body2" color="text.secondary">
              Estimated reduction in employee payroll queries
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      {/* Time and Cost Summary */}
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
              Current Annual Time:
            </Typography>
            <Typography variant="body2">
              Processing Hours: {annualProcessingHours.toFixed(1)} hours
            </Typography>
            <Typography variant="body2">
              Query Handling: {annualQueryHours.toFixed(1)} hours
            </Typography>
            <Typography variant="body1" fontWeight={500} sx={{ mt: 1 }}>
              Total: {totalAnnualHours.toFixed(1)} hours
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
              Hours Saved: {hoursSaved.toFixed(1)} hours
            </Typography>
            <Typography variant="body1" fontWeight={500} sx={{ mt: 1 }}>
              Cost Savings: £{costSavings.toFixed(0)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EfficiencyGainsInputs;