import React from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';

/**
 * Props for the MetricResultCard component
 */
interface MetricResultCardProps {
  title: string;
  value: string | number;
  valueFormatted?: string;
  subtitle?: string;
  type?: 'currency' | 'percentage' | 'time' | 'text' | 'savings' | 'cost';
  size?: 'small' | 'medium' | 'large';
}

/**
 * Component for displaying a metric result in a card format
 * 
 * @param props - The component props
 * @returns A card component displaying a metric result
 */
const MetricResultCard: React.FC<MetricResultCardProps> = ({
  title,
  value,
  valueFormatted,
  subtitle,
  type = 'text',
  size = 'medium'
}) => {
  const theme = useTheme();
  
  // Determine color based on type
  const getColor = () => {
    switch (type) {
      case 'savings':
        return theme.palette.success.main;
      case 'cost':
        return theme.palette.warning.main;
      case 'percentage':
        return theme.palette.info.main;
      case 'time':
        return theme.palette.secondary.main;
      default:
        return theme.palette.primary.main;
    }
  };
  
  // Format the value if not already formatted
  const getFormattedValue = () => {
    if (valueFormatted) return valueFormatted;
    
    if (typeof value === 'string') return value;
    
    switch (type) {
      case 'currency':
        return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case 'percentage':
        return `${value.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
      case 'time':
        if (value < 1) {
          return `${Math.round(value * 30)} days`;
        }
        return `${value.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} months`;
      case 'savings':
      case 'cost':
        return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      default:
        return value.toString();
    }
  };
  
  // Get font size based on size prop
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return '1.25rem';
      case 'large':
        return '2.5rem';
      default:
        return '1.75rem';
    }
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        borderTop: `3px solid ${getColor()}`,
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ mb: 'auto' }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
      </Box>
      
      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          fontSize: getFontSize(),
          lineHeight: 1.2,
          mb: subtitle ? 0.5 : 0
        }}
      >
        {getFormattedValue()}
      </Typography>
      
      {subtitle && (
        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
};

export default MetricResultCard;