import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';

const OverviewTab: React.FC = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Purpose of the Calculator
      </Typography>
      <Typography variant="body1" paragraph>
        The HRIS ROI Calculator helps organisations evaluate the potential return on investment when implementing a Human Resource Information System. Unlike traditional ROI calculations that focus solely on direct cost savings, this calculator captures broader benefits including:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Operational Efficiency"
            secondary="Quantify time savings across various HR activities including administration, data entry, reporting, and query handling"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Data Accuracy Benefits"
            secondary="Calculate savings from reduced errors and improved compliance"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Strategic Value"
            secondary="Measure benefits that are harder to quantify but often provide the greatest organisational impact, such as reduced turnover and improved decision-making"
          />
        </ListItem>
      </List>
      <Typography variant="body1" paragraph>
        By providing a comprehensive view of both operational and strategic benefits, this calculator helps HR professionals build a compelling business case for HRIS investment.
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
            secondary="Size of your organisation and HR staffing levels"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Time Allocation Data"
            secondary="How HR staff time is currently distributed across different activities"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Error and Compliance Metrics"
            secondary="Frequency and cost of data errors and compliance issues"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Strategic Indicators"
            secondary="Employee turnover rates and decision-making quality"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="HRIS Implementation Costs"
            secondary="One-time and ongoing costs of the HRIS solution"
          />
        </ListItem>
      </List>
    </>
  );
};

export default OverviewTab;