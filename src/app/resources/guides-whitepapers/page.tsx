'use client';

import React from 'react';
import { WizardShell } from '../../../components/WizardShell';

export default function GuidesWhitepapers() {
  return (
    <WizardShell
      activeCalculator={null}
      onSelectCalculator={() => {}}
      onGoHome={() => {}}
    >
      <div className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Guides & Whitepapers</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Comprehensive resources to help you navigate employee benefits.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <p className="text-slate-700 mb-6">
              This page will contain downloadable guides and whitepapers related to employee benefits.
            </p>
          </div>
        </div>
      </div>
    </WizardShell>
  );
}