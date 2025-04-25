import React from 'react';
import { BenefitCard, FormField, InfoTooltip } from '../../components/ui';
import PercentageInput from '../../shared/components/PercentageInput';
import CurrencyInput from '../../shared/components/CurrencyInput';
import NumberInput from '../../shared/components/NumberInput';
import { BenefitType, BenefitConfig } from '../../lib/calculationFunctions';

interface EmployeeBenefitConfigProps {
  benefitConfig: {
    [key in BenefitType]: BenefitConfig;
  };
  onChange: (benefitType: BenefitType, config: BenefitConfig) => void;
  errors?: Record<string, { enabled?: string; contributionValue?: string }>;
  touched?: Record<string, { enabled?: boolean; contributionValue?: boolean }>;
}

const benefitOptions = [
  {
    type: BenefitType.PENSION,
    label: 'Pension',
    description: 'Configure pension contributions as a percentage of your salary',
    tooltip: 'Tax and NI savings on pension contributions',
    inputType: 'percentage',
    inputLabel: 'Contribution (%)',
  },
  {
    type: BenefitType.CYCLE_TO_WORK,
    label: 'Cycle to Work',
    description: 'Configure cycle to work scheme monthly contribution',
    tooltip: 'Tax and NI savings on cycle to work scheme',
    inputType: 'currency',
    inputLabel: 'Monthly Amount (£)',
  },
  {
    type: BenefitType.EV_CAR_SCHEME,
    label: 'EV Car Scheme',
    description: 'Configure electric vehicle salary sacrifice scheme',
    tooltip: 'Tax and NI savings on EV car scheme (minus 2% benefit in kind)',
    inputType: 'currency',
    inputLabel: 'Monthly Amount (£)',
  },
  {
    type: BenefitType.CHILDCARE,
    label: 'Childcare Vouchers',
    description: 'Configure childcare vouchers monthly contribution',
    tooltip: 'Tax and NI savings on childcare vouchers',
    inputType: 'currency',
    inputLabel: 'Monthly Amount (£)',
  },
  {
    type: BenefitType.HOLIDAY_TRADING,
    label: 'Holiday Trading',
    description: 'Configure holiday purchase days',
    tooltip: 'Tax and NI savings on holiday trading',
    inputType: 'number',
    inputLabel: 'Days Purchased',
  },
];

const EmployeeBenefitConfig: React.FC<EmployeeBenefitConfigProps> = ({ 
  benefitConfig, 
  onChange, 
  errors = {}, 
  touched = {} 
}) => {
  const handleToggleChange = (benefitType: BenefitType) => (isEnabled: boolean) => {
    onChange(benefitType, {
      ...benefitConfig[benefitType],
      enabled: isEnabled,
    });
  };

  const handleValueChange = (benefitType: BenefitType, value: any) => {
    onChange(benefitType, {
      ...benefitConfig[benefitType],
      contributionValue: value,
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Your Benefit Configuration</h3>
      <p className="text-sm text-slate-600 mb-6">
        Configure your salary sacrifice benefits to see how they affect your take-home pay and tax savings. 
        Toggle benefits on/off to include them in the calculation.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefitOptions.map(({ type, label, description, tooltip, inputType, inputLabel }) => (
          <BenefitCard
            key={type}
            title={label}
            description={description}
            isEnabled={benefitConfig[type].enabled}
            onToggle={handleToggleChange(type)}
            tooltip={tooltip}
            tooltipIcon={<InfoTooltip content={tooltip} />}
          >
            <FormField
              label={inputLabel}
              htmlFor={`benefit-${type}`}
              tooltipIcon={<InfoTooltip content={tooltip} />}
              error={touched[type]?.contributionValue && errors[type]?.contributionValue}
            >
              {inputType === 'percentage' && (
                <PercentageInput
                  id={`benefit-${type}`}
                  value={benefitConfig[type].contributionValue}
                  onChange={v => handleValueChange(type, v)}
                  disabled={!benefitConfig[type].enabled}
                  min={0}
                  max={100}
                />
              )}
              {inputType === 'currency' && (
                <CurrencyInput
                  id={`benefit-${type}`}
                  value={benefitConfig[type].contributionValue}
                  onChange={v => handleValueChange(type, v)}
                  disabled={!benefitConfig[type].enabled}
                  min={0}
                />
              )}
              {inputType === 'number' && (
                <NumberInput
                  id={`benefit-${type}`}
                  value={benefitConfig[type].contributionValue}
                  onChange={v => handleValueChange(type, v)}
                  disabled={!benefitConfig[type].enabled}
                  min={0}
                />
              )}
            </FormField>
          </BenefitCard>
        ))}
      </div>
    </div>
  );
};

export default EmployeeBenefitConfig;