'use client';

import React from 'react';
import { Card, InfoBox, InfoTooltip, FormField, ResultHighlight } from '../../../components/ui';
import NumberInput from '../../../calculators/shared/components/NumberInput';
import PercentageInput from '../../../calculators/shared/components/PercentageInput';
import CurrencyInput from '../../../calculators/shared/components/CurrencyInput';
import { formatCurrency } from '../../../utils/formatting';

interface ErrorReductionTabProps {
  errorReduction: {
    payrollErrorRate: number;
    errorCorrectionTime: number;
    complianceRiskCost: number;
    dataAccuracyImprovement: number;
    payrollAccuracyImprovement: number;
    complianceRiskReduction: number;
    [key: string]: number;
  };
  setErrorReduction: React.Dispatch<React.SetStateAction<any>>;
  onCalculate: (e?: React.FormEvent) => void;
  onNextTab: () => void;
}

const ErrorReductionTab: React.FC<ErrorReductionTabProps> = ({
  errorReduction,
  setErrorReduction,
  onCalculate,
  onNextTab
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNextTab();
  };

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setErrorReduction({ ...errorReduction, [field]: numValue });
    }
  };

  // Calculate payroll error costs
  const calculatePayrollErrorCosts = (employeeCount = 100) => {
    // Assuming 24 payroll runs per year (bi-monthly)
    const totalPayrollItems = employeeCount * 24;
    const errorCount = totalPayrollItems * (errorReduction.payrollErrorRate / 100);
    
    // Cost to fix each error (time * hourly rate)
    // Using a default hourly rate of £25 if not available
    const hourlyRate = 25;
    const errorCost = errorReduction.errorCorrectionTime * hourlyRate;
    
    const totalErrorCost = errorCount * errorCost;
    const potentialSavings = totalErrorCost * (errorReduction.payrollAccuracyImprovement / 100);
    
    return {
      errorCount,
      totalErrorCost,
      potentialSavings
    };
  };

  // Calculate compliance risk savings
  const calculateComplianceSavings = () => {
    return errorReduction.complianceRiskCost * (errorReduction.complianceRiskReduction / 100);
  };

  // Calculate data quality improvements
  const calculateDataQualitySavings = (employeeCount = 100) => {
    // Estimate £50 per employee as baseline value of accurate data
    const baselineValue = employeeCount * 50;
    return baselineValue * (errorReduction.dataAccuracyImprovement / 100);
  };

  const payrollErrorStats = calculatePayrollErrorCosts();
  const complianceSavings = calculateComplianceSavings();
  const dataQualitySavings = calculateDataQualitySavings();
  const totalSavings = payrollErrorStats.potentialSavings + complianceSavings + dataQualitySavings;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Error Reduction & Data Accuracy</h2>
        <p className="text-slate-600 mb-6">
          HRIS systems can significantly reduce errors and improve data quality. Estimate your current error rates and potential improvements.
        </p>
      </div>

      <InfoBox title="CIPD/CIPP Research Highlights" className="mb-6">
        <ul className="list-disc pl-5 space-y-1">
          <li>Manual HR processes typically have a 1-3% error rate</li>
          <li>Each payroll error costs £50-100 to fix when factoring in admin time</li>
          <li>Compliance issues can cost up to 30% more when using paper-based systems</li>
          <li>Automated systems typically reduce data entry errors by 40-70%</li>
        </ul>
      </InfoBox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-5">
          <h3 className="font-medium text-slate-800 mb-4">Payroll Error Reduction</h3>
          
          <FormField
            label="Current Payroll Error Rate (%)"
            htmlFor="payroll-error-rate"
            tooltip="Percentage of payroll entries with errors requiring correction"
            tooltipIcon={<InfoTooltip content="Percentage of payroll entries with errors requiring correction" />}
          >
            <PercentageInput
              id="payroll-error-rate"
              value={errorReduction.payrollErrorRate.toString()}
              onChange={(val) => handleChange('payrollErrorRate', val)}
              min={0}
              max={100}
              required
            />
          </FormField>
          
          <FormField
            label="Time to Correct Each Error (hours)"
            htmlFor="error-correction-time"
            tooltip="Average time spent correcting each payroll error"
            tooltipIcon={<InfoTooltip content="Average time spent correcting each payroll error" />}
          >
            <NumberInput
              id="error-correction-time"
              value={errorReduction.errorCorrectionTime.toString()}
              onChange={(val) => handleChange('errorCorrectionTime', val)}
              min={0}
              step={0.5}
              required
            />
          </FormField>
          
          <FormField
            label="Expected Payroll Accuracy Improvement (%)"
            htmlFor="payroll-accuracy-improvement"
            tooltip="Percentage improvement in payroll accuracy with HRIS"
            tooltipIcon={<InfoTooltip content="Percentage improvement in payroll accuracy with HRIS" />}
          >
            <PercentageInput
              id="payroll-accuracy-improvement"
              value={errorReduction.payrollAccuracyImprovement.toString()}
              onChange={(val) => handleChange('payrollAccuracyImprovement', val)}
              min={0}
              max={100}
              required
            />
          </FormField>
          
          <div className="mt-6">
            <ResultHighlight
              title="Potential Annual Savings"
              value={formatCurrency(payrollErrorStats.potentialSavings)}
              variant="success"
            />
          </div>
        </Card>
        
        <Card className="p-5">
          <h3 className="font-medium text-slate-800 mb-4">Compliance & Data Quality</h3>
          
          <FormField
            label="Annual Compliance Risk Cost (£)"
            htmlFor="compliance-risk-cost"
            tooltip="Estimated annual cost of HR compliance issues and risks"
            tooltipIcon={<InfoTooltip content="Estimated annual cost of HR compliance issues and risks" />}
          >
            <CurrencyInput
              id="compliance-risk-cost"
              value={errorReduction.complianceRiskCost.toString()}
              onChange={(val) => handleChange('complianceRiskCost', val)}
              min={0}
              required
            />
          </FormField>
          
          <FormField
            label="Expected Compliance Risk Reduction (%)"
            htmlFor="compliance-risk-reduction"
            tooltip="Percentage reduction in compliance risks with HRIS"
            tooltipIcon={<InfoTooltip content="Percentage reduction in compliance risks with HRIS" />}
          >
            <PercentageInput
              id="compliance-risk-reduction"
              value={errorReduction.complianceRiskReduction.toString()}
              onChange={(val) => handleChange('complianceRiskReduction', val)}
              min={0}
              max={100}
              required
            />
          </FormField>
          
          <FormField
            label="Expected Data Accuracy Improvement (%)"
            htmlFor="data-accuracy-improvement"
            tooltip="Percentage improvement in overall HR data accuracy"
            tooltipIcon={<InfoTooltip content="Percentage improvement in overall HR data accuracy" />}
          >
            <PercentageInput
              id="data-accuracy-improvement"
              value={errorReduction.dataAccuracyImprovement.toString()}
              onChange={(val) => handleChange('dataAccuracyImprovement', val)}
              min={0}
              max={100}
              required
            />
          </FormField>
          
          <div className="mt-6">
            <ResultHighlight
              title="Potential Annual Savings"
              value={formatCurrency(complianceSavings + dataQualitySavings)}
              variant="success"
            />
          </div>
        </Card>
      </div>
      
      <Card className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-medium text-slate-800 mb-1">Total Error & Compliance Savings</h3>
            <p className="text-sm text-slate-600">Combined annual savings from improved accuracy</p>
          </div>
          <div className="mt-4 md:mt-0">
            <ResultHighlight
              title="Annual Total"
              value={formatCurrency(totalSavings)}
              variant="primary"
            />
          </div>
        </div>
      </Card>

      <InfoBox title="What This Means" variant="info" className="mb-6">
        <p>
          By implementing an HRIS system, your organization can significantly reduce errors and improve compliance, leading to direct financial benefits. The potential annual savings of {formatCurrency(totalSavings)} represents avoided costs from error correction, reduced compliance risks, and improved data quality.
        </p>
      </InfoBox>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          className="px-6 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <div className="space-x-3">
          <button
            type="button"
            onClick={onCalculate}
            className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Calculate ROI
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default ErrorReductionTab;