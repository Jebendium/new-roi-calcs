import { 
  Typography, 
  Paper, 
  Grid, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { 
  HRISROIResults,
  TimeSavingsInput,
  ErrorReductionInput,
  StrategicValueInput,
  HRISCostInput
} from '../../../../types/roiCalculatorTypes';

interface HRISResultsDetailsProps {
  results: HRISROIResults | null;
  timeSavings: TimeSavingsInput;
  errorReduction: ErrorReductionInput;
  strategicValue: StrategicValueInput;
  costInputs: HRISCostInput;
}

const HRISResultsDetails = ({ 
  results, 
  timeSavings, 
  errorReduction, 
  strategicValue, 
  costInputs 
}: HRISResultsDetailsProps) => {
  if (!results) {
    return null;
  }

  // Format currency values with null check
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || value === null) return '£0';
    return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Calculate time savings breakdown
  const weeksPerYear = 52;
  const adminTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.adminHoursPerWeek * 
    (timeSavings.adminTimeReduction / 100) * 
    weeksPerYear;
  
  const dataEntryTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.dataEntryHoursPerWeek * 
    (timeSavings.dataEntryTimeReduction / 100) * 
    weeksPerYear;
  
  const reportingTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.reportingHoursPerWeek * 
    (timeSavings.reportingTimeReduction / 100) * 
    weeksPerYear;
  
  const queryHandlingTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.queryHandlingHoursPerWeek * 
    (timeSavings.queryReduction / 100) * 
    weeksPerYear;

  // Calculate error reduction breakdown
  const dataErrorSavings = 
    errorReduction.annualPayrollErrors * 
    errorReduction.avgErrorCost * 
    (errorReduction.payrollErrorReduction / 100);
  
  const complianceIssueSavings = 
    errorReduction.annualComplianceIssues * 
    errorReduction.avgComplianceCost * 
    (errorReduction.complianceIssueReduction / 100);

  // Calculate strategic value breakdown
  const turnoverSavings = 
    strategicValue.annualEmployeeTurnover / 100 * 
    costInputs.employeeCount * 
    strategicValue.avgReplacementCost * 
    (strategicValue.turnoverReduction / 100);
  
  const decisionMakingValue = strategicValue.improvedDecisionMakingValue;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Detailed ROI Calculation
      </Typography>
      
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="time-savings-content"
          id="time-savings-header"
        >
          <Typography variant="subtitle1">Time Savings Detail</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>Activity</TableCell>
                  <TableCell align="right">Hours/Week</TableCell>
                  <TableCell align="right">Cost/Hour</TableCell>
                  <TableCell align="right">Reduction %</TableCell>
                  <TableCell align="right">Annual Savings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Administrative Tasks</TableCell>
                  <TableCell align="right">{timeSavings.adminHoursPerWeek}</TableCell>
                  <TableCell align="right">£{timeSavings.avgHourlyRate}</TableCell>
                  <TableCell align="right">{timeSavings.adminTimeReduction}%</TableCell>
                  <TableCell align="right">{formatCurrency(adminTimeSavings)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Data Entry</TableCell>
                  <TableCell align="right">{timeSavings.dataEntryHoursPerWeek}</TableCell>
                  <TableCell align="right">£{timeSavings.avgHourlyRate}</TableCell>
                  <TableCell align="right">{timeSavings.dataEntryTimeReduction}%</TableCell>
                  <TableCell align="right">{formatCurrency(dataEntryTimeSavings)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Reporting</TableCell>
                  <TableCell align="right">{timeSavings.reportingHoursPerWeek}</TableCell>
                  <TableCell align="right">£{timeSavings.avgHourlyRate}</TableCell>
                  <TableCell align="right">{timeSavings.reportingTimeReduction}%</TableCell>
                  <TableCell align="right">{formatCurrency(reportingTimeSavings)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Query Handling</TableCell>
                  <TableCell align="right">{timeSavings.queryHandlingHoursPerWeek}</TableCell>
                  <TableCell align="right">£{timeSavings.avgHourlyRate}</TableCell>
                  <TableCell align="right">{timeSavings.queryReduction}%</TableCell>
                  <TableCell align="right">{formatCurrency(queryHandlingTimeSavings)}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell colSpan={4}><strong>Total Time Savings</strong></TableCell>
                  <TableCell align="right"><strong>{formatCurrency(results.timeSavings)}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
            Note: Calculated based on {timeSavings.hrStaffCount} HR staff members working 52 weeks per year.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="error-reduction-content"
          id="error-reduction-header"
        >
          <Typography variant="subtitle1">Data Accuracy & Compliance Improvement Detail</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>Issue Type</TableCell>
                  <TableCell align="right">Annual Count</TableCell>
                  <TableCell align="right">Cost Per Issue</TableCell>
                  <TableCell align="right">Improvement %</TableCell>
                  <TableCell align="right">Annual Savings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>HR Data Inaccuracies</TableCell>
                  <TableCell align="right">{errorReduction.annualPayrollErrors}</TableCell>
                  <TableCell align="right">£{errorReduction.avgErrorCost}</TableCell>
                  <TableCell align="right">{errorReduction.payrollErrorReduction}%</TableCell>
                  <TableCell align="right">{formatCurrency(dataErrorSavings)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Compliance Issues</TableCell>
                  <TableCell align="right">{errorReduction.annualComplianceIssues}</TableCell>
                  <TableCell align="right">£{errorReduction.avgComplianceCost}</TableCell>
                  <TableCell align="right">{errorReduction.complianceIssueReduction}%</TableCell>
                  <TableCell align="right">{formatCurrency(complianceIssueSavings)}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell colSpan={4}><strong>Total Data & Compliance Improvement Savings</strong></TableCell>
                  <TableCell align="right"><strong>{formatCurrency(results.errorReductionSavings)}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="strategic-value-content"
          id="strategic-value-header"
        >
          <Typography variant="subtitle1">Strategic Value Detail</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>Benefit Type</TableCell>
                  <TableCell align="right">Calculation</TableCell>
                  <TableCell align="right">Annual Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Turnover Reduction</TableCell>
                  <TableCell align="right">
                    {strategicValue.annualEmployeeTurnover}% turnover × {costInputs.employeeCount} employees × 
                    £{strategicValue.avgReplacementCost} per replacement × {strategicValue.turnoverReduction}% reduction
                  </TableCell>
                  <TableCell align="right">{formatCurrency(turnoverSavings)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Improved Decision-Making</TableCell>
                  <TableCell align="right">Estimated annual value from improved HR decision-making</TableCell>
                  <TableCell align="right">{formatCurrency(decisionMakingValue)}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell colSpan={2}><strong>Total Strategic Value</strong></TableCell>
                  <TableCell align="right"><strong>{formatCurrency(results.strategicValueSavings)}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="cost-detail-content"
          id="cost-detail-header"
        >
          <Typography variant="subtitle1">Cost Detail</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell colSpan={2}>One-time Costs</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Initial Software Licence</TableCell>
                      <TableCell align="right">{formatCurrency(costInputs.initialSoftwareCost || 0)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Implementation</TableCell>
                      <TableCell align="right">{formatCurrency(costInputs.implementationCost)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Training</TableCell>
                      <TableCell align="right">{formatCurrency(costInputs.trainingCost)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Data Migration</TableCell>
                      <TableCell align="right">{formatCurrency(costInputs.dataMigrationCost || 0)}</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell><strong>Total Initial Investment</strong></TableCell>
                      <TableCell align="right"><strong>{formatCurrency(results.initialInvestment)}</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell colSpan={2}>Annual Recurring Costs</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Annual Licence Fee</TableCell>
                      <TableCell align="right">{formatCurrency(costInputs.annualLicenseFee)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Support & Maintenance</TableCell>
                      <TableCell align="right">{formatCurrency(costInputs.annualSupportCost || 0)}</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell><strong>Total Annual Costs</strong></TableCell>
                      <TableCell align="right"><strong>{formatCurrency(results.annualCosts)}</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      
      <Box sx={{ mt: 3, p: 3, backgroundColor: '#f1f8e9', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          ROI Calculation Method
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" gutterBottom>
              <strong>First Year ROI:</strong> ((Annual Benefits - Annual Costs - Initial Investment) / Initial Investment) × 100%
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>3-Year ROI:</strong> ((Annual Benefits × 3 - Annual Costs × 3 - Initial Investment) / Initial Investment) × 100%
            </Typography>
            <Typography variant="body2">
              <strong>5-Year ROI:</strong> ((Annual Benefits × 5 - Annual Costs × 5 - Initial Investment) / Initial Investment) × 100%
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" gutterBottom>
              <strong>Payback Period (months):</strong> (Initial Investment / (Annual Benefits - Annual Costs)) × 12
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Net Annual Benefit:</strong> Annual Benefits - Annual Costs
            </Typography>
            <Typography variant="body2">
              <strong>Savings Per Employee:</strong> Net Annual Benefit / Number of Employees
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HRISResultsDetails;
