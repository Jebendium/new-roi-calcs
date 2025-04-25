import React from 'react';
import StandardResultsLayout from '../../components/common/StandardResultsLayout';
import { BenefitType, CalculationResult } from '../../lib/calculationFunctions';

interface Metric {
  title: string;
  value: number;
  format: 'currency' | 'percentage' | 'decimal' | 'text';
  secondaryText?: string;
  secondaryValue?: number;
  secondaryFormat?: 'currency' | 'percentage' | 'decimal';
  isPositive?: boolean;
  precision?: number;
}

interface ChartConfig {
  type: 'bar' | 'pie' | 'line';
  title: string;
  width?: number;
  height?: number;
  data: Record<string, unknown>;
}

interface TableColumn {
  field: string;
  headerName: string;
  align?: 'left' | 'right' | 'center';
  format?: 'currency' | 'percentage' | 'decimal' | 'text';
  width?: string;
  precision?: number;
  renderCell?: (value: unknown, row: unknown) => React.ReactNode;
}

interface TableConfig {
  title?: string;
  columns: TableColumn[];
  rows: unknown[];
  stickyHeader?: boolean;
  maxHeight?: number | string;
  highlightTotal?: boolean;
}

interface FooterConfig {
  text: string;
  variant?: 'info' | 'warning' | 'note';
}

interface EmployerNIResultsProps {
  result: CalculationResult;
  employeeCount: number;
  averageSalary: number;
  taxYear: string;
}

const EmployerNIResults: React.FC<EmployerNIResultsProps> = ({
  result,
  employeeCount,
  averageSalary,
  taxYear
}) => {
  // Calculate percentage reduction in NI costs
  const niReduction = result.originalNI > 0 
    ? ((result.originalNI - result.reducedNI) / result.originalNI) * 100 
    : 0;

  // Benefit type display names
  const benefitNames: Record<string, string> = {
    [BenefitType.PENSION]: "Pension",
    [BenefitType.CYCLE_TO_WORK]: "Cycle to Work",
    [BenefitType.EV_CAR_SCHEME]: "EV Car Scheme",
    [BenefitType.CHILDCARE]: "Childcare Vouchers",
    [BenefitType.HOLIDAY_TRADING]: "Holiday Trading"
  };

  // Prepare benefit savings data for charts and tables
  const benefitSavingsData = Object.entries(result.benefitBreakdown)
    .filter(([, savings]) => savings.totalSavings > 0);

  // Log the benefitSavingsData for debugging
  console.log('Benefit Savings Data:', benefitSavingsData);

  // Calculate totals for different saving types
  const totalNISavings = Object.values(result.benefitBreakdown)
    .reduce((sum, savings) => sum + savings.niSavings, 0);
  
  const totalAdditionalSavings = Object.values(result.benefitBreakdown)
    .reduce((sum, savings) => sum + savings.additionalSavings, 0);

  // Prepare breakdown data table rows
  const breakdownRows = [
    ...Object.entries(result.benefitBreakdown)
      .filter(([, savings]) => savings.totalSavings > 0)
      .map(([benefitType, savings]) => ({
        benefitType: benefitNames[benefitType] || benefitType,
        niSavings: savings.niSavings,
        additionalSavings: savings.additionalSavings,
        totalSavings: savings.totalSavings
      })),
    // Add total row
    {
      benefitType: 'Total',
      niSavings: totalNISavings,
      additionalSavings: totalAdditionalSavings,
      totalSavings: result.annualSavings
    }
  ];

  // StandardResultsLayout props
  const primaryMetrics: Metric[] = [
    {
      title: 'Total Annual Savings',
      value: result.annualSavings,
      format: 'currency',
      precision: 0
    },
    {
      title: 'Average Savings Per Employee',
      value: result.savingsPerEmployee,
      format: 'currency',
      precision: 0
    },
    {
      title: 'NI Cost Reduction',
      value: niReduction,
      format: 'percentage',
      secondaryText: `£${result.originalNI.toLocaleString('en-GB')} to £${result.reducedNI.toLocaleString('en-GB')}`,
      precision: 1
    }
  ];

  const charts: ChartConfig[] = [
    {
      type: 'bar',
      title: 'NI Cost Comparison',
      data: {
        labels: ['Original NI Cost', 'Reduced NI Cost'],
        datasets: [
          {
            label: 'NI Cost',
            data: [result.originalNI, result.reducedNI],
            backgroundColor: ['#FFB1B1', '#A1D6FF']
          }
        ]
      },
      width: 6
    },
    {
      type: 'pie',
      title: 'Savings Distribution by Benefit Type',
      data: {
        labels: benefitSavingsData.map(([benefitType]) => benefitNames[benefitType] || benefitType),
        data: benefitSavingsData.map(([, savings]) => savings.totalSavings),
        backgroundColor: ['#FFAAAA', '#A1D6FF', '#FFE6AA', '#A1E6D9', '#D8A1FF']
      },
      width: 6
    },
    {
      type: 'bar',
      title: 'NI vs Additional Savings',
      data: {
        labels: ['NI Savings', 'Additional Savings'],
        datasets: [
          {
            label: 'Savings Amount',
            data: [totalNISavings, totalAdditionalSavings],
            backgroundColor: ['#A1D6FF', '#A1E6D9']
          }
        ]
      },
      width: 12
    }
  ];

  const tables: TableConfig[] = [
    {
      title: 'Savings Breakdown by Benefit Type',
      columns: [
        { field: 'benefitType', headerName: 'Benefit Type', align: 'left' },
        { field: 'niSavings', headerName: 'NI Savings', align: 'right', format: 'currency' },
        { field: 'additionalSavings', headerName: 'Additional Savings', align: 'right', format: 'currency' },
        { field: 'totalSavings', headerName: 'Total Savings', align: 'right', format: 'currency' }
      ],
      rows: breakdownRows,
      highlightTotal: true
    }
  ];

  const footer: FooterConfig = {
    text: 'Additional savings for Holiday Trading represent the actual wage reduction savings.',
    variant: 'note'
  };

  return (
    <StandardResultsLayout
      title="Employer NI Savings Results"
      subtitle={`Based on ${employeeCount.toLocaleString('en-GB')} employees with an average salary of £${averageSalary.toLocaleString('en-GB')} for the ${taxYear} tax year.`}
      primaryMetrics={primaryMetrics}
      charts={charts}
      tables={tables}
      footer={footer}
    />
  );
};

export default EmployerNIResults;