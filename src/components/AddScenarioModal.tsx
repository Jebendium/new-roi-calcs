'use client';

import React from 'react';
import { CalculatorType } from '../types/calculator';
import ResultIcons from './icons/ResultIcons';

interface AddScenarioModalProps {
  onSelect: (type: CalculatorType) => void;
  onClose: () => void;
}

const AddScenarioModal: React.FC<AddScenarioModalProps> = ({ onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-charcoal-800">Add New Scenario</h2>
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-charcoal-100 text-charcoal-500"
            onClick={onClose}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <button 
            className="group bg-white hover:bg-gradient-to-r from-primary-50 to-white p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md text-left"
            onClick={() => onSelect('employer-ni')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-white mr-3">
                {ResultIcons['employer-ni']}
              </div>
              <div>
                <h3 className="font-medium text-charcoal-700 group-hover:text-primary-700 transition-colors">Employer NI Savings</h3>
                <p className="text-xs text-charcoal-500">Calculate employer NI savings from benefits</p>
              </div>
            </div>
          </button>
          
          <button 
            className="group bg-white hover:bg-gradient-to-r from-secondary-50 to-white p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md text-left"
            onClick={() => onSelect('employee-savings')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-600 to-secondary-400 flex items-center justify-center text-white mr-3">
                {ResultIcons['employee-savings']}
              </div>
              <div>
                <h3 className="font-medium text-charcoal-700 group-hover:text-secondary-700 transition-colors">Employee Tax & NI</h3>
                <p className="text-xs text-charcoal-500">Calculate employee tax and NI savings</p>
              </div>
            </div>
          </button>
          
          <button 
            className="group bg-white hover:bg-gradient-to-r from-success-50 to-white p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md text-left"
            onClick={() => onSelect('p11d-ev-car')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success-600 to-success-400 flex items-center justify-center text-white mr-3">
                {ResultIcons['p11d-ev-car']}
              </div>
              <div>
                <h3 className="font-medium text-charcoal-700 group-hover:text-success-700 transition-colors">P11D EV Car</h3>
                <p className="text-xs text-charcoal-500">Calculate P11D value for electric vehicles</p>
              </div>
            </div>
          </button>
          
          <button 
            className="group bg-white hover:bg-gradient-to-r from-warning-50 to-white p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md text-left"
            onClick={() => onSelect('childcare-vouchers')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warning-600 to-warning-400 flex items-center justify-center text-white mr-3">
                {ResultIcons['childcare-vouchers']}
              </div>
              <div>
                <h3 className="font-medium text-charcoal-700 group-hover:text-warning-700 transition-colors">Childcare Vouchers</h3>
                <p className="text-xs text-charcoal-500">Calculate childcare voucher benefits</p>
              </div>
            </div>
          </button>
          
          <button 
            className="group bg-white hover:bg-gradient-to-r from-primary-50 to-white p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md text-left"
            onClick={() => onSelect('holiday-trading')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-700 to-secondary-500 flex items-center justify-center text-white mr-3">
                {ResultIcons['holiday-trading']}
              </div>
              <div>
                <h3 className="font-medium text-charcoal-700 group-hover:text-primary-700 transition-colors">Holiday Trading</h3>
                <p className="text-xs text-charcoal-500">Calculate impact of holiday buying/selling</p>
              </div>
            </div>
          </button>
          
          <button 
            className="group bg-white hover:bg-gradient-to-r from-secondary-50 to-white p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md text-left"
            onClick={() => onSelect('business-roi')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-700 to-primary-500 flex items-center justify-center text-white mr-3">
                {ResultIcons['business-roi']}
              </div>
              <div>
                <h3 className="font-medium text-charcoal-700 group-hover:text-secondary-700 transition-colors">Business ROI</h3>
                <p className="text-xs text-charcoal-500">Calculate ROI for HR systems</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddScenarioModal;