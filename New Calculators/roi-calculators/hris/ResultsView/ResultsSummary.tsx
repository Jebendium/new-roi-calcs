import { 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Box,
  Divider 
} from '@mui/material';
import { HRISROIResults } from '../../../../types/roiCalculatorTypes';

interface HRISResultsSummaryProps {
  results: HRISROIResults | null;
}

const HRISResultsSummary = ({ results }: HRISResultsSummaryProps) => {
  if (!results) {
    return null;
  }

  // Format currency values
  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Format percentage values
  const formatPercentage = (value: number) => {
    return `${value.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
        HRIS Implementation ROI Summary
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', backgroundColor: '#f8f9fa' }}>
            <CardContent sx={{ '& .MuiGrid-container': { alignItems: 'center' } }}>
              <Typography variant="h6" gutterBottom align="center">
                Key ROI Metrics
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={1}>
                <Grid item xs={7}>
                  <Typography variant="body1">First Year ROI:</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1" fontWeight="bold" align="right" sx={{ display: 'block', width: '100%' }}>
                    {formatPercentage(results.firstYearROI)}
                  </Typography>
                </Grid>
                
                <Grid item xs={7}>
                  <Typography variant="body1">3-Year ROI:</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1" fontWeight="bold" align="right" sx={{ display: 'block', width: '100%' }}>
                    {formatPercentage(results.threeYearROI)}
                  </Typography>
                </Grid>
                
                <Grid item xs={7}>
                  <Typography variant="body1">5-Year ROI:</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1" fontWeight="bold" align="right" sx={{ display: 'block', width: '100%' }}>
                    {formatPercentage(results.fiveYearROI)}
                  </Typography>
                </Grid>
                
                <Grid item xs={7}>
                  <Typography variant="body1">Payback Period:</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1" fontWeight="bold" align="right" sx={{ display: 'block', width: '100%' }}>
                    {results.paybackPeriodMonths.toFixed(1)} months
                  </Typography>
                </Grid>
                
                <Grid item xs={7}>
                  <Typography variant="body1">Annual Savings Per Employee:</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1" fontWeight="bold" align="right" sx={{ display: 'block', width: '100%' }}>
                    {formatCurrency(results.savingsPerEmployee)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', backgroundColor: results.netAnnualBenefit > 0 ? '#e8f5e9' : '#ffebee' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center">
                Annual Financial Impact
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="body1">Total Annual Benefits:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" fontWeight="bold" align="right" color="success.main" sx={{ display: 'block', width: '100%' }}>
                    {formatCurrency(results.totalAnnualBenefits)}
                  </Typography>
                </Grid>
                
                <Grid item xs={8}>
                  <Typography variant="body1">Annual Recurring Costs:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" fontWeight="bold" align="right" color="error.main" sx={{ display: 'block', width: '100%' }}>
                    {formatCurrency(results.annualCosts)}
                  </Typography>
                </Grid>
                
                <Grid item xs={8}>
                  <Typography variant="body1">Net Annual Benefit:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" fontWeight="bold" align="right" 
                    color={results.netAnnualBenefit > 0 ? 'success.main' : 'error.main'}
                    sx={{ display: 'block', width: '100%' }}>
                    {formatCurrency(results.netAnnualBenefit)}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                
                <Grid item xs={8}>
                  <Typography variant="body1">Initial Investment:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" fontWeight="bold" align="right" sx={{ display: 'block', width: '100%' }}>
                    {formatCurrency(results.initialInvestment)}
                  </Typography>
                </Grid>
                
                <Grid item xs={8}>
                  <Typography variant="body1">First Year Net Return:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" fontWeight="bold" align="right"
                    color={(results.netAnnualBenefit - results.initialInvestment) > 0 ? 'success.main' : 'error.main'}
                    sx={{ display: 'block', width: '100%' }}>
                    {formatCurrency(results.netAnnualBenefit - results.initialInvestment)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Card sx={{ mt: 3, backgroundColor: '#f1f8e9' }}>
        <CardContent sx={{ '& .MuiGrid-container': { alignItems: 'center' } }}>
          <Typography variant="h6" gutterBottom>
            Annual Benefits Breakdown
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body2" fontWeight="bold">Time Savings:</Typography>
              <Typography variant="h6" color="primary" sx={{ display: 'block', width: '100%', textAlign: 'left', my: 1 }}>{formatCurrency(results.timeSavings)}</Typography>
              <Typography variant="body2" color="text.secondary">
                {((results.timeSavings / results.totalAnnualBenefits) * 100).toFixed(1)}% of total
              </Typography>
            </Grid>
            
            <Grid item xs={4}>
              <Typography variant="body2" fontWeight="bold">Data & Compliance Improvements:</Typography>
              <Typography variant="h6" color="primary" sx={{ display: 'block', width: '100%', textAlign: 'left', my: 1 }}>{formatCurrency(results.errorReductionSavings)}</Typography>
              <Typography variant="body2" color="text.secondary">
                {((results.errorReductionSavings / results.totalAnnualBenefits) * 100).toFixed(1)}% of total
              </Typography>
            </Grid>
            
            <Grid item xs={4}>
              <Typography variant="body2" fontWeight="bold">Strategic Value:</Typography>
              <Typography variant="h6" color="primary" sx={{ display: 'block', width: '100%', textAlign: 'left', my: 1 }}>{formatCurrency(results.strategicValueSavings)}</Typography>
              <Typography variant="body2" color="text.secondary">
                {((results.strategicValueSavings / results.totalAnnualBenefits) * 100).toFixed(1)}% of total
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HRISResultsSummary;
