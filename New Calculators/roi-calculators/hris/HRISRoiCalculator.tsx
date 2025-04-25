import React from 'react';
import { 
  Typography, 
  Box, 
  FormControlLabel, 
  Switch, 
  Tooltip, 
  IconButton,
  Tabs,
  Tab,
  Button,
  Paper,
  Card,
  CardContent
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CalculateIcon from '@mui/icons-material/Calculate';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Link as RouterLink } from 'react-router-dom';

// Import the hooks
import { useCalculatorState, useReportExport } from './hooks';

// Import input components
import { 
  CompanyInfoInputs, 
  TimeSavingsInputs, 
  ErrorReductionInputs, 
  StrategicValueInputs, 
  CostInputs 
} from './InputTabs';

// Import results components
import { ModernResults } from './ResultsView';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`hris-roi-tabpanel-${index}`}
      aria-labelledby={`hris-roi-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const HRISRoiCalculator: React.FC = () => {
  // Use the calculator state hook
  const {
    tabValue,
    timeSavings,
    errorReduction,
    strategicValue,
    costInputs,
    results,
    showResults,
    useIndustryBenchmarks,
    setTimeSavings,
    setErrorReduction,
    setStrategicValue,
    setCostInputs,
    handleTabChange,
    toggleIndustryBenchmarks,
    calculateROI,
    resetCalculator
  } = useCalculatorState();

  return (
    <Card elevation={3} sx={{ borderRadius: 2, overflow: 'visible' }}>
      <CardContent sx={{ px: 4, py: 3, pb: 4 }}>
        <Typography variant="h5" gutterBottom color="primary">
          HRIS ROI Calculator
        </Typography>
        
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={useIndustryBenchmarks}
                onChange={toggleIndustryBenchmarks}
                color="primary"
              />
            }
            label="Use CIPD/CIPP industry benchmarks"
          />
          <Tooltip title="Automatically applies industry standards based on CIPD and CIPP research">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Paper elevation={1} sx={{ borderRadius: 1, mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            aria-label="HRIS ROI calculator tabs"
            sx={{
              '& .MuiTabs-indicator': {
                height: 3
              },
              '& .MuiTab-root': {
                fontWeight: 500,
                py: 2
              }
            }}
          >
            <Tab label="Company Info" id="hris-roi-tab-0" aria-controls="hris-roi-tabpanel-0" />
            <Tab label="Time Savings" id="hris-roi-tab-1" aria-controls="hris-roi-tabpanel-1" />
            <Tab label="Error Reduction" id="hris-roi-tab-2" aria-controls="hris-roi-tabpanel-2" />
            <Tab label="Strategic Value" id="hris-roi-tab-3" aria-controls="hris-roi-tabpanel-3" />
            <Tab label="Costs" id="hris-roi-tab-4" aria-controls="hris-roi-tabpanel-4" />
            {showResults && <Tab label="Results" id="hris-roi-tab-5" aria-controls="hris-roi-tabpanel-5" />}
          </Tabs>
        </Paper>
        
        <TabPanel value={tabValue} index={0}>
          <CompanyInfoInputs 
            timeSavings={timeSavings}
            setTimeSavings={setTimeSavings}
            costInputs={costInputs}
            setCostInputs={setCostInputs}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <TimeSavingsInputs 
            timeSavings={timeSavings}
            setTimeSavings={setTimeSavings}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <ErrorReductionInputs 
            errorReduction={errorReduction}
            setErrorReduction={setErrorReduction}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <StrategicValueInputs 
            strategicValue={strategicValue}
            setStrategicValue={setStrategicValue}
            employeeCount={costInputs.employeeCount}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={4}>
          <CostInputs 
            costInputs={costInputs}
            setCostInputs={setCostInputs}
          />
        </TabPanel>
        
        {showResults && (
          <TabPanel value={tabValue} index={5}>
            <ModernResults 
              results={results}
              timeSavings={timeSavings}
              errorReduction={errorReduction}
              strategicValue={strategicValue}
              costInputs={costInputs}
            />
          </TabPanel>
        )}
        
        <Box sx={{ 
          mt: 4, 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 2 
        }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<CalculateIcon />} 
            onClick={calculateROI}
            disabled={tabValue === 5}
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Calculate ROI
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            size="large"
            startIcon={<RestartAltIcon />} 
            onClick={resetCalculator}
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Reset
          </Button>
        </Box>
        
        {/* Link to methodology page */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button 
            variant="text" 
            color="primary" 
            component={RouterLink} 
            to="/roi/hris/methodology"
          >
            How does this calculator work?
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HRISRoiCalculator;