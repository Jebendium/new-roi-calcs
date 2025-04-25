import React, { useMemo } from 'react';
import StandardResultsLayout, { Metric, ChartConfig, TableConfig, FooterConfig } from '../../../../components/common/StandardResultsLayout';
import { PayrollSystemResults, ManagedPayrollResults } from '../../../../types/combinedPayrollTypes';
import useComparisonCalculations from '../hooks/useComparisonCalculations';

interface ComparisonResultsProps {
  payrollSystemResults: PayrollSystemResults;
  managedPayrollResults: ManagedPayrollResults;
  inputs: {
    employeeCount: number;
    currentAnnualCost: number;
  };
}

const ComparisonResults: React.FC<ComparisonResultsProps> = ({
  payrollSystemResults,
  managedPayrollResults,
  inputs
}) => {
  const comparison = useComparisonCalculations(payrollSystemResults, managedPayrollResults);

  // Metrics
  const primaryMetrics: Metric[] = useMemo(() => {
    return [
      {
        title: '5-Year ROI Difference',
        value: comparison ? comparison.roiDifference.fiveYear : 0,
        format: 'percentage',
        indicatorType: comparison ? (comparison.roiDifference.fiveYear > 0 ? 'secondary' : 'primary') : 'info',
        precision: 1
      },
      {
        title: 'Annual Net Benefit Difference',
        value: comparison ? comparison.savingsDifference.annual : 0,
        format: 'currency',
        indicatorType: comparison ? (comparison.savingsDifference.annual > 0 ? 'secondary' : 'primary') : 'info',
        precision: 0
      },
      {
        title: 'Payback Period Difference',
        value: comparison ? comparison.roiDifference.paybackMonths : 0,
        format: 'decimal',
        indicatorType: comparison ? (comparison.roiDifference.paybackMonths > 0 ? 'secondary' : 'primary') : 'info',
        precision: 1
      },
      {
        title: 'Cost Per Payslip Difference',
        value: comparison ? comparison.costDifference.perPayslip : 0,
        format: 'currency',
        indicatorType: comparison ? (comparison.costDifference.perPayslip > 0 ? 'secondary' : 'primary') : 'info',
        precision: 2
      }
    ];
  }, [comparison]);

  // Tables
  const tableRows = useMemo(() => {
    return [
      {
        label: '5-Year ROI',
        payrollSystem: payrollSystemResults.fiveYearROI,
        managedPayroll: managedPayrollResults.fiveYearROI,
        difference: comparison ? comparison.roiDifference.fiveYear : 0
      },
      {
        label: 'Annual Net Benefit',
        payrollSystem: payrollSystemResults.netAnnualBenefit,
        managedPayroll: managedPayrollResults.netAnnualBenefit,
        difference: comparison ? comparison.savingsDifference.annual : 0
      },
      {
        label: 'Payback Period',
        payrollSystem: payrollSystemResults.paybackPeriodMonths,
        managedPayroll: managedPayrollResults.paybackPeriodMonths,
        difference: comparison ? comparison.roiDifference.paybackMonths : 0
      },
      {
        label: 'Cost Per Payslip',
        payrollSystem: payrollSystemResults.costPerPayslip,
        managedPayroll: managedPayrollResults.costPerPayslip,
        difference: comparison ? comparison.costDifference.perPayslip : 0
      }
    ];
  }, [comparison, payrollSystemResults, managedPayrollResults]);

  const tables: TableConfig[] = useMemo(() => {
    return [
      {
        title: 'Key Metrics Comparison',
        columns: [
          { field: 'label', headerName: '', align: 'left' },
          { field: 'payrollSystem', headerName: 'Payroll System', align: 'right', format: 'decimal' },
          { field: 'managedPayroll', headerName: 'Managed Payroll', align: 'right', format: 'decimal' },
          { field: 'difference', headerName: 'Difference', align: 'right', format: 'decimal' }
        ],
        rows: tableRows
      }
    ];
  }, [tableRows]);

  // Charts
  // 5-year projection
  const years = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => `Year ${i + 1}`);
  }, []);

  const systemAnnualSavings = useMemo(() => {
    return Array.from({ length: 5 }, () => payrollSystemResults.netAnnualBenefit);
  }, [payrollSystemResults]);

  systemAnnualSavings[0] = payrollSystemResults.netAnnualBenefit - payrollSystemResults.initialInvestment;

  const systemCumulativeSavings = useMemo(() => {
    return systemAnnualSavings.reduce((acc, curr, i) => {
      if (i === 0) return [curr];
      return [...acc, acc[i - 1] + curr];
    }, [] as number[]);
  }, [systemAnnualSavings]);

  const managedAnnualSavings = useMemo(() => {
    return Array.from({ length: 5 }, () => managedPayrollResults.netAnnualBenefit);
  }, [managedPayrollResults]);

  managedAnnualSavings[0] = managedPayrollResults.netAnnualBenefit - managedPayrollResults.transitionCosts;

  const managedCumulativeSavings = useMemo(() => {
    return managedAnnualSavings.reduce((acc, curr, i) => {
      if (i === 0) return [curr];
      return [...acc, acc[i - 1] + curr];
    }, [] as number[]);
  }, [managedAnnualSavings]);

  const fiveYearProjectionData = useMemo(() => {
    return {
      labels: years,
      datasets: [
        {
          label: 'Payroll System Cumulative Savings',
          data: systemCumulativeSavings,
          borderColor: '#1976d2',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          tension: 0.4
        },
        {
          label: 'Managed Payroll Cumulative Savings',
          data: managedCumulativeSavings,
          borderColor: '#9c27b0',
          backgroundColor: 'rgba(156, 39, 176, 0.1)',
          tension: 0.4
        }
      ]
    };
  }, [years, systemCumulativeSavings, managedCumulativeSavings]);

  const charts: ChartConfig[] = useMemo(() => {
    return [
      {
        type: 'line',
        title: 'Cumulative Savings Comparison (5 Years)',
        data: fiveYearProjectionData,
        width: 12,
        height: 350
      }
    ];
  }, [fiveYearProjectionData]);

  const footer: FooterConfig = useMemo(() => {
    return {
      text: 'Note: This comparison assumes 100% efficiency gains for Managed Payroll. Actual results may vary based on service provider capabilities and your specific requirements. Consider factors beyond financial metrics, such as data security, support quality, and strategic value when making your decision.',
      variant: 'note'
    };
  }, []);

  return (
    <StandardResultsLayout
      title="Payroll Solution Comparison Results"
      subtitle={`Comparison of Payroll System vs Managed Payroll for ${inputs.employeeCount.toLocaleString('en-GB')} employees`}
      primaryMetrics={primaryMetrics}
      tables={tables}
      charts={charts}
      footer={footer}
    />
  );
};

export default ComparisonResults;