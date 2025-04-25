import React from 'react';
import { BenefitType, CalculationResult } from '../../lib/calculationFunctions';

interface ScenarioResultsProps {
  originalResult: CalculationResult;
  scenarioResult: CalculationResult;
  employeeCount: number;
  averageSalary: number;
  taxYear: string;
}

const benefitNames = {
  [BenefitType.PENSION]: 'Pension',
  [BenefitType.CYCLE_TO_WORK]: 'Cycle to Work',
  [BenefitType.EV_CAR_SCHEME]: 'EV Car Scheme',
  [BenefitType.CHILDCARE]: 'Childcare Vouchers',
  [BenefitType.HOLIDAY_TRADING]: 'Holiday Trading',
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`;
};

const ScenarioResults: React.FC<ScenarioResultsProps> = ({
  originalResult,
  scenarioResult,
  employeeCount,
  averageSalary,
  taxYear,
}) => {
  // Calculate differences
  const savingsDifference = scenarioResult.annualSavings - originalResult.annualSavings;
  const savingsPerEmployeeDifference = scenarioResult.savingsPerEmployee - originalResult.savingsPerEmployee;
  const savingsPercentageIncrease = originalResult.annualSavings > 0
    ? (savingsDifference / originalResult.annualSavings) * 100
    : 0;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">What-If Scenario Results</h2>
      <p className="text-sm text-slate-600 mb-4">
        Comparison between current configuration and what-if scenario for {employeeCount} employees
        with an average salary of {formatCurrency(averageSalary)} for the {taxYear} tax year.
      </p>
      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-6 text-sm">
        The what-if scenario shows a potential increase of <span className="font-semibold">{formatCurrency(savingsDifference)}</span> in annual savings
        (<span className="font-semibold">{formatPercentage(savingsPercentageIncrease)}</span> increase).
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border rounded-lg bg-white shadow-sm p-4">
          <div className="text-slate-500 text-xs mb-1">Current Annual Savings</div>
          <div className="text-xl font-semibold">{formatCurrency(originalResult.annualSavings)}</div>
          <div className="text-slate-500 text-xs">{formatCurrency(originalResult.savingsPerEmployee)} per employee</div>
        </div>
        <div className="border rounded-lg bg-blue-50 shadow-sm p-4">
          <div className="text-slate-500 text-xs mb-1">Scenario Annual Savings</div>
          <div className="text-xl font-semibold">{formatCurrency(scenarioResult.annualSavings)}</div>
          <div className="text-slate-500 text-xs">{formatCurrency(scenarioResult.savingsPerEmployee)} per employee</div>
        </div>
        <div className={`border rounded-lg shadow-sm p-4 ${savingsDifference > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="text-slate-500 text-xs mb-1">Potential Increase</div>
          <div className={`text-xl font-semibold ${savingsDifference > 0 ? 'text-green-700' : 'text-red-700'}`}>{formatCurrency(savingsDifference)}</div>
          <div className="text-slate-500 text-xs">{formatCurrency(savingsPerEmployeeDifference)} per employee ({formatPercentage(savingsPercentageIncrease)} increase)</div>
        </div>
      </div>
      {/* Comparison Chart Placeholder */}
      <div className="mb-8">
        <h3 className="text-base font-semibold mb-2">Savings Comparison</h3>
        {/* Integrate your chart component here */}
        <div className="bg-slate-50 border border-slate-200 rounded p-6 text-center text-slate-400">[Savings Comparison Chart]</div>
      </div>
      {/* Benefit Breakdown Comparison Table */}
      <h3 className="text-base font-semibold mb-2">Savings Breakdown by Benefit Type</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-slate-200 rounded-lg">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-3 py-2 text-left">Benefit Type</th>
              <th className="px-3 py-2 text-right">Current Savings</th>
              <th className="px-3 py-2 text-right">Scenario Savings</th>
              <th className="px-3 py-2 text-right">Difference</th>
              <th className="px-3 py-2 text-right">% Change</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(benefitNames).map((benefitType) => {
              const current = originalResult.benefitBreakdown[benefitType]?.totalSavings || 0;
              const scenario = scenarioResult.benefitBreakdown[benefitType]?.totalSavings || 0;
              const diff = scenario - current;
              const pct = current > 0 ? (diff / current) * 100 : 0;
              return (
                <tr key={benefitType}>
                  <td className="px-3 py-2">{benefitNames[benefitType as BenefitType]}</td>
                  <td className="px-3 py-2 text-right">{formatCurrency(current)}</td>
                  <td className="px-3 py-2 text-right">{formatCurrency(scenario)}</td>
                  <td className={`px-3 py-2 text-right ${diff > 0 ? 'text-green-700' : diff < 0 ? 'text-red-700' : ''}`}>{formatCurrency(diff)}</td>
                  <td className="px-3 py-2 text-right">{formatPercentage(pct)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScenarioResults;
