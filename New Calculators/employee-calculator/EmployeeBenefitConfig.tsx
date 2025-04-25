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

interface EmployeeBenefitConfigProps {
  benefitConfig: {
    [key in BenefitType]: BenefitConfig;
  };
  onChange: (benefitType: BenefitType, config: BenefitConfig) => void;
  errors?: Record<string, { enabled?: string; contributionValue?: string }>;
  touched?: Record<string, { enabled?: boolean; contributionValue?: boolean }>;
}

const EmployeeBenefitConfig: React.FC<EmployeeBenefitConfigProps> = ({ benefitConfig, onChange, errors = {}, touched = {} }) => {
  // Helper function to handle toggle changes
  const handleToggleChange = (benefitType: BenefitType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(benefitType, {
      ...benefitConfig[benefitType],
      enabled: event.target.checked
    });
  };

  // For employee benefits, we don't need participation rate as it's for the individual

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

  // Tooltips for each benefit type - employee-focused
  const tooltips = {
    [BenefitType.PENSION]: "Tax and NI savings on pension contributions",
    [BenefitType.CYCLE_TO_WORK]: "Tax and NI savings on cycle to work scheme",
    [BenefitType.EV_CAR_SCHEME]: "Tax and NI savings on EV car scheme (minus 2% benefit in kind)",
    [BenefitType.CHILDCARE]: "Tax and NI savings on childcare vouchers",
    [BenefitType.HOLIDAY_TRADING]: "Tax and NI savings on holiday trading"
  };

  // Labels for contribution value fields
  const contributionLabels = {
    [BenefitType.PENSION]: "Contribution (%)",
    [BenefitType.CYCLE_TO_WORK]: "Monthly Amount (£)",
    [BenefitType.EV_CAR_SCHEME]: "Monthly Amount (£)",
    [BenefitType.CHILDCARE]: "Monthly Amount (£)",
    [BenefitType.HOLIDAY_TRADING]: "Days Purchased"
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
        Your Benefit Configuration
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Configure your salary sacrifice benefits to see how they affect your take-home pay and tax savings.
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
                      label={contributionLabels[benefitType]}
                      type="number"
                      value={benefitConfig[benefitType].contributionValue}
                      onChange={handleContributionChange(benefitType)}
                      disabled={!benefitConfig[benefitType].enabled}
                      InputProps={{
                        ...getInputAdornment(benefitType),
                        inputProps: { min: 0, step: 0.01 }
                      }}
                      error={Boolean(touched[benefitType]?.contributionValue && errors[benefitType]?.contributionValue)}
                      helperText={touched[benefitType]?.contributionValue && errors[benefitType]?.contributionValue}
                      aria-label={contributionLabels[benefitType]}
                      aria-describedby={`benefit-error-${benefitType}`}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EmployeeBenefitConfig;
