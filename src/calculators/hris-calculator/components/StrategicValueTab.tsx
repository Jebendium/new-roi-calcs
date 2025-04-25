'use client';

import React from 'react';
import NumberInput from '../../../calculators/shared/components/NumberInput';
import PercentageInput from '../../../calculators/shared/components/PercentageInput';
import CurrencyInput from '../../../calculators/shared/components/CurrencyInput';
import { InfoTooltip } from '../../../components/ui';

interface StrategicValueTabProps {
  strategicValue: {
    employeeEngagementValue: number;
    retentionImprovementPercent: number;
    annualTurnoverPercent: number;
    replacementCostMultiplier: number;
    workflowAutomationPercent: number;
    insightQualityImprovement: number;
    decisionSpeedImprovement: number;
    [key: string]: number;
  };
  setStrategicValue: React.Dispatch<React.SetStateAction<any>>;
  employeeCount: number;
  onCalculate: (e?: React.FormEvent) => void;
  onNextTab: () => void;
}

const StrategicValueTab: React.FC<StrategicValueTabProps> = ({
  strategicValue,
  setStrategicValue,
  employeeCount,
  onCalculate,
  onNextTab
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNextTab();
  };

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setStrategicValue({ ...strategicValue, [field]: numValue });
    }
  };

  // Calculate retention value
  const calculateRetentionValue = (annualSalaryBill = 5000000) => {
    // Calculate average salary
    const avgSalary = annualSalaryBill / employeeCount;
    
    // Calculate number of turnover reductions
    const currentTurnover = employeeCount * (strategicValue.annualTurnoverPercent / 100);
    const turnoverReduction = currentTurnover * (strategicValue.retentionImprovementPercent / 100);
    
    // Calculate savings using replacement cost multiplier
    const replacementCost = avgSalary * strategicValue.replacementCostMultiplier;
    const retentionSavings = turnoverReduction * replacementCost;
    
    return {
      currentTurnover,
      turnoverReduction,
      replacementCost,
      retentionSavings
    };
  };

  // Calculate engagement value
  const calculateEngagementValue = () => {
    return employeeCount * 
      strategicValue.employeeEngagementValue * 
      (strategicValue.workflowAutomationPercent / 100) / 100;
  };

  // Calculate decision making value
  const calculateDecisionMakingValue = (annualSalaryBill = 5000000) => {
    return annualSalaryBill * 0.005 * // 0.5% baseline value from better decisions
      ((strategicValue.insightQualityImprovement + strategicValue.decisionSpeedImprovement) / 200);
  };

  const retentionValue = calculateRetentionValue();
  const engagementValue = calculateEngagementValue();
  const decisionMakingValue = calculateDecisionMakingValue();
  const totalStrategicValue = retentionValue.retentionSavings + engagementValue + decisionMakingValue;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Strategic Value</h2>
        <p className="text-slate-600 mb-6">
          Beyond direct time and error savings, HR systems deliver strategic value through improved retention, 
          engagement, and decision-making. Estimate these benefits below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="font-medium text-slate-800 mb-4">Employee Retention Benefits</h3>
          
          <div className="mb-4">
            <label htmlFor="annual-turnover" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              Current Annual Turnover Rate (%)
              <InfoTooltip content="Percentage of employees who leave annually" />
            </label>
            <PercentageInput
              id="annual-turnover"
              value={strategicValue.annualTurnoverPercent.toString()}
              onChange={(val) => handleChange('annualTurnoverPercent', val)}
              min={0}
              max={100}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="retention-improvement" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              Expected Retention Improvement (%)
              <InfoTooltip content="Percentage reduction in turnover with HRIS" />
            </label>
            <PercentageInput
              id="retention-improvement"
              value={strategicValue.retentionImprovementPercent.toString()}
              onChange={(val) => handleChange('retentionImprovementPercent', val)}
              min={0}
              max={100}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="replacement-cost" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              Replacement Cost Multiplier
              <InfoTooltip content="Multiple of annual salary typically required to replace an employee (recruiting, training, lost productivity)" />
            </label>
            <NumberInput
              id="replacement-cost"
              value={strategicValue.replacementCostMultiplier.toString()}
              onChange={(val) => handleChange('replacementCostMultiplier', val)}
              min={0}
              step={0.1}
              required
            />
            <p className="mt-1 text-xs text-slate-500">
              CIPD recommends 1-3x annual salary depending on seniority
            </p>
          </div>
          
          <div className="mt-6 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
            <h4 className="text-sm font-medium text-emerald-800 mb-1">Annual Retention Value</h4>
            <div className="text-2xl font-bold text-emerald-600">
              £{retentionValue.retentionSavings.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <p className="text-xs text-emerald-700 mt-1">
              Reduction: {retentionValue.turnoverReduction.toFixed(1)} employees annually
            </p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="font-medium text-slate-800 mb-4">Employee Engagement & Decision-making</h3>
          
          <div className="mb-4">
            <label htmlFor="engagement-value" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              Annual Value of Improved Engagement (£ per employee)
              <InfoTooltip content="Value per employee from improved engagement and productivity" />
            </label>
            <CurrencyInput
              id="engagement-value"
              value={strategicValue.employeeEngagementValue.toString()}
              onChange={(val) => handleChange('employeeEngagementValue', val)}
              min={0}
              required
            />
            <p className="mt-1 text-xs text-slate-500">
              Industry research suggests £500-1,500 per employee
            </p>
          </div>
          
          <div className="mb-4">
            <label htmlFor="workflow-automation" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              Workflow Automation Potential (%)
              <InfoTooltip content="Percentage of HR workflows that can be automated" />
            </label>
            <PercentageInput
              id="workflow-automation"
              value={strategicValue.workflowAutomationPercent.toString()}
              onChange={(val) => handleChange('workflowAutomationPercent', val)}
              min={0}
              max={100}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="insight-quality" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                Insight Quality Improvement (%)
                <InfoTooltip content="Percentage improvement in data-driven insights" />
              </label>
              <PercentageInput
                id="insight-quality"
                value={strategicValue.insightQualityImprovement.toString()}
                onChange={(val) => handleChange('insightQualityImprovement', val)}
                min={0}
                max={100}
                required
              />
            </div>
            
            <div>
              <label htmlFor="decision-speed" className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                Decision Speed Improvement (%)
                <InfoTooltip content="Percentage improvement in decision-making speed" />
              </label>
              <PercentageInput
                id="decision-speed"
                value={strategicValue.decisionSpeedImprovement.toString()}
                onChange={(val) => handleChange('decisionSpeedImprovement', val)}
                min={0}
                max={100}
                required
              />
            </div>
          </div>
          
          <div className="mt-6 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
            <h4 className="text-sm font-medium text-emerald-800 mb-1">Annual Strategic Value</h4>
            <div className="text-2xl font-bold text-emerald-600">
              £{(engagementValue + decisionMakingValue).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-medium text-slate-800 mb-1">Total Strategic Value</h3>
            <p className="text-sm text-slate-600">Combined annual value from retention, engagement and strategic benefits</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-3xl font-bold text-emerald-600">£{totalStrategicValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
          </div>
        </div>
      </div>

      {/* Information box */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
        <h3 className="text-blue-700 font-medium mb-1">Why Strategic Value Matters</h3>
        <p className="text-blue-600 text-sm mb-2">
          While harder to quantify, strategic benefits often provide the greatest long-term ROI for HR systems:
        </p>
        <ul className="text-blue-600 text-sm space-y-1 list-disc pl-5">
          <li>Employee retention directly impacts business continuity and knowledge retention</li>
          <li>Engaged employees are typically 20-25% more productive</li>
          <li>Data-driven decisions can improve business outcomes by 5-6% on average</li>
          <li>Modern HRIS systems enable proactive workforce planning rather than reactive management</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          className="px-6 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <div className="space-x-3">
          <button
            type="button"
            onClick={onCalculate}
            className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Calculate ROI
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default StrategicValueTab;