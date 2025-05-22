import React from 'react';
import EmployerNIResults from './components/EmployerNIResults';
import { MultiBenefitConfig } from '../../calculation-engine/types';
import { formatCurrency, formatPercentage } from '../../utils/formatting';

interface EmployerNIResultType {
  annualSavings: number;
  savingsPerEmployee: number;
  originalNI: number;
  reducedNI: number;
  benefitBreakdown?: Record<string, {
    niSavings: number;
    additionalSavings: number;
    totalSavings: number;
    participationRate?: number;
    contributionValue?: number;
  }>;
  benefitConfig?: MultiBenefitConfig;
}

interface ResultsDisplayProps {
  showResults: boolean;
  calculationResult: EmployerNIResultType | null;
  employeeCount: string;
  averageSalary: string;
  taxYear: string;
  showScenarioResults: boolean;
  scenarioResult: EmployerNIResultType | null;
  onGenerateReport: () => void;
  resultsRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Component to display calculation results using core components (Tailwind version)
 */
const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  showResults,
  calculationResult,
  employeeCount,
  averageSalary,
  taxYear,
  showScenarioResults,
  scenarioResult,
  onGenerateReport,
  resultsRef,
}) => {
  if (!showResults && !showScenarioResults) {
    return null;
  }

  return (
    <div id="results-container" ref={resultsRef}>
      {/* Main Results */}      {showResults && calculationResult && !showScenarioResults && (        <div className="mb-0">
          <EmployerNIResults
            result={calculationResult}
            formValues={{
              employeeCount: Number(employeeCount),
              averageSalary: Number(averageSalary),
              taxYear: taxYear,
              includeMultiBenefits: true
            }}
            formattedResults={{
              annualSavings: formatCurrency(calculationResult.annualSavings),
              savingsPerEmployee: formatCurrency(calculationResult.savingsPerEmployee),
              originalNI: formatCurrency(calculationResult.originalNI),
              reducedNI: formatCurrency(calculationResult.reducedNI),
              niReduction: formatPercentage(
                calculationResult.originalNI > 0 
                  ? ((calculationResult.originalNI - calculationResult.reducedNI) / calculationResult.originalNI) * 100 
                  : 0
              )
            }}
            benefitConfig={calculationResult?.benefitConfig as MultiBenefitConfig || {} as MultiBenefitConfig}
            onReset={() => {}}
          />
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              onClick={onGenerateReport}
            >
              {/* PDF icon placeholder (replace with project icon if available) */}
              <span className="inline-block w-4 h-4 bg-slate-300 rounded-sm" aria-hidden="true" />
              Generate Report
            </button>
          </div>
        </div>
      )}
      {/* What-If Scenario Results */}      {showScenarioResults && scenarioResult && calculationResult && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Original Configuration Results</h2>
          <div className="mb-6">
            <EmployerNIResults
              result={calculationResult}
              formValues={{
                employeeCount: Number(employeeCount),
                averageSalary: Number(averageSalary),
                taxYear,
                includeMultiBenefits: true
              }}
              formattedResults={{
                annualSavings: formatCurrency(calculationResult.annualSavings),
                savingsPerEmployee: formatCurrency(calculationResult.savingsPerEmployee),
                originalNI: formatCurrency(calculationResult.originalNI),
                reducedNI: formatCurrency(calculationResult.reducedNI),
                niReduction: formatPercentage(
                  calculationResult.originalNI > 0 
                    ? ((calculationResult.originalNI - calculationResult.reducedNI) / calculationResult.originalNI) * 100 
                    : 0
                )
              }}
              benefitConfig={calculationResult?.benefitConfig as MultiBenefitConfig || {} as MultiBenefitConfig}
              onReset={() => {}}
            />
          </div>
          <h2 className="text-lg font-semibold mb-2">What-If Scenario Results</h2>
          <div className="mb-4">
            <EmployerNIResults
              result={scenarioResult}
              formValues={{
                employeeCount: Number(employeeCount),
                averageSalary: Number(averageSalary),
                taxYear: taxYear,
                includeMultiBenefits: true
              }}
              formattedResults={{
                annualSavings: formatCurrency(scenarioResult.annualSavings),
                savingsPerEmployee: formatCurrency(scenarioResult.savingsPerEmployee),
                originalNI: formatCurrency(scenarioResult.originalNI),
                reducedNI: formatCurrency(scenarioResult.reducedNI),
                niReduction: formatPercentage(
                  scenarioResult.originalNI > 0 
                    ? ((scenarioResult.originalNI - scenarioResult.reducedNI) / scenarioResult.originalNI) * 100 
                    : 0
                )
              }}              benefitConfig={scenarioResult?.benefitConfig as MultiBenefitConfig || {} as MultiBenefitConfig}
              onReset={() => {}}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              onClick={onGenerateReport}
            >
              {/* PDF icon placeholder (replace with project icon if available) */}
              <span className="inline-block w-4 h-4 bg-slate-300 rounded-sm" aria-hidden="true" />
              Generate Comparison Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
