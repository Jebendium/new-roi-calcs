import React from 'react';
import { EmployerNIResult } from '../../core/types';

interface EmployerNIChartsProps {
  result: EmployerNIResult;
  formattedResults: any;
}

/**
 * EmployerNICharts - Chart visualization component for Employer NI results
 * 
 * This component renders various charts to visualize the calculation results.
 */
const EmployerNICharts: React.FC<EmployerNIChartsProps> = ({
  result,
  formattedResults
}) => {
  // Placeholder for chart rendering
  // In a real implementation, this would use a chart library like Chart.js or Recharts
  
  // Prepare data for NI savings pie chart
  const niComparisonData = [
    { 
      name: 'NI Savings', 
      value: result.annualSavings,
      color: '#10B981' // green
    },
    { 
      name: 'Reduced NI', 
      value: result.reducedNI,
      color: '#3B82F6' // blue
    }
  ];
  
  // Prepare data for benefit breakdown if available
  const benefitBreakdownData = result.benefitBreakdown ? 
    Object.entries(result.benefitBreakdown).map(([benefit, data]) => ({
      name: benefit,
      value: data.niSavings,
      color: getBenefitColor(benefit)
    })) : [];
  
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NI Comparison Chart - Placeholder */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="text-lg font-medium text-slate-800 mb-3">NI Contribution Comparison</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-slate-500">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="mt-2">Chart Visualization</p>
              <p className="text-sm">Original NI: {formattedResults.originalNI}</p>
              <p className="text-sm">Reduced NI: {formattedResults.reducedNI}</p>
              <p className="text-sm">Savings: {formattedResults.annualSavings}</p>
            </div>
          </div>
        </div>
        
        {/* Benefit Breakdown Chart - Placeholder */}
        {result.benefitBreakdown && Object.keys(result.benefitBreakdown).length > 0 && (
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h3 className="text-lg font-medium text-slate-800 mb-3">Benefit Breakdown</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <p className="mt-2">Benefit Breakdown</p>
                {Object.entries(result.benefitBreakdown).map(([benefit, data], index) => (
                  <p key={index} className="text-sm">{formatBenefitName(benefit)}: {formatCurrency(data.niSavings)}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions for the chart component
function formatBenefitName(benefitType: string): string {
  return benefitType.replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', { 
    style: 'currency', 
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

function getBenefitColor(benefit: string): string {
  const colorMap: Record<string, string> = {
    PENSION: '#3B82F6', // blue
    CYCLE_TO_WORK: '#10B981', // green
    EV_CAR_SCHEME: '#6366F1', // indigo
    CHILDCARE_VOUCHERS: '#EC4899', // pink
    HOLIDAY_TRADING: '#F59E0B', // amber
  };
  
  return colorMap[benefit] || '#9CA3AF'; // gray default
}

export default EmployerNICharts;