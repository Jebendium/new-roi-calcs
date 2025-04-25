import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalculateIcon from '@mui/icons-material/Calculate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

/**
 * TabPanel component for the methodology tabs
 */
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`methodology-tabpanel-${index}`}
      aria-labelledby={`methodology-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

/**
 * Calculation Methodology Page
 * Explains how the Combined Payroll ROI Calculator works
 */
const CalculationMethodologyPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to="/roi/combined-payroll"
          startIcon={<ArrowBackIcon />}
          sx={{ mr: 2 }}
        >
          Back to Calculator
        </Button>
        <Typography variant="h4" component="h1">
          How Does This Calculator Work?
        </Typography>
      </Box>

      <Typography variant="body1" paragraph>
        This page explains the methodology behind the Combined Payroll ROI Calculator, including how inputs are used,
        how calculations are performed, and the differences between the Payroll System and Managed Payroll options.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Methodology tabs"
        >
          <Tab label="Overview" id="methodology-tab-0" />
          <Tab label="Input Categories" id="methodology-tab-1" />
          <Tab label="Calculation Method" id="methodology-tab-2" />
          <Tab label="Differences" id="methodology-tab-3" />
          <Tab label="Interpreting Results" id="methodology-tab-4" />
          <Tab label="Industry Benchmarks" id="methodology-tab-5" />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" gutterBottom>
          Purpose of the Calculator
        </Typography>
        <Typography variant="body1" paragraph>
          The Combined Payroll ROI Calculator helps you evaluate and compare two approaches to modernising your payroll operations:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Implementing a new Payroll System"
              secondary="Calculate the ROI of purchasing and implementing a new payroll system while keeping payroll operations in-house"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Outsourcing to a Managed Payroll Service"
              secondary="Calculate the ROI of outsourcing your payroll operations to a managed service provider"
            />
          </ListItem>
        </List>
        <Typography variant="body1" paragraph>
          By providing a side-by-side comparison, this calculator helps you make an informed decision based on your unique organisation needs.
        </Typography>

        <Typography variant="h5" gutterBottom>
          What Data Drives the Calculations
        </Typography>
        <Typography variant="body1" paragraph>
          The calculator uses the following information to determine ROI:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <InfoIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Company Information"
              secondary="Size of your organisation, payroll staff, and payroll frequency"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InfoIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Current Payroll Costs"
              secondary="Your existing costs for staff, software, training, and infrastructure"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InfoIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Efficiency Metrics"
              secondary="Time spent on payroll processing and potential time savings"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InfoIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Rework & Compliance Data"
              secondary="Frequency and cost of payroll errors and compliance issues"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InfoIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Paper & Printing Costs"
              secondary="Costs associated with physical payslips and distribution"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InfoIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="New System/Service Costs"
              secondary="Costs of the new payroll system or managed service"
            />
          </ListItem>
        </List>
      </TabPanel>

      {/* Input Categories Tab */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" gutterBottom>
          Input Categories Explained
        </Typography>
        <Typography variant="body1" paragraph>
          This calculator collects information across six categories to perform its calculations. Here's what each section captures and how it affects the results:
        </Typography>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Company Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              This section captures basic information about your organisation's payroll operations:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Employee Count"
                  secondary="The total number of employees in your organisation. This affects the volume of payslips and potential savings."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Payroll Staff Count & Salary"
                  secondary="The number of staff dedicated to payroll and their average salary. Used to calculate labour costs and potential savings."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Payroll Frequency"
                  secondary="How often you run payroll (monthly, weekly, etc.). This affects the total number of pay runs per year."
                />
              </ListItem>
            </List>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Note: Total annual pay runs are calculated based on your frequency inputs:
              Monthly payrolls × 12 per year, 4-weekly payrolls × 13 per year, Weekly payrolls × 52 per year,
              Fortnightly payrolls × 26 per year, Lunar payrolls × 13.04 per year
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Current Payroll Costs</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              This section establishes your baseline costs before any new system or service:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Current Staff Costs"
                  secondary="Annual cost of payroll staff salaries and benefits."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Current Software/License Costs"
                  secondary="Annual cost of your existing payroll software and licenses."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Current Training Costs"
                  secondary="Annual cost of training staff on payroll systems and procedures."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Current Infrastructure Costs"
                  secondary="Annual cost of hardware, hosting, or other infrastructure for payroll."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Other Current Costs"
                  secondary="Any additional annual costs related to your payroll operations."
                />
              </ListItem>
            </List>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              These costs are used to establish your current total annual payroll cost and serve as the baseline for calculating savings.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Efficiency Gains</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              This section captures time spent on payroll activities and potential efficiency improvements:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Hours Per Pay Run"
                  secondary="Average time spent processing each payroll cycle."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Year-End Hours"
                  secondary="Annual time spent on year-end processing and reporting."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Query Handling Hours"
                  secondary="Monthly time spent handling employee payroll queries."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Efficiency Percentages"
                  secondary="Estimated percentage reductions in processing time, year-end time, and query handling time with a new system."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Average Hourly Rate"
                  secondary="Average hourly cost of payroll staff time, used to calculate the value of time savings."
                />
              </ListItem>
            </List>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              For Payroll System calculations, your specified percentage reductions are used. For Managed Payroll calculations, 100% efficiency is assumed as these tasks are outsourced.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Rework Reduction</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              This section captures the frequency and cost of payroll errors and compliance issues:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Annual Payroll Errors"
                  secondary="Number of payroll errors requiring rework each year."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Average Rework Cost"
                  secondary="Average cost per error, including staff time, corrections, and any penalties."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Error Reduction Percentage"
                  secondary="Estimated percentage reduction in errors with a new system."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Annual Compliance Issues"
                  secondary="Number of payroll compliance issues each year."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Average Compliance Cost"
                  secondary="Average cost per compliance issue, including penalties, remediation, and reporting."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Compliance Reduction Percentage"
                  secondary="Estimated percentage reduction in compliance issues with a new system."
                />
              </ListItem>
            </List>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Rework includes corrections, supplementary runs, manual interventions, and other remedial work needed to fix payroll errors.
              For Managed Payroll calculations, 100% reduction is assumed as the service provider takes responsibility for errors.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Paper Cost Savings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              This section captures costs associated with physical payslips and distribution:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Monthly Printing Costs"
                  secondary="Monthly cost of printing physical payslips and reports."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Monthly Distribution Costs"
                  secondary="Monthly cost of distributing payslips to employees."
                />
              </ListItem>
            </List>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Most modern systems default to electronic payslips, but these fields are defaulted to 0 as many organisations have already made this transition.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">System Costs</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              This section captures the costs of the new payroll system or managed service:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Monthly Cost"
                  secondary="Monthly subscription or service fee for the new payroll system or managed service."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Additional Monthly Costs"
                  secondary="Any additional monthly costs associated with the new solution."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Additional Annual Costs"
                  secondary="Annual costs not included in the monthly subscription/service fee."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Additional One-Off Costs"
                  secondary="Implementation, data migration, or other one-time costs."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Wage Savings"
                  secondary="Annual savings from reduced payroll staff requirements."
                />
              </ListItem>
            </List>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              These costs are used to calculate the total investment required and the ongoing annual costs of the new solution.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </TabPanel>

      {/* Calculation Method Tab */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" gutterBottom>
          Calculation Methodology
        </Typography>
        <Typography variant="body1" paragraph>
          The calculator uses the following formulas and steps to determine ROI and other metrics:
        </Typography>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Common Calculations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
              // Calculate total annual pay runs<br />
              const totalAnnualPayRuns = <br />
              &nbsp;&nbsp;(monthlyPayrollsCount * 12) + <br />
              &nbsp;&nbsp;(fourWeeklyPayrollsCount * 13) + <br />
              &nbsp;&nbsp;(weeklyPayrollsCount * 52) + <br />
              &nbsp;&nbsp;(fortnightlyPayrollsCount * 26) +<br />
              &nbsp;&nbsp;(lunarPayrollsCount * 13.04);<br />
              <br />
              // Calculate current annual payroll cost<br />
              const currentAnnualPayrollCost = <br />
              &nbsp;&nbsp;currentStaffCosts + <br />
              &nbsp;&nbsp;currentSoftwareCosts + <br />
              &nbsp;&nbsp;currentTrainingCosts + <br />
              &nbsp;&nbsp;currentInfrastructureCosts + <br />
              &nbsp;&nbsp;currentOtherCosts;<br />
              <br />
              // Calculate annual costs for new system/service<br />
              const annualSystemCosts = <br />
              &nbsp;&nbsp;(monthlyCost * 12) + <br />
              &nbsp;&nbsp;(additionalMonthlyCosts * 12) + <br />
              &nbsp;&nbsp;additionalAnnualCosts;<br />
              <br />
              // Calculate total investment<br />
              const totalInvestment = additionalOneOffCosts + annualSystemCosts;
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Payroll System Calculations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
              // Calculate efficiency savings with user's percentage inputs<br />
              const processingHoursSaved = hoursPerPayRun * totalAnnualPayRuns * (processingTimeReduction / 100);<br />
              const yearEndHoursSaved = yearEndHours * (yearEndTimeReduction / 100);<br />
              const queryHoursSaved = queryHandlingHoursPerMonth * 12 * (queryReduction / 100);<br />
              const totalHoursSaved = processingHoursSaved + yearEndHoursSaved + queryHoursSaved;<br />
              const efficiencySavings = totalHoursSaved * avgHourlyRate;<br />
              <br />
              // Calculate error reduction savings with user's percentage inputs<br />
              const payrollErrorSavings = annualPayrollErrors * avgReworkCost * (errorReduction / 100);<br />
              const complianceSavings = annualComplianceIssues * avgComplianceCost * (complianceReduction / 100);<br />
              const errorReductionSavings = payrollErrorSavings + complianceSavings;<br />
              <br />
              // Calculate paper cost savings<br />
              const paperSavings = (monthlyPrintingCosts + monthlyDistributionCosts) * 12;<br />
              <br />
              // Include wage savings<br />
              const totalAnnualBenefits = efficiencySavings + errorReductionSavings + paperSavings + wageSavings;<br />
              <br />
              // Calculate net annual benefit<br />
              const netAnnualBenefit = totalAnnualBenefits - annualSystemCosts;<br />
              <br />
              // Calculate ROI (accounting for ongoing costs)<br />
              const firstYearROI = ((netAnnualBenefit - additionalOneOffCosts) / totalInvestment) * 100;<br />
              const threeYearROI = (((netAnnualBenefit * 3) - additionalOneOffCosts) / <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(totalInvestment + (annualSystemCosts * 2))) * 100;<br />
              const fiveYearROI = (((netAnnualBenefit * 5) - additionalOneOffCosts) / <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(totalInvestment + (annualSystemCosts * 4))) * 100;<br />
              <br />
              // Calculate payback period in months<br />
              const paybackPeriodMonths = netAnnualBenefit &gt; 0 ? <br />
              &nbsp;&nbsp;(additionalOneOffCosts / (netAnnualBenefit / 12)) : 0;
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Managed Payroll Calculations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
              // Calculate efficiency savings with 100% assumption<br />
              const processingHoursSaved = hoursPerPayRun * totalAnnualPayRuns; // 100% efficiency<br />
              const yearEndHoursSaved = yearEndHours; // 100% efficiency<br />
              const queryHoursSaved = queryHandlingHoursPerMonth * 12; // 100% efficiency<br />
              const totalHoursSaved = processingHoursSaved + yearEndHoursSaved + queryHoursSaved;<br />
              const efficiencySavings = totalHoursSaved * avgHourlyRate;<br />
              <br />
              // Calculate error reduction savings with 100% assumption<br />
              const payrollErrorSavings = annualPayrollErrors * avgReworkCost; // 100% reduction<br />
              const complianceSavings = annualComplianceIssues * avgComplianceCost; // 100% reduction<br />
              const errorReductionSavings = payrollErrorSavings + complianceSavings;<br />
              <br />
              // Other calculations follow the same pattern as Payroll System<br />
              // but with 100% efficiency assumptions
            </Typography>
            <Typography variant="body1" paragraph>
              For Managed Payroll, we assume 100% efficiency as these tasks are handled by the service provider. The ROI calculations are otherwise the same as the Payroll System calculations.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Additional Comparison Metrics</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
              // 5-Year Total Cost of Ownership (TCO)<br />
              const payrollSystemTCO = additionalOneOffCosts + (annualSystemCosts * 5) - (netAnnualBenefit * 5);<br />
              const managedPayrollTCO = additionalOneOffCosts + (annualSystemCosts * 5) - (netAnnualBenefit * 5);<br />
              <br />
              // Cost per Payslip<br />
              const currentCostPerPayslip = currentAnnualPayrollCost / <br />
              &nbsp;&nbsp;(employeeCount * totalAnnualPayRuns / payrollCount);<br />
              const newCostPerPayslip = annualSystemCosts / <br />
              &nbsp;&nbsp;(employeeCount * totalAnnualPayRuns / payrollCount);
            </Typography>
            <Typography variant="body1" paragraph>
              These additional metrics help compare the long-term financial impact of each option and provide per-payslip cost comparisons.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </TabPanel>

      {/* Differences Tab */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h5" gutterBottom>
          Differences Between Calculation Types
        </Typography>
        <Typography variant="body1" paragraph>
          The calculator treats Payroll System and Managed Payroll calculations differently in key areas:
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table aria-label="calculation differences table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Aspect</strong></TableCell>
                <TableCell><strong>Payroll System</strong></TableCell>
                <TableCell><strong>Managed Payroll</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Efficiency Gains</TableCell>
                <TableCell>Based on user-specified percentage reductions</TableCell>
                <TableCell>Assumes 100% efficiency (complete outsourcing)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Error Reduction</TableCell>
                <TableCell>Based on user-specified error reduction percentages</TableCell>
                <TableCell>Assumes 100% reduction (provider responsibility)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Compliance Issues</TableCell>
                <TableCell>Based on user-specified compliance reduction percentages</TableCell>
                <TableCell>Assumes 100% reduction (provider responsibility)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Staff Costs</TableCell>
                <TableCell>May include partial reduction through efficiency</TableCell>
                <TableCell>Typically includes substantial staff reductions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Implementation</TableCell>
                <TableCell>One-off costs for software implementation</TableCell>
                <TableCell>One-off costs for transition to service provider</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ongoing Costs</TableCell>
                <TableCell>Software licenses, maintenance, hosting</TableCell>
                <TableCell>Service fees based on employee count/pay runs</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" gutterBottom>
          Why These Assumptions Are Used
        </Typography>
        <Typography variant="body1" paragraph>
          The 100% efficiency assumption for Managed Payroll is used because:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Complete Outsourcing"
              secondary="When you outsource to a managed service, the provider takes over all processing tasks."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Service Level Agreements"
              secondary="Managed services typically include SLAs that guarantee performance and compliance."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Provider Responsibility"
              secondary="The cost of errors and compliance issues is typically absorbed by the service provider."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Specialisation"
              secondary="Managed payroll providers specialise in payroll processing, often achieving higher efficiency."
            />
          </ListItem>
        </List>
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Typography variant="h5" gutterBottom>
          Interpreting Results
        </Typography>
        <Typography variant="body1" paragraph>
          The calculator provides several key metrics to help you evaluate and compare options:
        </Typography>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">ROI Percentages</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Return on Investment (ROI) is calculated for three time periods:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="First Year ROI"
                  secondary="Shows the return in the first year, including one-off implementation costs."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Three Year ROI"
                  secondary="Shows the cumulative return over three years, which typically balances implementation costs with ongoing benefits."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Five Year ROI"
                  secondary="Shows the long-term value of the investment, which typically gives the most complete picture."
                />
              </ListItem>
            </List>
            <Typography variant="body1" paragraph>
              A higher ROI percentage indicates a better financial return. Generally:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="ROI &lt; 0%"
                  secondary="The investment costs more than it saves"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="0% &lt; ROI &lt; 50%"
                  secondary="Modest return, may still be worthwhile for strategic reasons"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="50% &lt; ROI &lt; 100%"
                  secondary="Good return, worth serious consideration"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="ROI &gt; 100%"
                  secondary="Excellent return, strong financial case for implementation"
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Payback Period</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              The payback period indicates how long it takes for the investment to pay for itself through savings:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Payback Period &lt; 12 months"
                  secondary="Very fast return, excellent investment"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="12 months &lt; Payback Period &lt; 24 months"
                  secondary="Good return, typical for successful payroll implementations"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Payback Period &gt; 24 months"
                  secondary="Longer-term investment, consider other strategic benefits"
                />
              </ListItem>
            </List>
            <Typography variant="body1" paragraph>
              The payback period is calculated by dividing the one-off costs by the monthly net benefit. A shorter payback period is more favourable.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Total Cost of Ownership (TCO)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              The 5-Year TCO represents the true cost of each option over five years, including:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Initial Investment"
                  secondary="The one-off costs of implementation or transition"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Ongoing Costs"
                  secondary="The annual costs over five years"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Annual Benefits"
                  secondary="The savings and efficiency gains over five years"
                />
              </ListItem>
            </List>
            <Typography variant="body1" paragraph>
              When comparing options, the lower TCO typically represents the more cost-effective solution over the long term.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Cost Per Payslip</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              This metric shows the average cost to process a single payslip:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Current Cost Per Payslip"
                  secondary="Your existing cost per payslip with your current setup"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="New Cost Per Payslip"
                  secondary="The projected cost per payslip with the new system or service"
                />
              </ListItem>
            </List>
            <Typography variant="body1" paragraph>
              This metric is useful for benchmarking against industry standards and comparing different options on a per-employee basis.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
          Which Option Is Better?
        </Typography>
        <Typography variant="body1" paragraph>
          The better option depends on your organisation's specific needs and priorities:
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table aria-label="option comparison table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Consider Payroll System If:</strong></TableCell>
                <TableCell><strong>Consider Managed Payroll If:</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>You want to maintain control over payroll processes</TableCell>
                <TableCell>You want to focus on core business functions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>You have specialised payroll requirements</TableCell>
                <TableCell>You want to reduce compliance risk</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>You have a large, stable payroll team</TableCell>
                <TableCell>You have limited payroll expertise in-house</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>You prefer capital expenditure over operational</TableCell>
                <TableCell>You prefer operational expenditure over capital</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Long-term TCO is lower for system implementation</TableCell>
                <TableCell>Long-term TCO is lower for managed service</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Industry Benchmarks Tab */}
      <TabPanel value={tabValue} index={5}>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          *Source: CIPP Payroll Software Research Report, aggregated customer data from major payroll providers*
        </Typography>
      </TabPanel>
    </Paper>
  );
};

export default CalculationMethodologyPage;