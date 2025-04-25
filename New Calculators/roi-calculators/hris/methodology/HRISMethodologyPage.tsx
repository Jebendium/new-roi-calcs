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
  IndustryBenchmarksTab
} from './components';

/**
 * HRIS ROI Calculation Methodology Page
 * Explains how the HRIS ROI Calculator works
 */
const HRISMethodologyPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to="/roi/hris"
          startIcon={<ArrowBackIcon />}
          sx={{ mr: 2 }}
        >
          Back to Calculator
        </Button>
        <Typography variant="h4" component="h1">
          How Does the HRIS ROI Calculator Work?
        </Typography>
      </Box>

      <Typography variant="body1" paragraph>
        This page explains the methodology behind the HRIS ROI Calculator, including how inputs are used,
        how calculations are performed, and how to interpret the results to make informed HR technology decisions.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="HRIS Methodology tabs"
        >
          <Tab label="Overview" id="hris-methodology-tab-0" />
          <Tab label="Input Categories" id="hris-methodology-tab-1" />
          <Tab label="Calculation Method" id="hris-methodology-tab-2" />
          <Tab label="Interpreting Results" id="hris-methodology-tab-3" />
          <Tab label="Industry Benchmarks" id="hris-methodology-tab-4" />
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

      {/* Industry Benchmarks Tab */}
      <TabPanel value={tabValue} index={4}>
        <IndustryBenchmarksTab />
      </TabPanel>
    </Paper>
  );
};

export default HRISMethodologyPage;