import React, { useState } from 'react';
import { FormValues } from '../../core/types';
import { MultiBenefitConfig } from '../../../calculation-engine/types';
import { ExportButton } from '../../shared/components';
import {
  InfoBox,
  ResultHighlight,
  ResultsSection,
  Card,
  TabNavigation
} from '../../../components/ui';
import { 
  NISavingsComparisonChart, 
  BenefitBreakdownChart, 
  NISavingsDistributionChart
} from '../../../components/charts/EmployerNICharts';
import { formatCurrency } from '../../../utils/formatting';

interface BenefitBreakdownItem {
  niSavings: number;
  additionalSavings: number;
  totalSavings: number;
  participationRate?: number;
  contributionValue?: number;
}

interface EmployerNIResultsProps {
  result: {
    annualSavings: number;
    savingsPerEmployee: number;
    originalNI: number;
    reducedNI: number;
    benefitBreakdown?: Record<string, BenefitBreakdownItem>;
  };
  formValues: FormValues;
  formattedResults: {
    annualSavings: string;
    savingsPerEmployee: string;
    originalNI: string;
    reducedNI: string;
    niReduction: string;
  };
  benefitConfig: MultiBenefitConfig;
  onReset: () => void;
  onSaveScenario?: (name: string) => void;
  showMethodologyLink?: boolean;
}

/**
 * EmployerNIResults - Results display component for the Employer NI calculator
 * 
 * This component displays the calculation results and provides tabs for additional
 * analysis and configuration options.
 */
