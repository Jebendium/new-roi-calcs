import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

// Import tab components
import {
  TabPanel,
  OverviewTab,
  InputCategoriesTab,
  CalculationMethodTab,
  InterpretingResultsTab,
  BenchmarkDataTab
} from './components';

/**
 * Employer NI Calculator Methodology Page
 * Explains how the Employer NI Savings Calculator works
 */
const EmployerNIMethodologyPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to="/employer-calculator"
          startIcon={<ArrowBackIcon />}
          sx={{ mr: 2 }}
        >
          Back to Calculator
        </Button>
        <Typography variant="h4" component="h1">
          How Does the Employer NI Savings Calculator Work?
        </Typography>
      </Box>

      <Typography variant="body1" paragraph>
        This page explains the methodology behind the Employer NI Savings Calculator, including how inputs are used,
        how calculations are performed, and how to interpret the results to make informed decisions about salary sacrifice benefits.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Employer NI Methodology tabs"
        >
          <Tab label="Overview" id="employer-ni-methodology-tab-0" />
          <Tab label="Input Categories" id="employer-ni-methodology-tab-1" />
          <Tab label="Calculation Method" id="employer-ni-methodology-tab-2" />
          <Tab label="Interpreting Results" id="employer-ni-methodology-tab-3" />
          <Tab label="Benchmark Data" id="employer-ni-methodology-tab-4" />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <OverviewTab />
      </TabPanel>

      {/* Input Categories Tab */}
      <TabPanel value={tabValue} index={1}>
        <InputCategoriesTab />
      </TabPanel>

      {/* Calculation Method Tab */}
      <TabPanel value={tabValue} index={2}>
        <CalculationMethodTab />
      </TabPanel>

      {/* Interpreting Results Tab */}
      <TabPanel value={tabValue} index={3}>
        <InterpretingResultsTab />
      </TabPanel>

      {/* Benchmark Data Tab */}
      <TabPanel value={tabValue} index={4}>
        <BenchmarkDataTab />
      </TabPanel>
    </Paper>
  );
};

export default EmployerNIMethodologyPage;