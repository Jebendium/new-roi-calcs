import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Divider,
  InputAdornment,
  Slider,
  Tooltip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
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
    _event: Event,
    newValue: number | number[]
  ) => {
    onChange(field, newValue as number);
  };
  
  // Percentage display for sliders
  const valuetext = (value: number) => {
    return `${value}%`;
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Efficiency Gains
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Estimate time savings from implementing a new payroll system or managed payroll service.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Current time spent */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Hours per Pay Run"
            type="number"
            fullWidth
            value={inputs.hoursPerPayRun === 0 ? '' : inputs.hoursPerPayRun}
            onChange={handleNumericChange('hoursPerPayRun')}
            error={!!errors?.hoursPerPayRun}
            helperText={errors?.hoursPerPayRun || 'Current hours spent on each payroll run'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    hrs
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            label="Query Handling Hours per Month"
            type="number"
            fullWidth
            value={inputs.queryHandlingHoursPerMonth === 0 ? '' : inputs.queryHandlingHoursPerMonth}
            onChange={handleNumericChange('queryHandlingHoursPerMonth')}
            error={!!errors?.queryHandlingHoursPerMonth}
            helperText={errors?.queryHandlingHoursPerMonth || 'Hours spent handling employee queries'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" component="span">
                    hrs
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            label="Average Hourly Rate"
            type="number"
            fullWidth
            value={inputs.avgHourlyRate === 0 ? '' : inputs.avgHourlyRate}
            onChange={handleNumericChange('avgHourlyRate')}
            error={!!errors?.avgHourlyRate}
            helperText={errors?.avgHourlyRate || 'Average hourly cost of payroll staff'}
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
          Expected Time Reductions
        </Typography>
        <Tooltip title="For managed payroll, these values will be set to 100% in the calculation">
          <InfoIcon color="info" sx={{ ml: 1, fontSize: '1rem' }} />
        </Tooltip>
      </Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        Estimate percentage reductions in time spent on each activity. For Managed Payroll calculations, 100% efficiency will be assumed.
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            Processing Time Reduction
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={inputs.processingTimeReduction}
              onChange={handleSliderChange('processingTimeReduction')}
              aria-labelledby="processing-time-reduction-slider"
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={5}
              marks
              min={0}
              max={100}
              valueLabelFormat={valuetext}
            />
          </Box>
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">0%</Typography>
            <Typography variant="body2" color="primary" fontWeight="medium">
              {inputs.processingTimeReduction}%
            </Typography>
            <Typography variant="body2" color="text.secondary">100%</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            Query Handling Time Reduction
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={inputs.queryReduction}
              onChange={handleSliderChange('queryReduction')}
              aria-labelledby="query-reduction-slider"
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={5}
              marks
              min={0}
              max={100}
              valueLabelFormat={valuetext}
            />
          </Box>
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">0%</Typography>
            <Typography variant="body2" color="primary" fontWeight="medium">
              {inputs.queryReduction}%
            </Typography>
            <Typography variant="body2" color="text.secondary">100%</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EfficiencyGainsInputs;