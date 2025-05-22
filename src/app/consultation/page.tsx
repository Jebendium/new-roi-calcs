'use client';

import React from 'react';
import { WizardShell } from '../../components/WizardShell';
import ContactFormSection from '../../components/landing/ContactFormSection';

export default function Consultation() {
  return (
    <WizardShell
      activeCalculator={null}
      onSelectCalculator={() => {}}
      onGoHome={() => {}}
    >
      <div className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Book Your Free Consultation</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Complete the form below to schedule your free, no-obligation consultation with our employee benefits experts.
            </p>
          </div>
        </div>
      </div>
      <ContactFormSection />
    </WizardShell>
  );
}