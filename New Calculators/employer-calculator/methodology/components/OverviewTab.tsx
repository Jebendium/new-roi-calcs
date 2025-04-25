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
        The Employer NI Savings Calculator helps organisations quantify the potential National Insurance (NI) savings available through salary sacrifice arrangements. It allows employers to:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Calculate Total Savings"
            secondary="Determine the total annual NI savings available across various employee benefits"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Compare Benefit Options"
            secondary="Evaluate the financial impact of different benefit types and participation rates"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Project Multi-Year Savings"
            secondary="Model future savings based on growth projections for headcount and salaries"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Create What-If Scenarios"
            secondary="Compare different benefit configurations to optimize your benefits strategy"
          />
        </ListItem>
      </List>
      <Typography variant="body1" paragraph>
        By providing comprehensive calculations based on current UK tax legislation, this calculator helps employers make informed decisions about their benefits packages while identifying significant cost savings.
      </Typography>

      <Typography variant="h5" gutterBottom>
        What Data Drives the Calculations
      </Typography>
      <Typography variant="body1" paragraph>
        The calculator uses the following information to determine potential NI savings:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <InfoIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Tax Year Selection"
            secondary="Uses the appropriate National Insurance rates and thresholds for the selected tax year"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Company Demographics"
            secondary="Employee count and average salary to determine the baseline NI liability"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Benefit Configuration"
            secondary="Types of benefits offered, participation rates, and contribution levels"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Growth Projections"
            secondary="For multi-year calculations: anticipated changes in headcount, salaries, and contribution rates"
          />
        </ListItem>
      </List>
      <Typography variant="body1" paragraph>
        The calculator applies the appropriate National Insurance rates and thresholds as determined by HMRC for the selected tax year. For 2025-2026, the Employer NI rate is 15% on earnings above the Secondary Threshold of £5,000.
      </Typography>
    </>
  );
};

export default OverviewTab;