import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const InterpretingResultsTab: React.FC = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Understanding Your Results
      </Typography>
      <Typography variant="body1" paragraph>
        The calculator provides several key metrics to help you evaluate the potential benefits of salary sacrifice arrangements:
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Annual Savings Metrics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The primary results show the total annual financial impact of salary sacrifice arrangements:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Total Annual NI Savings"
                secondary="The total amount your organisation would save in employer National Insurance contributions across all benefits, based on the inputs provided."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Savings Per Employee"
                secondary="The average annual savings per employee, useful for normalizing results when comparing different scenarios or organizations."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Original NI Liability"
                secondary="The amount of employer National Insurance you would pay without any salary sacrifice arrangements."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Reduced NI Liability"
                secondary="The lower amount of employer National Insurance you would pay after implementing the specified salary sacrifice arrangements."
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Note: These figures represent potential annual savings based on current tax legislation. Actual savings may vary based on individual employee circumstances and future legislative changes.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Benefit Breakdown</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            When using the Multiple Benefits calculator, results include a detailed breakdown by benefit type:
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Benefit Type</strong></TableCell>
                  <TableCell><strong>What's Included</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Pension</TableCell>
                  <TableCell>NI savings on employer and employee pension contributions</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cycle to Work</TableCell>
                  <TableCell>NI savings on bicycle purchase amounts</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>EV Car Scheme</TableCell>
                  <TableCell>NI savings on car lease payments (accounting for BIK)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Childcare</TableCell>
                  <TableCell>NI savings on childcare vouchers</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Holiday Trading</TableCell>
                  <TableCell>NI savings PLUS direct wage savings from additional holiday purchases</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" paragraph>
            Each benefit shows three key figures:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="NI Savings"
                secondary="The National Insurance savings specific to this benefit."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Additional Savings"
                secondary="Any extra savings beyond NI (primarily applies to Holiday Trading, which includes wage savings)."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Total Savings"
                secondary="The combined total of NI savings and any additional savings."
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            This breakdown helps you understand which benefits offer the greatest savings potential for your specific organisation, allowing for more targeted benefit strategy decisions.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Multi-Year Projection Results</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            When using the Multi-Year Projection calculator, results include year-by-year projections:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Annual Projections"
                secondary="For each year in the projection period, shows employee count, average salary, contribution amount, and annual savings."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Cumulative Savings"
                secondary="The running total of savings across all projected years, showing the long-term impact of salary sacrifice arrangements."
              />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            The projection chart visualizes how savings increase over time as your organisation grows, helping with long-term financial planning and demonstrating the compounding value of benefit programs.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">What-If Scenario Comparison</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            When using the What-If Scenarios calculator, results include a side-by-side comparison:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Original Configuration Results"
                secondary="The savings based on your current or baseline benefit configuration."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Scenario Configuration Results"
                secondary="The savings based on the alternative benefit configuration you're considering."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Difference"
                secondary="The net change in savings between the original and scenario configurations."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Percentage Change"
                secondary="The relative increase or decrease in savings, expressed as a percentage."
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            This comparison makes it easy to evaluate the financial impact of proposed changes to your benefits strategy, helping you make data-driven decisions.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        Leveraging Your Results
      </Typography>
      <Typography variant="body1" paragraph>
        Here are some ways to effectively use the calculator results:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Business Case Development"
            secondary="Use the calculated savings to build a compelling business case for implementing or expanding salary sacrifice arrangements."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Budget Planning"
            secondary="Incorporate projected savings into your HR and finance budgets to offset benefit program costs."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Benefit Strategy Optimization"
            secondary="Use the benefit breakdown to identify which benefits offer the greatest return, allowing you to focus communication and resources accordingly."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Employee Communication"
            secondary="Share relevant insights with employees to demonstrate the added value of participating in salary sacrifice arrangements, potentially increasing uptake."
          />
        </ListItem>
      </List>
    </>
  );
};

export default InterpretingResultsTab;