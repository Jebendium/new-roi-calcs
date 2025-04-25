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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const IndustryBenchmarksTab: React.FC = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        CIPD & Industry Research Benchmarks
      </Typography>
      <Typography variant="body1" paragraph>
        The calculator includes the option to use industry benchmarks based on CIPD and CIPP research. These benchmarks provide realistic starting points for organisations without detailed internal metrics.
      </Typography>
      
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Time Savings Benchmarks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table aria-label="time savings benchmarks table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Activity</strong></TableCell>
                  <TableCell><strong>Typical Time Reduction</strong></TableCell>
                  <TableCell><strong>Source/Notes</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Administrative Tasks</TableCell>
                  <TableCell>70%</TableCell>
                  <TableCell>CIPD HR Systems Survey</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Data Entry</TableCell>
                  <TableCell>80%</TableCell>
                  <TableCell>CIPD Digital Transformation Report</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Reporting</TableCell>
                  <TableCell>60%</TableCell>
                  <TableCell>HR Analytics Survey</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Employee Query Handling</TableCell>
                  <TableCell>70%</TableCell>
                  <TableCell>Self-service implementation data</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Note: These figures represent typical reductions when implementing a comprehensive HRIS with self-service capabilities.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Error Reduction Benchmarks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table aria-label="error reduction benchmarks table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Error Type</strong></TableCell>
                  <TableCell><strong>Typical Reduction</strong></TableCell>
                  <TableCell><strong>Source/Notes</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Payroll Data Errors</TableCell>
                  <TableCell>50%</TableCell>
                  <TableCell>CIPP Payroll Accuracy Survey</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Compliance Issues</TableCell>
                  <TableCell>75%</TableCell>
                  <TableCell>HR Compliance Research</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Note: Error reduction rates depend on existing processes and data quality. Organisations with manual processes typically see higher reduction rates.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Strategic Value Benchmarks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table aria-label="strategic value benchmarks table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Metric</strong></TableCell>
                  <TableCell><strong>Typical Impact</strong></TableCell>
                  <TableCell><strong>Source/Notes</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Employee Turnover Reduction</TableCell>
                  <TableCell>20%</TableCell>
                  <TableCell>CIPD Employee Experience Research</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>UK Average Turnover Rate</TableCell>
                  <TableCell>15%</TableCell>
                  <TableCell>CIPD Resourcing and Talent Planning Survey</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Average Replacement Cost</TableCell>
                  <TableCell>£10,000 per employee</TableCell>
                  <TableCell>Oxford Economics Cost of Turnover Study (UK)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Note: Strategic value metrics vary significantly by industry and organisation size. Higher-skilled roles typically have higher replacement costs and greater potential savings.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Implementation Cost Benchmarks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table aria-label="implementation cost benchmarks table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Organisation Size</strong></TableCell>
                  <TableCell><strong>Typical Implementation Costs</strong></TableCell>
                  <TableCell><strong>Typical Annual Costs</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Small (50-250 employees)</TableCell>
                  <TableCell>£5,000-£15,000</TableCell>
                  <TableCell>£6,000-£15,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Medium (251-1,000 employees)</TableCell>
                  <TableCell>£15,000-£50,000</TableCell>
                  <TableCell>£15,000-£45,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Large (1,000+ employees)</TableCell>
                  <TableCell>£50,000+</TableCell>
                  <TableCell>£45,000+</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Note: Costs vary significantly based on system complexity, modules implemented, and integration requirements. Cloud-based systems typically have lower implementation costs but higher annual subscription fees.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        These benchmarks are based on research from the following sources:
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="CIPD HR Systems Survey"
            secondary="Annual survey of HR technology adoption and impact in UK organisations"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="CIPP Payroll Benchmarking Report"
            secondary="Research on payroll operations and costs across UK businesses"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Oxford Economics"
            secondary="Cost of employee turnover research specific to UK organisations"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Vendor Implementation Data"
            secondary="Aggregated anonymised data from major HRIS providers operating in the UK market"
          />
        </ListItem>
      </List>
    </>
  );
};

export default IndustryBenchmarksTab;