import React from 'react';
import EmployerNIResults from './EmployerNIResults';
import { CalculationResult } from '../../lib/calculationFunctions';

interface ResultsDisplayProps {
  showResults: boolean;
  calculationResult: CalculationResult | null;
  employeeCount: string;
  averageSalary: string;
  taxYear: string;
  showScenarioResults: boolean;
  scenarioResult: CalculationResult | null;
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
      {/* Main Results */}
      {showResults && calculationResult && !showScenarioResults && (
        <div className="mb-0">
          <EmployerNIResults
            result={calculationResult}
            employeeCount={Number(employeeCount)}
            averageSalary={Number(averageSalary)}
            taxYear={taxYear}
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
      {/* What-If Scenario Results */}
      {showScenarioResults && scenarioResult && calculationResult && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Original Configuration Results</h2>
          <div className="mb-6">
            <EmployerNIResults
              result={calculationResult}
              employeeCount={Number(employeeCount)}
              averageSalary={Number(averageSalary)}
              taxYear={taxYear}
            />
          </div>
          <h2 className="text-lg font-semibold mb-2">What-If Scenario Results</h2>
          <div className="mb-4">
            <EmployerNIResults
              result={scenarioResult}
              employeeCount={Number(employeeCount)}
              averageSalary={Number(averageSalary)}
              taxYear={taxYear}
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
