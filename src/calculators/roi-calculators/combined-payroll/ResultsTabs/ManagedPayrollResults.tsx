'use client';

import React from 'react';
import { Card, ResultHighlight, ResultsSection } from '../../../../components/ui';
import { ManagedPayrollResults as ManagedPayrollResultsType } from '../../../../types/combinedPayrollTypes';
import { formatCurrency, formatPercentage, formatMonths } from '../../../../utils/formatting';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';

interface ManagedPayrollResultsProps {
  results: ManagedPayrollResultsType;
  inputs: {
    employeeCount: number;
    currentAnnualCost: number;
  };
}

/**
 * Managed Payroll Results tab for the Combined Payroll Calculator
 */
const ManagedPayrollResults: React.FC<ManagedPayrollResultsProps> = ({ 
  results, 
  inputs 
}) => {
  // Chart colors
  const COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#f43f5e', '#8b5cf6', '#06b6d4'];

  // Create data for the benefits breakdown chart
  const benefitsBreakdownData = [
    { name: 'Staff Savings', value: results.staffSavings },
    { name: 'Software Savings', value: results.softwareSavings },
    { name: 'Infrastructure Savings', value: results.infrastructureSavings },
    { name: 'Training & Other', value: results.trainingAndOtherSavings },
    { name: 'Error Reduction', value: results.errorReductionSavings },
    { name: 'Compliance', value: results.complianceSavings },
    { name: 'Paper Savings', value: results.paperSavings }
  ];

  // Create data for the ROI over time chart
  const roiOverTimeData = [
    { 
      name: 'Year 1', 
      roi: results.firstYearROI
    },
    { 
      name: 'Year 3', 
      roi: results.threeYearROI
    },
    { 
      name: 'Year 5', 
      roi: results.fiveYearROI
    }
  ];

  // Calculate current vs. new cost per payslip
  const currentCostPerPayslip = inputs.currentAnnualCost / (inputs.employeeCount * 12); // Simplified assumption
  
  // Create data for cost comparison chart
  const costComparisonData = [
    {
      name: 'Current System',
      costPerPayslip: currentCostPerPayslip,
    },
    {
      name: 'Managed Service',
      costPerPayslip: results.costPerPayslip,
    }
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Managed Payroll Service ROI Analysis</h3>
      <p className="text-slate-600 mb-6">
        This analysis shows the potential return on investment from outsourcing to a managed payroll 
        service where an external provider handles your payroll operations.
      </p>

      {/* Top metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ResultHighlight
          title="5-Year ROI"
          value={formatPercentage(results.fiveYearROI)}
          description="Return on investment over 5 years"
          variant="success"
        />
        <ResultHighlight
          title="Annual Net Benefit"
          value={formatCurrency(results.netAnnualBenefit, 0, 0)}
          description="Savings minus ongoing costs"
          variant="primary"
        />
        <ResultHighlight
          title="Payback Period"
          value={formatMonths(results.paybackPeriodMonths)}
          description="Time to recover investment"
          variant="info"
        />
      </div>

      {/* ROI Breakdown */}
      <ResultsSection title="ROI Analysis">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="p-4">
            <h4 className="font-medium text-slate-800 mb-4">Benefits Breakdown</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={benefitsBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => (percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : '')}
                  >
                    {benefitsBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [
                      formatCurrency(Number(value), 0, 0),
                      "Value"
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-medium text-slate-800 mb-4">ROI Over Time</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={roiOverTimeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${Number(value).toFixed(1)}%`, "ROI"]}
                  />
                  <Bar dataKey="roi" fill="#6366f1" name="Return on Investment" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </ResultsSection>

      {/* Costs and Benefits Table */}
      <ResultsSection title="Costs and Benefits">
        <Card className="p-4 mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">One-Off Implementation Cost</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(results.initialInvestment, 0, 0)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">Annual Service Costs</td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right">{formatCurrency(results.annualCosts, 0, 0)}</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="px-4 py-3 text-sm text-purple-900 font-medium">Staff Savings</td>
                  <td className="px-4 py-3 text-sm text-purple-900 text-right">{formatCurrency(results.staffSavings, 0, 0)}</td>
                </tr>
                <tr className="bg-pink-50">
                  <td className="px-4 py-3 text-sm text-pink-900 font-medium">Software Savings</td>
                  <td className="px-4 py-3 text-sm text-pink-900 text-right">{formatCurrency(results.softwareSavings, 0, 0)}</td>
                </tr>
                <tr className="bg-teal-50">
                  <td className="px-4 py-3 text-sm text-teal-900 font-medium">Infrastructure Savings</td>
                  <td className="px-4 py-3 text-sm text-teal-900 text-right">{formatCurrency(results.infrastructureSavings, 0, 0)}</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="px-4 py-3 text-sm text-amber-900 font-medium">Training & Other Savings</td>
                  <td className="px-4 py-3 text-sm text-amber-900 text-right">{formatCurrency(results.trainingAndOtherSavings, 0, 0)}</td>
                </tr>
                <tr className="bg-rose-50">
                  <td className="px-4 py-3 text-sm text-rose-900 font-medium">Error Reduction Savings</td>
                  <td className="px-4 py-3 text-sm text-rose-900 text-right">{formatCurrency(results.errorReductionSavings, 0, 0)}</td>
                </tr>
                <tr className="bg-violet-50">
                  <td className="px-4 py-3 text-sm text-violet-900 font-medium">Compliance Savings</td>
                  <td className="px-4 py-3 text-sm text-violet-900 text-right">{formatCurrency(results.complianceSavings, 0, 0)}</td>
                </tr>
                <tr className="bg-cyan-50">
                  <td className="px-4 py-3 text-sm text-cyan-900 font-medium">Paper Savings</td>
                  <td className="px-4 py-3 text-sm text-cyan-900 text-right">{formatCurrency(results.paperSavings, 0, 0)}</td>
                </tr>
                <tr className="bg-blue-100">
                  <td className="px-4 py-3 text-sm text-blue-900 font-medium">Total Annual Benefits</td>
                  <td className="px-4 py-3 text-sm text-blue-900 font-medium text-right">{formatCurrency(results.totalAnnualBenefits, 0, 0)}</td>
                </tr>
                <tr className="bg-emerald-100">
                  <td className="px-4 py-3 text-sm font-bold text-emerald-900">Net Annual Benefit</td>
                  <td className="px-4 py-3 text-sm font-bold text-emerald-900 text-right">{formatCurrency(results.netAnnualBenefit, 0, 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h4 className="font-medium text-slate-800 mb-4">Cost Per Payslip Comparison</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={costComparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `£${value.toFixed(2)}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`£${Number(value).toFixed(2)}`, "Cost per payslip"]}
                  />
                  <Bar dataKey="costPerPayslip" fill="#8b5cf6" name="Cost per payslip" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-sm text-slate-600 text-center">
              {formatPercentage((1 - (results.costPerPayslip / currentCostPerPayslip)) * 100)} reduction in cost per payslip
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-medium text-slate-800 mb-4">Key Metrics</h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-slate-600">Per-Employee Annual Savings:</span>
                <span className="font-semibold">{formatCurrency(results.savingsPerEmployee, 0, 0)}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-600">First Year ROI:</span>
                <span className="font-semibold">{formatPercentage(results.firstYearROI)}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-600">3-Year ROI:</span>
                <span className="font-semibold">{formatPercentage(results.threeYearROI)}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-600">5-Year ROI:</span>
                <span className="font-semibold">{formatPercentage(results.fiveYearROI)}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-600">Payback Period:</span>
                <span className="font-semibold">{formatMonths(results.paybackPeriodMonths)}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-600">5-Year Total Cost of Ownership:</span>
                <span className="font-semibold">{formatCurrency(results.totalCostOfOwnership5Year, 0, 0)}</span>
              </li>
            </ul>
          </Card>
        </div>
      </ResultsSection>
    </div>
  );
};

export default ManagedPayrollResults;