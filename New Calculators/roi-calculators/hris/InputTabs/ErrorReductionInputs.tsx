import { 
  Grid, 
  TextField, 
  Typography, 
  Box,
  Slider,
  Alert,
  InputAdornment,
  Link,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { MetricCard, BreakdownTable } from '../../../../components/core';
import { SummaryMetric } from '../SummaryPanel';
import { ErrorReductionInput } from '../../../../types/roiCalculatorTypes';

interface ErrorReductionInputsProps {
  errorReduction: ErrorReductionInput;
  setErrorReduction: (errorReduction: ErrorReductionInput) => void;
}

const ErrorReductionInputs = ({ 
  errorReduction, 
  setErrorReduction 
}: ErrorReductionInputsProps) => {
  
  // Handle input changes
  const handleErrorReductionChange = (field: keyof ErrorReductionInput, value: number) => {
    setErrorReduction({
      ...errorReduction,
      [field]: value
    });
  };

  // Calculate savings
  const calculateSavings = () => {
    const payrollErrorSavings = 
      errorReduction.annualPayrollErrors * 
      errorReduction.avgErrorCost * 
      (errorReduction.payrollErrorReduction / 100);
    
    const complianceIssueSavings = 
      errorReduction.annualComplianceIssues * 
      errorReduction.avgComplianceCost * 
      (errorReduction.complianceIssueReduction / 100);
    
    const totalErrorCost = 
      (errorReduction.annualPayrollErrors * errorReduction.avgErrorCost) + 
      (errorReduction.annualComplianceIssues * errorReduction.avgComplianceCost);
    
    const totalSavings = payrollErrorSavings + complianceIssueSavings;
    
    return {
      payrollErrorSavings,
      complianceIssueSavings,
      totalErrorCost,
      totalSavings
    };
  };

  const savingsCalculation = calculateSavings();

  // Research data for table
  const researchData = [
    { 
      highlight: 'Manual HR processes typically have a 1-3% error rate', 
      source: 'HR Data Quality Analysis',
      link: ''
    },
    { 
      highlight: 'Each payroll error costs £50-100 to fix when factoring in admin time',
      source: '',
      link: ''
    },
    { 
      highlight: 'Compliance issues can cost up to 30% more when using paper-based systems',
      source: 'CIPD Risk Assessment',
      link: 'https://www.cipd.org/uk/knowledge/factsheets/risk-management-factsheet/'
    },
    { 
      highlight: 'Automated systems typically reduce data entry errors by 40-70%',
      source: 'Digital HR Report',
      link: 'https://www.cipd.org/uk/knowledge/factsheets/hr-analytics-factsheet/'
    }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Error Reduction</Typography>
      
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ mb: 3, borderRadius: 1 }}
      >
        HRIS systems improve data accuracy and compliance. Enter your current error frequency and associated costs
        to calculate potential savings from improved data quality.
      </Alert>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardHeader 
              title="HR Data Error Reduction" 
              titleTypographyProps={{ variant: 'subtitle1' }}
              sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)', py: 1.5 }}
            />
            <CardContent>
              <TextField
                fullWidth
                label="Annual HR Data Errors"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                value={errorReduction.annualPayrollErrors}
                onChange={(e) => handleErrorReductionChange('annualPayrollErrors', Number(e.target.value))}
                helperText="Number of HR data errors annually (e.g., incorrect records)"
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Average Cost per Error (£)"
                type="number"
                InputProps={{ 
                  inputProps: { min: 0 },
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
                value={errorReduction.avgErrorCost}
                onChange={(e) => handleErrorReductionChange('avgErrorCost', Number(e.target.value))}
                helperText="Average cost to fix each error (admin time + any direct costs)"
                margin="normal"
              />
              
              <Box sx={{ mt: 4, mb: 2 }}>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Expected Error Reduction with HRIS</span>
                  <span>{errorReduction.payrollErrorReduction}%</span>
                </Typography>
                <Slider
                  value={errorReduction.payrollErrorReduction}
                  onChange={(_, value) => handleErrorReductionChange('payrollErrorReduction', value as number)}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <Box sx={{ borderRight: '4px solid #2E7D32', pr: 2, height: '100%', py: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography variant="h4" color="success.main" align="right">
                    £{savingsCalculation.payrollErrorSavings.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="right">
                    Potential Annual Savings
                  </Typography>
                  <Typography variant="caption" color="text.secondary" align="right" sx={{ fontStyle: 'italic' }}>
                    Error reduction: {errorReduction.payrollErrorReduction}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardHeader 
              title="Compliance Issue Reduction" 
              titleTypographyProps={{ variant: 'subtitle1' }}
              sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)', py: 1.5 }}
            />
            <CardContent>
              <TextField
                fullWidth
                label="Annual Compliance Issues"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                value={errorReduction.annualComplianceIssues}
                onChange={(e) => handleErrorReductionChange('annualComplianceIssues', Number(e.target.value))}
                helperText="Number of HR-related compliance issues annually"
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Average Cost per Compliance Issue (£)"
                type="number"
                InputProps={{ 
                  inputProps: { min: 0 },
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
                value={errorReduction.avgComplianceCost}
                onChange={(e) => handleErrorReductionChange('avgComplianceCost', Number(e.target.value))}
                helperText="Average cost per compliance issue (including remediation costs)"
                margin="normal"
              />
              
              <Box sx={{ mt: 4, mb: 2 }}>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Expected Compliance Improvement</span>
                  <span>{errorReduction.complianceIssueReduction}%</span>
                </Typography>
                <Slider
                  value={errorReduction.complianceIssueReduction}
                  onChange={(_, value) => handleErrorReductionChange('complianceIssueReduction', value as number)}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <Box sx={{ borderRight: '4px solid #2E7D32', pr: 2, height: '100%', py: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography variant="h4" color="success.main" align="right">
                    £{savingsCalculation.complianceIssueSavings.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="right">
                    Potential Compliance Savings
                  </Typography>
                  <Typography variant="caption" color="text.secondary" align="right" sx={{ fontStyle: 'italic' }}>
                    Compliance improvement: {errorReduction.complianceIssueReduction}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ borderLeft: '4px solid #ED6C02', pl: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" color="warning.main">
              £{savingsCalculation.totalErrorCost.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Annual Error Cost
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ borderRight: '4px solid #2E7D32', pr: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
            <Typography variant="h4" color="success.main" align="right">
              £{savingsCalculation.totalSavings.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="right">
              Total Potential Annual Savings
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Card elevation={2}>
        <CardHeader 
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1">
                Industry Research Highlights
              </Typography>
              <Tooltip title="Research on data quality impact in HR systems">
                <Link 
                  href="https://www.cipd.org/uk/knowledge/factsheets/hr-analytics-factsheet/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ ml: 1, fontSize: '0.75rem' }}
                >
                  [CIPD Analytics]
                </Link>
              </Tooltip>
            </Box>
          }
          sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)', py: 1.5 }}
        />
        <CardContent>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Research Finding</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Source</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {researchData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.highlight}</TableCell>
                  <TableCell align="right">
                    {item.link ? (
                      <Link href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.source}
                      </Link>
                    ) : item.source}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ErrorReductionInputs;