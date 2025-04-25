import React from 'react';
import InfoTooltip from '../shared/components/InfoTooltip';
import NumberInput from '../shared/components/NumberInput';
import { BenefitType, BenefitConfig, MultiBenefitConfig } from '../../calculation-engine/types';

interface WhatIfScenarioProps {
  originalConfig: MultiBenefitConfig;
  scenarioConfig: MultiBenefitConfig;
  onOriginalChange: (benefitType: BenefitType, config: BenefitConfig) => void;
  onScenarioChange: (benefitType: BenefitType, config: BenefitConfig) => void;
}

const benefitNames = {
  [BenefitType.PENSION]: 'Pension',
  [BenefitType.CYCLE_TO_WORK]: 'Cycle to Work',
  [BenefitType.EV_CAR_SCHEME]: 'EV Car Scheme',
  [BenefitType.CHILDCARE]: 'Childcare Vouchers',
  [BenefitType.HOLIDAY_TRADING]: 'Holiday Trading',
};

const WhatIfScenario: React.FC<WhatIfScenarioProps> = ({
  originalConfig,
  scenarioConfig,
  onOriginalChange,
  onScenarioChange,
}) => {
  // Helper function to handle original value changes
  const handleOriginalParticipationChange = (benefitType: BenefitType) => (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      onOriginalChange(benefitType, {
        ...originalConfig[benefitType],
        participationRate: numValue,
      });
    }
  };
  
  const handleOriginalContributionChange = (benefitType: BenefitType) => (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onOriginalChange(benefitType, {
        ...originalConfig[benefitType],
        contributionValue: numValue,
      });
    }
  };
  
  // Helper function to handle scenario value changes
  const handleScenarioParticipationChange = (benefitType: BenefitType) => (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      onScenarioChange(benefitType, {
        ...scenarioConfig[benefitType],
        participationRate: numValue,
      });
    }
  };
  
  const handleScenarioContributionChange = (benefitType: BenefitType) => (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onScenarioChange(benefitType, {
        ...scenarioConfig[benefitType],
        contributionValue: numValue,
      });
    }
  };
  
  // Check if a value has changed from the original
  const hasValueChanged = (benefitType: BenefitType, field: 'participationRate' | 'contributionValue') => {
    return originalConfig[benefitType][field] !== scenarioConfig[benefitType][field];
  };
  
  // Get benefit types from the originalConfig
  const benefitTypes = Object.keys(originalConfig) as BenefitType[];
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">What-If Scenario Configuration</h3>
      <p className="text-sm text-slate-600 mb-4">
        Adjust participation rates and contribution values to see how changes would affect your savings.<br />
        Modified values will be highlighted.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-slate-200 rounded-lg">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-3 py-2 text-left">Benefit Type</th>
              <th className="px-3 py-2 text-center" colSpan={2}>Current Configuration</th>
              <th className="px-3 py-2 text-center" colSpan={2}>What-If Scenario</th>
            </tr>
            <tr>
              <th></th>
              <th className="px-3 py-2 text-center">Participation (%)</th>
              <th className="px-3 py-2 text-center">Contribution</th>
              <th className="px-3 py-2 text-center">Participation (%)</th>
              <th className="px-3 py-2 text-center">Contribution</th>
            </tr>
          </thead>
          <tbody>
            {benefitTypes.map((benefitType) => (
              <tr key={benefitType}>
                <td className="px-3 py-2">
                  <span className="font-medium">{benefitNames[benefitType]}</span>
                  <InfoTooltip content="Adjust values to see how changes would affect your savings" />
                </td>
                {/* Current Configuration */}
                <td className="px-3 py-2 text-center">
                  <NumberInput
                    value={originalConfig[benefitType].participationRate.toString()}
                    onChange={handleOriginalParticipationChange(benefitType)}
                    min={0}
                    max={100}
                    step={0.1}
                    disabled={!originalConfig[benefitType].enabled}
                    className="w-20 text-center"
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <NumberInput
                    value={originalConfig[benefitType].contributionValue.toString()}
                    onChange={handleOriginalContributionChange(benefitType)}
                    min={0}
                    step={0.01}
                    disabled={!originalConfig[benefitType].enabled}
                    className="w-24 text-center"
                  />
                </td>
                {/* What-If Scenario */}
                <td className={`px-3 py-2 text-center ${hasValueChanged(benefitType, 'participationRate') ? 'bg-blue-50' : ''}`}>
                  <NumberInput
                    value={scenarioConfig[benefitType].participationRate.toString()}
                    onChange={handleScenarioParticipationChange(benefitType)}
                    min={0}
                    max={100}
                    step={0.1}
                    disabled={!originalConfig[benefitType].enabled}
                    className="w-20 text-center"
                  />
                </td>
                <td className={`px-3 py-2 text-center ${hasValueChanged(benefitType, 'contributionValue') ? 'bg-blue-50' : ''}`}>
                  <NumberInput
                    value={scenarioConfig[benefitType].contributionValue.toString()}
                    onChange={handleScenarioContributionChange(benefitType)}
                    min={0}
                    step={0.01}
                    disabled={!originalConfig[benefitType].enabled}
                    className="w-24 text-center"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-slate-500">
        Note: Only enabled benefits will be included in the calculation. Modified values are highlighted.
      </div>
    </div>
  );
};

export default WhatIfScenario;
