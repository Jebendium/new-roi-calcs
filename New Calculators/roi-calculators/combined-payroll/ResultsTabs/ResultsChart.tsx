import React from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ChartDataset
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Define chart types
type ChartType = 'bar' | 'pie' | 'line';

// Define a more specific dataset type for our charts
interface CustomChartDataset extends ChartDataset<ChartType, number[]> {
  type?: ChartType;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
  tension?: number;
  z?: number;
}

/**
 * Props for the ResultsChart component
 */
interface ResultsChartProps {
  title: string;
  type: ChartType;
  data: ChartData<ChartType, CustomChartDataset[]>;
  options?: ChartOptions<ChartType>;
  height?: number;
}

/**
 * Component for displaying a chart in the results
 * 
 * @param props - The component props
 * @returns A chart component for the results
 */
const ResultsChart: React.FC<ResultsChartProps> = ({
  title,
  type,
  data,
  options = {},
  height = 300
}) => {
  const theme = useTheme();
  
  // Default chart options with theme-based styling
  const defaultOptions: ChartOptions<ChartType> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme.palette.text.primary,
          font: {
            family: theme.typography.fontFamily,
            size: 12
          }
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: theme.palette.grey[800],
        titleColor: theme.palette.common.white,
        bodyColor: theme.palette.common.white,
        titleFont: {
          family: theme.typography.fontFamily,
          size: 14
        },
        bodyFont: {
          family: theme.typography.fontFamily,
          size: 13
        },
        padding: 10,
        cornerRadius: 4
      }
    },
    scales: type !== 'pie' ? {
      x: {
        grid: {
          color: theme.palette.divider
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily
          }
        }
      },
      y: {
        grid: {
          color: theme.palette.divider
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily
          }
        }
      }
    } : undefined
  };
  
  // Merge default options with provided options
  const mergedOptions = {
    ...defaultOptions,
    ...options
  };
  
  // Check if this is a mixed chart with bars and lines
  const hasBarsAndLines = data.datasets.some(d => d.type === 'bar' || !d.type) && 
                        data.datasets.some(d => d.type === 'line');
  
  // Apply theme colors if not specified in data
  const themedData = {
    ...data,
    datasets: data.datasets.map((dataset: CustomChartDataset, index: number) => {
      // Apply theme colors if not specified
      if (!dataset.backgroundColor) {
        if (type === 'pie') {
          return {
            ...dataset,
            backgroundColor: [
              theme.palette.primary.main,
              theme.palette.secondary.main,
              theme.palette.success.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.error.main,
              theme.palette.primary.light,
              theme.palette.secondary.light,
              theme.palette.success.light
            ].slice(0, dataset.data.length)
          };
        } else if (dataset.type === 'line' || type === 'line') {
          const color = [
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.success.main,
            theme.palette.info.main
          ][index % 4];
          
          return {
            ...dataset,
            borderColor: color,
            backgroundColor: `${color}20`,
            borderWidth: hasBarsAndLines ? 3 : 2, // Thicker lines when combined with bars
            tension: hasBarsAndLines ? 0.2 : 0, // Slight curve when with bars
            z: hasBarsAndLines ? 10 : undefined, // Ensure lines appear on top of bars
          };
        } else {
          // For bar charts
          const color = [
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.success.main,
            theme.palette.warning.main
          ][index % 4];
          
          return {
            ...dataset,
            backgroundColor: hasBarsAndLines ? `${color}99` : color // Add transparency when with lines
          };
        }
      } else if (hasBarsAndLines && (dataset.type === 'bar' || (!dataset.type && type === 'bar'))) {
        // Add transparency to bar datasets in mixed charts even if color is specified
        return {
          ...dataset,
          backgroundColor: Array.isArray(dataset.backgroundColor) ?
            dataset.backgroundColor.map((color: string) => typeof color === 'string' ? `${color}99` : color) :
            typeof dataset.backgroundColor === 'string' ? 
              `${dataset.backgroundColor}99` : 
              dataset.backgroundColor
        };
      } else if (hasBarsAndLines && (dataset.type === 'line')) {
        // Enhance line visibility in mixed charts
        return {
          ...dataset,
          borderWidth: 3,
          tension: 0.2,
          z: 10
        };
      }
      return dataset;
    })
  };
  
  // Render the appropriate chart type
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={themedData} options={mergedOptions} />;
      case 'pie':
        return <Pie data={themedData} options={mergedOptions} />;
      case 'line':
        return <Line data={themedData} options={mergedOptions} />;
      default:
        return null;
    }
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: '100%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      
      <Box sx={{ height, position: 'relative' }}>
        {renderChart()}
      </Box>
    </Paper>
  );
};

export default ResultsChart;