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
        Interpreting Results
      </Typography>
      <Typography variant="body1" paragraph>
        The calculator provides several key metrics to help you evaluate the potential HRIS investment:
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
                secondary="Shows the return in the first year, including one-off implementation costs. Often negative or low for HRIS implementations."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Three Year ROI"
                secondary="Shows the cumulative return over three years. Typically more favourable as the initial investment is spread over more years of benefits."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Five Year ROI"
                secondary="Shows the long-term value of the investment. This metric is often most relevant for strategic technology investments like an HRIS."
              />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            For HRIS implementations, benchmarks for interpreting ROI include:
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table aria-label="ROI interpretation table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>ROI Range</strong></TableCell>
                  <TableCell><strong>Interpretation</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Less than 0% (Year 1)</TableCell>
                  <TableCell>Normal for first year due to implementation costs</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>0-50% (3-Year)</TableCell>
                  <TableCell>Acceptable for strategic systems like an HRIS</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50-150% (3-Year)</TableCell>
                  <TableCell>Good return, strong business case</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Greater than 150% (5-Year)</TableCell>
                  <TableCell>Excellent return, compelling investment</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Payback Period</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The payback period shows how many months it takes for the investment to pay for itself through accumulated benefits:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Less than 12 months"
                secondary="Exceptionally quick return, uncommon for comprehensive HRIS implementations"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="12-24 months"
                secondary="Very good payback period, strong justification for investment"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="24-36 months"
                secondary="Typical range for HRIS implementations, considered good"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Greater than 36 months"
                secondary="Longer-term investment, should be evaluated primarily on strategic benefits"
              />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            For strategic systems like an HRIS, a longer payback period may still represent a good investment if it delivers significant strategic value.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Benefit Breakdown</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Understanding the sources of benefits can help focus implementation priorities:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Time Savings"
                secondary="Operational efficiency gains from reduced administrative work"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Error Reduction Savings"
                secondary="Financial benefits from fewer errors and compliance issues"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Strategic Value Savings"
                secondary="Organizational benefits from reduced turnover and improved decision-making"
              />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            The distribution of benefits varies significantly between organisations. In knowledge-intensive organisations, strategic benefits often outweigh operational savings. In contrast, organisations with high transaction volumes may see greater benefits from efficiency and error reduction.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Savings Per Employee</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            This metric normalises the benefits to allow comparison across different organisation sizes and benchmarking against industry standards.
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table aria-label="savings per employee interpretation table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Annual Savings Per Employee</strong></TableCell>
                  <TableCell><strong>Interpretation</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>£50-£150</TableCell>
                  <TableCell>Typical for basic HRIS functionality</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>£150-£300</TableCell>
                  <TableCell>Good return, comprehensive HRIS implementation</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>£300+</TableCell>
                  <TableCell>Excellent return, usually includes significant strategic benefits</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" paragraph>
            Larger organisations often see lower per-employee savings due to economies of scale, while smaller organisations may see higher per-employee savings but lower total return.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        Building a Business Case
      </Typography>
      <Typography variant="body1" paragraph>
        The calculator results can be used to build a compelling business case for HRIS investment:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Focus on Five-Year ROI"
            secondary="Strategic systems like an HRIS should be evaluated on their long-term value rather than short-term returns."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Highlight Strategic Benefits"
            secondary="While efficiency savings are important, strategic benefits like improved decision-making and reduced turnover often provide the greatest value."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Compare to Industry Benchmarks"
            secondary="Use the industry benchmark data to show how your potential implementation compares to similar organisations."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Consider Non-Financial Benefits"
            secondary="Some benefits are difficult to quantify but should be included in the business case, such as improved employee experience and better talent attraction."
          />
        </ListItem>
      </List>
    </>
  );
};

export default InterpretingResultsTab;