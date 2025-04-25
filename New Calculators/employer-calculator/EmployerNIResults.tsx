import React from 'react';
import StandardResultsLayout from '../../components/common/StandardResultsLayout';
import { BenefitType, CalculationResult } from '../../lib/types';

interface TableConfig {
  title?: string;
  columns: Array<{
    field: string;
    headerName: string;
    align?: 'left' | 'right' | 'center';
    format?: 'currency' | 'percentage' | 'number';
  }>;
  rows: Array<Record<string, any>>;
}

interface EmployerNIResultsProps {
  result: CalculationResult;
  employeeCount: number;
  averageSalary: number;
  taxYear: string;
}

const getPensionContributionRate = (result: CalculationResult) => {
  if (!result.benefitBreakdown?.[BenefitType.PENSION]) return 0;
  return result.benefitBreakdown[BenefitType.PENSION].contributionValue || 0;
};

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

  const primaryMetrics = [
    {
      title: "Total Annual Savings",
      value: result.annualSavings,
      format: "currency",
      precision: 0
    },
    {
      title: "Average Savings Per Employee",
      value: result.savingsPerEmployee,
      format: "currency",
      precision: 0
    },
    {
      title: "NI Cost Reduction",
      value: niReduction,
      format: "percentage",
      secondaryText: `£${result.originalNI.toLocaleString('en-GB')} to £${result.reducedNI.toLocaleString('en-GB')}`,
      precision: 1
    }
  ];

  const charts = result.benefitBreakdown ? [
    {
      type: "bar",
      title: "NI Cost Comparison",
      data: {
        labels: ["Original NI Cost", "Reduced NI Cost"],
        datasets: [{
          label: "NI Cost",
          data: [result.originalNI, result.reducedNI],
          backgroundColor: ['#FFB1B1', '#A1D6FF']
        }]
      }
    }
  ] : [];

  const tables: TableConfig[] = [];
  const footer = {
    text: "These calculations are based on current National Insurance rates and thresholds.",
    variant: "info" as const
  };

  return (
    <StandardResultsLayout
      title="Employer NI Savings Results"
      subtitle={`Based on ${employeeCount.toLocaleString('en-GB')} employees with an average salary of £${averageSalary.toLocaleString('en-GB')} and an average contribution of ${getPensionContributionRate(result)}% for the ${taxYear} tax year.`}
      primaryMetrics={primaryMetrics}
      charts={charts}
      tables={tables}
      footer={footer}
    />
  );
};

export default EmployerNIResults;