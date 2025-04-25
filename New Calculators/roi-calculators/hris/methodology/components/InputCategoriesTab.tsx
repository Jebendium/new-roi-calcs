import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InputCategoriesTab: React.FC = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Input Categories Explained
      </Typography>
      <Typography variant="body1" paragraph>
        This calculator collects information across five categories to perform its calculations. Here's what each section captures and how it affects the results:
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Company Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            This section captures basic information about your organisation and HR operations:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Employee Count"
                secondary="The total number of employees in your organisation. Used to calculate per-employee metrics and turnover effects."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="HR Staff Count"
                secondary="The number of HR staff members who would use the HRIS. Used to calculate time savings."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Average Hourly Rate"
                secondary="The average hourly cost of HR staff time. Used to convert time savings into monetary value."
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Note: The employee count significantly impacts strategic value calculations, as larger organisations typically see greater benefits from improved turnover rates and decision-making.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Time Savings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            This section captures how HR staff time is currently allocated and how an HRIS would improve efficiency:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Administrative Hours Per Week"
                secondary="Time spent on general HR administrative tasks per week per HR staff member."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Data Entry Hours Per Week"
                secondary="Time spent manually entering or updating HR data per week per HR staff member."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Reporting Hours Per Week"
                secondary="Time spent creating and distributing HR reports per week per HR staff member."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Query Handling Hours Per Week"
                secondary="Time spent responding to employee queries per week per HR staff member."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Time Reduction Percentages"
                secondary="Estimated percentage reductions in each activity when using an HRIS."
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            These time savings are calculated for each activity, multiplied by the number of HR staff, hourly rate, and weeks per year to determine the annual financial benefit.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Error Reduction</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            This section captures the frequency and cost of data errors and compliance issues:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Annual Payroll Errors"
                secondary="Number of payroll data errors requiring correction each year."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Average Error Cost"
                secondary="Average cost per error, including correction time and any associated costs."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Payroll Error Reduction Percentage"
                secondary="Estimated percentage reduction in payroll errors with an HRIS."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Annual Compliance Issues"
                secondary="Number of HR compliance problems each year."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Average Compliance Cost"
                secondary="Average cost per compliance issue, including penalties and remediation."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Compliance Issue Reduction Percentage"
                secondary="Estimated percentage reduction in compliance issues with an HRIS."
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            These inputs calculate both direct savings from fewer errors and the often-significant savings from avoiding compliance penalties.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Strategic Value</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            This section captures harder-to-quantify benefits that often provide the greatest organisational impact:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Annual Employee Turnover Percentage"
                secondary="Percentage of employees who leave the organisation each year."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Average Replacement Cost"
                secondary="Average cost to replace an employee, including recruitment, onboarding, and lost productivity."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Turnover Reduction Percentage"
                secondary="Estimated percentage reduction in turnover with improved HR systems and processes."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Improved Decision Making Value"
                secondary="Estimated annual value of better HR decisions based on improved data quality and availability."
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Strategic value often represents the largest benefit of an HRIS but is the most challenging to quantify precisely. Industry benchmarks can help estimate these values.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Costs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            This section captures the costs of implementing and maintaining an HRIS:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Implementation Cost"
                secondary="One-time cost for system implementation, including configuration and setup."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Training Cost"
                secondary="One-time cost for initial staff training on the new system."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Initial Software Cost"
                secondary="One-time cost for software purchase if not subscription-based."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Data Migration Cost"
                secondary="One-time cost for transferring data from existing systems to the new HRIS."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Annual License Fee"
                secondary="Ongoing annual cost for software licenses and access."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Annual Support Cost"
                secondary="Ongoing annual cost for technical support and maintenance."
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            These costs are divided into one-time implementation costs and ongoing annual costs for ROI calculation purposes.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default InputCategoriesTab;