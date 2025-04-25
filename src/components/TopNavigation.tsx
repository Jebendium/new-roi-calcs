'use client';

import React, { useState } from 'react';
import { CalculatorType } from '../types/calculator';
import { calculatorData } from '../data/calculatorData';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface TopNavigationProps {
  activeCalculator?: CalculatorType | null;
  onSelectCalculator?: (calculatorType: CalculatorType) => void;
  onGoHome?: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeCalculator,
  onSelectCalculator,
  onGoHome,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Determine active calculator from pathname if not provided
  const derivedActiveCalculator = activeCalculator || 
    (pathname?.includes('/calculator/employee-savings') ? 'employee-savings' : 
     pathname?.includes('/calculator/employer-ni') ? 'employer-ni' : null) as CalculatorType | null;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center text-white mr-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-800">ROI Calculator</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <Link
              href="/"
              className="px-4 py-2 text-slate-600 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            
            {/* Calculators Dropdown */}
            <div className="relative ml-4">
              <button
                onClick={toggleDropdown}
                className="px-4 py-2 text-slate-600 hover:text-blue-600 font-medium flex items-center"
              >
                Calculators
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-100 py-2 z-50">
                  {calculatorData.map((calc) => (
                    <Link
                      key={calc.type}
                      href={`/calculator/${calc.type}`}
                      onClick={() => setDropdownOpen(false)}
                      className={`w-full flex items-center px-4 py-3 text-left hover:bg-slate-50 ${
                        derivedActiveCalculator === calc.type ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${calc.gradient} flex items-center justify-center text-white mr-3`}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: calc.iconSvg }} />
                      </div>
                      <span className="text-sm font-medium">{calc.title.replace(' Calculator', '')}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <button className="ml-4 px-4 py-2 text-slate-600 hover:text-blue-600 font-medium">
              Resources
            </button>
            
            <button className="ml-4 px-4 py-2 text-slate-600 hover:text-blue-600 font-medium">
              About
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left block px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-md"
            >
              Home
            </Link>
            
            <div className="px-4 py-2 text-sm font-medium text-slate-500">Calculators</div>
            
            {calculatorData.map((calc) => (
              <Link
                key={calc.type}
                href={`/calculator/${calc.type}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-md ${
                  derivedActiveCalculator === calc.type
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${calc.gradient} flex items-center justify-center text-white mr-3`}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: calc.iconSvg }} />
                </div>
                <span className="text-sm font-medium">{calc.title.replace(' Calculator', '')}</span>
              </Link>
            ))}
            
            <button className="w-full text-left px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-md">
              Resources
            </button>
            
            <button className="w-full text-left px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-md">
              About
            </button>
          </div>
        </div>
      )}
    </header>
  );
};