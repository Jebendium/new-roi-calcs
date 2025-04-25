import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Tooltip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { BenefitType, CalculationResult } from '../../lib/calculationFunctions';
import SavingsChart from '../SavingsChart';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip as ChartTooltip, 
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components for pie charts
ChartJS.register(ArcElement, ChartTooltip, Legend);

interface CalculationResultsProps {
  result: CalculationResult;
  employeeCount: number;
  averageSalary: number;
  taxYear: string;
}

const CalculationResults: React.FC<CalculationResultsProps> = ({
  result,
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

  // Benefit type display names
  const benefitNames = {
    [BenefitType.PENSION]: "Pension",
    [BenefitType.CYCLE_TO_WORK]: "Cycle to Work",
    [BenefitType.EV_CAR_SCHEME]: "EV Car Scheme",
    [BenefitType.CHILDCARE]: "Childcare Vouchers",
    [BenefitType.HOLIDAY_TRADING]: "Holiday Trading"
  };

  // Calculate total savings
  const totalSavings = result.annualSavings;
  const totalSavingsPerEmployee = result.savingsPerEmployee;

  // Calculate percentage reduction in NI costs
  const niReduction = result.originalNI > 0 
    ? ((result.originalNI - result.reducedNI) / result.originalNI) * 100 
    : 0;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Calculation Results
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Based on {employeeCount} employees with an average salary of {formatCurrency(averageSalary)} for the {taxYear} tax year.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Annual Savings
              </Typography>
              <Typography variant="h4">
                {formatCurrency(totalSavings)}
              </Typography>
              <Box sx={{ height: '24px' }}></Box> {/* Spacer to match other cards */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Savings Per Employee
              </Typography>
              <Typography variant="h4">
                {formatCurrency(totalSavingsPerEmployee)}
              </Typography>
              <Box sx={{ height: '24px' }}></Box> {/* Spacer to match other cards */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Original NI Cost
              </Typography>
              <Typography variant="h5">
                {formatCurrency(result.originalNI)}
              </Typography>
              <Box sx={{ height: '24px' }}></Box> {/* Spacer to match other cards */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Reduced NI Cost
              </Typography>
              <Typography variant="h5">
                {formatCurrency(result.reducedNI)}
              </Typography>
              <Typography variant="body2" color="success.main">
                {niReduction.toFixed(1)}% reduction
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* NI Cost Comparison Chart */}
      <Typography variant="h6" gutterBottom>
        NI Cost Comparison
      </Typography>
      <SavingsChart 
        title="Original vs Reduced NI Cost"
        data={{
          labels: ['Original NI Cost', 'Reduced NI Cost'],
          datasets: [
            {
              label: 'NI Cost',
              data: [result.originalNI, result.reducedNI],
              backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
            },
          ],
        }}
        height={300}
      />

      {/* Benefit Savings Breakdown Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Savings Distribution by Benefit Type
          </Typography>
          <Box sx={{ height: '400px', p: 2, border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Pie 
              data={{
                labels: Object.entries(result.benefitBreakdown)
                  .filter(([, savings]) => savings.totalSavings > 0)
                  .map(([benefitType]) => benefitNames[benefitType as BenefitType]),
                datasets: [
                  {
                    label: 'Total Savings',
                    data: Object.entries(result.benefitBreakdown)
                      .filter(([, savings]) => savings.totalSavings > 0)
                      .map(([, savings]) => savings.totalSavings),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.5)',
                      'rgba(54, 162, 235, 0.5)',
                      'rgba(255, 206, 86, 0.5)',
                      'rgba(75, 192, 192, 0.5)',
                      'rgba(153, 102, 255, 0.5)',
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const value = context.raw as number;
                        return `${context.label}: ${formatCurrency(value)}`;
                      }
                    }
                  }
                }
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            NI vs Additional Savings
          </Typography>
          <SavingsChart 
            title="NI vs Additional Savings"
            data={{
              labels: ['NI Savings', 'Additional Savings'],
              datasets: [
                {
                  label: 'Savings Amount',
                  data: [
                    Object.values(result.benefitBreakdown).reduce(
                      (sum, savings) => sum + savings.niSavings, 0
                    ),
                    Object.values(result.benefitBreakdown).reduce(
                      (sum, savings) => sum + savings.additionalSavings, 0
                    )
                  ],
                  backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)'],
                },
              ],
            }}
            height={400}
            noPaper={true}
          />
        </Grid>
      </Grid>

      {/* Benefit breakdown table */}
      <Typography variant="h6" gutterBottom>
        Savings Breakdown by Benefit Type
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Benefit Type</TableCell>
              <TableCell align="right">NI Savings</TableCell>
              <TableCell align="right">Additional Savings</TableCell>
              <TableCell align="right">Total Savings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(result.benefitBreakdown).map(([benefitType, savings]) => (
              <TableRow key={benefitType}>
                <TableCell>
                  <Tooltip title={getBenefitTooltip(benefitType as BenefitType)}>
                    <span>{benefitNames[benefitType as BenefitType]}</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">{formatCurrency(savings.niSavings)}</TableCell>
                <TableCell align="right">{formatCurrency(savings.additionalSavings)}</TableCell>
                <TableCell align="right">{formatCurrency(savings.totalSavings)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(
                  Object.values(result.benefitBreakdown).reduce(
                    (sum, savings) => sum + savings.niSavings, 0
                  )
                )}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(
                  Object.values(result.benefitBreakdown).reduce(
                    (sum, savings) => sum + savings.additionalSavings, 0
                  )
                )}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(totalSavings)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="textSecondary">
          Note: Additional savings for Holiday Trading represent the actual wage reduction savings.
        </Typography>
      </Box>
    </div>
  );
};

// Helper function to get tooltip text for each benefit type
const getBenefitTooltip = (benefitType: BenefitType): string => {
  switch (benefitType) {
    case BenefitType.PENSION:
      return "NI savings on pension contributions";
    case BenefitType.CYCLE_TO_WORK:
      return "NI savings on cycle to work scheme";
    case BenefitType.EV_CAR_SCHEME:
      return "NI savings on EV car scheme (minus 2% benefit in kind)";
    case BenefitType.CHILDCARE:
      return "NI savings on childcare vouchers";
    case BenefitType.HOLIDAY_TRADING:
      return "NI savings plus wage savings from holiday trading";
    default:
      return "";
  }
};

export default CalculationResults;
