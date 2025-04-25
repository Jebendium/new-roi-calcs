import React, { useState, useEffect } from 'react';
import { FormValues, EmployerNIResult } from '../../core/types';
import { useMultiBenefitCalculator } from '../../shared/hooks';
import { BenefitType } from '../../core/calculation-functions';
import { FormSection, FormField, PercentageInput, CurrencyInput } from '../../shared/components';

interface MultiBenefitTabProps {
  result: EmployerNIResult;
  formValues: FormValues;
  onRecalculate: (newConfig: any) => void;
}

/**
 * MultiBenefitTab - Tab component for configuring and analyzing multiple benefits
 * 
 * This component allows users to configure multiple salary sacrifice benefits
 * and see the impact on employer NI savings.
 */
const MultiBenefitTab: React.FC<MultiBenefitTabProps> = ({
  result,
  formValues,
  onRecalculate
}) => {
  const { 
    benefitConfig, 
    toggleBenefit, 
    updateParticipationRate, 
    updateContributionValue,
    updateP11DValue
  } = useMultiBenefitCalculator();
  
  // Apply any existing benefit config from form values
  useEffect(() => {
    if (formValues.benefitConfig) {
      // If there's an existing benefit config in the form values, use it
    }
  }, [formValues]);
  
  // Update calculations when benefit config changes
  useEffect(() => {
    onRecalculate({
      ...formValues,
      benefitConfig
    });
  }, [benefitConfig]);
  
  // Format currency values for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', { 
      style: 'currency', 
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-slate-800 mb-4">
        Multi-Benefit Analysis
      </h3>
      <p className="text-slate-600 mb-6">
        Configure additional salary sacrifice benefits to see the combined impact on employer NI savings.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Benefit Configuration Card */}
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <h4 className="text-md font-medium text-slate-800 mb-4">
            Configure Benefits
          </h4>
          
          {/* Pension (always included) */}
          <FormSection title="Pension" className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-800">
                Pension
              </span>
              <span className="text-sm text-green-600 font-medium">
                Enabled
              </span>
            </div>
            
            <FormField
              label="Participation Rate (%)"
              htmlFor="pensionParticipation"
              tooltip="Percentage of employees participating in the pension scheme."
              labelClassName="text-xs"
            >
              <PercentageInput
                id="pensionParticipation"
                name="pensionParticipation"
                value={benefitConfig[BenefitType.PENSION]?.participationRate || formValues.pensionContribution}
                onChange={(value) => updateParticipationRate(BenefitType.PENSION, value)}
                min={0}
                max={100}
                placeholder="e.g. 80%"
              />
            </FormField>
            
            <FormField
              label="Contribution Value (%)"
              htmlFor="pensionContribution"
              tooltip="Average percentage of salary contributed to pension."
              labelClassName="text-xs"
            >
              <PercentageInput
                id="pensionContribution"
                name="pensionContribution"
                value={benefitConfig[BenefitType.PENSION]?.contributionValue || formValues.pensionContribution}
                onChange={(value) => updateContributionValue(BenefitType.PENSION, value)}
                min={0}
                max={100}
                placeholder="e.g. 5%"
              />
            </FormField>
          </FormSection>
          
          {/* Cycle to Work */}
          <FormSection title="Cycle to Work" className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-800">
                Cycle to Work Scheme
              </span>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={benefitConfig[BenefitType.CYCLE_TO_WORK]?.enabled}
                  onChange={() => toggleBenefit(BenefitType.CYCLE_TO_WORK)}
                />
                <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            {benefitConfig[BenefitType.CYCLE_TO_WORK]?.enabled && (
              <>
                <FormField
                  label="Participation Rate (%)"
                  htmlFor="cycleParticipation"
                  tooltip="Percentage of employees participating in the Cycle to Work scheme."
                  labelClassName="text-xs"
                >
                  <PercentageInput
                    id="cycleParticipation"
                    name="cycleParticipation"
                    value={benefitConfig[BenefitType.CYCLE_TO_WORK]?.participationRate}
                    onChange={(value) => updateParticipationRate(BenefitType.CYCLE_TO_WORK, value)}
                    min={0}
                    max={100}
                    placeholder="e.g. 10%"
                  />
                </FormField>
                
                <FormField
                  label="Average Monthly Value"
                  htmlFor="cycleValue"
                  tooltip="Average monthly salary sacrifice amount for Cycle to Work scheme."
                  labelClassName="text-xs"
                >
                  <CurrencyInput
                    id="cycleValue"
                    name="cycleValue"
                    value={benefitConfig[BenefitType.CYCLE_TO_WORK]?.contributionValue}
                    onChange={(value) => updateContributionValue(BenefitType.CYCLE_TO_WORK, value)}
                    min={0}
                    placeholder="e.g. £50"
                  />
                </FormField>
              </>
            )}
          </FormSection>
          
          {/* EV Car Scheme */}
          <FormSection title="EV Car Scheme" className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-800">
                Electric Vehicle Scheme
              </span>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={benefitConfig[BenefitType.EV_CAR_SCHEME]?.enabled}
                  onChange={() => toggleBenefit(BenefitType.EV_CAR_SCHEME)}
                />
                <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            {benefitConfig[BenefitType.EV_CAR_SCHEME]?.enabled && (
              <>
                <FormField
                  label="Participation Rate (%)"
                  htmlFor="evParticipation"
                  tooltip="Percentage of employees participating in the EV Car Scheme."
                  labelClassName="text-xs"
                >
                  <PercentageInput
                    id="evParticipation"
                    name="evParticipation"
                    value={benefitConfig[BenefitType.EV_CAR_SCHEME]?.participationRate}
                    onChange={(value) => updateParticipationRate(BenefitType.EV_CAR_SCHEME, value)}
                    min={0}
                    max={100}
                    placeholder="e.g. 5%"
                  />
                </FormField>
                
                <FormField
                  label="Average Monthly Value"
                  htmlFor="evValue"
                  tooltip="Average monthly salary sacrifice amount for EV Car Scheme."
                  labelClassName="text-xs"
                >
                  <CurrencyInput
                    id="evValue"
                    name="evValue"
                    value={benefitConfig[BenefitType.EV_CAR_SCHEME]?.contributionValue}
                    onChange={(value) => updateContributionValue(BenefitType.EV_CAR_SCHEME, value)}
                    min={0}
                    placeholder="e.g. £350"
                  />
                </FormField>
                
                <FormField
                  label="Average P11D Value"
                  htmlFor="evP11D"
                  tooltip="Average P11D value of the electric vehicles in the scheme."
                  labelClassName="text-xs"
                >
                  <CurrencyInput
                    id="evP11D"
                    name="evP11D"
                    value={benefitConfig[BenefitType.EV_CAR_SCHEME]?.p11dValue}
                    onChange={(value) => updateP11DValue(value)}
                    min={0}
                    placeholder="e.g. £30,000"
                  />
                </FormField>
              </>
            )}
          </FormSection>
          
          {/* Childcare Vouchers */}
          <FormSection title="Childcare Vouchers" className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-800">
                Childcare Vouchers
              </span>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={benefitConfig[BenefitType.CHILDCARE_VOUCHERS]?.enabled}
                  onChange={() => toggleBenefit(BenefitType.CHILDCARE_VOUCHERS)}
                />
                <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            {benefitConfig[BenefitType.CHILDCARE_VOUCHERS]?.enabled && (
              <>
                <FormField
                  label="Participation Rate (%)"
                  htmlFor="childcareParticipation"
                  tooltip="Percentage of employees participating in the Childcare Vouchers scheme."
                  labelClassName="text-xs"
                >
                  <PercentageInput
                    id="childcareParticipation"
                    name="childcareParticipation"
                    value={benefitConfig[BenefitType.CHILDCARE_VOUCHERS]?.participationRate}
                    onChange={(value) => updateParticipationRate(BenefitType.CHILDCARE_VOUCHERS, value)}
                    min={0}
                    max={100}
                    placeholder="e.g. 15%"
                  />
                </FormField>
                
                <FormField
                  label="Average Monthly Value"
                  htmlFor="childcareValue"
                  tooltip="Average monthly salary sacrifice amount for Childcare Vouchers."
                  labelClassName="text-xs"
                >
                  <CurrencyInput
                    id="childcareValue"
                    name="childcareValue"
                    value={benefitConfig[BenefitType.CHILDCARE_VOUCHERS]?.contributionValue}
                    onChange={(value) => updateContributionValue(BenefitType.CHILDCARE_VOUCHERS, value)}
                    min={0}
                    placeholder="e.g. £150"
                  />
                </FormField>
              </>
            )}
          </FormSection>
        </div>
        
        {/* Benefit Savings Summary */}
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <h4 className="text-md font-medium text-slate-800 mb-4">
            Benefit Savings Summary
          </h4>
          
          <div className="space-y-4">
            {result.benefitBreakdown && Object.entries(result.benefitBreakdown).map(([benefit, data]) => (
              <div key={benefit} className="p-4 rounded-lg bg-slate-50">
                <h5 className="text-sm font-medium text-slate-800 mb-2">
                  {formatBenefitName(benefit)}
                </h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-slate-600">NI Savings:</div>
                  <div className="text-slate-800 font-medium">{formatCurrency(data.niSavings)}</div>
                  
                  {data.additionalSavings > 0 && (
                    <>
                      <div className="text-slate-600">Additional Savings:</div>
                      <div className="text-slate-800 font-medium">{formatCurrency(data.additionalSavings)}</div>
                    </>
                  )}
                  
                  <div className="text-slate-600 font-medium">Total Savings:</div>
                  <div className="text-slate-800 font-medium">{formatCurrency(data.totalSavings)}</div>
                </div>
              </div>
            ))}
            
            {/* Total Savings */}
            <div className="p-4 rounded-lg bg-green-50 border border-green-100 mt-6">
              <h5 className="text-sm font-medium text-green-800 mb-2">
                Total Savings
              </h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-green-600 font-medium">Total Annual Savings:</div>
                <div className="text-green-800 font-medium">{formatCurrency(result.annualSavings)}</div>
                
                <div className="text-green-600">Per Employee:</div>
                <div className="text-green-800 font-medium">{formatCurrency(result.savingsPerEmployee)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format benefit names
function formatBenefitName(benefitType: string): string {
  return benefitType.replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export default MultiBenefitTab;