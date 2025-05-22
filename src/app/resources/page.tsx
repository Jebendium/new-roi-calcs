'use client';

import React from 'react';
import { WizardShell } from '../../components/WizardShell';
import Link from 'next/link';
import { resourcesData } from '../../data/resourcesData';

export default function Resources() {
  return (
    <WizardShell
      activeCalculator={null}
      onSelectCalculator={() => {}}
      onGoHome={() => {}}
    >
      <div className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Resources</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Explore our resources to help you optimize your employee benefits strategy.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {resourcesData.map((resource) => (
              <Link 
                key={resource.type} 
                href={`/resources/${resource.type}`}
                className="block bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow border border-slate-100"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${resource.gradient} flex items-center justify-center text-white mr-5`}>
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: resource.iconSvg }} />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-800">{resource.title}</h3>
                </div>
                <p className="text-lg text-slate-600 mb-4">{resource.description}</p>
                <div className="flex justify-end">
                  <span className="text-blue-600 font-medium flex items-center">
                    Explore
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </WizardShell>
  );
}