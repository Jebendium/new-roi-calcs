import { useCallback, useState } from 'react';
import { 
  BenefitType, 
  MultiBenefitConfig 
} from '../../core/calculation-functions';
import { getDefaultBenefitConfig } from '../../core/calculator-utils';

/**
 * Custom hook for managing multi-benefit calculator configuration
 * 
 * Provides state management and utility functions for configuring
 * multiple benefits across calculator interfaces
 */
export function useMultiBenefitCalculator() {
  // Initialize with default benefit configuration
  const [benefitConfig, setBenefitConfig] = useState<MultiBenefitConfig>(getDefaultBenefitConfig());

  // Toggle a benefit on/off
  const toggleBenefit = useCallback((benefit: BenefitType) => {
    setBenefitConfig(prev => ({
      ...prev,
      [benefit]: {
        ...prev[benefit],
        enabled: !prev[benefit].enabled
      }
    }));
  }, []);

  // Update a benefit's participation rate
  const updateParticipationRate = useCallback((benefit: BenefitType, rate: number) => {
    setBenefitConfig(prev => ({
      ...prev,
      [benefit]: {
        ...prev[benefit],
        participationRate: rate
      }
    }));
  }, []);

  // Update a benefit's contribution value
  const updateContributionValue = useCallback((benefit: BenefitType, value: number) => {
    setBenefitConfig(prev => ({
      ...prev,
      [benefit]: {
        ...prev[benefit],
        contributionValue: value
      }
    }));
  }, []);

  // Update P11D value for EV car scheme
  const updateP11DValue = useCallback((value: number) => {
    setBenefitConfig(prev => ({
      ...prev,
      [BenefitType.EV_CAR_SCHEME]: {
        ...prev[BenefitType.EV_CAR_SCHEME],
        p11dValue: value
      }
    }));
  }, []);

  // Reset configuration to defaults
  const resetBenefitConfig = useCallback(() => {
    setBenefitConfig(getDefaultBenefitConfig());
  }, []);

  // Set an entirely new configuration
  const setBenefits = useCallback((config: MultiBenefitConfig) => {
    setBenefitConfig(config);
  }, []);

  return {
    benefitConfig,
    toggleBenefit,
    updateParticipationRate,
    updateContributionValue,
    updateP11DValue,
    resetBenefitConfig,
    setBenefits
  };
}

export default useMultiBenefitCalculator;