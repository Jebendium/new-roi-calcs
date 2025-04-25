import React from 'react';
import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Tooltip,
  IconButton,
  InputAdornment
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { BenefitType, BenefitConfig } from '../../lib/calculationFunctions';

interface MultiBenefitConfigProps {
  benefitConfig: {
    [key in BenefitType]: BenefitConfig;
  };
  onChange: (benefitType: BenefitType, config: BenefitConfig) => void;
}

const MultiBenefitConfig: React.FC<MultiBenefitConfigProps> = ({ benefitConfig, onChange }) => {
  // Helper function to handle toggle changes
  const handleToggleChange = (benefitType: BenefitType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(benefitType, {
      ...benefitConfig[benefitType],
      enabled: event.target.checked
    });
  };

  // Helper function to handle participation rate changes
  const handleParticipationChange = (benefitType: BenefitType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      onChange(benefitType, {
        ...benefitConfig[benefitType],
        participationRate: value
      });
    }
  };

  // Helper function to handle contribution value changes
  const handleContributionChange = (benefitType: BenefitType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0) {
      onChange(benefitType, {
        ...benefitConfig[benefitType],
        contributionValue: value
      });
    }
  };

  // Helper function to handle P11D value changes
  const handleP11DValueChange = (benefitType: BenefitType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0) {
      onChange(benefitType, {
        ...benefitConfig[benefitType],
        p11dValue: value
      });
    }
  };

  // Tooltips for each benefit type
  const tooltips = {
    [BenefitType.PENSION]: "Employer NI savings on the full contribution amount",
    [BenefitType.CYCLE_TO_WORK]: "Employer NI savings on the full amount",
    [BenefitType.EV_CAR_SCHEME]: "Employer NI savings on the gross amount minus 2% BiK (based on the P11D value)",
    [BenefitType.CHILDCARE]: "Employer NI savings on the full amount",
    [BenefitType.HOLIDAY_TRADING]: "Employer NI savings on the full amount plus wage savings"
  };

  // Labels for contribution value fields
  const contributionLabels = {
    [BenefitType.PENSION]: "Average Contribution (%)",
    [BenefitType.CYCLE_TO_WORK]: "Average Spend (£)",
    [BenefitType.EV_CAR_SCHEME]: "Monthly Gross Amount (£)",
    [BenefitType.CHILDCARE]: "Monthly Amount (£)",
    [BenefitType.HOLIDAY_TRADING]: "Average Days Purchased"
  };
  
  // Labels for additional fields (like P11D)
  const additionalFieldLabels = {
    [BenefitType.EV_CAR_SCHEME]: "Average P11D Value (£)"
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

  // Benefit type display names
  const benefitNames = {
    [BenefitType.PENSION]: "Pension",
    [BenefitType.CYCLE_TO_WORK]: "Cycle to Work",
    [BenefitType.EV_CAR_SCHEME]: "EV Car Scheme",
    [BenefitType.CHILDCARE]: "Childcare Vouchers",
    [BenefitType.HOLIDAY_TRADING]: "Holiday Trading"
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Benefit Configuration
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Configure each benefit type with its participation rate and contribution value.
        Toggle benefits on/off to include them in the calculation.
      </Typography>

      <Grid container spacing={3}>
        {Object.values(BenefitType).map((benefitType) => (
          <Grid item xs={12} md={6} key={benefitType}>
            <Card variant={benefitConfig[benefitType].enabled ? "outlined" : "elevation"} 
                  sx={{ opacity: benefitConfig[benefitType].enabled ? 1 : 0.7 }}>
              <CardHeader
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={benefitConfig[benefitType].enabled}
                          onChange={handleToggleChange(benefitType)}
                          color="primary"
                        />
                      }
                      label={benefitNames[benefitType]}
                    />
                    <Tooltip title={tooltips[benefitType]}>
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Participation Rate (%)"
                      type="number"
                      value={benefitConfig[benefitType].participationRate}
                      onChange={handleParticipationChange(benefitType)}
                      disabled={!benefitConfig[benefitType].enabled}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        inputProps: { min: 0, max: 100, step: 0.1 }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={contributionLabels[benefitType]}
                      type="number"
                      value={benefitConfig[benefitType].contributionValue}
                      onChange={handleContributionChange(benefitType)}
                      disabled={!benefitConfig[benefitType].enabled}
                      InputProps={{
                        ...getInputAdornment(benefitType),
                        inputProps: { min: 0, step: 0.01 }
                      }}
                    />
                  </Grid>
                  
                  {/* Additional fields for specific benefit types */}
                  {benefitType === BenefitType.EV_CAR_SCHEME && (
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        label={additionalFieldLabels[BenefitType.EV_CAR_SCHEME]}
                        type="number"
                        value={benefitConfig[benefitType].p11dValue || 35000}
                        onChange={handleP11DValueChange(benefitType)}
                        disabled={!benefitConfig[benefitType].enabled}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">£</InputAdornment>,
                          inputProps: { min: 0, step: 100 }
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MultiBenefitConfig;
