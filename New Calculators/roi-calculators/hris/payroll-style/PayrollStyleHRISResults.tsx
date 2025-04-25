import React from 'react';
import StandardResultsLayout from '../../../common/StandardResultsLayout';
import { HRISROIResults } from '../../../../types/roiCalculatorTypes';
import { useTheme } from '@mui/material';
import { hrisMessages } from '../../../../content/messages';

interface PayrollStyleHRISResultsProps {
  results: HRISROIResults;
}

const PayrollStyleHRISResults: React.FC<PayrollStyleHRISResultsProps> = ({ results }) => {
  const theme = useTheme();

  // --- Metrics ---
  const primaryMetrics = [
    {
      title: '5-Year ROI',
      value: results.fiveYearROI,
      format: 'percentage' as const,
      precision: 1,
    },
    {
      title: 'Annual Net Benefit',
      value: results.netAnnualBenefit,
      format: 'currency' as const,
      precision: 0,
    },
    {
      title: 'Payback Period',
      value: results.paybackPeriodMonths,
      format: 'decimal' as const,
      secondaryText: 'months',
      precision: 1,
    },
    {
      title: 'Savings Per Employee',
      value: results.savingsPerEmployee,
      format: 'currency' as const,
      precision: 0,
    },
  ];

  const secondaryMetrics = [
    {
      title: 'First Year ROI',
      value: results.firstYearROI,
      format: 'percentage' as const,
      precision: 1,
      secondaryText: 'Includes one-off implementation costs',
    },
    {
      title: 'Three-Year ROI',
      value: results.threeYearROI,
      format: 'percentage' as const,
      precision: 1,
    },
  ];

  // --- Breakdown ---
  const breakdowns = [
    {
      title: 'Annual Benefits Breakdown',
      items: [
        {
          label: 'Time Savings',
          value: results.timeSavings,
          format: 'currency' as const,
          percentage: results.totalAnnualBenefits ? (results.timeSavings / results.totalAnnualBenefits) * 100 : 0,
        },
        {
          label: 'Error Reduction',
          value: results.errorReductionSavings,
          format: 'currency' as const,
          percentage: results.totalAnnualBenefits ? (results.errorReductionSavings / results.totalAnnualBenefits) * 100 : 0,
        },
        {
          label: 'Strategic Value',
          value: results.strategicValueSavings,
          format: 'currency' as const,
          percentage: results.totalAnnualBenefits ? (results.strategicValueSavings / results.totalAnnualBenefits) * 100 : 0,
        },
      ],
      background: 'positive' as const,
      columns: 3,
    },
  ];

  // --- Charts ---
  // Ensure all values are numbers and default to 0 if missing
  const timeSavings = typeof results.timeSavings === 'number' ? results.timeSavings : 0;
  const errorReductionSavings = typeof results.errorReductionSavings === 'number' ? results.errorReductionSavings : 0;
  const strategicValueSavings = typeof results.strategicValueSavings === 'number' ? results.strategicValueSavings : 0;

  const hasBenefitBreakdownData = [timeSavings, errorReductionSavings, strategicValueSavings].some(v => v > 0);

  console.log({ timeSavings, errorReductionSavings, strategicValueSavings });
  const debugBreakdownValues = (
    <div style={{ color: '#c00', fontSize: 14, marginBottom: 8 }}>
      <strong>Debug Breakdown Values:</strong><br />
      Time Savings: {String(timeSavings)} | Error Reduction: {String(errorReductionSavings)} | Strategic Value: {String(strategicValueSavings)}
    </div>
  );

  // --- Custom content for missing chart data ---
  const benefitBreakdownContent = hasBenefitBreakdownData ? null : (
    <div style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
      No benefit breakdown data available for this scenario.
    </div>
  );

  const charts = [
    ...(hasBenefitBreakdownData ? [
      {
        type: 'pie' as const,
        title: 'Benefits Breakdown',
        data: {
          labels: ['Time Savings', 'Error Reduction', 'Strategic Value'],
          data: [timeSavings, errorReductionSavings, strategicValueSavings],
          backgroundColor: [
            theme.palette.primary.main,
            theme.palette.error.main,
            theme.palette.success.main,
          ],
        },
        width: 6,
        height: 300,
      }
    ] : []),
    {
      type: 'bar' as const,
      title: 'ROI by Time Period',
      data: {
        labels: ['First Year', 'Three Years', 'Five Years'],
        datasets: [
          {
            label: 'Return on Investment (%)',
            data: [results.firstYearROI, results.threeYearROI, results.fiveYearROI],
            backgroundColor: [
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.primary.main,
            ],
            borderColor: [
              theme.palette.warning.dark,
              theme.palette.info.dark,
              theme.palette.primary.dark,
            ],
            borderWidth: 1,
          },
        ],
      },
      width: 6,
      height: 300,
    },
    {
      type: 'bar' as const,
      title: 'Cumulative Savings Over 5 Years',
      data: {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: [
          {
            label: 'Net Cumulative Savings (£)',
            data: [
              results.netAnnualBenefit - results.initialInvestment,
              results.netAnnualBenefit * 2 - results.initialInvestment,
              results.netAnnualBenefit * 3 - results.initialInvestment,
              results.netAnnualBenefit * 4 - results.initialInvestment,
              results.netAnnualBenefit * 5 - results.initialInvestment,
            ],
            backgroundColor: theme.palette.success.main,
            borderColor: theme.palette.success.dark,
            borderWidth: 1,
          },
        ],
      },
      width: 12,
      height: 300,
    },
  ];

  // --- Footer ---
  const footer = {
    text: hrisMessages.footerText,
    variant: 'note' as const,
  };

  return (
    <>
      {debugBreakdownValues}
      <StandardResultsLayout
        title={hrisMessages.title}
        primaryMetrics={primaryMetrics}
        secondaryMetrics={secondaryMetrics}
        breakdowns={breakdowns}
        charts={charts}
        footer={footer}
        additionalContent={benefitBreakdownContent}
      />
    </>
  );
};

export default PayrollStyleHRISResults;