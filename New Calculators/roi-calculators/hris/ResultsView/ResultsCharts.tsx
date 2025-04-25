import { 
  Grid, 
  Paper, 
  Typography, 
  Box
} from '@mui/material';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title,
  TimeScale,
  PointElement,
  LineElement
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { HRISROIResults, TimeSavingsInput } from '../../../../types/roiCalculatorTypes';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale,
  PointElement,
  LineElement
);

// Color palette matching the employer NI calculator - light colors only
const chartColors = {
  // Colors exactly as seen in the Employer NI calculator
  lightPink: '#FFAAAA',     // Light pink/salmon
  lightBlue: '#A1D6FF',     // Light blue
  lightGreen: '#A1E6D9',    // Light mint green
  lightYellow: '#FFE6AA',   // Light yellow/gold
  lightPurple: '#D8A1FF'    // Light purple
};

interface HRISResultsChartsProps {
  results: HRISROIResults | null;
  timeSavings: TimeSavingsInput;
}

const HRISResultsCharts = ({ results, timeSavings }: HRISResultsChartsProps) => {
  // Calculate time savings breakdown values
  const weeksPerYear = 52;
  
  const adminTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.adminHoursPerWeek * 
    (timeSavings.adminTimeReduction / 100) * 
    weeksPerYear;
  
  const dataEntryTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.dataEntryHoursPerWeek * 
    (timeSavings.dataEntryTimeReduction / 100) * 
    weeksPerYear;
  
  const reportingTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.reportingHoursPerWeek * 
    (timeSavings.reportingTimeReduction / 100) * 
    weeksPerYear;
  
  const queryHandlingTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.queryHandlingHoursPerWeek * 
    (timeSavings.queryReduction / 100) * 
    weeksPerYear;

  // Time Efficiency Savings bar chart - each bar with a different color
  const timeEfficiencyData = {
    labels: ['Admin Tasks', 'Data Entry', 'Reporting', 'Query Handling'],
    datasets: [
      {
        label: 'Annual Savings (£)',
        data: [
          adminTimeSavings,
          dataEntryTimeSavings,
          reportingTimeSavings,
          queryHandlingTimeSavings
        ],
        backgroundColor: [
          chartColors.lightBlue,    // Light blue
          chartColors.lightGreen,   // Light green
          chartColors.lightPink,    // Light pink
          chartColors.lightYellow   // Light yellow
        ]
      }
    ]
  };

  // ROI by time period bar chart - each bar with a different color
  const roiByTimePeriodData = {
    labels: ['First Year', 'Three Years', 'Five Years'],
    datasets: [
      {
        label: 'Return on Investment (%)',
        data: [
          results?.firstYearROI || 0,
          results?.threeYearROI || 0,
          results?.fiveYearROI || 0
        ],
        backgroundColor: [
          chartColors.lightYellow,  // Light yellow
          chartColors.lightGreen,   // Light green
          chartColors.lightBlue     // Light blue
        ]
      }
    ]
  };

  // Cumulative savings bar chart - each bar with a different color
  const cumulativeSavingsData = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [
      {
        label: 'Cumulative Savings (£)',
        data: results ? [
          results.netAnnualBenefit - results.initialInvestment,
          (results.netAnnualBenefit * 2) - results.initialInvestment,
          (results.netAnnualBenefit * 3) - results.initialInvestment,
          (results.netAnnualBenefit * 4) - results.initialInvestment,
          (results.netAnnualBenefit * 5) - results.initialInvestment
        ] : [0, 0, 0, 0, 0],
        backgroundColor: [
          chartColors.lightBlue,    // Light blue
          chartColors.lightGreen,   // Light green
          chartColors.lightPink,    // Light pink
          chartColors.lightYellow,  // Light yellow
          chartColors.lightPurple   // Light purple
        ]
      }
    ]
  };

  if (!results) {
    return null;
  }

  // Benefits breakdown pie chart data
  const benefitsBreakdownData = {
    labels: ['Time Savings', 'Data & Compliance', 'Strategic Value'],
    datasets: [
      {
        data: [
          results.timeSavings,
          results.errorReductionSavings,
          results.strategicValueSavings
        ],
        backgroundColor: [
          chartColors.lightBlue,  // Light blue for Time Savings
          chartColors.lightPink,  // Light pink for Error/Data Compliance
          chartColors.lightGreen  // Light green for Strategic Value
        ],
        borderColor: [
          chartColors.lightBlue,
          chartColors.lightPink,
          chartColors.lightGreen
        ],
        borderWidth: 1
      }
    ]
  };

  // Time savings breakdown bar chart data - each bar with a different color
  const timeSavingsBreakdownData = {
    labels: ['Admin Tasks', 'Data Entry', 'Reporting', 'Query Handling'],
    datasets: [
      {
        label: 'Annual Savings (£)',
        data: [
          adminTimeSavings,
          dataEntryTimeSavings,
          reportingTimeSavings,
          queryHandlingTimeSavings
        ],
        backgroundColor: [
          chartColors.lightBlue,    // Light blue
          chartColors.lightGreen,   // Light green
          chartColors.lightPink,    // Light pink
          chartColors.lightYellow   // Light yellow
        ],
        borderColor: [
          chartColors.lightBlue,
          chartColors.lightGreen,
          chartColors.lightPink,
          chartColors.lightYellow
        ],
        borderWidth: 1
      }
    ]
  };

  // Multi-year ROI chart data - bars with different colors
  const multiYearROIData = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [
      {
        label: 'Cumulative ROI (%)',
        data: [
          results.firstYearROI,
          ((results.netAnnualBenefit * 2 - results.initialInvestment) / results.initialInvestment) * 100,
          results.threeYearROI,
          ((results.netAnnualBenefit * 4 - results.initialInvestment) / results.initialInvestment) * 100,
          results.fiveYearROI
        ],
        backgroundColor: 'rgba(161, 230, 217, 0.2)', // Light teal transparent
        borderColor: chartColors.lightGreen,
        borderWidth: 2,
        type: 'line',
        yAxisID: 'y'
      },
      {
        label: 'Cumulative Savings (£)',
        data: [
          results.netAnnualBenefit - results.initialInvestment,
          results.netAnnualBenefit * 2 - results.initialInvestment,
          results.netAnnualBenefit * 3 - results.initialInvestment,
          results.netAnnualBenefit * 4 - results.initialInvestment,
          results.netAnnualBenefit * 5 - results.initialInvestment
        ],
        backgroundColor: [
          chartColors.lightBlue,    // Light blue
          chartColors.lightGreen,   // Light green
          chartColors.lightPink,    // Light pink
          chartColors.lightYellow,  // Light yellow
          chartColors.lightPurple   // Light purple
        ],
        borderColor: chartColors.lightBlue,
        borderWidth: 1,
        type: 'bar',
        yAxisID: 'y1'
      }
    ]
  };

  // Chart options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: £${value.toLocaleString('en-GB')}`;
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: £${value.toLocaleString('en-GB')}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Annual Savings (£)'
        }
      }
    }
  };

  const multiYearOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            if (label.includes('ROI')) {
              return `${label}: ${context.raw.toFixed(1)}%`;
            } else if (label.includes('Savings')) {
              return `${label}: £${context.raw.toLocaleString('en-GB')}`;
            }
            return `${label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'ROI (%)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        },
        title: {
          display: true,
          text: 'Cumulative Savings (£)'
        }
      }
    }
  };
  
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom align="center">
              Annual Benefits Breakdown
            </Typography>
            <Box sx={{ height: 300, position: 'relative' }}>
              <Pie data={benefitsBreakdownData} options={pieOptions} />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom align="center">
              Time Savings Breakdown
            </Typography>
            <Box sx={{ height: 300, position: 'relative' }}>
              <Bar data={timeSavingsBreakdownData} options={barOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom align="center">
              Time Efficiency Savings
            </Typography>
            <Box sx={{ height: 300, position: 'relative' }}>
              <Bar data={timeEfficiencyData} options={barOptions} />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom align="center">
              ROI by Time Period
            </Typography>
            <Box sx={{ height: 300, position: 'relative' }}>
              <Bar data={roiByTimePeriodData} options={barOptions} />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom align="center">
              Cumulative Savings Over 5 Years
            </Typography>
            <Box sx={{ height: 350, position: 'relative' }}>
              <Bar data={cumulativeSavingsData} options={barOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom align="center">
              5-Year ROI Projection
            </Typography>
            <Box sx={{ height: 350, position: 'relative' }}>
              <Bar data={multiYearROIData} options={multiYearOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HRISResultsCharts;