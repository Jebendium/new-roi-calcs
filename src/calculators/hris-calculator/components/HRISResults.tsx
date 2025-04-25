'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, InfoBox, ResultHighlight, ResultsSection } from '../../../components/ui';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, LineChart, Line
} from 'recharts';

interface HRISResultsProps {
  result: any;
  formValues: any;
  formattedResults: {
    firstYearValue: string;
    firstYearROI: string;
    ongoingROI: string;
    paybackPeriod: string;
    threeYearValue: string;
    threeYearROI: string;
    firstYearCost: string;
    ongoingAnnualCost: string;
  };
  onReset: () => void;
  onSaveScenario?: (name: string) => void;
  showMethodologyLink?: boolean;
}

const HRISResults: React.FC<HRISResultsProps> = ({
  result,
  formValues,
  formattedResults,
  onReset,
  onSaveScenario,
  showMethodologyLink = true
}) => {
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  // Prepare data for charts
  const prepareValueBreakdownData = () => {
    return [
      { name: 'Time Savings', value: result.timeSavings.totalTimeSavingsValue },
      { name: 'Error Reduction', value: result.errorReduction.totalErrorReductionValue },
      { name: 'Strategic Value', value: result.strategicValue.totalStrategicValue }
    ];
  };

  const prepareCostBenefitData = () => {
    return [
      { 
        name: 'Year 1',
        costs: result.costs.firstYearCost,
        benefits: result.overall.firstYearValue,
        netValue: result.overall.firstYearValue - result.costs.firstYearCost
      },
      { 
        name: 'Year 2',
        costs: result.costs.ongoingAnnualCost,
        benefits: result.overall.firstYearValue,
        netValue: (result.overall.firstYearValue - result.costs.firstYearCost) + 
                (result.overall.firstYearValue - result.costs.ongoingAnnualCost)
      },
      { 
        name: 'Year 3',
        costs: result.costs.ongoingAnnualCost,
        benefits: result.overall.firstYearValue,
        netValue: (result.overall.firstYearValue - result.costs.firstYearCost) + 
                (result.overall.firstYearValue - result.costs.ongoingAnnualCost) * 2
      }
    ];
  };

  const handleSaveScenario = (e: React.FormEvent) => {
    e.preventDefault();
    if (scenarioName.trim() && onSaveScenario) {
      onSaveScenario(scenarioName);
      setScenarioName('');
      setShowSaveForm(false);
    }
  };

  // Chart colors
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">ROI Analysis Results</h2>
        <p className="text-slate-600">
          Based on your inputs, here's the projected return on investment for your HRIS implementation.
        </p>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ResultHighlight
          title="3-Year ROI"
          value={formattedResults.threeYearROI}
          description="Net return on investment over 3 years"
          variant="success"
        />
        <ResultHighlight
          title="3-Year Value"
          value={formattedResults.threeYearValue}
          description="Total value generated over 3 years"
          variant="primary"
        />
        <ResultHighlight
          title="Payback Period"
          value={formattedResults.paybackPeriod}
          description="Time to recover your investment"
          variant="info"
        />
      </div>

      {/* Detailed metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-5">
          <h3 className="font-medium text-slate-800 mb-4">Annual Value Breakdown</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={prepareValueBreakdownData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={40}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {prepareValueBreakdownData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [
                    `£${Number(value).toLocaleString()}`,
                    "Value"
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.timeSavings.totalTimeSavingsValue)}
              </div>
              <div className="text-xs text-slate-600">Time Savings</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-emerald-600">
                {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.errorReduction.totalErrorReductionValue)}
              </div>
              <div className="text-xs text-slate-600">Error Reduction</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-amber-600">
                {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.strategicValue.totalStrategicValue)}
              </div>
              <div className="text-xs text-slate-600">Strategic Value</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <h3 className="font-medium text-slate-800 mb-4">3-Year Cost/Benefit Analysis</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={prepareCostBenefitData()}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `£${value/1000}k`}
                />
                <Tooltip 
                  formatter={(value) => [`£${Number(value).toLocaleString()}`, ""]}
                />
                <Legend />
                <Bar dataKey="costs" stackId="a" fill="#ef4444" name="Costs" />
                <Bar dataKey="benefits" stackId="a" fill="#10b981" name="Benefits" />
                <Line type="monotone" dataKey="netValue" stroke="#3b82f6" name="Cumulative Net Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <div className="text-lg font-semibold text-slate-800">
                {formattedResults.firstYearCost}
              </div>
              <div className="text-xs text-slate-600">First Year Cost</div>
            </div>
            
            <div>
              <div className="text-lg font-semibold text-slate-800">
                {formattedResults.ongoingAnnualCost}
              </div>
              <div className="text-xs text-slate-600">Ongoing Annual Cost</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Year by year breakdown */}
      <Card className="p-5 mb-8">
        <h3 className="font-medium text-slate-800 mb-4">Year-by-Year Analysis</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Metric</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Year 1</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Year 2</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Year 3</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">3-Year Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 font-medium">Total Costs</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.costs.firstYearCost)}</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.costs.ongoingAnnualCost)}</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.costs.ongoingAnnualCost)}</td>
                <td className="px-4 py-3 text-sm text-slate-700 font-medium text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.costs.threeYearCost)}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 font-medium">Total Benefits</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.overall.firstYearValue)}</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.overall.firstYearValue)}</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.overall.firstYearValue)}</td>
                <td className="px-4 py-3 text-sm text-slate-700 font-medium text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.overall.threeYearValue)}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 font-medium">Net Value</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.overall.firstYearValue - result.costs.firstYearCost)}</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.overall.firstYearValue - result.costs.ongoingAnnualCost)}</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.overall.firstYearValue - result.costs.ongoingAnnualCost)}</td>
                <td className="px-4 py-3 text-sm text-slate-700 font-medium text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.overall.threeYearValue - result.costs.threeYearCost)}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 font-medium">ROI</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{result.overall.firstYearROI.toFixed(1)}%</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{result.overall.ongoingROI.toFixed(1)}%</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{result.overall.ongoingROI.toFixed(1)}%</td>
                <td className="px-4 py-3 text-sm text-slate-700 font-medium text-right">{result.overall.threeYearROI.toFixed(1)}%</td>
              </tr>
              <tr className="bg-emerald-50">
                <td className="px-4 py-3 text-sm text-emerald-800 font-medium">Cumulative Value</td>
                <td className="px-4 py-3 text-sm text-emerald-800 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.overall.firstYearValue - result.costs.firstYearCost)}</td>
                <td className="px-4 py-3 text-sm text-emerald-800 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format((result.overall.firstYearValue - result.costs.firstYearCost) + (result.overall.firstYearValue - result.costs.ongoingAnnualCost))}</td>
                <td className="px-4 py-3 text-sm text-emerald-800 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format((result.overall.firstYearValue - result.costs.firstYearCost) + (result.overall.firstYearValue - result.costs.ongoingAnnualCost) * 2)}</td>
                <td className="px-4 py-3 text-sm font-medium text-emerald-800 text-right">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(result.overall.threeYearValue - result.costs.threeYearCost)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Key insights */}
      <InfoBox title="Key Insights" variant="info" className="mb-8">
        <ul className="space-y-2">
          <li>Your HRIS system is estimated to deliver <span className="font-semibold">{formattedResults.threeYearROI}</span> ROI over 3 years</li>
          <li>Investment payback occurs in <span className="font-semibold">{formattedResults.paybackPeriod}</span>, with ongoing annual ROI of <span className="font-semibold">{formattedResults.ongoingROI}</span></li>
          <li>The biggest value drivers are {
            [
              { name: 'time savings', value: result.timeSavings.totalTimeSavingsValue },
              { name: 'error reduction', value: result.errorReduction.totalErrorReductionValue },
              { name: 'strategic value', value: result.strategicValue.totalStrategicValue }
            ].sort((a, b) => b.value - a.value).slice(0, 2).map(item => item.name).join(' and ')
          }</li>
          <li>Annual benefits outweigh ongoing costs by <span className="font-semibold">{
            new Intl.NumberFormat('en-GB', { 
              style: 'currency', 
              currency: 'GBP',
              maximumFractionDigits: 0 
            }).format(result.overall.firstYearValue - result.costs.ongoingAnnualCost)
          }</span> per year after the first year</li>
        </ul>
      </InfoBox>

      {/* Save scenario section */}
      {onSaveScenario && (
        <Card className="p-5 mb-8">
          <h3 className="font-medium text-slate-800 mb-4">Save This Scenario</h3>
          
          {!showSaveForm ? (
            <button
              type="button"
              onClick={() => setShowSaveForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save for Comparison
            </button>
          ) : (
            <form onSubmit={handleSaveScenario} className="flex items-end gap-3">
              <div className="flex-grow">
                <label htmlFor="scenario-name" className="block text-sm font-medium text-slate-700 mb-2">
                  Scenario Name
                </label>
                <input
                  type="text"
                  id="scenario-name"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Basic HRIS Implementation"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowSaveForm(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </form>
          )}
        </Card>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap justify-between gap-4 mt-8">
        <button
          type="button"
          onClick={onReset}
          className="px-6 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
        >
          Reset Calculator
        </button>

        <div className="space-x-3">
          {showMethodologyLink && (
            <Link
              href="/calculators/hris/methodology"
              className="px-6 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors"
            >
              View Methodology
            </Link>
          )}
          
          <button
            type="button"
            onClick={() => window.print()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Print Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default HRISResults;