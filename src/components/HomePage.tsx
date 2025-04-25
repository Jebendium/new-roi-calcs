'use client';

import React from 'react';
import { CalculatorType } from '../types/calculator';
import HeroBanner from './homepage/HeroBanner';
import BenefitsSection from './homepage/BenefitsSection';
import CalculatorsGrid from './homepage/CalculatorsGrid';
import FaqSection from './homepage/FaqSection';
import CtaSection from './homepage/CtaSection';

interface HomePageProps {
  onSelectCalculator: (calculatorType: CalculatorType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectCalculator }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Benefits Section with Alternating Background */}
      <BenefitsSection />
      
      {/* Calculators Grid */}
      <CalculatorsGrid onSelectCalculator={onSelectCalculator} />
      
      {/* FAQ Section */}
      <div className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <FaqSection />
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <CtaSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
