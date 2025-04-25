import React from 'react';
import ResultCard from '../../shared/components/ResultCard';
import ResultSection from '../../shared/components/ResultSection';

import { BenefitType, CalculationResult } from '../../lib/calculationFunctions';

interface CalculationResultsProps {
  result: CalculationResult;
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

const CalculationResults: React.FC<CalculationResultsProps> = ({
  result,
  employeeCount,
  averageSalary,
  taxYear,
}) => {
  // Calculate total savings
  const totalSavings = result.annualSavings;
  const totalSavingsPerEmployee = result.savingsPerEmployee;

  // Calculate percentage reduction in NI costs
  const niReduction = result.originalNI > 0
    ? ((result.originalNI - result.reducedNI) / result.originalNI) * 100
    : 0;

  return (
    <div>
      <ResultSection title="Calculation Results">
        <p className="text-sm text-slate-600 mb-4">
          Based on {employeeCount} employees with an average salary of {formatCurrency(averageSalary)} for the {taxYear} tax year.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ResultCard
            title="Total Annual Savings"
            value={formatCurrency(totalSavings)}
            variant="primary"
          />
          <ResultCard
            title="Average Savings Per Employee"
            value={formatCurrency(totalSavingsPerEmployee)}
            variant="success"
          />
          <ResultCard
            title="Original NI Cost"
            value={formatCurrency(result.originalNI)}
            variant="secondary"
          />
          <ResultCard
            title="Reduced NI Cost"
            value={formatCurrency(result.reducedNI)}
            description={`${niReduction.toFixed(1)}% reduction`}
            variant="info"
          />
        </div>
        {/* NI Cost Comparison Chart placeholder */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-2">NI Cost Comparison</h3>
          {/* Integrate your chart component here */}
          {/* Example: <SavingsChart ... /> */}
          <div className="bg-slate-50 border border-slate-200 rounded p-6 text-center text-slate-400">[NI Cost Comparison Chart]</div>
        </div>
        {/* Benefit Savings Breakdown Chart placeholder */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-2">Savings Distribution by Benefit Type</h3>
          {/* Integrate your chart component here */}
          {/* Example: <PieChart ... /> */}
          <div className="bg-slate-50 border border-slate-200 rounded p-6 text-center text-slate-400">[Savings Distribution Chart]</div>
        </div>
        {/* Savings Breakdown Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 rounded-lg">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-3 py-2 text-left">Benefit Type</th>
                <th className="px-3 py-2 text-right">Total Savings</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.benefitBreakdown)
                .filter(([, savings]) => savings.totalSavings > 0)
                .map(([benefitType, savings]) => (
                  <tr key={benefitType}>
                    <td className="px-3 py-2">{benefitNames[benefitType as BenefitType] || benefitType}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(savings.totalSavings)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </ResultSection>
    </div>
  );
};

export default CalculationResults;
