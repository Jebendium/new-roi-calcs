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
 * Props for the ReworkReductionInputs component
 */
interface ReworkReductionInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  errors?: Record<string, string>;
}

/**
 * Component for capturing rework reduction inputs
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
        Rework Reduction
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Estimate reductions in payroll errors and compliance issues that require rework. 
        Rework might include rollbacks, supplementary runs, and manual corrections.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Payroll Errors */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Annual Payroll Errors"
            type="number"
            fullWidth
            value={inputs.annualPayrollErrors === 0 ? '' : inputs.annualPayrollErrors}
            onChange={handleNumericChange('annualPayrollErrors')}
            error={!!errors?.annualPayrollErrors}
            helperText={errors?.annualPayrollErrors || 'Number of errors requiring rework per year'}
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
        
        <Grid item xs={12} md={6}>
          <TextField
            label="Average Cost per Rework"
            type="number"
            fullWidth
            value={inputs.avgReworkCost === 0 ? '' : inputs.avgReworkCost}
            onChange={handleNumericChange('avgReworkCost')}
            error={!!errors?.avgReworkCost}
            helperText={errors?.avgReworkCost || 'Average cost to fix each error (time, resources)'}
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
        
        {/* Compliance Issues */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Annual Compliance Issues"
            type="number"
            fullWidth
            value={inputs.annualComplianceIssues === 0 ? '' : inputs.annualComplianceIssues}
            onChange={handleNumericChange('annualComplianceIssues')}
            error={!!errors?.annualComplianceIssues}
            helperText={errors?.annualComplianceIssues || 'Number of compliance issues per year'}
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
        
        <Grid item xs={12} md={6}>
          <TextField
            label="Average Compliance Cost"
            type="number"
            fullWidth
            value={inputs.avgComplianceCost === 0 ? '' : inputs.avgComplianceCost}
            onChange={handleNumericChange('avgComplianceCost')}
            error={!!errors?.avgComplianceCost}
            helperText={errors?.avgComplianceCost || 'Average cost per compliance issue (fines, fees)'}
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
          Expected Error Reductions
        </Typography>
        <Tooltip title="For managed payroll, these values will be set to 100% in the calculation">
          <InfoIcon color="info" sx={{ ml: 1, fontSize: '1rem' }} />
        </Tooltip>
      </Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        Estimate percentage reductions in errors and compliance issues. For Managed Payroll calculations, 100% reduction will be assumed.
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            Payroll Error Reduction
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={inputs.errorReduction}
              onChange={handleSliderChange('errorReduction')}
              aria-labelledby="error-reduction-slider"
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
              {inputs.errorReduction}%
            </Typography>
            <Typography variant="body2" color="text.secondary">100%</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            Compliance Issue Reduction
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={inputs.complianceReduction}
              onChange={handleSliderChange('complianceReduction')}
              aria-labelledby="compliance-reduction-slider"
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
              {inputs.complianceReduction}%
            </Typography>
            <Typography variant="body2" color="text.secondary">100%</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReworkReductionInputs;