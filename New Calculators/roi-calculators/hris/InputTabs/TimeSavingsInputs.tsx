import { 
  Grid, 
  TextField, 
  Typography, 
  Box,
  Slider,
  Alert,
  Divider,
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
import { TimeSavingsInput } from '../../../../types/roiCalculatorTypes';

interface TimeSavingsInputsProps {
  timeSavings: TimeSavingsInput;
  setTimeSavings: (timeSavings: TimeSavingsInput) => void;
}

const TimeSavingsInputs = ({ 
  timeSavings, 
  setTimeSavings
}: TimeSavingsInputsProps) => {
  
  // Handle input changes
  const handleTimeSavingsChange = (field: keyof TimeSavingsInput, value: number) => {
    setTimeSavings({
      ...timeSavings,
      [field]: value
    });
  };

  // Calculate annual hours and potential savings
  const calculateTimeSavings = () => {
    const weeksPerYear = 52;
    
    const adminHoursAnnual = timeSavings.adminHoursPerWeek * weeksPerYear;
    const dataEntryHoursAnnual = timeSavings.dataEntryHoursPerWeek * weeksPerYear;
    const reportingHoursAnnual = timeSavings.reportingHoursPerWeek * weeksPerYear;
    const queryHoursAnnual = timeSavings.queryHandlingHoursPerWeek * weeksPerYear;
    
    const adminSavings = adminHoursAnnual * (timeSavings.adminTimeReduction / 100) * timeSavings.avgHourlyRate;
    const dataEntrySavings = dataEntryHoursAnnual * (timeSavings.dataEntryTimeReduction / 100) * timeSavings.avgHourlyRate;
    const reportingSavings = reportingHoursAnnual * (timeSavings.reportingTimeReduction / 100) * timeSavings.avgHourlyRate;
    const querySavings = queryHoursAnnual * (timeSavings.queryReduction / 100) * timeSavings.avgHourlyRate;
    
    const totalHoursAnnual = adminHoursAnnual + dataEntryHoursAnnual + reportingHoursAnnual + queryHoursAnnual;
    const totalHoursSaved = 
      (adminHoursAnnual * timeSavings.adminTimeReduction / 100) +
      (dataEntryHoursAnnual * timeSavings.dataEntryTimeReduction / 100) +
      (reportingHoursAnnual * timeSavings.reportingTimeReduction / 100) +
      (queryHoursAnnual * timeSavings.queryReduction / 100);
    
    const totalSavings = adminSavings + dataEntrySavings + reportingSavings + querySavings;
    
    return {
      adminHoursAnnual,
      dataEntryHoursAnnual,
      reportingHoursAnnual,
      queryHoursAnnual,
      adminSavings,
      dataEntrySavings,
      reportingSavings,
      querySavings,
      totalHoursAnnual,
      totalHoursSaved,
      totalSavings
    };
  };

  const savingsCalculation = calculateTimeSavings();

  // Research data for table
  const researchData = [
    { 
      highlight: 'Administrative tasks can be streamlined by 40-60% with HRIS', 
      source: 'CIPD SME Study',
      link: 'https://www.cipd.org/en/views-and-insights/thought-leadership/insight/hr-systems-sme/'
    },
    { 
      highlight: 'Self-service portals decrease HR data entry requirements by 50-70%', 
      source: '',
      link: ''
    },
    { 
      highlight: 'Employee metrics are reported with 75% higher efficiency', 
      source: 'CIPD Technology Report',
      link: 'https://www.cipd.org/en/views-and-insights/thought-leadership/insight/technology-data-hr-functions/'
    },
    { 
      highlight: 'HRIS frees up HR professionals\' time for more strategic, value-adding activities', 
      source: '',
      link: ''
    }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Time Savings</Typography>
      
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ mb: 3, borderRadius: 1 }}
      >
        Enter the current time spent on various HR activities and the expected reduction in time with an HRIS.
        Research shows HRIS implementation allows HR professionals to focus more on strategic initiatives by
        reducing administrative burdens.
      </Alert>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardHeader 
              title="Current Time Spent (Hours per Week)" 
              titleTypographyProps={{ variant: 'subtitle1' }}
              sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)', py: 1.5 }}
            />
            <CardContent>
              <TextField
                fullWidth
                label="Administrative Tasks (hours/week)"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.5 } }}
                value={timeSavings.adminHoursPerWeek}
                onChange={(e) => handleTimeSavingsChange('adminHoursPerWeek', Number(e.target.value))}
                helperText="Time spent on general HR admin tasks (per HR staff)"
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Data Entry (hours/week)"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.5 } }}
                value={timeSavings.dataEntryHoursPerWeek}
                onChange={(e) => handleTimeSavingsChange('dataEntryHoursPerWeek', Number(e.target.value))}
                helperText="Time spent entering/updating HR data (per HR staff)"
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Reporting (hours/week)"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.5 } }}
                value={timeSavings.reportingHoursPerWeek}
                onChange={(e) => handleTimeSavingsChange('reportingHoursPerWeek', Number(e.target.value))}
                helperText="Time spent creating HR reports (per HR staff)"
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Employee Query Handling (hours/week)"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.5 } }}
                value={timeSavings.queryHandlingHoursPerWeek}
                onChange={(e) => handleTimeSavingsChange('queryHandlingHoursPerWeek', Number(e.target.value))}
                helperText="Time spent responding to employee HR queries (per HR staff)"
                margin="normal"
              />

              <Box sx={{ mt: 4 }}>
                <Box sx={{ borderLeft: '4px solid #ED6C02', pl: 2, height: '100%', py: 2 }}>
                  <Typography variant="h4" color="warning.main">
                    {(savingsCalculation.totalHoursAnnual * timeSavings.hrStaffCount).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Annual Hours
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    Per HR Staff: {savingsCalculation.totalHoursAnnual} hours/year
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardHeader 
              title="Expected Time Reduction (%)" 
              titleTypographyProps={{ variant: 'subtitle1' }}
              sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)', py: 1.5 }}
            />
            <CardContent>
              <Box sx={{ mb: 3, mt: 1 }}>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Administrative Tasks</span>
                  <span>{timeSavings.adminTimeReduction}%</span>
                </Typography>
                <Slider
                  value={timeSavings.adminTimeReduction}
                  onChange={(_, value) => handleTimeSavingsChange('adminTimeReduction', value as number)}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Data Entry</span>
                  <span>{timeSavings.dataEntryTimeReduction}%</span>
                </Typography>
                <Slider
                  value={timeSavings.dataEntryTimeReduction}
                  onChange={(_, value) => handleTimeSavingsChange('dataEntryTimeReduction', value as number)}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Reporting</span>
                  <span>{timeSavings.reportingTimeReduction}%</span>
                </Typography>
                <Slider
                  value={timeSavings.reportingTimeReduction}
                  onChange={(_, value) => handleTimeSavingsChange('reportingTimeReduction', value as number)}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Query Reduction</span>
                  <span>{timeSavings.queryReduction}%</span>
                </Typography>
                <Slider
                  value={timeSavings.queryReduction}
                  onChange={(_, value) => handleTimeSavingsChange('queryReduction', value as number)}
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
                    £{(savingsCalculation.totalSavings * timeSavings.hrStaffCount).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="right">
                    Potential Annual Savings
                  </Typography>
                  <Typography variant="caption" color="text.secondary" align="right" sx={{ fontStyle: 'italic' }}>
                    Hours saved: {(savingsCalculation.totalHoursSaved * timeSavings.hrStaffCount).toFixed(0)} hours/year
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Card elevation={2}>
        <CardHeader 
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1">
                Industry Research Highlights
              </Typography>
              <Tooltip title="Research from industry studies on HR technology impact">
                <Link 
                  href="https://www.cipd.org/uk/knowledge/case-studies/my-working-life-hr-administrator/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ ml: 1, fontSize: '0.75rem' }}
                >
                  [CIPD HR Administrator]
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

export default TimeSavingsInputs;