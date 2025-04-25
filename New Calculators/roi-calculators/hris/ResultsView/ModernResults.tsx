import React from 'react';
import { Box, Button, useTheme } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import StandardResultsLayout from '../../../../components/common/StandardResultsLayout';
import { 
  HRISROIResults, 
  TimeSavingsInput 
} from '../../../../types/roiCalculatorTypes';
import { useReportExport, useHRISCalculations } from '../hooks';

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
  data: {
    labels?: string[];
    datasets?: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }>;
    data?: number[];
    backgroundColor?: string[];
    yAxisTitle?: string;
    [key: string]: unknown;
  };
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
  highlightTotal?: boolean;
}

interface TableColumn {
  field: string;
  headerName: string;
  align?: 'left' | 'right' | 'center';
  format?: 'currency' | 'percentage' | 'decimal' | 'text';
  width?: string;
  precision?: number;
  renderCell?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface TableConfig {
  title?: string;
  columns: TableColumn[];
  rows: Record<string, unknown>[];
  stickyHeader?: boolean;
  maxHeight?: number | string;
  highlightTotal?: boolean;
}

interface FooterConfig {
  text: string;
  variant?: 'info' | 'warning' | 'note';
}

interface ModernResultsProps {
  results: HRISROIResults | null;
  timeSavings: TimeSavingsInput;
}

const ModernResults: React.FC<ModernResultsProps> = ({
  results,
  timeSavings
}) => {
  const { generatePDFReport } = useReportExport();
  const { getTimeSavingsBreakdown } = useHRISCalculations();
  const theme = useTheme();

  if (!results) {
    return null;
  }

  const timeSavingsBreakdown = getTimeSavingsBreakdown(timeSavings);

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
      precision: 1
    },
    {
      title: 'Three-Year ROI',
      value: results.threeYearROI,
      format: 'percentage',
      precision: 1
    },
    {
      title: 'Initial Investment',
      value: results.initialInvestment,
      format: 'currency',
      precision: 0
    }
  ];

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
        },
        {
          label: 'Total Benefits',
          value: results.totalAnnualBenefits,
          format: 'currency',
          percentage: 100
        }
      ],
      highlightTotal: true
    },
    {
      title: 'Time Savings Detail',
      items: [
        {
          label: 'Administrative Tasks',
          value: timeSavingsBreakdown.adminTimeSavings,
          format: 'currency',
          percentage: (timeSavingsBreakdown.adminTimeSavings / results.timeSavings) * 100
        },
        {
          label: 'Data Entry',
          value: timeSavingsBreakdown.dataEntryTimeSavings,
          format: 'currency',
          percentage: (timeSavingsBreakdown.dataEntryTimeSavings / results.timeSavings) * 100
        },
        {
          label: 'Reporting',
          value: timeSavingsBreakdown.reportingTimeSavings,
          format: 'currency',
          percentage: (timeSavingsBreakdown.reportingTimeSavings / results.timeSavings) * 100
        },
        {
          label: 'Query Handling',
          value: timeSavingsBreakdown.queryHandlingTimeSavings,
          format: 'currency',
          percentage: (timeSavingsBreakdown.queryHandlingTimeSavings / results.timeSavings) * 100
        },
        {
          label: 'Total Time Savings',
          value: results.timeSavings,
          format: 'currency',
          percentage: 100
        }
      ],
      highlightTotal: true
    }
  ];

  const charts: ChartConfig[] = [
    {
      type: 'pie',
      title: 'Benefits Breakdown',
      data: {
        labels: ['Time Savings', 'Error Reduction', 'Strategic Value'],
        data: [
          results.timeSavings,
          results.errorReductionSavings,
          results.strategicValueSavings
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main
        ]
      },
      height: 300
    },
    {
      type: 'bar',
      title: 'Time Savings Breakdown',
      data: {
        labels: ['Administrative Tasks', 'Data Entry', 'Reporting', 'Query Handling'],
        datasets: [
          {
            label: 'Annual Savings (£)',
            data: [
              timeSavingsBreakdown.adminTimeSavings,
              timeSavingsBreakdown.dataEntryTimeSavings,
              timeSavingsBreakdown.reportingTimeSavings,
              timeSavingsBreakdown.queryHandlingTimeSavings
            ],
            backgroundColor: theme.palette.primary.main
          }
        ]
      },
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
            backgroundColor: theme.palette.secondary.main
          }
        ]
      },
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
            backgroundColor: theme.palette.success.main
          }
        ]
      },
      height: 300
    }
  ];

  const tables: TableConfig[] = [];

  const footer: FooterConfig = {
    text: 'Analysis based on CIPD benchmarks and UK HR industry standards.',
    variant: 'info'
  };

  const additionalContent = (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Button 
        variant="contained" 
        color="secondary" 
        startIcon={<PictureAsPdfIcon />} 
        onClick={() => generatePDFReport(results)}
        sx={{ mx: 1 }}
      >
        Export PDF Report
      </Button>
    </Box>
  );

  return (
    <StandardResultsLayout
      title="HRIS Implementation ROI Results"
      subtitle="Return on investment and efficiency gains from implementing a Human Resource Information System."
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

export default ModernResults;