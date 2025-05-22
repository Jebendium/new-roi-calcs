'use client';

import React from 'react';
import { WizardShell } from '../../components/WizardShell';
import TestimonialsSection from '../../components/landing/TestimonialsSection';

export default function Testimonials() {
  return (
    <WizardShell
      activeCalculator={null}
      onSelectCalculator={(calculatorType) => {}}
      onGoHome={() => {}}
    >
      <div className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Testimonials</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              See what our clients say about working with Colwell Benefits Consulting.
            </p>
          </div>
        </div>
      </div>
      <TestimonialsSection />
    </WizardShell>
  );
}