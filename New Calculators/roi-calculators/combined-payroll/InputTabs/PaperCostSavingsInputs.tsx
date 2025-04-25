import React, { useMemo } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Divider,
  InputAdornment,
  Paper,
  Tooltip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { CombinedPayrollInputs } from '../../../../types/combinedPayrollTypes';

/**
 * Props for the PaperCostSavingsInputs component
 */
interface PaperCostSavingsInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  errors?: Record<string, string>;
}

/**
 * Component for capturing paper cost savings inputs
 * 
 * @param props - The component props
 * @returns A form component for paper cost savings
 */
const PaperCostSavingsInputs: React.FC<PaperCostSavingsInputsProps> = ({
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
  
  // Calculate total monthly paper costs
  const totalMonthlyCosts = useMemo(() => {
    return inputs.monthlyPrintingCosts + inputs.monthlyDistributionCosts;
  }, [inputs.monthlyPrintingCosts, inputs.monthlyDistributionCosts]);
  
  // Calculate total annual paper costs
  const totalAnnualCosts = useMemo(() => {
    return totalMonthlyCosts * 12;
  }, [totalMonthlyCosts]);
  
  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Paper Cost Savings
        </Typography>
        <Tooltip title="These values default to £0 but can be adjusted if applicable">
          <InfoIcon color="info" sx={{ ml: 1, fontSize: '1rem' }} />
        </Tooltip>
      </Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        Estimate monthly costs associated with printing and distributing paper payslips.
        Digital solutions can eliminate these costs entirely.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Monthly Printing Costs */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Monthly Printing Costs"
            type="number"
            fullWidth
            value={inputs.monthlyPrintingCosts === 0 ? '' : inputs.monthlyPrintingCosts}
            onChange={handleNumericChange('monthlyPrintingCosts')}
            error={!!errors?.monthlyPrintingCosts}
            helperText={errors?.monthlyPrintingCosts || 'Paper, ink, equipment maintenance'}
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
        
        {/* Monthly Distribution Costs */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Monthly Distribution Costs"
            type="number"
            fullWidth
            value={inputs.monthlyDistributionCosts === 0 ? '' : inputs.monthlyDistributionCosts}
            onChange={handleNumericChange('monthlyDistributionCosts')}
            error={!!errors?.monthlyDistributionCosts}
            helperText={errors?.monthlyDistributionCosts || 'Postage, envelopes, handling time'}
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
      
      {/* Display total paper costs */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Total Paper Costs:
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
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
                Monthly Paper Costs:
              </Typography>
              <Typography variant="h6" color="text.primary">
                £{totalMonthlyCosts.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                bgcolor: 'success.light',
                color: 'success.contrastText',
                borderRadius: 1
              }}
            >
              <Typography variant="body2" color="inherit" sx={{ opacity: 0.9 }}>
                Annual Paper Costs:
              </Typography>
              <Typography variant="h6" color="inherit">
                £{totalAnnualCosts.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          Note: Industry research suggests paper payslips cost approximately £2.50-£3.75 each (including printing and distribution),
          while electronic payslips cost just £0.25-£0.75.
        </Typography>
      </Box>
    </Box>
  );
};

export default PaperCostSavingsInputs;