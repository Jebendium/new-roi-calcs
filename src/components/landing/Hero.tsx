'use client';

import React from 'react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden w-full shadow-md">
      {/* Background Image with 50% opacity */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <img 
          src="/images/topherosection.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="container mx-auto px-0 sm:px-4 md:px-6 max-w-none w-full relative z-20">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1 bg-blue-100 text-blue-800 font-medium rounded-full text-sm mb-6">
            UK EMPLOYEE BENEFITS SPECIALISTS
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Employee Benefits Sourcing & <br className="hidden md:block" />
            NIC-Optimised Advice — <br className="hidden md:block" />
            Expert Guidance to Find the <br className="hidden md:block" />
            Right Providers
          </h1>
          
          <p className="text-xl text-white max-w-3xl mx-auto mb-8">
            Helping UK businesses and payroll bureaus simplify benefits, save on NICs, and 
            stay compliant.
          </p>
          
          <Link 
            href="/consultation" 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-lg shadow-sm hover:shadow-md transition-all"
          >
            Book Your Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;