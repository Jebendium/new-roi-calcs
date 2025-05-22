'use client';

import React from 'react';
import { WizardShell } from '../components/WizardShell';
import Hero from '../components/landing/Hero';
import BenefitsSection from '../components/landing/BenefitsSection';
import ServicesSection from '../components/landing/ServicesSection';
import ContactFormSection from '../components/landing/ContactFormSection';

export default function Home() {
  return (
    <WizardShell 
      activeCalculator={null}
      onSelectCalculator={(calculatorType) => {}}
      onGoHome={() => {}}
    >
      <Hero />
      <BenefitsSection />
      <ServicesSection />
      <ContactFormSection />
    </WizardShell>
  );
}