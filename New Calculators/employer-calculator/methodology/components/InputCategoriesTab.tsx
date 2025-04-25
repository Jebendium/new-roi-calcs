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
        The calculator collects information across four main calculation methods, each with specific inputs to perform its calculations. Here's what each tab captures and how it affects the results:
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Multiple Benefits</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            This tab allows you to calculate savings from multiple salary sacrifice benefits simultaneously:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Tax Year"
                secondary="The tax year to apply for National Insurance rates and thresholds."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Employee Count"
                secondary="Total number of employees in your organisation."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Average Salary"
                secondary="Average annual salary across all employees."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Benefit Configuration"
                secondary="For each benefit type (Pension, Cycle to Work, EV Car Scheme, Childcare, Holiday Trading), you can specify:"
              />
            </ListItem>
            <List sx={{ pl: 4 }}>
              <ListItem>
                <ListItemText
                  primary="Enabled"
                  secondary="Turn the benefit on or off in the calculation."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Participation Rate"
                  secondary="Percentage of employees expected to use this benefit."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Contribution Amount"
                  secondary="The value of the salary sacrifice (either a percentage for pension or monetary amount for other benefits)."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Average P11D Value (for EV Car Scheme)"
                  secondary="The average list price (P11D value) of electric vehicles offered, used to calculate the Benefit in Kind (BiK) amount."
                />
              </ListItem>
            </List>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            The calculator computes employer NI savings for each benefit type, then combines them for a total annual savings projection.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Multi-Year Projection</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            This tab projects savings over multiple years, accounting for business growth:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Basic Information"
                secondary="Tax Year, Employee Count, and Average Salary (same as Multiple Benefits tab)."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Projection Years"
                secondary="Number of years to project savings into the future."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Employee Growth Rate"
                secondary="Annual percentage increase in employee headcount."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Salary Growth Rate"
                secondary="Annual percentage increase in average salary."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Contribution Growth Rate"
                secondary="Annual percentage increase in benefit contribution amounts."
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            The calculator models each year separately, applying the growth rates to create a year-by-year projection of savings. This helps with forecasting and budgeting benefits expenditure over time.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Salary Bands</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            This tab accounts for different salary bands within your organisation:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Basic Information"
                secondary="Tax Year, Employee Count, and Average Salary (for reference)."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Use Salary Bands"
                secondary="Option to enable salary band calculations."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Distribution Settings"
                secondary="When enabled, you can specify how employees are distributed across different salary bands."
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            By accounting for the actual distribution of salaries, this method provides more accurate savings estimates than assuming a single average salary for all employees.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">What-If Scenarios</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            This tab allows side-by-side comparison of different benefit configurations:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Basic Information"
                secondary="Tax Year, Employee Count, and Average Salary."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Original Configuration"
                secondary="The current or baseline benefit setup."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Scenario Configuration"
                secondary="An alternative benefit setup to compare against the original."
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            This feature is valuable for testing changes before implementation, such as increasing participation rates, adjusting contribution amounts, or adding new benefits. The calculator shows the difference in savings between the two scenarios.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default InputCategoriesTab;