'use client';

import React from 'react';
import { CalculatorType } from '../types/calculator';
import { formatCurrency } from '../utils/calculator';
import { 
  EmployerNIResult, 
  EmployeeSavingsResult, 
  P11dEvCarResult, 
  ChildcareVouchersResult, 
  HolidayTradingResult, 
  BusinessRoiResult 
} from '../types/calculator';

interface ResultHighlightProps {
  calculatorType: CalculatorType;
  result: any;
}

const ResultHighlight: React.FC<ResultHighlightProps> = ({ calculatorType, result }) => {
  if (!result) return null;

  // Get highlight content based on calculator type
  const getHighlightContent = () => {
    switch (calculatorType) {
      case 'employer-ni': {
        const typedResult = result as EmployerNIResult;
        return {
          mainFigure: formatCurrency(typedResult.niSavings),
          label: 'Annual Employer NI Savings',
          description: 'Estimated annual National Insurance savings from salary sacrifice',
          color: 'from-blue-600 to-blue-400',
          icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V7M12 11V15M12 19V23M5 12C5 11.0807 5.18106 10.1705 5.53284 9.32122C5.88463 8.47194 6.40024 7.70026 7.05025 7.05025C7.70026 6.40024 8.47194 5.88463 9.32122 5.53284C10.1705 5.18106 11.0807 5 12 5C12.9193 5 13.8295 5.18106 14.6788 5.53284C15.5281 5.88463 16.2997 6.40024 16.9497 7.05025C17.5998 7.70026 18.1154 8.47194 18.4672 9.32122C18.8189 10.1705 19 11.0807 19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        };
      }
      case 'employee-savings': {
        const typedResult = result as EmployeeSavingsResult;
        return {
          mainFigure: formatCurrency(typedResult.totalSavings),
          label: 'Annual Employee Savings',
          description: 'Combined annual tax and NI savings from salary sacrifice',
          color: 'from-purple-600 to-purple-400',
          icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.5 9.5C10.5 10.3284 9.82843 11 9 11C8.17157 11 7.5 10.3284 7.5 9.5C7.5 8.67157 8.17157 8 9 8C9.82843 8 10.5 8.67157 10.5 9.5Z" fill="currentColor"/>
              <path d="M16.5 9.5C16.5 10.3284 15.8284 11 15 11C14.1716 11 13.5 10.3284 13.5 9.5C13.5 8.67157 14.1716 8 15 8C15.8284 8 16.5 8.67157 16.5 9.5Z" fill="currentColor"/>
            </svg>
          )
        };
      }
      case 'p11d-ev-car': {
        const typedResult = result as P11dEvCarResult;
        return {
          mainFigure: formatCurrency(typedResult.taxSavings),
          label: 'BIK Tax Savings',
          description: 'Tax savings through electric vehicle benefit in kind',
          color: 'from-green-600 to-green-400',
          icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        };
      }
      case 'childcare-vouchers': {
        const typedResult = result as ChildcareVouchersResult;
        const totalSavings = typedResult.taxSavings + typedResult.niSavings;
        return {
          mainFigure: formatCurrency(totalSavings),
          label: 'Total Annual Savings',
          description: 'Combined tax and NI savings from childcare voucher benefit',
          color: 'from-amber-500 to-amber-300',
          icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )
        };
      }
      case 'holiday-trading': {
        const typedResult = result as HolidayTradingResult;
        return {
          mainFigure: formatCurrency(typedResult.netImpact),
          label: 'Net Financial Impact',
          description: 'Net impact of holiday trading on take-home pay',
          color: 'from-indigo-600 to-indigo-400',
          icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H6L9 3L15 21L18 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        };
      }
      case 'business-roi': {
        const typedResult = result as BusinessRoiResult;
        return {
          mainFigure: `${(typedResult.roi * 100).toFixed(1)}%`,
          label: 'Return on Investment',
          description: `Payback period: ${typedResult.paybackPeriod.toFixed(1)} years`,
          color: 'from-rose-600 to-rose-400',
          icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8L21 3L16 8ZM21 3H16H21ZM21 3V8V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 16L3 21L8 16ZM3 21H8H3ZM3 21V16V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 3L3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        };
      }
      default:
        return null;
    }
  };

  const highlight = getHighlightContent();
  
  if (!highlight) return null;
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-xl bg-gradient-to-r shadow-lg animate-fade-in overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-r ${highlight.color} opacity-10`}></div>
      <div className="relative z-10 flex items-center mb-4 md:mb-0">
        <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${highlight.color} text-white mr-4`}>
          {highlight.icon}
        </div>
        <div>
          <div className="text-sm font-medium text-slate-600 mb-1">{highlight.label}</div>
          <div className="text-3xl md:text-4xl font-bold text-slate-800">{highlight.mainFigure}</div>
        </div>
      </div>
      <div className="relative z-10 text-sm text-slate-600 md:text-right md:ml-6">
        {highlight.description}
      </div>
    </div>
  );
};

export default ResultHighlight;