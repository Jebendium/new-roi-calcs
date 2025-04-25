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
  
  // Calculate annual costs and savings
  const annualPrintingCosts = inputs.monthlyPrintingCosts * 12;
  const annualDistributionCosts = inputs.monthlyDistributionCosts * 12;
  const totalAnnualCosts = annualPrintingCosts + annualDistributionCosts;
  
  // Calculate per employee costs if applicable
  const perEmployeeCost = inputs.employeeCount > 0 ? 
    totalAnnualCosts / inputs.employeeCount : 0;
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Paper Cost Savings
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Enter current costs for paper payslips and distribution. If you already use electronic payslips, enter 0.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Paper Costs */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Current Paper Costs
          </Typography>
          
          <TextField
            label="Monthly Printing Costs"
            type="text"
            fullWidth
            value={inputs.monthlyPrintingCosts === 0 ? '0' : inputs.monthlyPrintingCosts}
            onChange={handleNumericChange('monthlyPrintingCosts')}
            error={!!errors?.monthlyPrintingCosts}
            helperText={errors?.monthlyPrintingCosts || 'Monthly costs for printing payslips and reports'}
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
            label="Monthly Distribution Costs"
            type="text"
            fullWidth
            value={inputs.monthlyDistributionCosts === 0 ? '0' : inputs.monthlyDistributionCosts}
            onChange={handleNumericChange('monthlyDistributionCosts')}
            error={!!errors?.monthlyDistributionCosts}
            helperText={errors?.monthlyDistributionCosts || 'Monthly costs for distributing payslips (envelopes, postage, etc.)'}
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
        
        {/* Summary */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: perEmployeeCost > 0 ? 'success.light' : 'background.default', 
              color: perEmployeeCost > 0 ? 'success.contrastText' : 'text.primary',
              border: perEmployeeCost > 0 ? 'none' : '1px solid',
              borderColor: 'divider',
              borderRadius: 1
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              {perEmployeeCost > 0 ? 'Potential Annual Savings:' : 'No Paper Costs Entered'}
            </Typography>
            
            {perEmployeeCost > 0 ? (
              <>
                <Typography variant="body2">
                  Annual Printing: £{annualPrintingCosts.toFixed(0)}
                </Typography>
                <Typography variant="body2">
                  Annual Distribution: £{annualDistributionCosts.toFixed(0)}
                </Typography>
                <Typography variant="body1" fontWeight={500} sx={{ mt: 1 }}>
                  Total Annual Paper Costs: £{totalAnnualCosts.toFixed(0)}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Average Cost Per Employee: £{perEmployeeCost.toFixed(2)} per year
                </Typography>
              </>
            ) : (
              <Typography variant="body2">
                You've indicated that you don't have paper payslip costs or you already use electronic payslips. There are no additional savings to calculate in this category.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Industry Information:
        </Typography>
        <Typography variant="body2" paragraph>
          • Paper payslips cost approximately £2.50-£3.75 each (including printing and distribution)
        </Typography>
        <Typography variant="body2" paragraph>
          • Electronic payslips cost just £0.25-£0.75 each
        </Typography>
        <Typography variant="body2" paragraph>
          • 82% of UK organisations now use electronic payslips, up from 76% in 2020
        </Typography>
        <Typography variant="body2">
          • Switching to electronic payslips also reduces environmental impact and improves information security
        </Typography>
      </Box>
    </Box>
  );
};

export default PaperCostSavingsInputs;