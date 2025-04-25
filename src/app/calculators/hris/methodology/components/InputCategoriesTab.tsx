'use client';

import React from 'react';

export const InputCategoriesTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Input Categories Explained</h2>
      <p className="text-slate-600 mb-6">
        The HRIS ROI Calculator is organized into five key input categories to comprehensively capture all aspects of potential HRIS value. Understanding these categories helps you provide accurate inputs for a reliable ROI calculation.
      </p>

      <div className="space-y-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">1. Company Information</h3>
          <p className="text-blue-700 mb-2">
            Basic information about your organisation to contextualize the ROI calculation:
          </p>
          <ul className="list-disc ml-5 space-y-1 text-blue-700">
            <li>Total number of employees</li>
            <li>HR team size</li>
            <li>Average hourly rates for HR staff, managers, and employees</li>
            <li>Total annual salary bill</li>
          </ul>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <h3 className="font-medium text-emerald-800 mb-2">2. Time Savings</h3>
          <p className="text-emerald-700 mb-2">
            Quantifies potential time savings from automating routine HR processes:
          </p>
          <ul className="list-disc ml-5 space-y-1 text-emerald-700">
            <li>Current time spent on HR administration, data entry, reporting, and query handling</li>
            <li>Expected reduction in time for each activity after HRIS implementation</li>
            <li>Calculation of time saved across your HR team and organization</li>
          </ul>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <h3 className="font-medium text-amber-800 mb-2">3. Error Reduction</h3>
          <p className="text-amber-700 mb-2">
            Evaluates savings from improved data accuracy and compliance:
          </p>
          <ul className="list-disc ml-5 space-y-1 text-amber-700">
            <li>Current payroll/HR data error frequency and cost to correct</li>
            <li>Compliance issues and associated costs</li>
            <li>Expected improvements in data accuracy and compliance with HRIS</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h3 className="font-medium text-purple-800 mb-2">4. Strategic Value</h3>
          <p className="text-purple-700 mb-2">
            Captures harder-to-quantify but significant strategic benefits:
          </p>
          <ul className="list-disc ml-5 space-y-1 text-purple-700">
            <li>Current employee turnover rate and replacement costs</li>
            <li>Expected improvements in retention with better HR systems</li>
            <li>Value of improved employee engagement</li>
            <li>Benefits from better/faster HR decision-making</li>
          </ul>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <h3 className="font-medium text-slate-800 mb-2">5. System Costs</h3>
          <p className="text-slate-700 mb-2">
            Accounts for all costs associated with HRIS implementation:
          </p>
          <ul className="list-disc ml-5 space-y-1 text-slate-700">
            <li>Implementation/setup costs</li>
            <li>Annual subscription or license fees</li>
            <li>Training expenses</li>
            <li>Ongoing maintenance and support costs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};