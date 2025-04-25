import React from 'react';
import { Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { 
  HRISROIResults, 
  TimeSavingsInput 
} from '../../../../types/roiCalculatorTypes';
import { useReportExport } from '../hooks';
import StandardResultsLayout, { Metric, ChartConfig, TableConfig, FooterConfig, BreakdownConfig } from '../../../common/StandardResultsLayout';

interface HRISResultsProps {
  results: HRISROIResults | null;
  timeSavings: TimeSavingsInput;
}

const HRISResults: React.FC<HRISResultsProps> = ({
  results,
  timeSavings
}) => {
  const { generatePDFReport } = useReportExport();

  if (!results) {
    return null;
  }

  // Prepare metrics for StandardResultsLayout
  const primaryMetrics: Metric[] = [
    {
      title: 'First Year ROI',
      value: results.firstYearROI,
      format: 'percentage',
      precision: 1
    },
    {
      title: '3-Year ROI',
      value: results.threeYearROI,
      format: 'percentage',
      precision: 1
    },
    {
      title: '5-Year ROI',
      value: results.fiveYearROI,
      format: 'percentage',
      precision: 1
    },
    {
      title: 'Payback Period',
      value: results.paybackPeriodMonths,
      format: 'decimal',
      secondaryText: 'months',
      precision: 1
    },
    {
      title: 'Annual Savings Per Employee',
      value: results.savingsPerEmployee,
      format: 'currency'
    }
  ];

  const secondaryMetrics: Metric[] = [
    {
      title: 'Total Annual Benefits',
      value: results.totalAnnualBenefits,
      format: 'currency',
      isPositive: true
    },
    {
      title: 'Annual Costs',
      value: results.annualCosts,
      format: 'currency',
      isPositive: false
    },
    {
      title: 'Net Annual Benefit',
      value: results.netAnnualBenefit,
      format: 'currency',
      isPositive: results.netAnnualBenefit > 0
    },
    {
      title: 'Initial Investment',
      value: results.initialInvestment,
      format: 'currency',
      isPositive: false
    },
    {
      title: 'First Year Net Return',
      value: results.netAnnualBenefit - results.initialInvestment,
      format: 'currency',
      isPositive: (results.netAnnualBenefit - results.initialInvestment) > 0
    }
  ];

  // Prepare breakdowns
  const breakdowns: BreakdownConfig[] = [
    {
      title: 'Annual Benefits Breakdown',
      items: [
        {
          label: 'Time Savings',
          value: results.timeSavings,
          format: 'currency',
          percentage: (results.timeSavings / results.totalAnnualBenefits) * 100
        },
        {
          label: 'Data & Compliance Improvements',
          value: results.errorReductionSavings,
          format: 'currency',
          percentage: (results.errorReductionSavings / results.totalAnnualBenefits) * 100
        },
        {
          label: 'Strategic Value',
          value: results.strategicValueSavings,
          format: 'currency',
          percentage: (results.strategicValueSavings / results.totalAnnualBenefits) * 100
        }
      ],
      columns: 3
    }
  ];

  // Prepare charts (mirroring ResultsCharts)
  const chartColors = {
    lightPink: '#FFAAAA',
    lightBlue: '#A1D6FF',
    lightGreen: '#A1E6D9',
    lightYellow: '#FFE6AA',
    lightPurple: '#D8A1FF'
  };
  const weeksPerYear = 52;
  const adminTimeSavings = timeSavings.hrStaffCount * timeSavings.avgHourlyRate * timeSavings.adminHoursPerWeek * (timeSavings.adminTimeReduction / 100) * weeksPerYear;
  const dataEntryTimeSavings = timeSavings.hrStaffCount * timeSavings.avgHourlyRate * timeSavings.dataEntryHoursPerWeek * (timeSavings.dataEntryTimeReduction / 100) * weeksPerYear;
  const reportingTimeSavings = timeSavings.hrStaffCount * timeSavings.avgHourlyRate * timeSavings.reportingHoursPerWeek * (timeSavings.reportingTimeReduction / 100) * weeksPerYear;
  const queryHandlingTimeSavings = timeSavings.hrStaffCount * timeSavings.avgHourlyRate * timeSavings.queryHandlingHoursPerWeek * (timeSavings.queryReduction / 100) * weeksPerYear;

  const charts: ChartConfig[] = [
    {
      type: 'pie',
      title: 'Annual Benefits Breakdown',
      data: {
        labels: ['Time Savings', 'Data & Compliance Improvements', 'Strategic Value'],
        data: [results.timeSavings, results.errorReductionSavings, results.strategicValueSavings],
        backgroundColor: [chartColors.lightBlue, chartColors.lightGreen, chartColors.lightPink]
      },
      width: 6,
      height: 300
    },
    {
      type: 'bar',
      title: 'Time Savings Breakdown',
      data: {
        labels: ['Admin Tasks', 'Data Entry', 'Reporting', 'Query Handling'],
        datasets: [
          {
            label: 'Annual Savings (£)',
            data: [adminTimeSavings, dataEntryTimeSavings, reportingTimeSavings, queryHandlingTimeSavings],
            backgroundColor: [chartColors.lightBlue, chartColors.lightGreen, chartColors.lightPink, chartColors.lightYellow]
          }
        ],
        yAxisTitle: 'Annual Savings (£)'
      },
      width: 6,
      height: 300
    },
    {
      type: 'bar',
      title: 'ROI by Time Period',
      data: {
        labels: ['First Year', 'Three Years', 'Five Years'],
        datasets: [
          {
            label: 'Return on Investment (%)',
            data: [results.firstYearROI, results.threeYearROI, results.fiveYearROI],
            backgroundColor: [chartColors.lightYellow, chartColors.lightGreen, chartColors.lightBlue]
          }
        ],
        yAxisTitle: 'ROI (%)'
      },
      width: 6,
      height: 300
    },
    {
      type: 'bar',
      title: 'Cumulative Savings Over 5 Years',
      data: {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: [
          {
            label: 'Cumulative Savings (£)',
            data: [
              results.netAnnualBenefit - results.initialInvestment,
              (results.netAnnualBenefit * 2) - results.initialInvestment,
              (results.netAnnualBenefit * 3) - results.initialInvestment,
              (results.netAnnualBenefit * 4) - results.initialInvestment,
              (results.netAnnualBenefit * 5) - results.initialInvestment
            ],
            backgroundColor: [chartColors.lightBlue, chartColors.lightGreen, chartColors.lightPink, chartColors.lightYellow, chartColors.lightPurple]
          }
        ],
        yAxisTitle: 'Cumulative Savings (£)'
      },
      width: 12,
      height: 350
    }
  ];

  // Prepare tables (from ResultsDetails)
  const tables: TableConfig[] = [
    {
      title: 'Time Savings Detail',
      columns: [
        { field: 'activity', headerName: 'Activity' },
        { field: 'hoursPerWeek', headerName: 'Hours/Week', align: 'right' },
        { field: 'costPerHour', headerName: 'Cost/Hour', align: 'right', format: 'currency' },
        { field: 'reduction', headerName: 'Reduction %', align: 'right', format: 'percentage', precision: 1 },
        { field: 'annualSavings', headerName: 'Annual Savings', align: 'right', format: 'currency' }
      ],
      rows: [
        {
          activity: 'Administrative Tasks',
          hoursPerWeek: timeSavings.adminHoursPerWeek,
          costPerHour: timeSavings.avgHourlyRate,
          reduction: timeSavings.adminTimeReduction,
          annualSavings: adminTimeSavings
        },
        {
          activity: 'Data Entry',
          hoursPerWeek: timeSavings.dataEntryHoursPerWeek,
          costPerHour: timeSavings.avgHourlyRate,
          reduction: timeSavings.dataEntryTimeReduction,
          annualSavings: dataEntryTimeSavings
        },
        {
          activity: 'Reporting',
          hoursPerWeek: timeSavings.reportingHoursPerWeek,
          costPerHour: timeSavings.avgHourlyRate,
          reduction: timeSavings.reportingTimeReduction,
          annualSavings: reportingTimeSavings
        },
        {
          activity: 'Query Handling',
          hoursPerWeek: timeSavings.queryHandlingHoursPerWeek,
          costPerHour: timeSavings.avgHourlyRate,
          reduction: timeSavings.queryReduction,
          annualSavings: queryHandlingTimeSavings
        }
      ],
      stickyHeader: true
    }
  ];

  // Footer config
  const footer: FooterConfig = {
    text: 'ROI Calculation Method: First Year ROI = ((Annual Benefits - Annual Costs - Initial Investment) / Initial Investment) × 100%. Payback Period (months) = (Initial Investment / (Annual Benefits - Annual Costs)) × 12.',
    variant: 'info'
  };

  // PDF Export button as additionalContent
  const additionalContent = (
    <Button 
      variant="contained" 
      color="secondary" 
      startIcon={<PictureAsPdfIcon />} 
      onClick={() => generatePDFReport(results)}
      sx={{ mx: 1 }}
    >
      Export PDF Report
    </Button>
  );

  return (
    <StandardResultsLayout
      title="HRIS Implementation ROI Results"
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

export default HRISResults;