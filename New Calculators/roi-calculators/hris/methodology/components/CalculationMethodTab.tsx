import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CalculationMethodTab: React.FC = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Calculation Methodology
      </Typography>
      <Typography variant="body1" paragraph>
        The calculator uses the following formulas and steps to determine ROI and other metrics:
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Time Savings Calculation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
            // Calculate time savings for each activity<br />
            const weeksPerYear = 52;<br />
            <br />
            const adminTimeSavings = <br />
            &nbsp;&nbsp;hrStaffCount * <br />
            &nbsp;&nbsp;avgHourlyRate * <br />
            &nbsp;&nbsp;adminHoursPerWeek * <br />
            &nbsp;&nbsp;(adminTimeReduction / 100) * <br />
            &nbsp;&nbsp;weeksPerYear;<br />
            <br />
            const dataEntryTimeSavings = <br />
            &nbsp;&nbsp;hrStaffCount * <br />
            &nbsp;&nbsp;avgHourlyRate * <br />
            &nbsp;&nbsp;dataEntryHoursPerWeek * <br />
            &nbsp;&nbsp;(dataEntryTimeReduction / 100) * <br />
            &nbsp;&nbsp;weeksPerYear;<br />
            <br />
            const reportingTimeSavings = <br />
            &nbsp;&nbsp;hrStaffCount * <br />
            &nbsp;&nbsp;avgHourlyRate * <br />
            &nbsp;&nbsp;reportingHoursPerWeek * <br />
            &nbsp;&nbsp;(reportingTimeReduction / 100) * <br />
            &nbsp;&nbsp;weeksPerYear;<br />
            <br />
            const queryHandlingTimeSavings = <br />
            &nbsp;&nbsp;hrStaffCount * <br />
            &nbsp;&nbsp;avgHourlyRate * <br />
            &nbsp;&nbsp;queryHandlingHoursPerWeek * <br />
            &nbsp;&nbsp;(queryReduction / 100) * <br />
            &nbsp;&nbsp;weeksPerYear;<br />
            <br />
            const totalTimeSavings = <br />
            &nbsp;&nbsp;adminTimeSavings + <br />
            &nbsp;&nbsp;dataEntryTimeSavings + <br />
            &nbsp;&nbsp;reportingTimeSavings + <br />
            &nbsp;&nbsp;queryHandlingTimeSavings;
          </Typography>
          <Typography variant="body1" paragraph>
            This calculation converts hours saved into monetary value by multiplying by the hourly rate. It accounts for all HR staff and annualizes the weekly time savings.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Error Reduction Calculation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
            // Calculate error reduction savings<br />
            const payrollErrorSavings = <br />
            &nbsp;&nbsp;annualPayrollErrors * <br />
            &nbsp;&nbsp;avgErrorCost * <br />
            &nbsp;&nbsp;(payrollErrorReduction / 100);<br />
            <br />
            const complianceIssueSavings = <br />
            &nbsp;&nbsp;annualComplianceIssues * <br />
            &nbsp;&nbsp;avgComplianceCost * <br />
            &nbsp;&nbsp;(complianceIssueReduction / 100);<br />
            <br />
            const totalErrorSavings = payrollErrorSavings + complianceIssueSavings;
          </Typography>
          <Typography variant="body1" paragraph>
            This calculation determines savings from reduced errors by multiplying the number of errors prevented by their average cost. Compliance issues often have higher individual costs but occur less frequently.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Strategic Value Calculation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
            // Calculate strategic value savings<br />
            const turnoverSavings = <br />
            &nbsp;&nbsp;annualEmployeeTurnover / 100 * <br />
            &nbsp;&nbsp;employeeCount * <br />
            &nbsp;&nbsp;avgReplacementCost * <br />
            &nbsp;&nbsp;(turnoverReduction / 100);<br />
            <br />
            const decisionMakingValue = improvedDecisionMakingValue;<br />
            <br />
            const totalStrategicValue = turnoverSavings + decisionMakingValue;
          </Typography>
          <Typography variant="body1" paragraph>
            The turnover calculation determines how many fewer employees would leave annually, multiplied by the cost to replace each one. The decision-making value is a direct input based on the organisation's estimate of better data-driven decisions.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Cost Calculation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
            // Calculate implementation and ongoing costs<br />
            const initialInvestment = <br />
            &nbsp;&nbsp;implementationCost + <br />
            &nbsp;&nbsp;trainingCost +<br />
            &nbsp;&nbsp;initialSoftwareCost +<br />
            &nbsp;&nbsp;dataMigrationCost;<br />
            <br />
            const annualCosts = annualLicenseFee + annualSupportCost;
          </Typography>
          <Typography variant="body1" paragraph>
            Costs are separated into one-time implementation costs and ongoing annual costs to accurately calculate ROI over different time periods.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">ROI Calculation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
            // Calculate total benefits and ROI<br />
            const totalAnnualBenefits = <br />
            &nbsp;&nbsp;totalTimeSavings + <br />
            &nbsp;&nbsp;totalErrorSavings + <br />
            &nbsp;&nbsp;totalStrategicValue;<br />
            <br />
            const netAnnualBenefit = totalAnnualBenefits - annualCosts;<br />
            <br />
            const firstYearROI = <br />
            &nbsp;&nbsp;((netAnnualBenefit - initialInvestment) / initialInvestment) * 100;<br />
            <br />
            const threeYearROI = <br />
            &nbsp;&nbsp;((netAnnualBenefit * 3 - initialInvestment) / initialInvestment) * 100;<br />
            <br />
            const fiveYearROI = <br />
            &nbsp;&nbsp;((netAnnualBenefit * 5 - initialInvestment) / initialInvestment) * 100;<br />
            <br />
            // Calculate payback period in months<br />
            const paybackPeriodMonths = <br />
            &nbsp;&nbsp;(initialInvestment / netAnnualBenefit) * 12;<br />
            <br />
            // Calculate savings per employee<br />
            const savingsPerEmployee = <br />
            &nbsp;&nbsp;netAnnualBenefit / employeeCount;
          </Typography>
          <Typography variant="body1" paragraph>
            The ROI calculation accounts for both the initial investment and ongoing costs. The multi-year ROI calculations show how the return improves over time as the initial investment is spread across more years of benefits.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CalculationMethodTab;