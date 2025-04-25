import React from 'react';
import { Box, Typography, Card, CardContent, useTheme } from '@mui/material';

interface SummaryMetricProps {
  title: string;
  value: string | number;
  subtitle?: string;
  type?: 'success' | 'warning' | 'info' | 'error';
}

// Standalone component for consistent summary metrics that appear in the UI screenshots
export const SummaryMetric: React.FC<SummaryMetricProps> = ({ 
  title, 
  value, 
  subtitle, 
  type = 'info' 
}) => {
  const theme = useTheme();
  
  // Define color based on type
  const getColor = () => {
    switch (type) {
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
        return theme.palette.error.main;
      case 'info':
      default:
        return theme.palette.primary.main;
    }
  };
  
  const color = getColor();
  
  return (
    <Box 
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        height: '100%',
        justifyContent: 'center',
        borderLeft: `4px solid ${color}`
      }}
    >
      <Typography variant="h4" component="div" sx={{ fontWeight: 500, color: color, width: '100%' }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, fontStyle: 'italic' }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

interface SummaryPanelProps {
  title: string;
  metrics: {
    title: string;
    value: string | number;
    subtitle?: string;
    type?: 'success' | 'warning' | 'info' | 'error';
  }[];
}

// Component to create a panel containing multiple summary metrics
const SummaryPanel: React.FC<SummaryPanelProps> = ({ title, metrics }) => {
  return (
    <Card sx={{ mb: 3, overflow: 'visible' }}>
      <CardContent>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 2,
          mt: 2
        }}>
          {metrics.map((metric, index) => (
            <Box key={index} sx={{ flex: '1 1 auto', minWidth: '200px' }}>
              <SummaryMetric
                title={metric.title}
                value={metric.value}
                subtitle={metric.subtitle}
                type={metric.type}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryPanel;