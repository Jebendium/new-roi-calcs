import { 
  Grid, 
  TextField, 
  Typography, 
  Box,
  InputAdornment,
  Alert,
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
import { TimeSavingsInput, HRISCostInput } from '../../../../types/roiCalculatorTypes';

interface HRISCompanyInfoInputsProps {
  timeSavings: TimeSavingsInput;
  setTimeSavings: (timeSavings: TimeSavingsInput) => void;
  costInputs: HRISCostInput;
  setCostInputs: (costInputs: HRISCostInput) => void;
}

const CompanyInfoInputs = ({ 
  timeSavings, 
  setTimeSavings, 
  costInputs, 
  setCostInputs 
}: HRISCompanyInfoInputsProps) => {
  
  // Handle input changes
  const handleTimeSavingsChange = (field: keyof TimeSavingsInput, value: number) => {
    setTimeSavings({
      ...timeSavings,
      [field]: value
    });
  };

  const handleCostInputsChange = (field: keyof HRISCostInput, value: number) => {
    setCostInputs({
      ...costInputs,
      [field]: value
    });
  };

  // Research data for table
  const researchData = [
    { 
      highlight: 'HR professionals typically spend 40% of their time on administrative tasks that can be automated', 
      source: 'CIPD Reports',
      link: 'https://www.cipd.org/en/knowledge/reports/'
    },
    { 
      highlight: 'Most organisations achieve full ROI on HRIS implementations within 12-18 months', 
      source: 'SME HR Systems Report',
      link: 'https://www.cipd.org/en/views-and-insights/thought-leadership/insight/hr-systems-sme/'
    },
    { 
      highlight: 'HR systems deliver practical benefits for SMEs through improved efficiency and better data access', 
      source: 'SME Systems Report',
      link: 'https://www.cipd.org/uk/views-and-insights/thought-leadership/insight/hr-systems-sme/'
    }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Company Information</Typography>
      
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ mb: 3, borderRadius: 1 }}
      >
        Enter your organisation's basic information to calculate potential HRIS ROI.
      </Alert>
      
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader 
          title="Organisation Details" 
          titleTypographyProps={{ variant: 'subtitle1' }}
          sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)', py: 1.5 }}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Number of HR Staff"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                value={timeSavings.hrStaffCount}
                onChange={(e) => handleTimeSavingsChange('hrStaffCount', Number(e.target.value))}
                helperText="Total number of HR staff who will use the HRIS"
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Average Hourly Rate (£)"
                type="number"
                InputProps={{ 
                  inputProps: { min: 1 },
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
                value={timeSavings.avgHourlyRate}
                onChange={(e) => handleTimeSavingsChange('avgHourlyRate', Number(e.target.value))}
                helperText="Average hourly cost of HR staff (including overheads)"
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Total Number of Employees"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                value={costInputs.employeeCount}
                onChange={(e) => handleCostInputsChange('employeeCount', Number(e.target.value))}
                helperText="Total number of employees in your organisation"
                margin="normal"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Card elevation={2}>
        <CardHeader 
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1">
                CIPD/CIPP Industry Insights
              </Typography>
              <Tooltip title="Research from the Chartered Institute of Personnel and Development">
                <Link 
                  href="https://www.cipd.org/en/knowledge/reports/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ ml: 1, fontSize: '0.75rem' }}
                >
                  [CIPD Reports]
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
                    <Link href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.source}
                    </Link>
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

export default CompanyInfoInputs;