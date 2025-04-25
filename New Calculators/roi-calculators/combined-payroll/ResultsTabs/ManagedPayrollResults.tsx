import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { ManagedPayrollResults as ManagedPayrollResultsType } from '../../../../types/combinedPayrollTypes';
import StandardResultsLayout from '../../../common/StandardResultsLayout';

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

interface BreakdownItem {
  label: string;
  value: number;
  format: 'currency' | 'percentage' | 'decimal' | 'text';
  secondaryText?: string;
  color?: string;
  percentage?: number;
}

interface BreakdownConfig {
  title: string;
  items: BreakdownItem[];
  background?: 'default' | 'positive' | 'negative' | 'neutral';
  columns?: number;
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

interface ManagedPayrollResultsProps {
  results: ManagedPayrollResultsType;
  inputs: {
    employeeCount: number;
    currentAnnualCost: number;
  };
}

const ManagedPayrollResults: React.FC<ManagedPayrollResultsProps> = ({
  results,
  inputs
}) => {
  const theme = useTheme();

  const savingsBreakdown = useMemo(() => {
    const breakdownItems: {
      category: string;
      amount: number;
      percentage: number;
    }[] = [];
    if (results.efficiencySavings > 0) {
      breakdownItems.push({
        category: 'Time Efficiency Savings',
        amount: results.efficiencySavings,
        percentage: (results.efficiencySavings / results.totalAnnualBenefits) * 100
      });
    }
    if (results.errorReductionSavings > 0) {
      breakdownItems.push({
        category: 'Rework Reduction Savings',
        amount: results.errorReductionSavings,
        percentage: (results.errorReductionSavings / results.totalAnnualBenefits) * 100
      });
    }
    if (results.paperSavings > 0) {
      breakdownItems.push({
        category: 'Paper Cost Savings',
        amount: results.paperSavings,
        percentage: (results.paperSavings / results.totalAnnualBenefits) * 100
      });
    }
    if (results.wageSavings > 0) {
      breakdownItems.push({
        category: 'Wage Savings',
        amount: results.wageSavings,
        percentage: (results.wageSavings / results.totalAnnualBenefits) * 100
      });
    }
    return breakdownItems;
  }, [results]);

  const savingsPieChartData = useMemo(() => {
    return {
      labels: savingsBreakdown.map(item => item.category),
      data: savingsBreakdown.map(item => item.amount),
      backgroundColor: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
        theme.palette.warning.main
      ]
    };
  }, [savingsBreakdown, theme]);

  const fiveYearProjectionData = useMemo(() => {
    const years = Array.from({ length: 5 }, (_, i) => `Year ${i + 1}`);
    const annualSavings = Array.from({ length: 5 }, () => results.netAnnualBenefit);
    annualSavings[0] = results.netAnnualBenefit - results.transitionCosts;
    const cumulativeSavings = annualSavings.reduce((acc, curr, i) => {
      if (i === 0) return [curr];
      return [...acc, acc[i - 1] + curr];
    }, [] as number[]);
    return {
      labels: years,
      datasets: [
        {
          label: 'Annual Net Benefit',
          type: 'bar',
          data: annualSavings,
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.main
        },
        {
          label: 'Cumulative Savings',
          type: 'line',
          data: cumulativeSavings,
          borderColor: theme.palette.secondary.main,
          backgroundColor: `${theme.palette.secondary.main}20`,
          yAxisID: 'y1'
        }
      ]
    };
  }, [results, theme]);

  const primaryMetrics: Metric[] = [
    {
      title: '5-Year ROI',
      value: results.fiveYearROI,
      format: 'percentage',
      precision: 1
    },
    {
      title: 'Annual Net Benefit',
      value: results.netAnnualBenefit,
      format: 'currency',
      precision: 0
    },
    {
      title: 'Payback Period',
      value: results.paybackPeriodMonths,
      format: 'decimal',
      secondaryText: 'months',
      precision: 1
    },
    {
      title: 'Savings Per Employee',
      value: results.savingsPerEmployee,
      format: 'currency',
      precision: 0
    }
  ];

  const secondaryMetrics: Metric[] = [
    {
      title: 'First Year ROI',
      value: results.firstYearROI,
      format: 'percentage',
      precision: 1,
      secondaryText: 'Includes one-time transition costs'
    },
    {
      title: 'Three-Year ROI',
      value: results.threeYearROI,
      format: 'percentage',
      precision: 1
    },
    {
      title: '5-Year Total Cost of Ownership',
      value: results.totalCostOfOwnership5Year,
      format: 'currency',
      precision: 0,
      secondaryText: 'Total costs minus savings over 5 years'
    }
  ];

  const charts: ChartConfig[] = [
    {
      type: 'pie',
      title: 'Savings Breakdown',
      data: savingsPieChartData
    },
    {
      type: 'bar',
      title: 'Five-Year Financial Projection',
      data: fiveYearProjectionData,
      height: 350
    }
  ];

  const breakdowns: BreakdownConfig[] = [
    {
      title: 'Savings Breakdown',
      items: savingsBreakdown.map(item => ({
        label: item.category,
        value: item.amount,
        format: 'currency',
        percentage: item.percentage
      }))
    }
  ];

  const tables: TableConfig[] = [];

  const footer: FooterConfig = {
    text: `Analysis for ${inputs.employeeCount.toLocaleString()} employees, current annual cost £${inputs.currentAnnualCost.toLocaleString()}`,
    variant: 'note'
  };

  const additionalContent = (
    <div style={{ marginTop: 24 }}>
      <em style={{ color: theme.palette.text.secondary }}>
        Note: These calculations assume 100% efficiency gains for time, error reduction, and compliance issues when transitioning to a managed payroll service, as these responsibilities transfer to the service provider.
      </em>
    </div>
  );

  return (
    <StandardResultsLayout
      title="Managed Payroll ROI Results"
      subtitle="Return on investment and efficiency gains from transitioning to a managed payroll service."
      primaryMetrics={primaryMetrics}
      secondaryMetrics={secondaryMetrics}
      charts={charts}
      breakdowns={breakdowns}
      tables={tables}
      footer={footer}
      additionalContent={additionalContent}
    />
  );
};

export default ManagedPayrollResults;