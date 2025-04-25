'use client';

import React from 'react';
import { CalculatorType } from '../../types/calculator';

/**
 * Component that returns the appropriate icon for a calculator type
 */
export const ResultIcons: Record<CalculatorType, React.ReactNode> = {
  'employer-ni': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 20H22V22H2V20Z" fill="currentColor" />
      <path d="M5 17V16C5 15.4477 5.44772 15 6 15H18C18.5523 15 19 15.4477 19 16V17H5Z" fill="currentColor" />
      <path d="M5 14C3.34315 14 2 12.6569 2 11V7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V11C22 12.6569 20.6569 14 19 14H5Z" fill="currentColor" />
      <path d="M6 7H8V11H6V7Z" fill="white" />
      <path d="M10 7H12V11H10V7Z" fill="white" />
      <path d="M14 7H16V11H14V7Z" fill="white" />
    </svg>
  ),
  'employee-savings': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z" fill="currentColor" />
      <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19Z" fill="currentColor" />
      <path d="M13 10.915V9H11V12.6L13.8 14.6L15 13L13 11.5V10.915Z" fill="white" />
    </svg>
  ),
  'p11d-ev-car': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 6L19 9L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6L5 9L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 9H5" stroke="currentColor" strokeWidth="2" />
      <path d="M7.93005 16.993C7.48665 16.9584 7.03748 16.934 6.58356 16.934C4.22504 16.934 2.99996 18.0981 3 19.9999V20H21V19.9999C21.0001 18.0981 19.775 16.934 17.4164 16.934C16.9625 16.934 16.5133 16.9584 16.0699 16.993" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'childcare-vouchers': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 10H3V20H21V10Z" fill="currentColor" />
      <path d="M22 6H2V8H22V6Z" fill="currentColor" />
      <path d="M14 6C14 4.34 12.66 3 11 3C9.34 3 8 4.34 8 6H14Z" fill="currentColor" />
      <path d="M13 13.5H16.5L13 17H16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 13.5L11 17L8 13.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'holiday-trading': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" fill="currentColor" />
      <path d="M16 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 10H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7" y="14" width="4" height="4" rx="0.5" stroke="white" strokeWidth="1.5" />
      <path d="M15 16H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'business-roi': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5Z" fill="currentColor" />
      <path d="M7 14.5L10 11.5L12.5 14L17 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 9.5H17V13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default ResultIcons;