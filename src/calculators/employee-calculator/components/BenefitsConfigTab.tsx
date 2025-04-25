'use client';

import React from 'react';
import { BenefitType, BenefitConfig } from '../../../calculation-engine/types';
import { 
  BenefitCard, 
  Card, 
  FormField, 
  InfoBox, 
  InfoTooltip 
} from '../../../components/ui';
import PercentageInput from '../../shared/components/PercentageInput';
import CurrencyInput from '../../shared/components/CurrencyInput';
import NumberInput from '../../shared/components/NumberInput';

interface BenefitsConfigTabProps {
  benefitConfig: {
    [key in BenefitType]: BenefitConfig;
  };
  onBenefitConfigChange: (benefitType: BenefitType, config: BenefitConfig) => void;
  includeProjection: boolean;
  onIncludeProjectionChange: (include: boolean) => void;
  onCalculate: (e: React.FormEvent) => void;
  onReset: () => void;
}

const BenefitsConfigTab: React.FC<BenefitsConfigTabProps> = ({
  benefitConfig,
  onBenefitConfigChange,
  includeProjection,
  onIncludeProjectionChange,
  onCalculate,
  onReset
}) => {
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(e);
  };

  // Helper function to handle benefit toggle
  const handleBenefitToggle = (benefitType: BenefitType) => (isEnabled: boolean) => {
    onBenefitConfigChange(benefitType, {
      ...benefitConfig[benefitType],
      enabled: isEnabled
    });
  };

  // Helper function to handle contribution value changes
  const handleContributionChange = (benefitType: BenefitType) => (value: number) => {
    if (!isNaN(value) && value >= 0) {
      onBenefitConfigChange(benefitType, {
        ...benefitConfig[benefitType],
        contributionValue: value
      });
    }
  };

  // Benefit type definitions
  const benefitOptions = [
    {
      type: BenefitType.PENSION,
      label: 'Pension Contributions',
      description: 'Percentage of your salary to contribute to your pension.',
      tooltip: 'Tax and NI savings on pension contributions',
      inputType: 'percentage',
      inputLabel: 'Percentage of Salary (%)',
    },
    {
      type: BenefitType.CYCLE_TO_WORK,
      label: 'Cycle to Work Scheme',
      description: 'Monthly contribution towards a bicycle through salary sacrifice.',
      tooltip: 'Tax and NI savings on cycle to work scheme',
      inputType: 'currency',
      inputLabel: 'Monthly Amount (£)',
    },
    {
      type: BenefitType.EV_CAR_SCHEME,
      label: 'Electric Vehicle Scheme',
      description: 'Monthly contribution towards an electric vehicle through salary sacrifice.',
      tooltip: 'Tax and NI savings on EV car scheme (minus 2% benefit in kind)',
      inputType: 'currency',
      inputLabel: 'Monthly Amount (£)',
    },
    {
      type: BenefitType.CHILDCARE,
      label: 'Childcare Vouchers',
      description: 'Monthly contribution towards childcare vouchers.',
      tooltip: 'Tax and NI savings on childcare vouchers',
      inputType: 'currency',
      inputLabel: 'Monthly Amount (£)',
    },
    {
      type: BenefitType.HOLIDAY_TRADING,
      label: 'Holiday Trading',
      description: 'Number of holiday days to buy through salary sacrifice.',
      tooltip: 'Tax and NI savings on holiday trading',
      inputType: 'number',
      inputLabel: 'Days per Year',
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Benefit Configuration</h2>
        <p className="text-slate-600 mb-6">
          Configure your salary sacrifice benefits to see their impact on your take-home pay and tax savings.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Benefit Configuration Cards */}
        {benefitOptions.map(benefit => (
          <BenefitCard
            key={benefit.type}
            title={benefit.label}
            description={benefit.description}
            isEnabled={benefitConfig[benefit.type].enabled}
            onToggle={handleBenefitToggle(benefit.type)}
            tooltip={benefit.tooltip}
            tooltipIcon={<InfoTooltip content={benefit.tooltip} />}
          >
            <FormField label={benefit.inputLabel} htmlFor={`benefit-${benefit.type}`}>
              {benefit.inputType === 'percentage' && (
                <PercentageInput
                  id={`benefit-${benefit.type}`}
                  value={benefitConfig[benefit.type].contributionValue}
                  onChange={v => handleContributionChange(benefit.type)(v)}
                  disabled={!benefitConfig[benefit.type].enabled}
                  min={0}
                  max={100}
                />
              )}
              {benefit.inputType === 'currency' && (
                <CurrencyInput
                  id={`benefit-${benefit.type}`}
                  value={benefitConfig[benefit.type].contributionValue}
                  onChange={v => handleContributionChange(benefit.type)(v)}
                  disabled={!benefitConfig[benefit.type].enabled}
                  min={0}
                />
              )}
              {benefit.inputType === 'number' && (
                <NumberInput
                  id={`benefit-${benefit.type}`}
                  value={benefitConfig[benefit.type].contributionValue}
                  onChange={v => handleContributionChange(benefit.type)(v)}
                  disabled={!benefitConfig[benefit.type].enabled}
                  min={0}
                />
              )}
            </FormField>
          </BenefitCard>
        ))}
      </div>
      
      {/* Pension Projection Option */}
      {benefitConfig[BenefitType.PENSION].enabled && (
        <Card variant="highlight" className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-700">Pension Pot Projection</h3>
              <p className="text-sm text-blue-600">Include a 30-year projection of your pension pot.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={includeProjection}
                onChange={() => onIncludeProjectionChange(!includeProjection)}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </Card>
      )}
      
      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Calculate Savings
        </button>
      </div>
    </form>
  );
};

export default BenefitsConfigTab;