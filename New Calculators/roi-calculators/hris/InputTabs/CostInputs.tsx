import { 
  Grid, 
  TextField, 
  Typography, 
  Box,
  Alert,
  InputAdornment,
  Link,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Tooltip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { MetricCard, BreakdownTable } from '../../../../components/core';
import { HRISCostInput } from '../../../../types/roiCalculatorTypes';

interface HRISCostInputsProps {
  costInputs: HRISCostInput;
  setCostInputs: (costInputs: HRISCostInput) => void;
}

const CostInputs = ({ 
  costInputs, 
  setCostInputs 
}: HRISCostInputsProps) => {
  
  // Handle input changes
  const handleCostInputsChange = (field: keyof HRISCostInput, value: number) => {
    setCostInputs({
      ...costInputs,
      [field]: value
    });
  };

  // Calculate totals
  const calculateTotals = () => {
    const oneTimeCosts = 
      costInputs.implementationCost + 
      costInputs.trainingCost + 
      (costInputs.initialSoftwareCost || 0) + 
      (costInputs.dataMigrationCost || 0);
    
    const annualCosts = 
      costInputs.annualLicenseFee + 
      (costInputs.annualSupportCost || 0);
    
    return {
      oneTimeCosts,
      annualCosts,
      perEmployeeOneTime: oneTimeCosts / costInputs.employeeCount,
      perEmployeeAnnual: annualCosts / costInputs.employeeCount
    };
  };

  const totals = calculateTotals();

  // Market research data for table
  const marketResearchData = [
    { 
      businessSize: 'Small businesses (<100 employees)', 
      setupCosts: '£10,000-£30,000',
      source: 'HR Software Investment'
    },
    { 
      businessSize: 'Medium businesses (101-500)', 
      setupCosts: '£30,000-£75,000',
      source: 'SME Systems Report'
    },
    { 
      businessSize: 'Large enterprises (500+)', 
      setupCosts: '£75,000+',
      source: ''
    },
    { 
      businessSize: 'Payback period', 
      setupCosts: '2-4 years',
      source: 'ROI Analysis'
    }
  ];

  // Pricing models data for table
  const pricingModelsData = [
    { 
      model: 'Cloud-based', 
      pricing: '£5-15 per employee per month',
      notes: ''
    },
    { 
      model: 'On-premise', 
      pricing: 'Higher upfront cost, lower recurring fees',
      notes: ''
    },
    { 
      model: 'Implementation', 
      pricing: 'Typically 1-2x annual licence cost',
      notes: ''
    },
    { 
      model: 'Training', 
      pricing: 'Usually 10-15% of implementation',
      notes: ''
    }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>HRIS Implementation Costs</Typography>
      
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ mb: 3, borderRadius: 1 }}
      >
        Enter all one-time and recurring costs associated with your HRIS implementation. According to industry research, 
        costs vary significantly based on business size and requirements.
      </Alert>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardHeader 
              title="One-time Costs" 
              titleTypographyProps={{ variant: 'subtitle1' }}
              sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)', py: 1.5 }}
            />
            <CardContent>
              <TextField
                fullWidth
                label="Implementation Costs (£)"
                type="number"
                InputProps={{ 
                  inputProps: { min: 0 },
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
                value={costInputs.implementationCost}
                onChange={(e) => handleCostInputsChange('implementationCost', Number(e.target.value))}
                helperText="Consulting, configuration, and customisation costs"
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Training Costs (£)"
                type="number"
                InputProps={{ 
                  inputProps: { min: 0 },
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
                value={costInputs.trainingCost}
                onChange={(e) => handleCostInputsChange('trainingCost', Number(e.target.value))}
                helperText="Cost for training HR and other staff"
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Initial Software Cost (£)"
                type="number"
                InputProps={{ 
                  inputProps: { min: 0 },
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
                value={costInputs.initialSoftwareCost || 0}
                onChange={(e) => handleCostInputsChange('initialSoftwareCost', Number(e.target.value))}
                helperText="Upfront software purchase or setup costs (if applicable)"
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Data Migration Cost (£)"
                type="number"
                InputProps={{ 
                  inputProps: { min: 0 },
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
                value={costInputs.dataMigrationCost || 0}
                onChange={(e) => handleCostInputsChange('dataMigrationCost', Number(e.target.value))}
                helperText="Cost of migrating legacy data to the new system"
                margin="normal"
              />
              
              <Box sx={{ mt: 4, width: '100%' }}>
                <MetricCard
                  title="Total One-time Costs"
                  value={totals.oneTimeCosts}
                  subtitle={`Per Employee: £${totals.perEmployeeOneTime.toFixed(2)}`}
                  format="currency"
                  indicatorType="warning"
                  precision={0}
                  fullWidth
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardHeader 
              title="Annual Recurring Costs" 
              titleTypographyProps={{ variant: 'subtitle1' }}
              sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)', py: 1.5 }}
            />
            <CardContent>
              <TextField
                fullWidth
                label="Annual Licence Fee (£)"
                type="number"
                InputProps={{ 
                  inputProps: { min: 0 },
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
                value={costInputs.annualLicenseFee}
                onChange={(e) => handleCostInputsChange('annualLicenseFee', Number(e.target.value))}
                helperText="Annual subscription or licence renewal fee"
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Annual Support Cost (£)"
                type="number"
                InputProps={{ 
                  inputProps: { min: 0 },
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
                value={costInputs.annualSupportCost || 0}
                onChange={(e) => handleCostInputsChange('annualSupportCost', Number(e.target.value))}
                helperText="Annual maintenance and support fees"
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Number of Employees"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                value={costInputs.employeeCount}
                onChange={(e) => handleCostInputsChange('employeeCount', Number(e.target.value))}
                helperText="Total number of employees in your organisation"
                margin="normal"
              />
              
              <Box sx={{ mt: 4, width: '100%' }}>
                <MetricCard
                  title="Total Annual Recurring Costs"
                  value={totals.annualCosts}
                  subtitle={`Per Employee: £${totals.perEmployeeAnnual.toFixed(2)}`}
                  format="currency"
                  indicatorType="info"
                  precision={0}
                  fullWidth
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader 
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1">
                Typical HRIS Pricing Models
              </Typography>
              <Tooltip title="Pricing information from CIPD and industry research">
                <Link 
                  href="https://www.cipd.org/uk/views-and-insights/thought-leadership/insight/hr-software-investment/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ ml: 1, fontSize: '0.75rem' }}
                >
                  [CIPD/HIBob Report]
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
                <TableCell sx={{ fontWeight: 600 }}>Pricing Model</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Typical Costs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pricingModelsData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.model}</TableCell>
                  <TableCell align="right">{item.pricing}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card elevation={2}>
        <CardHeader 
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1">
                Market Research Insights
              </Typography>
              <Tooltip title="Investment data from HR software market research">
                <Link 
                  href="https://www.cipd.org/uk/views-and-insights/thought-leadership/insight/hr-software-investment/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ ml: 1, fontSize: '0.75rem' }}
                >
                  [HR Software Investment]
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
                <TableCell sx={{ fontWeight: 600 }}>Business Size</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Typical Setup</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Source</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marketResearchData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.businessSize}</TableCell>
                  <TableCell align="right">{item.setupCosts}</TableCell>
                  <TableCell align="right">
                    {item.source ? (
                      <Link 
                        href={item.source === 'SME Systems Report' 
                          ? 'https://www.cipd.org/uk/views-and-insights/thought-leadership/insight/hr-systems-sme/'
                          : item.source === 'ROI Analysis'
                          ? 'https://www.cipd.org/en/views-and-insights/thought-leadership/insight/hr-tech-implementation/'
                          : 'https://www.cipd.org/uk/views-and-insights/thought-leadership/insight/hr-software-investment/'}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {item.source}
                      </Link>
                    ) : ''}
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

export default CostInputs;