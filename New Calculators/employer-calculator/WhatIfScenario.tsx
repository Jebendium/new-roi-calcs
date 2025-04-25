import React from 'react';
import {
  Typography,
  TextField,
  Tooltip,
  IconButton,
  InputAdornment,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { BenefitType, BenefitConfig, MultiBenefitConfig } from '../../lib/calculationFunctions';

interface WhatIfScenarioProps {
  originalConfig: MultiBenefitConfig;
  scenarioConfig: MultiBenefitConfig;
  onOriginalChange: (benefitType: BenefitType, config: BenefitConfig) => void;
  onScenarioChange: (benefitType: BenefitType, config: BenefitConfig) => void;
}

const WhatIfScenario: React.FC<WhatIfScenarioProps> = ({ 
  originalConfig, 
  scenarioConfig, 
  onOriginalChange,
  onScenarioChange 
}) => {
  // Helper function to handle original participation rate changes
  const handleOriginalParticipationChange = (benefitType: BenefitType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      onOriginalChange(benefitType, {
        ...originalConfig[benefitType],
        participationRate: value
      });
    }
  };

  // Helper function to handle original contribution value changes
  const handleOriginalContributionChange = (benefitType: BenefitType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0) {
      onOriginalChange(benefitType, {
        ...originalConfig[benefitType],
        contributionValue: value
      });
    }
  };

  // Helper function to handle scenario participation rate changes
  const handleScenarioParticipationChange = (benefitType: BenefitType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      onScenarioChange(benefitType, {
        ...scenarioConfig[benefitType],
        participationRate: value
      });
    }
  };

  // Helper function to handle scenario contribution value changes
  const handleScenarioContributionChange = (benefitType: BenefitType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0) {
      onScenarioChange(benefitType, {
        ...scenarioConfig[benefitType],
        contributionValue: value
      });
    }
  };

  // Benefit type display names
  const benefitNames = {
    [BenefitType.PENSION]: "Pension",
    [BenefitType.CYCLE_TO_WORK]: "Cycle to Work",
    [BenefitType.EV_CAR_SCHEME]: "EV Car Scheme",
    [BenefitType.CHILDCARE]: "Childcare Vouchers",
    [BenefitType.HOLIDAY_TRADING]: "Holiday Trading"
  };


  // Input adornments for contribution value fields
  const getInputAdornment = (benefitType: BenefitType) => {
    switch (benefitType) {
      case BenefitType.PENSION:
        return { endAdornment: <InputAdornment position="end">%</InputAdornment> };
      case BenefitType.CYCLE_TO_WORK:
      case BenefitType.EV_CAR_SCHEME:
      case BenefitType.CHILDCARE:
        return { startAdornment: <InputAdornment position="start">£</InputAdornment> };
      default:
        return {};
    }
  };

  // Check if a value has changed from the original
  const hasValueChanged = (benefitType: BenefitType, field: 'participationRate' | 'contributionValue') => {
    return originalConfig[benefitType][field] !== scenarioConfig[benefitType][field];
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        What-If Scenario Configuration
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Adjust participation rates and contribution values to see how changes would affect your savings.
        Modified values will be highlighted.
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Benefit Type</TableCell>
              <TableCell align="center" colSpan={2}>Current Configuration</TableCell>
              <TableCell align="center" colSpan={2}>What-If Scenario</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">Participation (%)</TableCell>
              <TableCell align="center">Contribution</TableCell>
              <TableCell align="center">Participation (%)</TableCell>
              <TableCell align="center">Contribution</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(BenefitType).map((benefitType) => (
              <TableRow key={benefitType}>
                <TableCell>
                  <Typography variant="body1">
                    {benefitNames[benefitType]}
                    <Tooltip title="Adjust values to see how changes would affect your savings">
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </TableCell>
                
                {/* Current Configuration */}
                <TableCell align="center">
                  <TextField
                    size="small"
                    type="number"
                    value={originalConfig[benefitType].participationRate}
                    onChange={handleOriginalParticipationChange(benefitType)}
                    disabled={!originalConfig[benefitType].enabled}
                    InputProps={{
                      inputProps: { min: 0, max: 100, step: 0.1 },
                      sx: {
                        '& input': { textAlign: 'center' }
                      }
                    }}
                    sx={{ width: '100px' }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    type="number"
                    value={originalConfig[benefitType].contributionValue}
                    onChange={handleOriginalContributionChange(benefitType)}
                    disabled={!originalConfig[benefitType].enabled}
                    InputProps={{
                      ...getInputAdornment(benefitType),
                      inputProps: { min: 0, step: 0.01 },
                      sx: {
                        '& input': { textAlign: 'center' }
                      }
                    }}
                    sx={{ width: '120px' }}
                  />
                </TableCell>
                
                {/* What-If Scenario */}
                <TableCell align="center">
                  <TextField
                    size="small"
                    type="number"
                    value={scenarioConfig[benefitType].participationRate}
                    onChange={handleScenarioParticipationChange(benefitType)}
                    disabled={!originalConfig[benefitType].enabled}
                    InputProps={{
                      inputProps: { min: 0, max: 100, step: 0.1 },
                      sx: {
                        bgcolor: hasValueChanged(benefitType, 'participationRate') ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                        '& input': { textAlign: 'center' }
                      }
                    }}
                    sx={{ width: '100px' }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    type="number"
                    value={scenarioConfig[benefitType].contributionValue}
                    onChange={handleScenarioContributionChange(benefitType)}
                    disabled={!originalConfig[benefitType].enabled}
                    InputProps={{
                      ...getInputAdornment(benefitType),
                      inputProps: { min: 0, step: 0.01 },
                      sx: {
                        bgcolor: hasValueChanged(benefitType, 'contributionValue') ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                        '& input': { textAlign: 'center' }
                      }
                    }}
                    sx={{ width: '120px' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Note: Only enabled benefits will be included in the calculation. Modified values are highlighted.
        </Typography>
      </Box>
    </div>
  );
};

export default WhatIfScenario;
