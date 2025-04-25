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
import { StrategicValueInput } from '../../../../types/roiCalculatorTypes';

interface HRISStrategicValueInputsProps {
  strategicValue: StrategicValueInput;
  setStrategicValue: (strategicValue: StrategicValueInput) => void;
  employeeCount: number;
}

const HRISStrategicValueInputs = ({ 
  strategicValue, 
  setStrategicValue,
  employeeCount
}: HRISStrategicValueInputsProps) => {
  
  // Handle input changes
  const handleStrategicValueChange = (field: keyof StrategicValueInput, value: number) => {
    setStrategicValue({
      ...strategicValue,
      [field]: value
    });
  };

  // Calculate estimated turnover savings
  const calculateEstimatedSavings = () => {
    const currentTurnoverCost = 
      (strategicValue.annualEmployeeTurnover / 100) * 
      employeeCount * 
      strategicValue.avgReplacementCost;
    
    const estimatedSavings = 
      currentTurnoverCost * 
      (strategicValue.turnoverReduction / 100);
    
    return {
      currentTurnoverCost,
      estimatedSavings
    };
  };

  const savingsEstimate = calculateEstimatedSavings();

  // Research highlight data for table
  const researchData = [
    { 
      highlight: 'Average UK employee turnover rate is 34%', 
      source: 'CIPD Benchmarking',
      link: 'https://www.cipd.org/uk/views-and-insights/thought-leadership/cipd-voice/benchmarking-employee-turnover/'
    },
    { 
      highlight: 'Investing in development activities reduces employee turnover', 
      source: 'Talent Management',
      link: 'https://www.cipd.org/en/knowledge/factsheets/talent-factsheet/'
    },
    { 
      highlight: 'Employee headcount, turnover, and absenteeism are reported monthly by 75% of organizations', 
      source: 'CIPD Technology Report',
      link: 'https://www.cipd.org/en/views-and-insights/thought-leadership/insight/technology-data-hr-functions/'
    },
    { 
      highlight: 'Strategic workforce planning supported by HRIS leads to better talent management outcomes', 
      source: '',
      link: ''
    }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Strategic Value</Typography>
      
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ mb: 3, borderRadius: 1 }}
      >
        HRIS systems deliver strategic benefits beyond operational efficiencies, including improved talent retention and better decision-making.
        CIPD research shows data-driven HR decisions are significantly more effective than intuition-based approaches.
      </Alert>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardHeader 
              title="Employee Turnover Reduction" 
              titleTypographyProps={{ variant: 'subtitle1' }}
              sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)', py: 1.5 }}
            />
            <CardContent>
              <TextField
                fullWidth
                label="Current Annual Employee Turnover (%)"
                type="number"
                InputProps={{ 
                  inputProps: { min: 0, max: 100 },
                  endAdornment: <InputAdornment position="end">%</InputAdornment>
                }}
                value={strategicValue.annualEmployeeTurnover}
                onChange={(e) => handleStrategicValueChange('annualEmployeeTurnover', Number(e.target.value))}
                helperText="Percentage of employees leaving annually (UK average is 34%)"
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Average Cost to Replace an Employee (£)"
                type="number"
                InputProps={{ 
                  inputProps: { min: 0 },
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
                value={strategicValue.avgReplacementCost}
                onChange={(e) => handleStrategicValueChange('avgReplacementCost', Number(e.target.value))}
                helperText="Include recruitment, onboarding, and lost productivity costs"
                margin="normal"
              />
              
              <Box sx={{ mt: 3, mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Expected Turnover Reduction with HRIS: {strategicValue.turnoverReduction}%
                </Typography>
                <Slider
                  value={strategicValue.turnoverReduction}
                  onChange={(_, value) => handleStrategicValueChange('turnoverReduction', value as number)}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              </Box>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <MetricCard
                    title="Current annual turnover cost"
                    value={savingsEstimate.currentTurnoverCost}
                    format="currency"
                    indicatorType="warning"
                    precision={0}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MetricCard
                    title="Potential annual savings"
                    value={savingsEstimate.estimatedSavings}
                    format="currency"
                    indicatorType="success"
                    precision={0}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardHeader 
              title="Improved Decision-Making" 
              titleTypographyProps={{ variant: 'subtitle1' }}
              sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)', py: 1.5 }}
            />
            <CardContent>
              <Typography variant="body2" sx={{ mb: 2 }}>
                HRIS systems provide better data analytics, enabling more effective strategic HR decisions,
                improved workforce planning, and enhanced talent management.
              </Typography>
              
              <TextField
                fullWidth
                label="Annual Value of Improved Decision-Making (£)"
                type="number"
                InputProps={{ 
                  inputProps: { min: 0 },
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
                value={strategicValue.improvedDecisionMakingValue}
                onChange={(e) => handleStrategicValueChange('improvedDecisionMakingValue', Number(e.target.value))}
                helperText="Estimated value from better resource allocation, strategic hiring, etc."
                margin="normal"
              />
              
              <Card variant="outlined" sx={{ mt: 3, backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    How to estimate improved decision-making value:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                    <Box component="li">
                      <Typography variant="body2">
                        Consider the cost of poor hiring decisions made without data
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography variant="body2">
                        Estimate value of better resource allocation
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography variant="body2">
                        Calculate impact of more effective workforce planning
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography variant="body2">
                        Typically 1-3% of total annual salary budget
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader 
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1">
                CIPD Research Highlights
              </Typography>
              <Tooltip title="Research from the Chartered Institute of Personnel and Development">
                <Link 
                  href="https://www.cipd.org/en/knowledge/factsheets/strategic-hrm-factsheet/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ ml: 1, fontSize: '0.75rem' }}
                >
                  [Strategic HRM Factsheet]
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

export default HRISStrategicValueInputs;