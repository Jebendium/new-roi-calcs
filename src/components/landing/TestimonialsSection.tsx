'use client';

import React from 'react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Trusted by HR Managers and Payroll Professionals
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            See what our clients say about working with our benefits consultancy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-lg p-8 border border-slate-200 relative">
            <div className="text-4xl text-blue-200 absolute top-6 left-6">"</div>
            <p className="text-slate-700 mb-6 pt-8 relative z-10">
              Their expertise saved us thousands in NICs while making our benefits package much more attractive to employees. The process was seamless.
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden mr-4">
                <img 
                  src="/images/testimonial-1.jpg" 
                  alt="Sarah Johnson" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/48/f0f9ff/1e40af?text=SJ';
                  }}
                />
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Sarah Johnson</h4>
                <p className="text-sm text-slate-500">HR Director, Quantum Tech Solutions</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white rounded-lg p-8 border border-slate-200 relative">
            <div className="text-4xl text-blue-200 absolute top-6 left-6">"</div>
            <p className="text-slate-700 mb-6 pt-8 relative z-10">
              As a payroll bureau, partnering with this consultancy has allowed us to offer valuable benefits advice without building that expertise in-house.
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden mr-4">
                <img 
                  src="/images/testimonial-2.jpg" 
                  alt="Michael Davies" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/48/f0f9ff/1e40af?text=MD';
                  }}
                />
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Michael Davies</h4>
                <p className="text-sm text-slate-500">Managing Director, Payroll Plus</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white rounded-lg p-8 border border-slate-200 relative">
            <div className="text-4xl text-blue-200 absolute top-6 left-6">"</div>
            <p className="text-slate-700 mb-6 pt-8 relative z-10">
              Their recommendations helped us implement a benefits scheme that our employees love, with compliance guidance that gave us real peace of mind.
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden mr-4">
                <img 
                  src="/images/testimonial-3.jpg" 
                  alt="Emma Richards" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/48/f0f9ff/1e40af?text=ER';
                  }}
                />
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Emma Richards</h4>
                <p className="text-sm text-slate-500">Operations Manager, Green Horizons Ltd</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-lg font-medium text-slate-700 mb-6">Trusted by companies throughout the UK</p>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Client logos - using placeholders, would be replaced with actual logos */}
            <div className="w-32 h-12 bg-slate-200 rounded-md"></div>
            <div className="w-32 h-12 bg-slate-200 rounded-md"></div>
            <div className="w-32 h-12 bg-slate-200 rounded-md"></div>
            <div className="w-32 h-12 bg-slate-200 rounded-md"></div>
            <div className="w-32 h-12 bg-slate-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;