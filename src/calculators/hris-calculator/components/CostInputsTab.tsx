'use client';

import React from 'react';
import CurrencyInput from '../../../calculators/shared/components/CurrencyInput';
import { Card, InfoBox, InfoTooltip } from '../../../components/ui';

interface CostInputsTabProps {
  costInputs: {
    implementationCost: number;
    annualSubscriptionCost: number;
    trainingCost: number;
    maintenanceCost: number;
    employeeCount: number;
    [key: string]: number;
  };
  setCostInputs: React.Dispatch<React.SetStateAction<any>>;
  onCalculate: (e?: React.FormEvent) => void;
}

const CostInputsTab: React.FC<CostInputsTabProps> = ({
  costInputs,
  setCostInputs,
  onCalculate
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(e);
  };

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setCostInputs({ ...costInputs, [field]: numValue });
    }
  };

  // Calculate total costs
  const calculateTotalCosts = () => {
    const firstYearCost = 
      costInputs.implementationCost + 
      costInputs.annualSubscriptionCost + 
      costInputs.trainingCost + 
      costInputs.maintenanceCost;
    
    const ongoingAnnualCost = 
      costInputs.annualSubscriptionCost + 
      costInputs.maintenanceCost;
    
    const threeYearCost = 
      firstYearCost + 
      (ongoingAnnualCost * 2);
    
    const costPerEmployee = firstYearCost / costInputs.employeeCount;
    
    return {
      firstYearCost,
      ongoingAnnualCost,
      threeYearCost,
      costPerEmployee
    };
  };

  const costTotals = calculateTotalCosts();

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">HRIS System Costs</h2>
        <p className="text-slate-600 mb-6">
          Enter the anticipated costs for implementing and maintaining your HRIS system. 
          This will help calculate your total investment and ROI.
        </p>
      </div>

      <Card className="mb-6">
        <h3 className="text-base font-medium mb-4">System Setup Costs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="implementation-cost" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              Implementation Cost (£)
              <InfoTooltip content="One-time cost for system setup, configuration, and deployment" />
            </label>
            <CurrencyInput
              id="implementation-cost"
              value={costInputs.implementationCost.toString()}
              onChange={(val) => handleChange('implementationCost', val)}
              min={0}
              required
            />
            <p className="mt-1 text-xs text-slate-500">
              One-time cost to set up the system
            </p>
          </div>

          <div>
            <label htmlFor="annual-subscription" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              Annual Subscription/License (£)
              <InfoTooltip content="Annual cost for the HRIS software license or subscription" />
            </label>
            <CurrencyInput
              id="annual-subscription"
              value={costInputs.annualSubscriptionCost.toString()}
              onChange={(val) => handleChange('annualSubscriptionCost', val)}
              min={0}
              required
            />
            <p className="mt-1 text-xs text-slate-500">
              Recurring annual software cost
            </p>
          </div>

          <div>
            <label htmlFor="training-cost" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              Training Cost (£)
              <InfoTooltip content="Cost to train HR staff and employees on the new system" />
            </label>
            <CurrencyInput
              id="training-cost"
              value={costInputs.trainingCost.toString()}
              onChange={(val) => handleChange('trainingCost', val)}
              min={0}
              required
            />
            <p className="mt-1 text-xs text-slate-500">
              One-time cost in year one
            </p>
          </div>

          <div>
            <label htmlFor="maintenance-cost" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              Annual Maintenance & Support (£)
              <InfoTooltip content="Annual cost for ongoing system maintenance, updates, and support" />
            </label>
            <CurrencyInput
              id="maintenance-cost"
              value={costInputs.maintenanceCost.toString()}
              onChange={(val) => handleChange('maintenanceCost', val)}
              min={0}
              required
            />
            <p className="mt-1 text-xs text-slate-500">
              Recurring annual support costs
            </p>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h3 className="text-base font-medium mb-4">First Year Costs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-800 mb-3">First Year Total Cost</h4>
            <div className="text-3xl font-bold text-slate-700">£{costTotals.firstYearCost.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <p className="text-xs text-slate-500 mt-1">
              Implementation + Annual License + Training + Maintenance
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-800 mb-3">Ongoing Annual Cost</h4>
            <div className="text-3xl font-bold text-slate-700">£{costTotals.ongoingAnnualCost.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <p className="text-xs text-slate-500 mt-1">
              Annual License + Maintenance (after year one)
            </p>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h3 className="text-base font-medium mb-4">Long-Term Cost Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-800 mb-3">3-Year Total Cost</h4>
            <div className="text-2xl font-bold text-slate-700">£{costTotals.threeYearCost.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <p className="text-xs text-slate-500 mt-1">
              Total cost over 3 years
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-800 mb-3">First Year Cost Per Employee</h4>
            <div className="text-2xl font-bold text-slate-700">£{costTotals.costPerEmployee.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <p className="text-xs text-slate-500 mt-1">
              Based on {costInputs.employeeCount} employees
            </p>
          </div>
        </div>
      </Card>

      <InfoBox title="Cost Considerations" variant="info" className="mb-6">
        <ul className="space-y-1 list-disc pl-5">
          <li>HRIS costs typically scale based on employee count and required modules</li>
          <li>Implementation costs are typically 1-2x the annual subscription</li>
          <li>Annual subscription costs typically range from £50-250 per employee</li>
          <li>Consider allocating 5-10% of annual costs for ongoing training and system improvements</li>
        </ul>
      </InfoBox>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Calculate ROI
        </button>
      </div>
    </form>
  );
};

export default CostInputsTab;