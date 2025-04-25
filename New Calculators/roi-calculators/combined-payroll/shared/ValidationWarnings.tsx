import React from 'react';
import { 
  Alert, 
  AlertTitle, 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { ValidationWarning } from '../../../../types/combinedPayrollTypes';

/**
 * Props for the ValidationWarnings component
 */
interface ValidationWarningsProps {
  warnings: ValidationWarning[];
}

/**
 * Component that displays validation warnings for input fields
 * 
 * @param props - The component props
 * @returns A validation warnings component
 */
const ValidationWarnings: React.FC<ValidationWarningsProps> = ({ warnings }) => {
  if (warnings.length === 0) {
    return null;
  }
  
  const errors = warnings.filter(warning => warning.type === 'error');
  const warningItems = warnings.filter(warning => warning.type === 'warning');
  
  return (
    <Box sx={{ mb: 3 }}>
      {errors.length > 0 && (
        <Alert 
          severity="error" 
          variant="outlined" 
          sx={{ mb: 2 }}
        >
          <AlertTitle>Input Errors</AlertTitle>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Please correct the following errors before calculating:
          </Typography>
          <List dense disablePadding>
            {errors.map((error, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <ErrorOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={error.message} 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
      
      {warningItems.length > 0 && (
        <Alert 
          severity="warning"
          variant="outlined"
        >
          <AlertTitle>Input Warnings</AlertTitle>
          <Typography variant="body2" sx={{ mb: 1 }}>
            The following inputs may need review, but you can still proceed:
          </Typography>
          <List dense disablePadding>
            {warningItems.map((warning, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <WarningAmberIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={warning.message} 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Box>
  );
};

export default ValidationWarnings;
