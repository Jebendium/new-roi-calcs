import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from '@mui/material';
import { BenefitType, CalculationResult } from '../../lib/calculationFunctions';
import SavingsChart from '../SavingsChart';

interface ScenarioResultsProps {
  originalResult: CalculationResult;
  scenarioResult: CalculationResult;
  employeeCount: number;
  averageSalary: number;
  taxYear: string;
}

const ScenarioResults: React.FC<ScenarioResultsProps> = ({
  originalResult,
  scenarioResult,
  employeeCount,
  averageSalary,
  taxYear
}) => {
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Format percentage values
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Benefit type display names
  const benefitNames = {
    [BenefitType.PENSION]: "Pension",
    [BenefitType.CYCLE_TO_WORK]: "Cycle to Work",
    [BenefitType.EV_CAR_SCHEME]: "EV Car Scheme",
    [BenefitType.CHILDCARE]: "Childcare Vouchers",
    [BenefitType.HOLIDAY_TRADING]: "Holiday Trading"
  };

  // Calculate differences
  const savingsDifference = scenarioResult.annualSavings - originalResult.annualSavings;
  const savingsPerEmployeeDifference = scenarioResult.savingsPerEmployee - originalResult.savingsPerEmployee;
  const savingsPercentageIncrease = originalResult.annualSavings > 0 
    ? (savingsDifference / originalResult.annualSavings) * 100 
    : 0;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        What-If Scenario Results
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Comparison between current configuration and what-if scenario for {employeeCount} employees 
        with an average salary of {formatCurrency(averageSalary)} for the {taxYear} tax year.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        The what-if scenario shows a potential increase of {formatCurrency(savingsDifference)} in annual savings 
        ({formatPercentage(savingsPercentageIncrease)} increase).
      </Alert>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Current Annual Savings
              </Typography>
              <Typography variant="h5">
                {formatCurrency(originalResult.annualSavings)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatCurrency(originalResult.savingsPerEmployee)} per employee
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', bgcolor: 'rgba(25, 118, 210, 0.08)' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Scenario Annual Savings
              </Typography>
              <Typography variant="h5">
                {formatCurrency(scenarioResult.annualSavings)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatCurrency(scenarioResult.savingsPerEmployee)} per employee
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', bgcolor: savingsDifference > 0 ? 'rgba(76, 175, 80, 0.08)' : 'rgba(244, 67, 54, 0.08)' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Potential Increase
              </Typography>
              <Typography variant="h5" color={savingsDifference > 0 ? 'success.main' : 'error.main'}>
                {formatCurrency(savingsDifference)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatCurrency(savingsPerEmployeeDifference)} per employee ({formatPercentage(savingsPercentageIncrease)} increase)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Comparison Chart */}
      <Typography variant="h6" gutterBottom>
        Savings Comparison
      </Typography>
      <SavingsChart 
        title="Current vs Scenario Savings"
        data={{
          labels: ['Current Configuration', 'What-If Scenario'],
          datasets: [
            {
              label: 'Annual Savings',
              data: [originalResult.annualSavings, scenarioResult.annualSavings],
              backgroundColor: ['rgba(53, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)'],
            },
          ],
        }}
        height={300}
      />

      {/* Benefit Breakdown Comparison */}
      <Typography variant="h6" gutterBottom>
        Savings Breakdown by Benefit Type
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Benefit Type</TableCell>
              <TableCell align="right">Current Savings</TableCell>
              <TableCell align="right">Scenario Savings</TableCell>
              <TableCell align="right">Difference</TableCell>
              <TableCell align="right">% Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(BenefitType).map((benefitType) => {
              const originalSavings = originalResult.benefitBreakdown[benefitType]?.totalSavings || 0;
              const scenarioSavings = scenarioResult.benefitBreakdown[benefitType]?.totalSavings || 0;
              const difference = scenarioSavings - originalSavings;
              const percentChange = originalSavings > 0 ? (difference / originalSavings) * 100 : 0;
              
              return (
                <TableRow key={benefitType}>
                  <TableCell>{benefitNames[benefitType]}</TableCell>
                  <TableCell align="right">{formatCurrency(originalSavings)}</TableCell>
                  <TableCell align="right">{formatCurrency(scenarioSavings)}</TableCell>
                  <TableCell 
                    align="right"
                    sx={{ color: difference > 0 ? 'success.main' : difference < 0 ? 'error.main' : 'inherit' }}
                  >
                    {formatCurrency(difference)}
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ color: percentChange > 0 ? 'success.main' : percentChange < 0 ? 'error.main' : 'inherit' }}
                  >
                    {formatPercentage(percentChange)}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(originalResult.annualSavings)}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(scenarioResult.annualSavings)}
              </TableCell>
              <TableCell 
                align="right" 
                sx={{ 
                  fontWeight: 'bold',
                  color: savingsDifference > 0 ? 'success.main' : savingsDifference < 0 ? 'error.main' : 'inherit'
                }}
              >
                {formatCurrency(savingsDifference)}
              </TableCell>
              <TableCell 
                align="right" 
                sx={{ 
                  fontWeight: 'bold',
                  color: savingsPercentageIncrease > 0 ? 'success.main' : savingsPercentageIncrease < 0 ? 'error.main' : 'inherit'
                }}
              >
                {formatPercentage(savingsPercentageIncrease)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="textSecondary">
          Note: This comparison shows the potential impact of adjusting participation rates and contribution values.
          Actual results may vary based on implementation and employee engagement.
        </Typography>
      </Box>
    </div>
  );
};

export default ScenarioResults;