const EmployerNIResults: React.FC<EmployerNIResultsProps> = ({
  result,
  formValues,
  formattedResults,
  benefitConfig,
  onReset,
  onSaveScenario,
  showMethodologyLink = true
}) => {
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState(0);
  
  // Handle saving a scenario
  const handleSave = () => {
    if (onSaveScenario && scenarioName.trim()) {
      onSaveScenario(scenarioName.trim());
      setShowSaveModal(false);
      setScenarioName('');
    }
  };  // Get pension contribution rate safely from either benefitConfig or result
  const getPensionContributionRate = () => {
    // First try to get from benefitConfig prop if available
    if (benefitConfig?.pension?.contributionValue !== undefined) {
      return `${benefitConfig.pension.contributionValue}%`;
    }
    
    // Fallback to result.benefitBreakdown if benefitConfig is not available
    if (!result.benefitBreakdown?.pension) return '0%';
    
    const pensionConfig = result.benefitBreakdown.pension;
    if (typeof pensionConfig.contributionValue !== 'number') {
      return '0%';
    }
    
    return `${pensionConfig.contributionValue}%`;
  };

  // Define result tabs
  const resultTabs = [
    'Overview',
    ...(result.benefitBreakdown && Object.keys(result.benefitBreakdown).length > 0 ? ['Multi-Benefit Analysis'] : [])
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <div className="mb-6">
        <InfoBox title="Calculation Summary" className="mb-4">
          Based on {formValues.employeeCount} employees with an average salary of £{Number(formValues.averageSalary).toLocaleString()} 
          and a pension contribution of {getPensionContributionRate()} for the {formValues.taxYear} tax year.
        </InfoBox>
        
        {showMethodologyLink && (
          <p className="mt-2 text-sm">
            <a 
              href="/calculator/employer-ni/methodology" 
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View calculation methodology
            </a>
          </p>
        )}
      </div>

      {/* Main Charts - always visible */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <NISavingsComparisonChart 
            originalNI={result.originalNI}
            reducedNI={result.reducedNI}
            niSavings={result.annualSavings}
          />
        </div>
        
        {result.benefitBreakdown && Object.keys(result.benefitBreakdown).length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <NISavingsDistributionChart 
              benefitBreakdown={result.benefitBreakdown}
            />
          </div>
        )}
      </div>
      
      <ResultsSection title="Annual Savings Summary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultHighlight
            title="Total Annual NI Savings"
            value={formattedResults.annualSavings}
            description="Total employer NI contributions saved annually"
            variant="success"
          />
          
          <ResultHighlight
            title="Savings Per Employee"
            value={formattedResults.savingsPerEmployee}
            description="Average annual savings per employee"
            variant="primary"
          />
          
          <ResultHighlight
            title="Reduction in NI Liability"
            value={formattedResults.niReduction}
            description="Percentage reduction in employer NI contributions"
            variant="info"
          />
        </div>
      </ResultsSection>
      
      <ResultsSection title="National Insurance Breakdown">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResultHighlight
            title="Original NI Liability"
            value={formattedResults.originalNI}
            description="Annual employer NI liability without salary sacrifice"
            variant="secondary"
          />
          
          <ResultHighlight
            title="Reduced NI Liability"
            value={formattedResults.reducedNI}
            description="Annual employer NI liability with salary sacrifice"
            variant="success"
          />
        </div>
      </ResultsSection>
      
      {/* Tabs navigation */}
      <TabNavigation 
        tabs={resultTabs}
        activeTabIndex={activeResultTab}
        onTabChange={setActiveResultTab}
        className="mt-8"
      />
      
      {/* Tab content */}
      <div className="mt-6">
        {/* Overview Tab */}
        {activeResultTab === 0 && (
          <div>
            <InfoBox title="What This Means" variant="success" className="mb-6">
              <p>
                Your organisation can save <span className="font-semibold text-green-600">{formattedResults.annualSavings}</span> annually 
                in employer National Insurance contributions through salary sacrifice arrangements. This represents a 
                <span className="font-semibold"> {formattedResults.niReduction}</span> reduction in your NI liability.
              </p>
              <p className="mt-2">
                These savings are calculated based on the employer NI rate of 15% on earnings above the Secondary Threshold (£5,000 per annum).
                Implementing these benefits can provide significant cost savings while also enhancing your employee benefits package.
              </p>
            </InfoBox>
          </div>
        )}
        
        {/* Multi-Benefit Analysis Tab */}
        {activeResultTab === 1 && result.benefitBreakdown && Object.keys(result.benefitBreakdown).length > 0 && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Benefit Breakdown Analysis</h3>
              <Card>
                <BenefitBreakdownChart benefitBreakdown={result.benefitBreakdown} />
              </Card>
            </div>
            
            <Card className="mb-6">
              <h4 className="font-semibold mb-2">Benefit Contributions</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Benefit Type</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Participation</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">NI Savings</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Additional Savings</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Total Savings</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {Object.entries(result.benefitBreakdown).map(([key, value]) => {
                      const benefitLabels: Record<string, string> = {
                        'pension': 'Pension',
                        'cycle': 'Cycle to Work',
                        'car': 'EV Car Scheme',
                        'childcare': 'Childcare Vouchers',
                        'holiday': 'Holiday Trading'
                      };
                      
                      return (
                        <tr key={key}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-900">{benefitLabels[key as keyof typeof benefitLabels] || key}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-900 text-right">{value.participationRate || 0}%</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-900 text-right">
                            {formatCurrency(value.niSavings || 0)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-900 text-right">
                            {formatCurrency(value.additionalSavings || 0)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-green-600 text-right">
                            {formatCurrency(value.totalSavings || 0)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Recalculate
        </button>
        
        <div className="flex space-x-4">
          {onSaveScenario && (
            <button
              type="button"
              onClick={() => setShowSaveModal(true)}
              className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Scenario
            </button>
          )}
          
          <ExportButton 
            onClick={() => console.log('Export results')} 
            label="Export Results" 
          />
        </div>
      </div>
      
      {/* Save Scenario Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-slate-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-slate-900">
                      Save Scenario
                    </h3>
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Scenario name"
                        value={scenarioName}
                        onChange={(e) => setScenarioName(e.target.value)}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!scenarioName.trim()}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-blue-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowSaveModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerNIResults;