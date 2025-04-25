import React from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';

/**
 * Interface for savings breakdown item
 */
export interface SavingsBreakdownItem {
  category: string;
  amount: number;
  percentage: number;
}

/**
 * Props for the SavingsBreakdownTable component
 */
interface SavingsBreakdownTableProps {
  items: SavingsBreakdownItem[];
  totalSavings: number;
}

/**
 * Component for displaying a breakdown of savings in a table format
 * 
 * @param props - The component props
 * @returns A table component displaying a breakdown of savings
 */
const SavingsBreakdownTable: React.FC<SavingsBreakdownTableProps> = ({
  items,
  totalSavings
}) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 0, 
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Typography 
        variant="subtitle1" 
        sx={{ 
          p: 2, 
          bgcolor: theme.palette.grey[50], 
          borderBottom: `1px solid ${theme.palette.divider}`,
          fontWeight: 500
        }}
      >
        Savings Breakdown
      </Typography>
      
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">% of Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.category}</TableCell>
              <TableCell align="right">
                £{item.amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell align="right">
                {item.percentage.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ 
            '& td': { 
              fontWeight: 700, 
              borderTop: `2px solid ${theme.palette.divider}`,
              py: 1.5 
            } 
          }}>
            <TableCell>Total Annual Savings</TableCell>
            <TableCell align="right">
              £{totalSavings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </TableCell>
            <TableCell align="right">100.0%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default SavingsBreakdownTable;