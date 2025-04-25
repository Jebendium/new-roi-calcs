import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BenchmarkDataTab: React.FC = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Industry Benchmarks & Reference Data
      </Typography>
      <Typography variant="body1" paragraph>
        This section provides industry benchmark data to help you interpret your results and set realistic expectations for benefit uptake and savings:
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Benefit Participation Rates</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Typical participation rates for different salary sacrifice benefits:
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Benefit Type</strong></TableCell>
                  <TableCell><strong>Low</strong></TableCell>
                  <TableCell><strong>Average</strong></TableCell>
                  <TableCell><strong>High</strong></TableCell>
                  <TableCell><strong>Influenced By</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Pension</TableCell>
                  <TableCell>75%</TableCell>
                  <TableCell>90%</TableCell>
                  <TableCell>99%</TableCell>
                  <TableCell>Auto-enrolment makes this the highest participation benefit</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cycle to Work</TableCell>
                  <TableCell>3%</TableCell>
                  <TableCell>8%</TableCell>
                  <TableCell>15%</TableCell>
                  <TableCell>Location, facilities, cycling infrastructure</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>EV Car Scheme</TableCell>
                  <TableCell>2%</TableCell>
                  <TableCell>5%</TableCell>
                  <TableCell>12%</TableCell>
                  <TableCell>Income levels, commuting distances, charging infrastructure</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Childcare</TableCell>
                  <TableCell>5%</TableCell>
                  <TableCell>12%</TableCell>
                  <TableCell>25%</TableCell>
                  <TableCell>Demographics of workforce, availability limited to existing schemes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Holiday Trading</TableCell>
                  <TableCell>10%</TableCell>
                  <TableCell>20%</TableCell>
                  <TableCell>35%</TableCell>
                  <TableCell>Work culture, holiday allowance, workload</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Source: Aggregated data from major UK employee benefits providers and CIPD research (2024).
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Typical Contribution Levels</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Benchmark contribution amounts for different benefits:
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Benefit Type</strong></TableCell>
                  <TableCell><strong>Low</strong></TableCell>
                  <TableCell><strong>Average</strong></TableCell>
                  <TableCell><strong>High</strong></TableCell>
                  <TableCell><strong>Notes</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Pension</TableCell>
                  <TableCell>3%</TableCell>
                  <TableCell>5%</TableCell>
                  <TableCell>10%+</TableCell>
                  <TableCell>Percentage of salary; 3% is minimum auto-enrolment</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cycle to Work</TableCell>
                  <TableCell>£500</TableCell>
                  <TableCell>£1,000</TableCell>
                  <TableCell>£3,000</TableCell>
                  <TableCell>One-time amount spread over 12-18 months</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>EV Car Scheme</TableCell>
                  <TableCell>£250/mo</TableCell>
                  <TableCell>£400/mo</TableCell>
                  <TableCell>£700/mo</TableCell>
                  <TableCell>Monthly lease amount</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Childcare</TableCell>
                  <TableCell>£100/mo</TableCell>
                  <TableCell>£200/mo</TableCell>
                  <TableCell>£500/mo</TableCell>
                  <TableCell>Monthly voucher amount</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Holiday Trading</TableCell>
                  <TableCell>2 days</TableCell>
                  <TableCell>3 days</TableCell>
                  <TableCell>5 days</TableCell>
                  <TableCell>Additional days purchased annually</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            These figures represent typical amounts across UK organisations but may vary significantly by industry, salary levels, and organisation size.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Expected Savings Ranges</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Typical annual employer NI savings by organisation size:
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Organisation Size</strong></TableCell>
                  <TableCell><strong>Low End</strong></TableCell>
                  <TableCell><strong>Average</strong></TableCell>
                  <TableCell><strong>High End</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Small (50-250 employees)</TableCell>
                  <TableCell>£10,000</TableCell>
                  <TableCell>£30,000</TableCell>
                  <TableCell>£60,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Medium (251-1,000 employees)</TableCell>
                  <TableCell>£50,000</TableCell>
                  <TableCell>£120,000</TableCell>
                  <TableCell>£250,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Large (1,001-5,000 employees)</TableCell>
                  <TableCell>£200,000</TableCell>
                  <TableCell>£500,000</TableCell>
                  <TableCell>£1,000,000+</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Enterprise (5,000+ employees)</TableCell>
                  <TableCell>£750,000</TableCell>
                  <TableCell>£1,500,000</TableCell>
                  <TableCell>£3,000,000+</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" paragraph>
            Average savings per employee per benefit type:
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Benefit Type</strong></TableCell>
                  <TableCell><strong>Average Annual Savings Per Employee</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Pension (5% contribution)</TableCell>
                  <TableCell>£200-£400</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cycle to Work</TableCell>
                  <TableCell>£15-£30</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>EV Car Scheme</TableCell>
                  <TableCell>£30-£60</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Childcare</TableCell>
                  <TableCell>£25-£50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Holiday Trading</TableCell>
                  <TableCell>£30-£70 (including wage savings)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Note: These figures are influenced by average salary levels, benefit participation rates, and contribution amounts. Individual organisation results may vary significantly.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Legislative Context</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Key legislation and tax considerations relevant to salary sacrifice arrangements:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="National Insurance Contributions Act (as amended)"
                secondary="Defines the rates and thresholds for employer National Insurance contributions, which form the basis for calculating savings."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Finance Act (annual)"
                secondary="May contain changes to taxation rules affecting salary sacrifice arrangements, including potential restrictions or modifications to tax advantages."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="HMRC Guidance on Salary Sacrifice"
                secondary="Provides detailed rules on implementing compliant salary sacrifice arrangements, ensuring they qualify for the anticipated tax treatment."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Optional Remuneration Arrangements (OpRA) Rules"
                secondary="Introduced in April 2017, these rules restrict the tax and NI advantages of certain benefits, though pension, cycle-to-work, childcare, and ultra-low emission vehicles remain exempt."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Automatic Enrolment Pension Legislation"
                secondary="Mandates minimum employer and employee contributions, often implemented through salary sacrifice for optimal tax efficiency."
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2 }}>
            Important: Tax legislation is subject to change. Always consult with tax advisors before implementing salary sacrifice arrangements based on calculator results.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        These benchmarks are based on research from the following sources:
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="CIPP Payroll and Reward Research"
            secondary="Annual studies on UK payroll practices and benefit structures"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="CIPD Reward Management Survey"
            secondary="Comprehensive data on UK reward and benefits practices"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Aggregated Client Data"
            secondary="Anonymised data from benefit providers across multiple UK industries"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="HMRC Statistical Releases"
            secondary="Official data on tax relief utilisation and salary sacrifice arrangements"
          />
        </ListItem>
      </List>
    </>
  );
};

export default BenchmarkDataTab;