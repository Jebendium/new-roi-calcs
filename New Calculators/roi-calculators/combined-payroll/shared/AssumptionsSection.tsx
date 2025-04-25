import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  Collapse,
  useTheme
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

/**
 * Props for the AssumptionsSection component
 */
interface AssumptionsSectionProps {
  calculatorType: 'payrollSystem' | 'managedPayroll';
}

/**
 * Component that displays the assumptions used in calculations
 * 
 * @param props - The component props
 * @returns An assumptions section component
 */
const AssumptionsSection: React.FC<AssumptionsSectionProps> = ({ calculatorType }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const payrollSystemAssumptions = [
    'Processing time reduction, error reduction, and query reduction based on your inputs',
    'Annual pay runs calculated based on your frequency inputs',
    'ROI calculation includes both one-time implementation costs and ongoing monthly costs',
    'Wage savings realised immediately',
    'Paper cost savings (if any) realised immediately'
  ];
  
  const managedPayrollAssumptions = [
    '100% of processing time saved through outsourcing',
    '100% of error handling and compliance issues transferred to the service provider',
    '100% of query handling time saved',
    'Annual pay runs calculated based on your frequency inputs',
    'ROI calculation includes both transition costs and ongoing service fees',
    'Wage savings realised immediately',
    'Paper cost savings (if any) realised immediately'
  ];
  
  const assumptions = calculatorType === 'payrollSystem' 
    ? payrollSystemAssumptions 
    : managedPayrollAssumptions;
  
  const title = calculatorType === 'payrollSystem'
    ? 'Payroll System Calculation Assumptions'
    : 'Managed Payroll Calculation Assumptions';
    
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        mb: 3, 
        p: 2, 
        backgroundColor: `${theme.palette.info.light}20`,
        borderLeft: `4px solid ${theme.palette.info.main}`
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoIcon sx={{ color: theme.palette.info.main, mr: 1 }} />
          <Typography variant="subtitle1" fontWeight={500}>
            {title}
          </Typography>
        </Box>
        <IconButton 
          onClick={toggleExpanded} 
          size="small" 
          aria-expanded={expanded}
          aria-label="Show assumptions"
        >
          {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>
      
      <Collapse in={expanded}>
        <List dense sx={{ mt: 1 }}>
          {assumptions.map((assumption, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <Box 
                  component="span" 
                  sx={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    backgroundColor: theme.palette.info.main,
                    display: 'inline-block'
                  }} 
                />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body2" color="text.secondary">
                    {assumption}
                  </Typography>
                } 
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Paper>
  );
};

export default AssumptionsSection;
