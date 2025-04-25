'use client';

import React, { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-slate-800">{question}</h3>
        <svg
          className={`w-5 h-5 text-slate-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 border-t border-slate-100">
          <p className="text-slate-600">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FaqSection: React.FC = () => {
  const faqs = [
    {
      question: "How accurate are these ROI calculators?",
      answer: "Our calculators use the latest UK tax rates and NI contribution rates for precise calculations. The tools provide reliable estimates based on your input data, helping you make informed decisions. We regularly update our rates to ensure compliance with current HMRC guidelines."
    },
    {
      question: "Can I use these calculators for my business planning?",
      answer: "Absolutely. These calculators are designed specifically for UK businesses to assess the financial impact of employee benefits and HR systems investments. They provide valuable insights for budgeting and strategic planning, allowing you to model different scenarios and understand the potential ROI before implementation."
    },
    {
      question: "Are the tax rates up to date?",
      answer: "Yes, our calculators use the current UK tax and NI rates for the 2023-2026 period. We regularly update our systems to ensure accuracy as HMRC makes changes to tax legislation, so you can be confident you're making decisions based on current rates."
    },
    {
      question: "Can I save or export my calculation results?",
      answer: "Yes, all calculator results can be exported to PDF or Excel format for easy sharing with your team or inclusion in business proposals. You can also save your inputs to return to calculations later or create different scenarios for comparison."
    },
    {
      question: "Do I need to create an account to use the calculators?",
      answer: "Basic calculator features are available without an account. However, creating a free account allows you to save your calculations, access historical reports, and receive updates about tax legislation changes that might affect your employee benefits strategy."
    }
  ];
  
  return (
    <section className="mb-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-slate-600">
          Find answers to common questions about our ROI calculator suite
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
