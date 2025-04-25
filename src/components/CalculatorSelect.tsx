'use client';

import React from 'react';
import type { CalculatorType } from '../types/calculator';

interface CalculatorSelectProps {
  onSelect: (calculatorType: CalculatorType) => void;
}

// SVG icons for each calculator
const icons = {
  'employer-ni': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'employee-savings': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14.5 8.5C14.5 9.88071 13.3807 11 12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M5 19C6.5 15.5 9 13.5 12 13.5C15 13.5 17.5 15.5 19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'p11d-ev-car': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 10L3 15L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 10L21 15L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 15H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17.1421 4.44154L19.5563 6.85577" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6.85779 4.44154L4.44356 6.85577" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 3L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'childcare-vouchers': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 10H6C4.89543 10 4 10.8954 4 12V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12C20 10.8954 19.1046 10 18 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15C13.6569 15 15 13.6569 15 12V5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5V12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  'holiday-trading': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14 3.63965C13.3723 3.22015 12.7169 2.87729 12 2.55493" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.4107 9C20.2839 8.36333 20.0956 7.73665 19.8438 7.14285" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'business-roi': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.5 4H19C19.5523 4 20 4.44772 20 5V9L22 11L20 13V17C20 17.5523 19.5523 18 19 18H14.5L12 20L9.5 18H5C4.44772 18 4 17.5523 4 17V13L2 11L4 9V5C4 4.44772 4.44772 4 5 4H9.5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  ),
};

interface CalculatorOption {
  key: CalculatorType;
  label: string;
  description: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  delay: number;
}

export const CalculatorSelect: React.FC<CalculatorSelectProps> = ({ onSelect }) => {
  const calculatorOptions: CalculatorOption[] = [
    {
      key: 'employer-ni',
      label: 'Employer NI Savings',
      description: 'Calculate employer National Insurance savings from salary sacrifice schemes.',
      icon: icons['employer-ni'],
      gradientFrom: 'from-primary-600',
      gradientTo: 'to-primary-400',
      delay: 0,
    },
    {
      key: 'employee-savings',
      label: 'Employee Tax & NI Savings',
      description: 'Calculate employee tax and NI savings from salary sacrifice benefits.',
      icon: icons['employee-savings'],
      gradientFrom: 'from-secondary-600',
      gradientTo: 'to-secondary-400',
      delay: 100,
    },
    {
      key: 'p11d-ev-car',
      label: 'P11D EV Car',
      description: 'Calculate P11D value and tax impact for electric vehicle schemes.',
      icon: icons['p11d-ev-car'],
      gradientFrom: 'from-success-600',
      gradientTo: 'to-success-400',
      delay: 200,
    },
    {
      key: 'childcare-vouchers',
      label: 'Childcare Vouchers',
      description: 'Estimate savings from childcare voucher salary sacrifice.',
      icon: icons['childcare-vouchers'],
      gradientFrom: 'from-warning-600',
      gradientTo: 'to-warning-400',
      delay: 300,
    },
    {
      key: 'holiday-trading',
      label: 'Holiday Trading',
      description: 'Estimate impact of buying or selling annual leave.',
      icon: icons['holiday-trading'],
      gradientFrom: 'from-primary-700',
      gradientTo: 'to-secondary-500',
      delay: 400,
    },
    {
      key: 'business-roi',
      label: 'Business System ROI',
      description: 'Calculate ROI for HRIS, managed payroll, or payroll software.',
      icon: icons['business-roi'],
      gradientFrom: 'from-secondary-700',
      gradientTo: 'to-primary-500',
      delay: 500,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {calculatorOptions.map((option) => {
        const animationStyle = { animationDelay: `${option.delay}ms` };
        
        return (
          <div 
            key={option.key}
            className="animate-slide-up" 
            style={animationStyle}
            onClick={() => onSelect(option.key)}
          >
            <div className="calculator-card group cursor-pointer h-full flex flex-col">
              <div className={`calculator-icon ${option.gradientFrom} ${option.gradientTo} transform group-hover:scale-110 transition-transform duration-300`}>
                {option.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-charcoal-700 group-hover:text-primary-700 transition-colors duration-300">
                {option.label}
              </h3>
              <p className="text-sm text-charcoal-500 flex-grow">
                {option.description}
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary-600 text-sm font-medium">
                Select this calculator →
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};