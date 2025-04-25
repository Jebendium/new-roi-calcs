'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WizardShell } from '../../components/WizardShell';

export default function ResourcesPage() {
  const router = useRouter();

  return (
    <WizardShell
      activeCalculator={null}
      onSelectCalculator={(calculatorType) => router.push(`/calculator/${calculatorType}`)}
      onGoHome={() => router.push('/')}
    >
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Benefits & HR Resources</h1>
          <p className="text-lg text-slate-600">
            Explore the latest industry news, guides, and insights to help you make informed decisions about employee benefits and HR systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Industry News</h2>
              <p className="text-slate-600 mb-6">
                Stay up-to-date with the latest trends and developments in the HR and employee benefits industry.
                Our AI-powered news aggregator summarises the most important articles for you.
              </p>
              <Link
                href="/resources/news"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                View Industry News
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Guides & White Papers</h2>
              <p className="text-slate-600 mb-6">
                Access in-depth guides, white papers, and case studies to help you implement and optimize your employee benefits and HR systems.
              </p>
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-800">2025 Guide to Salary Sacrifice Benefits</h3>
                  <p className="text-slate-600 text-sm mt-2">
                    A comprehensive guide to implementing and optimizing salary sacrifice benefits for your organisation.
                  </p>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                    Download PDF
                  </a>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-800">HR Systems ROI Calculator Methodology</h3>
                  <p className="text-slate-600 text-sm mt-2">
                    Learn about the methodology behind our HR Systems ROI calculator and how to interpret the results.
                  </p>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                    Read More
                  </a>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-800">Case Study: Implementing Salary Sacrifice at Scale</h3>
                  <p className="text-slate-600 text-sm mt-2">
                    How a UK-based organisation with 1,000+ employees implemented salary sacrifice benefits and saved over £200,000 annually.
                  </p>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                    Read Case Study
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Quick Links</h2>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/calculator/employer-ni" 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Employer NI Calculator
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/calculator/employee-savings" 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Employee Savings Calculator
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/calculator/business-roi" 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    HR Systems ROI Calculator
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/calculator/combined-payroll" 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Payroll ROI Calculator
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Need Help?</h2>
              <p className="mb-4">
                Our team of benefits experts is here to help you implement and optimize your employee benefits strategy.
              </p>
              <a
                href="#"
                className="inline-block w-full px-5 py-3 bg-white text-blue-600 font-medium rounded-md text-center hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </WizardShell>
  );
}
