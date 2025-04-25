import React from 'react';
import { 
  ResultHighlight, 
  InfoBox, 
  ResultsSection, 
  Card 
} from '../../components/ui';
import { formatCurrency } from '../../utils/formatting';
import { INDUSTRY_AVERAGES, getSavingsInsight } from './IndustryAverages';

interface BenefitSavingsResult {
  taxSavings: number;
  niSavings: number;
  totalSavings: number;
  takeHomeIncrease: number;
}

interface EmployeeCalculationResult {
  annualTaxSavings: number;
  annualNISavings: number;
  totalAnnualSavings: number;
  monthlyTakeHomeIncrease: number;
  benefitBreakdown: {
    [key: string]: BenefitSavingsResult;
  };
  projectionResults?: {
    totalContributions: number;
    potValue: number;
  } | null;
}

interface EmployeeBenefitResultsProps {
  result: EmployeeCalculationResult;
  annualSalary: number;
  taxRegion: string;
  includeProjection: boolean;
  className?: string;
}

const formatBenefitType = (type: string): string => {
  const benefitTypeMap: Record<string, string> = {
    'PENSION': 'Pension',
    'CYCLE_TO_WORK': 'Cycle to Work',
    'EV_CAR_SCHEME': 'Electric Vehicle Scheme',
    'CHILDCARE': 'Childcare',
    'HOLIDAY_TRADING': 'Holiday Trading'
  };
  return benefitTypeMap[type] || type;
};

const EmployeeBenefitResults: React.FC<EmployeeBenefitResultsProps> = ({
  result,
  annualSalary,
  taxRegion,
  includeProjection,
  className
}) => {
  const breakdownRows = Object.entries(result.benefitBreakdown).map(([type, data]) => ({
    benefit: formatBenefitType(type),
    tax: data.taxSavings,
    ni: data.niSavings,
    total: data.totalSavings,
    monthly: data.takeHomeIncrease / 12,
  }));

  breakdownRows.push({
    benefit: 'Total',
    tax: result.annualTaxSavings,
    ni: result.annualNISavings,
    total: result.totalAnnualSavings,
    monthly: result.monthlyTakeHomeIncrease,
  });

  const savingsInsight = getSavingsInsight(result.totalAnnualSavings, INDUSTRY_AVERAGES.totalAnnualSavings);

  return (
    <div className={className}>
      <ResultsSection title="Your Savings Breakdown">
        {savingsInsight && (
          <InfoBox 
            title={savingsInsight.title || "Savings Analysis"} 
            variant={savingsInsight.type === 'success' ? 'success' : 
                    savingsInsight.type === 'info' ? 'info' : 
                    savingsInsight.type === 'warning' ? 'warning' : 'info'}
            className="mb-4"
          >
            {savingsInsight.message}
          </InfoBox>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ResultHighlight
            title="Annual Tax & NI Savings"
            value={formatCurrency(result.totalAnnualSavings)}
            variant="primary"
          />
          <ResultHighlight
            title="Monthly Take-Home Increase"
            value={formatCurrency(result.monthlyTakeHomeIncrease)}
            variant="success"
          />
          <ResultHighlight
            title="Total Annual Tax Savings"
            value={formatCurrency(result.annualTaxSavings)}
            variant="info"
          />
          <ResultHighlight
            title="Total Annual NI Savings"
            value={formatCurrency(result.annualNISavings)}
            variant="secondary"
          />
        </div>
        
        <Card className="mb-6">
          <h3 className="text-base font-medium mb-3">Benefit Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Benefit Type</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Tax Savings</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">NI Savings</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Total Savings</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Monthly Impact</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {breakdownRows.map((row, idx) => (
                  <tr key={row.benefit} className={idx === breakdownRows.length - 1 ? 'font-bold bg-blue-50' : ''}>
                    <td className="px-3 py-2">{row.benefit}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(row.tax)}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(row.ni)}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(row.total)}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(row.monthly)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        {/* Placeholder for charts: integrate your chart component here if available */}
        {/* <Card className="mb-6">
          <h3 className="text-base font-medium mb-3">Savings Visualization</h3>
          <SavingsCharts data={...} />
        </Card> */}
        
        {result.projectionResults && includeProjection && (
          <Card variant="highlight" className="mt-6">
            <h3 className="text-base font-medium mb-3">Pension Projection (30 years)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultHighlight
                title="Projected Pot Value"
                value={formatCurrency(result.projectionResults.potValue)}
                variant="success"
              />
              <ResultHighlight
                title="Total Contributions"
                value={formatCurrency(result.projectionResults.totalContributions)}
                variant="info"
              />
            </div>
          </Card>
        )}
      </ResultsSection>
      
      <InfoBox title="What does this mean for you?" variant="success" className="mt-6">
        <p>
          Based on your selections, you could save <strong>{formatCurrency(result.totalAnnualSavings)}</strong> annually 
          through salary sacrifice benefits, increasing your monthly take-home pay by <strong>{formatCurrency(result.monthlyTakeHomeIncrease)}</strong>.
        </p>
        <p className="mt-2">
          These savings come from reduced income tax and National Insurance contributions, which vary based on your tax bracket and the benefits you've selected.
        </p>
        <p className="mt-2">
          The tax and NI savings can effectively reduce the cost of benefits like pension contributions, cycle to work schemes, and more.
        </p>
      </InfoBox>
    </div>
  );
};

export default EmployeeBenefitResults;