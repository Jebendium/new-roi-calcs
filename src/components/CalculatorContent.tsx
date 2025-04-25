'use client';

import React, { useState } from 'react';
import { CalculatorType } from '../types/calculator';
import { Card } from './Card';
import { calculatorData } from '../data/calculatorData';
import EmployerNICalculator from '../calculators/employer-calculator/EmployerNICalculator';
import EmployeeSavingsCalculator from '../calculators/employee-calculator/EmployeeSavingsCalculator';
import ResultHighlight from './ResultHighlight';

interface CalculatorContentProps {
  calculatorType: CalculatorType;
}

const CalculatorContent: React.FC<CalculatorContentProps> = ({ calculatorType }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0 for details, 1 for results
  
  // Find calculator data
  const calculator = calculatorData.find(calc => calc.type === calculatorType);
  
  if (!calculator) {
    return <div>Calculator not found</div>;
  }
  
  // Handle editing details
  const handleEditDetails = () => {
    setCurrentStep(0);
  };

  // Render the appropriate form based on calculator type
  const renderForm = () => {
    switch (calculatorType) {
      case 'employer-ni':
        return <EmployerNICalculator />;
      case 'employee-savings':
        return <EmployeeSavingsCalculator />;
      case 'childcare-vouchers':
        return <div>Childcare Vouchers Calculator (Coming Soon)</div>;
      case 'p11d-ev-car':
        return <div>EV Car Benefit Calculator (Coming Soon)</div>;
      case 'holiday-trading':
        return <div>Holiday Trading Calculator (Coming Soon)</div>;
      case 'business-roi':
        return <div>HR Systems ROI Calculator (Coming Soon)</div>;
      default:
        return <div>Unknown calculator type</div>;
    }
  };
  
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-slate-800 animate-fade-in">
        {calculator.title}
      </h1>
      
      {currentStep === 0 ? (
        <Card 
          title="Enter Details" 
          animateIn={true}
          icon={calculator.icon}
          className="animate-slide-up"
        >
          {renderForm()}
        </Card>
      ) : (
        <div className="space-y-8 animate-slide-up">
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-start mb-6">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${calculator.gradient} text-white mr-3`}>
                {calculator.icon}
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                Results for {calculator.title}
              </h2>
            </div>
            
            <div className="space-y-6">
              <ResultHighlight calculatorType={calculatorType} />
                
              <div className="mt-8 bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-100">
                <h3 className="text-lg font-semibold mb-3 text-slate-800">Detailed Results</h3>
                <pre className="text-sm whitespace-pre-wrap font-mono text-slate-700 overflow-auto max-h-60">
                </pre>
              </div>
                
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  className="btn btn-primary"
                  onClick={handleEditDetails}
                >
                  Edit Calculation
                </button>
                <a 
                  href="#"
                  className="btn btn-outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    // Export functionality would be implemented here
                    alert("Export functionality will be implemented soon!");
                  }}
                >
                  Export Results
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-card p-6" style={{ animationDelay: '150ms' }}>
            <h3 className="text-lg font-semibold mb-4 text-slate-800">What This Means For You</h3>
            <div className="text-slate-600 space-y-4">
              <p>
                Based on your inputs, we&apos;ve calculated the financial impact of this benefit option. 
                The results above show the potential savings and ROI you could achieve.
              </p>
              <p>
                Remember that these calculations are based on current UK tax rates and provide estimates 
                that can help guide your decision-making process.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700">
                <div className="font-medium mb-1">Pro Tip</div>
                <p className="text-sm">
                  Consider running multiple scenarios with different variables to find the optimal approach 
                  for your specific situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalculatorContent;
