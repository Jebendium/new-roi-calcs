import React from 'react';
import InfoBox from '../../components/ui/InfoBox';
import ResultHighlight from '../../components/ui/ResultHighlight';
import { BenefitType, CalculationResult } from '../../lib/calculationFunctions';

interface EmployerNIResultsProps {
  result: CalculationResult;
  employeeCount: number;
  averageSalary: number;
  taxYear: string;
  benefitConfig: Record<string, any>;
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

const EmployerNIResults: React.FC<EmployerNIResultsProps> = ({
  result,
  employeeCount,
  averageSalary,
  taxYear,
  benefitConfig
}) => {
  // Calculate percentage reduction in NI costs
  const niReduction = result.originalNI > 0
    ? ((result.originalNI - result.reducedNI) / result.originalNI) * 100
    : 0;

  // Get pension contribution rate safely (fixing the undefined% issue)
  const getPensionContributionRate = () => {
    const pensionConfig = benefitConfig[BenefitType.PENSION];
    return pensionConfig?.enabled && !isNaN(pensionConfig?.contributionValue) 
      ? `${pensionConfig.contributionValue}%` 
      : '0%';
  };

  const pensionRate = getPensionContributionRate();

  return (
    <div>
      <div className="mb-4">
        <InfoBox title="Calculation Summary">
          Based on {employeeCount} employees with an average salary of {formatCurrency(averageSalary)} 
          and a pension contribution of {pensionRate} for the {taxYear} tax year.
        </InfoBox>
      </div>

      <h3 className="text-xl font-semibold mb-4">Annual Savings Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ResultHighlight
          title="Total Annual NI Savings"
          value={formatCurrency(result.annualSavings)}
          variant="primary"
        />
        <ResultHighlight
          title="Savings Per Employee"
          value={formatCurrency(result.savingsPerEmployee)}
          variant="success"
        />
        <ResultHighlight
          title="Reduction in NI Liability"
          value={formatPercentage(niReduction)}
          description="Percentage reduction in employer NI contributions"
          variant="info"
        />
      </div>

      <div className="bg-slate-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">National Insurance Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="text-base font-medium text-slate-600 mb-1">Original NI Liability</h4>
            <p className="text-2xl font-bold text-slate-800">{formatCurrency(result.originalNI)}</p>
            <p className="text-xs text-slate-500">Annual employer NI liability without salary sacrifice</p>
          </div>
          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <h4 className="text-base font-medium text-blue-600 mb-1">Reduced NI Liability</h4>
            <p className="text-2xl font-bold text-slate-800">{formatCurrency(result.reducedNI)}</p>
            <p className="text-xs text-slate-500">Annual employer NI liability with salary sacrifice</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Savings Distribution</h3>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Benefit</th>
                <th className="px-3 py-2 text-right font-medium">Annual Savings</th>
                <th className="px-3 py-2 text-right font-medium">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.benefitBreakdown)
                .filter(([, savings]) => savings.totalSavings > 0)
                .map(([benefitType, savings]) => {
                  const percentage = (savings.totalSavings / result.annualSavings) * 100;
                  return (
                    <tr key={benefitType} className="border-t border-slate-100">
                      <td className="px-3 py-2">{benefitNames[benefitType as BenefitType] || benefitType}</td>
                      <td className="px-3 py-2 text-right">{formatCurrency(savings.totalSavings)}</td>
                      <td className="px-3 py-2 text-right">{formatPercentage(percentage)}</td>
                    </tr>
                  );
                })}
              <tr className="border-t border-slate-200 font-medium">
                <td className="px-3 py-2">Total</td>
                <td className="px-3 py-2 text-right">{formatCurrency(result.annualSavings)}</td>
                <td className="px-3 py-2 text-right">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">What This Means</h3>
        <InfoBox variant="success">
          <p>Your organisation can save <strong>{formatCurrency(result.annualSavings)}</strong> annually in employer National Insurance contributions through salary sacrifice arrangements.</p>
          <p className="mt-2">These savings are calculated based on the employer NI rate of 13.8% on earnings above the Secondary Threshold (£9,100 per annum).</p>
          <p className="mt-2">Implementing these benefits can provide significant cost savings while also enhancing your employee benefits package.</p>
        </InfoBox>
      </div>
    </div>
  );
};

export default EmployerNIResults;