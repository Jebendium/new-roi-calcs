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
  
  // Function to determine input symbol based on benefit type
  const getInputSymbol = (benefitType: BenefitType) => {
    if (benefitType === BenefitType.PENSION || benefitType === BenefitType.HOLIDAY_TRADING) {
      return { participationSymbol: '%', contributionSymbol: '%' };
    } else if (benefitType === BenefitType.CYCLE_TO_WORK || benefitType === BenefitType.EV_CAR_SCHEME || benefitType === BenefitType.CHILDCARE) {
      return { participationSymbol: '%', contributionSymbol: '£' };
    }
    return { participationSymbol: '%', contributionSymbol: '' };
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
        Adjust participation rates and contribution values to see how changes would affect your savings.
        Modified values will be highlighted for easy comparison.
      </p>
      <div className="overflow-x-auto rounded-lg shadow-sm border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-700">Benefit Type</th>
              <th className="px-4 py-3 text-center font-medium text-slate-700" colSpan={2}>Current Configuration</th>
              <th className="px-4 py-3 text-center font-medium text-slate-700" colSpan={2}>What-If Scenario</th>
            </tr>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2 text-center text-xs font-medium text-slate-500 uppercase">Participation (%)</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-slate-500 uppercase">Contribution</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-slate-500 uppercase">Participation (%)</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-slate-500 uppercase">Contribution</th>
            </tr>
          </thead>
          <tbody>
            {benefitTypes.map((benefitType, index) => (
              <tr key={benefitType}>
                <td className="px-4 py-3 border-b border-slate-200">
                  <div className="flex items-center">
                    <span className="font-medium text-slate-800">{benefitNames[benefitType]}</span>
                    <span className="ml-2"><InfoTooltip content="Adjust values to see how changes would affect your savings" /></span>
                  </div>
                </td>
                {/* Current Configuration */}
                <td className="px-4 py-3 text-center border-b border-slate-200">
                  <div className="relative">
                    <input
                      type="text"
                      value={`% ${originalConfig[benefitType].participationRate}`}
                      onChange={(e) => {
                        const value = e.target.value.replace(/^%\s*/, '');
                        handleOriginalParticipationChange(benefitType)(value);
                      }}
                      className="w-32 h-12 rounded-md border-slate-300 pl-3 text-left shadow-md focus:border-blue-500 focus:ring-blue-500"
                      disabled={!originalConfig[benefitType].enabled}
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-center border-b border-slate-200">
                  <div className="relative">
                    <input
                      type="text"
                      value={getInputSymbol(benefitType).contributionSymbol ? `${getInputSymbol(benefitType).contributionSymbol} ${originalConfig[benefitType].contributionValue}` : originalConfig[benefitType].contributionValue.toString()}
                      onChange={(e) => {
                        const value = e.target.value.replace(new RegExp(`^${getInputSymbol(benefitType).contributionSymbol}\s*`), '');
                        handleOriginalContributionChange(benefitType)(value);
                      }}
                      className="w-32 h-12 rounded-md border-slate-300 pl-3 text-left shadow-md focus:border-blue-500 focus:ring-blue-500"
                      disabled={!originalConfig[benefitType].enabled}
                    />
                  </div>
                </td>
                {/* What-If Scenario */}
                <td className={`px-4 py-3 text-center border-b border-slate-200`}>
                  <div className="relative">
                    <input
                      type="text"
                      value={`% ${scenarioConfig[benefitType].participationRate}`}
                      onChange={(e) => {
                        const value = e.target.value.replace(/^%\s*/, '');
                        handleScenarioParticipationChange(benefitType)(value);
                      }}
                      className={`w-32 h-12 rounded-md pl-3 text-left shadow-md border-${hasValueChanged(benefitType, 'participationRate') ? 'blue-500' : 'slate-300'} ${hasValueChanged(benefitType, 'participationRate') ? 'ring-1 ring-blue-500' : ''} focus:border-blue-500 focus:ring-blue-500`}
                      disabled={!originalConfig[benefitType].enabled}
                    />
                  </div>
                </td>
                <td className={`px-4 py-3 text-center border-b border-slate-200`}>
                  <div className="relative">
                    <input
                      type="text"
                      value={getInputSymbol(benefitType).contributionSymbol ? `${getInputSymbol(benefitType).contributionSymbol} ${scenarioConfig[benefitType].contributionValue}` : scenarioConfig[benefitType].contributionValue.toString()}
                      onChange={(e) => {
                        const value = e.target.value.replace(new RegExp(`^${getInputSymbol(benefitType).contributionSymbol}\s*`), '');
                        handleScenarioContributionChange(benefitType)(value);
                      }}
                      className={`w-32 h-12 rounded-md pl-3 text-left shadow-md border-${hasValueChanged(benefitType, 'contributionValue') ? 'blue-500' : 'slate-300'} ${hasValueChanged(benefitType, 'contributionValue') ? 'ring-1 ring-blue-500' : ''} focus:border-blue-500 focus:ring-blue-500`}
                      disabled={!originalConfig[benefitType].enabled}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-sm text-slate-600">
        <span>Note: Only enabled benefits will be included in the calculation. Modified values are highlighted.</span>
      </div>
    </div>
  );
};

export default WhatIfScenario;
