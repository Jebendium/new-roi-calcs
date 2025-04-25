import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CalculationMethodTab: React.FC = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Calculation Methodology
      </Typography>
      <Typography variant="body1" paragraph>
        The calculator uses the following formulas and steps to determine NI savings for each benefit type and calculation method:
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Tax Year Constants</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Each tax year has specific National Insurance rates and thresholds that are applied in the calculations:
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Tax Year</strong></TableCell>
                  <TableCell><strong>Employer NI Rate</strong></TableCell>
                  <TableCell><strong>Secondary Threshold</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>2023-2024</TableCell>
                  <TableCell>13.8%</TableCell>
                  <TableCell>£9,100 per year</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-2025</TableCell>
                  <TableCell>13.8%</TableCell>
                  <TableCell>£9,100 per year</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2025-2026</TableCell>
                  <TableCell>15.0%</TableCell>
                  <TableCell>£5,000 per year</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
            // Tax constants from the selected tax year<br />
            const yearConstants = TAX_CONSTANTS[taxYear];<br />
            <br />
            // Properties<br />
            const EMPLOYER_NI_RATE = yearConstants.EMPLOYER_NI_RATE; // e.g., 0.15 (15%)<br />
            const EMPLOYER_NI_THRESHOLD = yearConstants.EMPLOYER_NI_THRESHOLD; // e.g., 5000
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Basic NI Savings Calculation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            At its core, all NI savings are calculated using this fundamental approach:
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
          // Calculate NI without salary sacrifice (on full salary)<br />
          const originalNI = employeeCount * Math.max(0, (averageSalary - EMPLOYER_NI_THRESHOLD) * EMPLOYER_NI_RATE);<br />
          <br />
          // Calculate NI with salary sacrifice (on reduced salary)<br />
          const reducedSalary = averageSalary - annualContribution;<br />
          const reducedNI = employeeCount * Math.max(0, (reducedSalary - EMPLOYER_NI_THRESHOLD) * EMPLOYER_NI_RATE);<br />
          <br />
          // Calculate savings<br />
          const savings = originalNI - reducedNI;
          </Typography>
          <Typography variant="body1" paragraph>
            This represents the core principle of National Insurance savings through salary sacrifice: by reducing the salary on which NI is calculated, employers can achieve significant savings.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Pension Savings Calculation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
          // Calculate annual contribution<br />
          const annualContribution = averageSalary * (contributionPercentage / 100);<br />
          <br />
          // Calculate number of participating employees<br />
          const participatingEmployees = employeeCount * (participationRate / 100);<br />
          <br />
          // Calculate NI savings (on full contribution amount)<br />
          const niSavings = participatingEmployees * annualContribution * EMPLOYER_NI_RATE;
          </Typography>
          <Typography variant="body1" paragraph>
            For pension contributions, the saving is calculated based on the percentage of salary sacrificed, the number of participating employees, and the current Employer NI rate.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Cycle to Work & Childcare Savings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
          // Calculate number of participating employees<br />
          const participatingEmployees = employeeCount * (participationRate / 100);<br />
          <br />
          // Calculate NI savings (on full amount)<br />
          const niSavings = participatingEmployees * annualAmount * EMPLOYER_NI_RATE;
          </Typography>
          <Typography variant="body1" paragraph>
            For Cycle to Work and Childcare schemes, the calculation is based on the fixed monetary amount of the benefit, applied to the participating portion of your workforce.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">EV Car Scheme Calculation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
          // Calculate number of participating employees<br />
          const participatingEmployees = employeeCount * (participationRate / 100);<br />
          <br />
          // Calculate annual gross amount<br />
          const annualGrossAmount = monthlyGrossAmount * 12;<br />
          <br />
          // Calculate benefit in kind (2% of the car's P11D value)<br />
          const benefitInKind = p11dValue * 0.02;<br />
          <br />
          // Calculate NI savings (on gross amount minus benefit in kind)<br />
          const niSavings = participatingEmployees * (annualGrossAmount - benefitInKind) * EMPLOYER_NI_RATE;
          </Typography>
          <Typography variant="body1" paragraph>
            For Electric Vehicle schemes, the calculation accounts for the Benefit in Kind (BiK) value, which is taxable. For pure electric vehicles, this is currently set at 2% of the car's P11D value (list price including options). The employer only saves NI on the difference between the salary sacrifice amount and the BiK value.
          </Typography>
          <Typography variant="body1" paragraph>
            This approach provides a more accurate calculation as BiK is based on the actual car value rather than the salary sacrifice amount, which more closely aligns with HMRC's calculation method.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Holiday Trading Calculation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
            // Calculate number of participating employees<br />
            const participatingEmployees = employeeCount * (participationRate / 100);<br />
            <br />
            // Calculate daily rate (average salary / 52 weeks / 5 days)<br />
            const dailyRate = averageSalary / 52 / 5;<br />
            <br />
            // Calculate annual amount<br />
            const annualAmount = dailyRate * averageDaysPurchased;<br />
            <br />
            // Calculate NI savings (on full amount)<br />
            const niSavings = participatingEmployees * annualAmount * EMPLOYER_NI_RATE;<br />
            <br />
            // Calculate additional wage savings (the actual wage reduction)<br />
            const wageSavings = participatingEmployees * annualAmount;<br />
            <br />
            // Total savings = NI savings + wage savings<br />
            const totalSavings = niSavings + wageSavings;
          </Typography>
          <Typography variant="body1" paragraph>
            Holiday trading is unique because it provides both NI savings and actual wage savings. When employees buy additional holiday, their salary is reduced, creating both direct wage savings and associated NI savings.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Multi-Year Projection Calculation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
          // For each projection year<br />
          for (let i = 0; i &lt; projectionYears; i++) &#123;<br />
          &nbsp;&nbsp;// Calculate projected values for this year<br />
          &nbsp;&nbsp;const employees = Math.round(Number(employeeCount) * Math.pow(1 + employeeGrowthRate / 100, i));<br />
          &nbsp;&nbsp;const salary = Number(averageSalary) * Math.pow(1 + salaryGrowthRate / 100, i);<br />
          &nbsp;&nbsp;const contribution = defaultContribution * Math.pow(1 + contributionGrowthRate / 100, i);<br />
          <br />
          &nbsp;&nbsp;// Calculate NI savings for this year<br />
          &nbsp;&nbsp;const yearResult = calculateEmployerNISavings(employees, salary, contribution, year);<br />
          <br />
          &nbsp;&nbsp;// Update cumulative savings<br />
          &nbsp;&nbsp;cumulativeSavings += yearResult.annualSavings;<br />
          &#125;
          </Typography>
          <Typography variant="body1" paragraph>
            For multi-year projections, the calculator applies compound growth rates to employee count, average salary, and contribution amounts for each year in the projection period. This provides a more accurate long-term view of potential savings.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">What-If Scenario Calculation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
          // Calculate original result<br />
          const originalResult = calculateMultiBenefitSavings(<br />
          &nbsp;&nbsp;Number(employeeCount),<br />
          &nbsp;&nbsp;Number(averageSalary),<br />
          &nbsp;&nbsp;benefitConfig,<br />
          &nbsp;&nbsp;taxYear<br />
          );<br />
          <br />
          // Calculate scenario result<br />
          const scenarioResult = calculateMultiBenefitSavings(<br />
          &nbsp;&nbsp;Number(employeeCount),<br />
          &nbsp;&nbsp;Number(averageSalary),<br />
          &nbsp;&nbsp;scenarioBenefitConfig,<br />
          &nbsp;&nbsp;taxYear<br />
          );
          </Typography>
          <Typography variant="body1" paragraph>
            The What-If Scenario simply runs the multi-benefit calculation twice, once with the original configuration and once with the scenario configuration, allowing for direct comparison of the results.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Combined Benefit Calculation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', my: 2, p: 2, bgcolor: 'background.paper' }}>
          // Calculate savings for each benefit type<br />
          if (benefitConfig[BenefitType.PENSION].enabled) &#123;<br />
          &nbsp;&nbsp;const result = calculatePensionSavings(...);<br />
          &nbsp;&nbsp;benefitBreakdown[BenefitType.PENSION] = result;<br />
          &nbsp;&nbsp;totalSavings += result.totalSavings;<br />
          &#125;<br />
          <br />
          if (benefitConfig[BenefitType.CYCLE_TO_WORK].enabled) &#123;<br />
          &nbsp;&nbsp;const result = calculateCycleToWorkSavings(...);<br />
          &nbsp;&nbsp;benefitBreakdown[BenefitType.CYCLE_TO_WORK] = result;<br />
          &nbsp;&nbsp;totalSavings += result.totalSavings;<br />
          &#125;<br />
          <br />
          // Additional benefits follow same pattern...<br />
          <br />
          return &#123;<br />
          &nbsp;&nbsp;annualSavings: totalSavings,<br />
          &nbsp;&nbsp;savingsPerEmployee: totalSavings / employeeCount,<br />
          &nbsp;&nbsp;originalNI,<br />
          &nbsp;&nbsp;reducedNI,<br />
          &nbsp;&nbsp;benefitBreakdown<br />
          &#125;;
          </Typography>
          <Typography variant="body1" paragraph>
            When multiple benefits are enabled, the calculator processes each benefit separately and then combines the results. This allows for a detailed breakdown of savings by benefit type, as well as the total savings across all benefits.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CalculationMethodTab;