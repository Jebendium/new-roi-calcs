import React from 'react';
import { BenefitCard, FormField, InfoTooltip } from '../../components/ui';
import PercentageInput from '../shared/components/PercentageInput';
import CurrencyInput from '../shared/components/CurrencyInput';
import NumberInput from '../shared/components/NumberInput';
import { BenefitType, BenefitConfig } from '../core/calculation-functions';

interface MultiBenefitConfigProps {
  benefitConfig: {
    [key in BenefitType]: BenefitConfig;
  };
  onChange: (benefitType: BenefitType, config: BenefitConfig) => void;
}

const benefitOptions = [
  {
    type: BenefitType.PENSION,
    label: 'Pension',
    description: 'Configure pension contributions as a percentage of salary',
    tooltip: "Employer NI savings on the full pension contribution amount",
    inputType: 'percentage',
    inputLabel: "Average Contribution (%)",
  },
  {
    type: BenefitType.CYCLE_TO_WORK,
    label: 'Cycle to Work',
    description: 'Configure cycle to work scheme monthly contribution',
    tooltip: "Employer NI savings on the monthly cycle to work amount",
    inputType: 'currency',
    inputLabel: "Average Monthly Spend (£)",
  },
  {
    type: BenefitType.EV_CAR_SCHEME,
    label: 'EV Car Scheme',
    description: 'Configure electric vehicle salary sacrifice scheme',
    tooltip: "Employer NI savings on the gross amount minus 2% BiK (based on the P11D value)",
    inputType: 'currency',
    inputLabel: "Monthly Gross Amount (£)",
    additionalField: {
      type: 'currency',
      label: "Average P11D Value (£)",
      key: 'p11dValue',
    }
  },
  {
    type: BenefitType.CHILDCARE,
    label: 'Childcare Vouchers',
    description: 'Configure childcare vouchers monthly contribution',
    tooltip: "Employer NI savings on the full amount for childcare vouchers",
    inputType: 'currency',
    inputLabel: "Monthly Amount (£)",
  },
  {
    type: BenefitType.HOLIDAY_TRADING,
    label: 'Holiday Trading',
    description: 'Configure holiday purchase days and related savings',
    tooltip: "Employer NI savings on the full amount plus wage savings from holiday trading",
    inputType: 'number',
    inputLabel: "Average Days Purchased",
  },
];

const MultiBenefitConfig: React.FC<MultiBenefitConfigProps> = ({ benefitConfig, onChange }) => {
  // Toggle handler
  const handleToggleChange = (benefitType: BenefitType) => (isEnabled: boolean) => {
    onChange(benefitType, {
      ...benefitConfig[benefitType],
      enabled: isEnabled
    });
  };
  
  // Participation rate handler
  const handleParticipationChange = (benefitType: BenefitType) => (value: number) => {
    if (!isNaN(value) && value >= 0 && value <= 100) {
      onChange(benefitType, {
        ...benefitConfig[benefitType],
        participationRate: value
      });
    }
  };
  
  // Contribution value handler
  const handleContributionChange = (benefitType: BenefitType) => (value: number) => {
    if (!isNaN(value) && value >= 0) {
      onChange(benefitType, {
        ...benefitConfig[benefitType],
        contributionValue: value
      });
    }
  };
  
  // P11D value handler
  const handleP11DValueChange = (benefitType: BenefitType) => (value: number) => {
    if (!isNaN(value) && value >= 0) {
      onChange(benefitType, {
        ...benefitConfig[benefitType],
        p11dValue: value
      });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Benefit Configuration</h3>
      <p className="text-sm text-slate-600 mb-4">
        Configure each benefit type with its participation rate and contribution value.
        Toggle benefits on/off to include them in the calculation.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefitOptions.map(benefit => {
          const config = benefitConfig[benefit.type];
          if (!config) return null;
          
          return (
            <BenefitCard
              key={benefit.type}
              title={benefit.label}
              description={benefit.description}
              isEnabled={config.enabled}
              onToggle={handleToggleChange(benefit.type)}
              tooltip={benefit.tooltip}
              tooltipIcon={<InfoTooltip content={benefit.tooltip} />}
            >
              <div className="space-y-4">
                <FormField 
                  label="Participation Rate (%)" 
                  htmlFor={`participation-${benefit.type}`}
                  helperText="Percentage of employees using this benefit"
                >
                  <PercentageInput
                    id={`participation-${benefit.type}`}
                    value={config.participationRate}
                    onChange={handleParticipationChange(benefit.type)}
                    min={0}
                    max={100}
                    step={0.1}
                    disabled={!config.enabled}
                    required
                  />
                </FormField>
                
                <FormField 
                  label={benefit.inputLabel} 
                  htmlFor={`contribution-${benefit.type}`}
                >
                  {benefit.inputType === 'number' ? (
                    <NumberInput
                      id={`contribution-${benefit.type}`}
                      value={config.contributionValue}
                      onChange={handleContributionChange(benefit.type)}
                      min={0}
                      step={1}
                      disabled={!config.enabled}
                      required
                    />
                  ) : benefit.inputType === 'percentage' ? (
                    <PercentageInput
                      id={`contribution-${benefit.type}`}
                      value={config.contributionValue}
                      onChange={handleContributionChange(benefit.type)}
                      min={0}
                      max={100}
                      step={0.1}
                      disabled={!config.enabled}
                      required
                    />
                  ) : (
                    <CurrencyInput
                      id={`contribution-${benefit.type}`}
                      value={config.contributionValue}
                      onChange={handleContributionChange(benefit.type)}
                      min={0}
                      step={10}
                      disabled={!config.enabled}
                      required
                    />
                  )}
                </FormField>
                
                {benefit.additionalField && benefit.type === BenefitType.EV_CAR_SCHEME && (
                  <FormField 
                    label={benefit.additionalField.label} 
                    htmlFor={`additional-${benefit.type}`}
                  >
                    <CurrencyInput
                      id={`additional-${benefit.type}`}
                      value={config.p11dValue || 35000}
                      onChange={handleP11DValueChange(benefit.type)}
                      min={0}
                      step={100}
                      disabled={!config.enabled}
                      required
                    />
                  </FormField>
                )}
              </div>
            </BenefitCard>
          );
        })}
      </div>
    </div>
  );
};

export default MultiBenefitConfig;