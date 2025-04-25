import React from 'react';
import StandardResultsLayout, { Metric, ChartConfig, TableConfig, FooterConfig } from '../../components/common/StandardResultsLayout';
import { Paper, Box, Typography, SvgIcon, Alert } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import InsightsIcon from '@mui/icons-material/Insights';
import { INDUSTRY_AVERAGES, getSavingsInsight } from './IndustryAverages';

interface BenefitSavingsResult {
  taxSavings: number;
  niSavings: number;
  totalSavings: number;
  takeHomeIncrease: number;
}

interface EmployeeCalculationResult {
  annualTaxSavings: number;
  annualNISavings: number;
  totalAnnualSavings: number;
  monthlyTakeHomeIncrease: number;
  benefitBreakdown: {
    [key: string]: BenefitSavingsResult;
  };
  projectionResults?: {
    totalContributions: number;
    potValue: number;
  } | null;
}

interface EmployeeBenefitResultsProps {
  result: EmployeeCalculationResult;
  annualSalary: number;
  taxRegion: string;
  includeProjection: boolean;
  className?: string;
}

// Helper function to format benefit type names
const formatBenefitType = (type: string): string => {
  const benefitTypeMap: Record<string, string> = {
    'PENSION': 'Pension',
    'CYCLE_TO_WORK': 'Cycle to Work',
    'EV_CAR_SCHEME': 'Electric Vehicle Scheme',
    'CHILDCARE': 'Childcare',
    'HOLIDAY_TRADING': 'Holiday Trading'
  };
  return benefitTypeMap[type] || type;
};

const EmployeeBenefitResults: React.FC<EmployeeBenefitResultsProps> = ({
  result,
  annualSalary,
  taxRegion,
  includeProjection,
  className
}) => {
  // Prepare breakdown data for table
  const breakdownRows = Object.entries(result.benefitBreakdown).map(([type, data]) => ({
    benefit: formatBenefitType(type),
    tax: data.taxSavings,
    ni: data.niSavings,
    total: data.totalSavings,
    monthly: data.takeHomeIncrease / 12
  }));

  // Add total row
  breakdownRows.push({
    benefit: 'Total',
    tax: result.annualTaxSavings,
    ni: result.annualNISavings,
    total: result.totalAnnualSavings,
    monthly: result.monthlyTakeHomeIncrease
  });

  // --- Insight Callout Logic ---
  const savingsInsight = getSavingsInsight(result.totalAnnualSavings, INDUSTRY_AVERAGES.totalAnnualSavings);

  // Prepare data for savings distribution pie chart
  const savingsDistributionData = {
    labels: Object.entries(result.benefitBreakdown).map(([type]) => formatBenefitType(type)),
    data: Object.entries(result.benefitBreakdown).map(([type, data]) => data.totalSavings),
    backgroundColor: ['#FFAAAA', '#A1D6FF', '#FFE6AA', '#A1E6D9', '#D8A1FF']
  };

  // Prepare data for monthly take-home chart
  const takeHomeChart = {
    labels: ['Current', 'With Benefits'],
    datasets: [
      {
        label: 'Monthly Take-Home Pay',
        data: [
          annualSalary / 12,
          annualSalary / 12 + result.monthlyTakeHomeIncrease
        ],
        backgroundColor: ['#FFB1B1', '#A1D6FF']
      }
    ],
    yAxisTitle: 'Monthly Salary (£)'
  };

  // Prepare projection data if available
  const projectionData = result.projectionResults && includeProjection ? {
    labels: Array.from({ length: 6 }, (_, i) => `Year ${(i + 1) * 5}`),
    datasets: [
      {
        label: 'Projected Pension Pot',
        data: Array.from({ length: 6 }, (i) => {
          const years = (i + 1) * 5;
          const annualContribution = annualSalary * (result.benefitBreakdown['PENSION']?.totalSavings / result.totalAnnualSavings || 0.05);
          return Math.round(annualContribution * years * 1.05 ** years);
        }),
        borderColor: '#A1D6FF',
        backgroundColor: 'rgba(161, 214, 255, 0.2)'
      }
    ],
    yAxisTitle: 'Pension Value (£)'
  } : null;

  const primaryMetrics: Metric[] = [
    {
      title: "Annual Tax & NI Savings",
      value: result.totalAnnualSavings,
      format: "currency",
      precision: 0
    },
    {
      title: "Monthly Take-Home Increase",
      value: result.monthlyTakeHomeIncrease,
      format: "currency",
      precision: 0
    },
    {
      title: "Total Annual Tax Savings",
      value: result.annualTaxSavings,
      format: "currency",
      precision: 0
    },
    {
      title: "Total Annual NI Savings",
      value: result.annualNISavings,
      format: "currency",
      precision: 0
    }
  ];

  const tables: TableConfig[] = [
    {
      title: "Savings Breakdown by Benefit",
      columns: [
        { field: 'benefit', headerName: 'Benefit Type', align: 'left' },
        { field: 'tax', headerName: 'Tax Savings', align: 'right', format: 'currency' },
        { field: 'ni', headerName: 'NI Savings', align: 'right', format: 'currency' },
        { field: 'total', headerName: 'Total Savings', align: 'right', format: 'currency' },
        { field: 'monthly', headerName: 'Monthly Impact', align: 'right', format: 'currency' }
      ],
      rows: breakdownRows,
      highlightTotal: true
    }
  ];

  const charts: ChartConfig[] = [
    {
      type: 'bar' as const,
      title: 'Monthly Take-Home Comparison',
      data: takeHomeChart,
      width: 6
    },
    {
      type: 'pie' as const,
      title: 'Savings Distribution',
      data: savingsDistributionData,
      width: 6
    },
    ...((projectionData && includeProjection) ? [{
      type: 'line' as const,
      title: 'Pension Projection',
      data: projectionData,
      width: 12
    }] : [])
  ];

  const footer: FooterConfig | undefined = result.projectionResults && includeProjection ? {
    text: `Projected pension pot value after 30 years: £${result.projectionResults.potValue.toLocaleString('en-GB')} (Total contributions: £${result.projectionResults.totalContributions.toLocaleString('en-GB')})`,
    variant: 'info'
  } : undefined;

  return (
    <div className={className}>
      <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2, className: 'report-section' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SvgIcon component={SavingsIcon} sx={{ mr: 1, color: 'success.main' }} />
          <Typography variant="h6">Your Savings Breakdown</Typography>
        </Box>
        {/* Insight Callout */}
        {savingsInsight && (
          <Box sx={{ mb: 2 }}>
            <Alert severity={savingsInsight.type} icon={<InsightsIcon />}>
              <Typography variant="subtitle2">{savingsInsight.message}</Typography>
            </Alert>
          </Box>
        )}
        <StandardResultsLayout
          title="Employee Savings Results"
          subtitle={`Based on £${annualSalary.toLocaleString('en-GB')} annual salary (${taxRegion === 'scotland' ? 'Scottish' : 'UK'} tax rates)`}
          primaryMetrics={primaryMetrics}
          tables={tables}
          charts={charts}
          footer={footer}
        />
      </Paper>
    </div>
  );
};

export default EmployeeBenefitResults;
