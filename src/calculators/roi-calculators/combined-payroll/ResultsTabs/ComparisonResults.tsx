'use client';

import React from 'react';
import { Card, ResultHighlight, ResultsSection, InfoBox } from '../../../../components/ui';
import { 
  PayrollSystemResults, 
  ManagedPayrollResults,
  CombinedPayrollInputs
} from '../../../../types/combinedPayrollTypes';
import { formatCurrency, formatPercentage, formatMonths } from '../../../../utils/formatting';
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer,
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface ComparisonResultsProps {
  payrollSystemResults: PayrollSystemResults;
  managedPayrollResults: ManagedPayrollResults;
  inputs: CombinedPayrollInputs;
}

/**
 * Comparison Results tab for the Combined Payroll Calculator
 */
const ComparisonResults: React.FC<ComparisonResultsProps> = ({ 
  payrollSystemResults, 
  managedPayrollResults,
  inputs
}) => {
  // Determine which option is better
  const betterROI = payrollSystemResults.fiveYearROI > managedPayrollResults.fiveYearROI 
    ? 'Payroll System' 
    : 'Managed Payroll';
  
  const betterNetBenefit = payrollSystemResults.netAnnualBenefit > managedPayrollResults.netAnnualBenefit
    ? 'Payroll System'
    : 'Managed Payroll';
  
  const betterPaybackPeriod = payrollSystemResults.paybackPeriodMonths < managedPayrollResults.paybackPeriodMonths
    ? 'Payroll System'
    : 'Managed Payroll';
  
  const betterTCO = payrollSystemResults.totalCostOfOwnership5Year < managedPayrollResults.totalCostOfOwnership5Year
    ? 'Payroll System'
    : 'Managed Payroll';
  
  // Calculate the difference between the two options
  const roiDifference = Math.abs(payrollSystemResults.fiveYearROI - managedPayrollResults.fiveYearROI);
  const netBenefitDifference = Math.abs(payrollSystemResults.netAnnualBenefit - managedPayrollResults.netAnnualBenefit);
  const paybackPeriodDifference = Math.abs(payrollSystemResults.paybackPeriodMonths - managedPayrollResults.paybackPeriodMonths);
  const tcoDifference = Math.abs(payrollSystemResults.totalCostOfOwnership5Year - managedPayrollResults.totalCostOfOwnership5Year);
  
  // Determine overall recommendation
  // Simple heuristic: count which option wins in more categories
  const payrollSystemWins = [
    payrollSystemResults.fiveYearROI > managedPayrollResults.fiveYearROI,
    payrollSystemResults.netAnnualBenefit > managedPayrollResults.netAnnualBenefit,
    payrollSystemResults.paybackPeriodMonths < managedPayrollResults.paybackPeriodMonths,
    payrollSystemResults.totalCostOfOwnership5Year < managedPayrollResults.totalCostOfOwnership5Year
  ].filter(Boolean).length;
  
  const managedPayrollWins = [
    managedPayrollResults.fiveYearROI > payrollSystemResults.fiveYearROI,
    managedPayrollResults.netAnnualBenefit > payrollSystemResults.netAnnualBenefit,
    managedPayrollResults.paybackPeriodMonths < payrollSystemResults.paybackPeriodMonths,
    managedPayrollResults.totalCostOfOwnership5Year < payrollSystemResults.totalCostOfOwnership5Year
  ].filter(Boolean).length;
  
  const overallRecommendation = payrollSystemWins > managedPayrollWins 
    ? 'Payroll System' 
    : 'Managed Payroll';
  
  // Create data for comparative charts
  const roiComparisonData = [
    {
      name: '1-Year ROI',
      'Payroll System': payrollSystemResults.firstYearROI,
      'Managed Payroll': managedPayrollResults.firstYearROI
    },
    {
      name: '3-Year ROI',
      'Payroll System': payrollSystemResults.threeYearROI,
      'Managed Payroll': managedPayrollResults.threeYearROI
    },
    {
      name: '5-Year ROI',
      'Payroll System': payrollSystemResults.fiveYearROI,
      'Managed Payroll': managedPayrollResults.fiveYearROI
    }
  ];
  
  const keyMetricsComparisonData = [
    {
      name: 'Annual Net Benefit',
      'Payroll System': payrollSystemResults.netAnnualBenefit,
      'Managed Payroll': managedPayrollResults.netAnnualBenefit
    },
    {
      name: 'First Year Cost',
      'Payroll System': payrollSystemResults.initialInvestment + payrollSystemResults.annualCosts,
      'Managed Payroll': managedPayrollResults.initialInvestment + managedPayrollResults.annualCosts
    },
    {
      name: 'Annual Ongoing Cost',
      'Payroll System': payrollSystemResults.annualCosts,
      'Managed Payroll': managedPayrollResults.annualCosts
    },
    {
      name: 'Savings Per Employee',
      'Payroll System': payrollSystemResults.savingsPerEmployee,
      'Managed Payroll': managedPayrollResults.savingsPerEmployee
    },
    {
      name: 'Cost Per Payslip',
      'Payroll System': payrollSystemResults.costPerPayslip,
      'Managed Payroll': managedPayrollResults.costPerPayslip
    }
  ];
  
  // Create radar chart data for comparing factors
  const radarChartData = [
    {
      factor: 'ROI',
      'Payroll System': Math.min(100, payrollSystemResults.fiveYearROI / 2), // Scale down for radar chart
      'Managed Payroll': Math.min(100, managedPayrollResults.fiveYearROI / 2)
    },
    {
      factor: 'Net Benefit',
      'Payroll System': payrollSystemResults.netAnnualBenefit / 1000, // Scale down for radar chart
      'Managed Payroll': managedPayrollResults.netAnnualBenefit / 1000
    },
    {
      factor: 'Staff Time Savings',
      'Payroll System': 80, // Relative value for radar chart
      'Managed Payroll': 95
    },
    {
      factor: 'Implementation Effort',
      'Payroll System': 40, // Lower is better, so invert the scale
      'Managed Payroll': 70
    },
    {
      factor: 'Control',
      'Payroll System': 90, // Relative value for radar chart
      'Managed Payroll': 50
    },
    {
      factor: 'Scalability',
      'Payroll System': 75, // Relative value for radar chart
      'Managed Payroll': 85
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Payroll Options Comparison</h3>
      <p className="text-slate-600 mb-6">
        This comparison helps you decide between implementing a new payroll system in-house versus 
        outsourcing to a managed payroll service.
      </p>

      {/* Overall Recommendation */}
      <InfoBox 
        title="Recommendation" 
        variant="success" 
        className="mb-8"
      >
        <div className="text-lg font-semibold">
          Based on your inputs, the {overallRecommendation} option offers a better overall return on investment.
        </div>
        <p className="mt-2">
          This recommendation considers ROI, net benefit, payback period, and total cost of ownership. 
          However, your decision should also factor in non-financial considerations like control, 
          security requirements, and strategic alignment.
        </p>
      </InfoBox>

      {/* Key Metrics Comparison */}
      <ResultsSection title="Key Metrics Comparison">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ResultHighlight
            title="Better 5-Year ROI"
            value={betterROI}
            description={`${formatPercentage(roiDifference)} higher`}
            variant="primary"
          />
          <ResultHighlight
            title="Better Net Benefit"
            value={betterNetBenefit}
            description={`${formatCurrency(netBenefitDifference, 0, 0)} more`}
            variant="success"
          />
          <ResultHighlight
            title="Faster Payback"
            value={betterPaybackPeriod}
            description={`${formatMonths(paybackPeriodDifference)} quicker`}
            variant="info"
          />
          <ResultHighlight
            title="Lower 5-Year TCO"
            value={betterTCO}
            description={`${formatCurrency(tcoDifference, 0, 0)} less`}
            variant="secondary"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="p-4">
            <h4 className="font-medium text-slate-800 mb-4">ROI Comparison</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={roiComparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${Number(value).toFixed(1)}%`, ""]}
                  />
                  <Legend />
                  <Bar dataKey="Payroll System" fill="#3b82f6" />
                  <Bar dataKey="Managed Payroll" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-medium text-slate-800 mb-4">Factor Comparison</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={radarChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="factor" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Payroll System"
                    dataKey="Payroll System"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.5}
                  />
                  <Radar
                    name="Managed Payroll"
                    dataKey="Managed Payroll"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.5}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </ResultsSection>

      {/* Detailed Comparison Table */}
      <ResultsSection title="Detailed Comparison">
        <Card className="p-4 mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Metric</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Payroll System</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Managed Payroll</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Better Option</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">First Year ROI</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatPercentage(payrollSystemResults.firstYearROI)}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatPercentage(managedPayrollResults.firstYearROI)}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    {payrollSystemResults.firstYearROI > managedPayrollResults.firstYearROI ? (
                      <span className="text-blue-600 font-medium">Payroll System</span>
                    ) : (
                      <span className="text-purple-600 font-medium">Managed Payroll</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">5-Year ROI</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatPercentage(payrollSystemResults.fiveYearROI)}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatPercentage(managedPayrollResults.fiveYearROI)}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    {payrollSystemResults.fiveYearROI > managedPayrollResults.fiveYearROI ? (
                      <span className="text-blue-600 font-medium">Payroll System</span>
                    ) : (
                      <span className="text-purple-600 font-medium">Managed Payroll</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">Net Annual Benefit</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(payrollSystemResults.netAnnualBenefit, 0, 0)}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(managedPayrollResults.netAnnualBenefit, 0, 0)}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    {payrollSystemResults.netAnnualBenefit > managedPayrollResults.netAnnualBenefit ? (
                      <span className="text-blue-600 font-medium">Payroll System</span>
                    ) : (
                      <span className="text-purple-600 font-medium">Managed Payroll</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">Payback Period</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatMonths(payrollSystemResults.paybackPeriodMonths)}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatMonths(managedPayrollResults.paybackPeriodMonths)}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    {payrollSystemResults.paybackPeriodMonths < managedPayrollResults.paybackPeriodMonths ? (
                      <span className="text-blue-600 font-medium">Payroll System</span>
                    ) : (
                      <span className="text-purple-600 font-medium">Managed Payroll</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">Initial Investment</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(payrollSystemResults.initialInvestment, 0, 0)}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(managedPayrollResults.initialInvestment, 0, 0)}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    {payrollSystemResults.initialInvestment < managedPayrollResults.initialInvestment ? (
                      <span className="text-blue-600 font-medium">Payroll System</span>
                    ) : (
                      <span className="text-purple-600 font-medium">Managed Payroll</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">Annual Costs</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(payrollSystemResults.annualCosts, 0, 0)}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(managedPayrollResults.annualCosts, 0, 0)}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    {payrollSystemResults.annualCosts < managedPayrollResults.annualCosts ? (
                      <span className="text-blue-600 font-medium">Payroll System</span>
                    ) : (
                      <span className="text-purple-600 font-medium">Managed Payroll</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">Savings Per Employee</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(payrollSystemResults.savingsPerEmployee, 0, 0)}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(managedPayrollResults.savingsPerEmployee, 0, 0)}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    {payrollSystemResults.savingsPerEmployee > managedPayrollResults.savingsPerEmployee ? (
                      <span className="text-blue-600 font-medium">Payroll System</span>
                    ) : (
                      <span className="text-purple-600 font-medium">Managed Payroll</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">Cost Per Payslip</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(payrollSystemResults.costPerPayslip, 2, 2)}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(managedPayrollResults.costPerPayslip, 2, 2)}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    {payrollSystemResults.costPerPayslip < managedPayrollResults.costPerPayslip ? (
                      <span className="text-blue-600 font-medium">Payroll System</span>
                    ) : (
                      <span className="text-purple-600 font-medium">Managed Payroll</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">5-Year Total Cost of Ownership</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(payrollSystemResults.totalCostOfOwnership5Year, 0, 0)}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(managedPayrollResults.totalCostOfOwnership5Year, 0, 0)}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    {payrollSystemResults.totalCostOfOwnership5Year < managedPayrollResults.totalCostOfOwnership5Year ? (
                      <span className="text-blue-600 font-medium">Payroll System</span>
                    ) : (
                      <span className="text-purple-600 font-medium">Managed Payroll</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </ResultsSection>

      {/* Qualitative Considerations */}
      <ResultsSection title="Additional Considerations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h4 className="font-medium text-slate-800 mb-4">Payroll System Benefits</h4>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Greater control over payroll processes and data</li>
              <li>One-time implementation costs with lower ongoing fees</li>
              <li>Potential for deeper integration with other internal systems</li>
              <li>No dependency on external service provider</li>
              <li>Can be customized to specific organizational needs</li>
              <li>May be more suitable for organizations with complex payroll requirements</li>
            </ul>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-medium text-slate-800 mb-4">Managed Payroll Benefits</h4>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Reduced internal staffing requirements</li>
              <li>Access to payroll expertise and compliance knowledge</li>
              <li>Lower implementation costs and faster deployment</li>
              <li>Continual updates to tax tables and compliance requirements</li>
              <li>Reduced internal IT burden for maintenance and updates</li>
              <li>May be more suitable for organizations with limited payroll expertise</li>
            </ul>
          </Card>
        </div>
      </ResultsSection>
    </div>
  );
};

export default ComparisonResults;