import React from 'react';
import { ResultHighlight, InfoBox, Card, ResultsSection } from '../../../components/ui';
import { formatCurrency, formatPercentage, formatMonths } from '../../../utils/formatting';

interface HRISSavingsResult {
  timeSavings: {
    annualHours: number;
    annualValue: number;
  };
  errorReduction: {
    payrollErrors: number;
    complianceSavings: number;
  };
  strategicValue: {
    retentionValue: number;
    engagementValue: number;
  };
  costs: {
    firstYearCost: number;
    ongoingAnnualCost: number;
    threeYearCost: number;
  };
  roi: {
    threeYearROI: number;
    paybackPeriod: number;
    netValue: number;
  };
}

interface ROIResultsTabProps {
  result: HRISSavingsResult;
  totalEmployees: number;
  useBenchmarks: boolean;
}

const ROIResultsTab: React.FC<ROIResultsTabProps> = ({
  result,
  totalEmployees,
  useBenchmarks,
}) => {
  // Calculate annual benefits breakdown
  const totalAnnualBenefits = 
    result.timeSavings.annualValue + 
    result.errorReduction.payrollErrors + 
    result.errorReduction.complianceSavings + 
    result.strategicValue.retentionValue + 
    result.strategicValue.engagementValue;

  // Calculate percentages for donut chart
  const timeSavingsPercent = Math.round((result.timeSavings.annualValue / totalAnnualBenefits) * 100);
  const errorReductionPercent = Math.round(((result.errorReduction.payrollErrors + result.errorReduction.complianceSavings) / totalAnnualBenefits) * 100);
  const strategicValuePercent = Math.round(((result.strategicValue.retentionValue + result.strategicValue.engagementValue) / totalAnnualBenefits) * 100);

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">ROI Analysis Results</h3>
        <p className="text-sm text-slate-600 mb-4">
          Based on your inputs, here's the projected return on investment for your HRIS implementation.
        </p>
      </div>

      {/* Key Headline Metrics */}
      <ResultsSection title="Key Metrics" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultHighlight
            title="3-Year ROI"
            value={formatPercentage(result.roi.threeYearROI)}
            description="Net return on investment over 3 years"
            variant="primary"
          />
          <ResultHighlight
            title="3-Year Value"
            value={formatCurrency(result.roi.netValue)}
            description="Total value generated over 3 years"
            variant="success"
          />
          <ResultHighlight
            title="Payback Period"
            value={formatMonths(result.roi.paybackPeriod)}
            description="Time to recover your investment"
            variant="info"
          />
        </div>
      </ResultsSection>

      {/* Annual Value Breakdown */}
      <ResultsSection title="Annual Value Breakdown" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultHighlight
            title="Time Savings"
            value={formatCurrency(result.timeSavings.annualValue)}
            description={`${result.timeSavings.annualHours.toFixed(0)} hours saved annually`}
            variant="info"
          />
          <ResultHighlight
            title="Error Reduction"
            value={formatCurrency(result.errorReduction.payrollErrors + result.errorReduction.complianceSavings)}
            description="From payroll accuracy and compliance"
            variant="secondary"
          />
          <ResultHighlight
            title="Strategic Value"
            value={formatCurrency(result.strategicValue.retentionValue + result.strategicValue.engagementValue)}
            description="From improved retention and engagement"
            variant="success"
          />
        </div>
      </ResultsSection>

      {/* Cost Analysis */}
      <ResultsSection title="Cost Analysis" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultHighlight
            title="First Year Cost"
            value={formatCurrency(result.costs.firstYearCost)}
            description="Implementation + Annual License + Training"
            variant="default"
          />
          <ResultHighlight
            title="Ongoing Annual Cost"
            value={formatCurrency(result.costs.ongoingAnnualCost)}
            description="Annual License + Maintenance (after year one)"
            variant="default"
          />
          <ResultHighlight
            title="First Year Cost Per Employee"
            value={formatCurrency(result.costs.firstYearCost / totalEmployees)}
            description={`Based on ${totalEmployees} employees`}
            variant="default"
          />
        </div>
      </ResultsSection>

      {/* Year-by-Year Analysis */}
      <ResultsSection title="Year-by-Year Analysis" className="mb-8">
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-2 text-left">Metric</th>
                  <th className="px-4 py-2 text-right">Year 1</th>
                  <th className="px-4 py-2 text-right">Year 2</th>
                  <th className="px-4 py-2 text-right">Year 3</th>
                  <th className="px-4 py-2 text-right">3-Year Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-2 font-medium">Total Costs</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(result.costs.firstYearCost)}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(result.costs.ongoingAnnualCost)}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(result.costs.ongoingAnnualCost)}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(result.costs.threeYearCost)}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2 font-medium">Total Benefits</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(totalAnnualBenefits)}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(totalAnnualBenefits)}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(totalAnnualBenefits)}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(totalAnnualBenefits * 3)}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2 font-medium">Net Value</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(totalAnnualBenefits - result.costs.firstYearCost)}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(totalAnnualBenefits - result.costs.ongoingAnnualCost)}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(totalAnnualBenefits - result.costs.ongoingAnnualCost)}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(result.roi.netValue)}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2 font-medium">Annual ROI</td>
                  <td className="px-4 py-2 text-right">
                    {formatPercentage((totalAnnualBenefits / result.costs.firstYearCost - 1) * 100)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatPercentage((totalAnnualBenefits / result.costs.ongoingAnnualCost - 1) * 100)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatPercentage((totalAnnualBenefits / result.costs.ongoingAnnualCost - 1) * 100)}
                  </td>
                  <td className="px-4 py-2 text-right">{formatPercentage(result.roi.threeYearROI)}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2 font-medium">Cumulative Value</td>
                  <td className="px-4 py-2 text-right">
                    {formatCurrency(totalAnnualBenefits - result.costs.firstYearCost)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatCurrency((totalAnnualBenefits * 2) - result.costs.firstYearCost - result.costs.ongoingAnnualCost)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatCurrency(result.roi.netValue)}
                  </td>
                  <td className="px-4 py-2 text-right">{formatCurrency(result.roi.netValue)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </ResultsSection>

      {/* Key Insights */}
      <Card className="mb-6">
        <InfoBox title="Key Insights" variant="info">
          <ul className="space-y-2">
            <li>Your HRIS system is estimated to deliver a {formatPercentage(result.roi.threeYearROI)} ROI over 3 years</li>
            <li>Investment payback occurs in {formatMonths(result.roi.paybackPeriod)}, with ongoing annual ROI of {formatPercentage((totalAnnualBenefits / result.costs.ongoingAnnualCost - 1) * 100)}</li>
            <li>The biggest value drivers are strategic value and time savings</li>
            <li>Annual benefits outweigh ongoing costs by {formatCurrency(totalAnnualBenefits - result.costs.ongoingAnnualCost)} per year after the first year</li>
          </ul>
        </InfoBox>
      </Card>

      {/* Source Notes */}
      {useBenchmarks && (
        <div className="text-xs text-slate-500 mt-8">
          <p>* Some calculations include industry benchmarks from CIPD/CIPP research on HR systems effectiveness.</p>
        </div>
      )}
    </div>
  );
};

export default ROIResultsTab;