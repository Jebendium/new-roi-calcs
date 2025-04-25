'use client';

import React from 'react';

export const CalculationMethodTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Calculation Methodology</h2>
      <p className="text-slate-600 mb-6">
        The HRIS ROI calculator uses a comprehensive methodology to translate your inputs into meaningful financial projections. Below is a breakdown of how each component is calculated:
      </p>

      <div className="space-y-8">
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-medium text-slate-800 mb-2">1. Time Savings Value Calculation</h3>
          <p className="text-slate-600 mb-2">
            We calculate time savings across different HR activities and roles:
          </p>
          <div className="bg-slate-50 p-3 rounded-lg font-mono text-sm text-slate-700">
            <p>Annual HR Time (hrs) = Sum of time spent on all activities × 52 weeks</p>
            <p>Time Saved (hrs) = Annual HR Time × (Improvement % ÷ 100)</p>
            <p>HR Staff Savings (£) = Time Saved × HR Hourly Rate × HR Staff Count</p>
            <p>Manager Savings (£) = Time Saved × 0.2 × Manager Hourly Rate × (Employees ÷ 10)</p>
            <p>Employee Savings (£) = (Monthly time × 12 × Employees) × (Improvement % ÷ 100) × Employee Hourly Rate</p>
            <p>Total Time Savings Value = HR Savings + Manager Savings + Employee Savings</p>
          </div>
        </div>

        <div className="border-l-4 border-emerald-500 pl-4">
          <h3 className="font-medium text-slate-800 mb-2">2. Error Reduction Value Calculation</h3>
          <p className="text-slate-600 mb-2">
            We quantify savings from improved data accuracy and compliance:
          </p>
          <div className="bg-slate-50 p-3 rounded-lg font-mono text-sm text-slate-700">
            <p>Annual Payroll Errors = Employees × 24 pay periods × (Error Rate % ÷ 100)</p>
            <p>Error Correction Savings = Annual Errors × (Accuracy Improvement % ÷ 100) × Correction Time × HR Hourly Rate</p>
            <p>Compliance Risk Savings = Risk Cost × (Compliance Improvement % ÷ 100)</p>
            <p>Data Quality Savings = Employees × 50 × (Data Accuracy Improvement % ÷ 100)</p>
            <p>Total Error Reduction Value = Error Correction + Compliance Risk + Data Quality Savings</p>
          </div>
        </div>

        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="font-medium text-slate-800 mb-2">3. Strategic Value Calculation</h3>
          <p className="text-slate-600 mb-2">
            We estimate long-term strategic benefits from improved HR processes:
          </p>
          <div className="bg-slate-50 p-3 rounded-lg font-mono text-sm text-slate-700">
            <p>Turnover Reduction = Employees × (Annual Turnover % ÷ 100) × (Retention Improvement % ÷ 100)</p>
            <p>Retention Savings = Turnover Reduction × (Annual Salary Bill ÷ Employees) × Replacement Cost Multiplier</p>
            <p>Engagement Value = Employees × Employee Engagement Value × (Workflow Automation % ÷ 100) ÷ 100</p>
            <p>Decision Value = Annual Salary Bill × 0.005 × ((Insight Quality % + Decision Speed %) ÷ 200)</p>
            <p>Total Strategic Value = Retention Savings + Engagement Value + Decision Value</p>
          </div>
        </div>

        <div className="border-l-4 border-slate-500 pl-4">
          <h3 className="font-medium text-slate-800 mb-2">4. Cost Calculation</h3>
          <p className="text-slate-600 mb-2">
            We account for all implementation and ongoing costs:
          </p>
          <div className="bg-slate-50 p-3 rounded-lg font-mono text-sm text-slate-700">
            <p>First Year Cost = Implementation + Annual Subscription + Training + Maintenance</p>
            <p>Ongoing Annual Cost = Annual Subscription + Maintenance</p>
            <p>Three-Year Cost = First Year Cost + (Ongoing Annual Cost × 2)</p>
          </div>
        </div>

        <div className="border-l-4 border-amber-500 pl-4">
          <h3 className="font-medium text-slate-800 mb-2">5. ROI Metrics Calculation</h3>
          <p className="text-slate-600 mb-2">
            We calculate the following key ROI metrics:
          </p>
          <div className="bg-slate-50 p-3 rounded-lg font-mono text-sm text-slate-700">
            <p>First Year Value = Time Savings + Error Reduction + Strategic Value</p>
            <p>First Year ROI % = ((First Year Value - First Year Cost) ÷ First Year Cost) × 100</p>
            <p>Ongoing ROI % = ((First Year Value - Ongoing Cost) ÷ Ongoing Cost) × 100</p>
            <p>Payback Period (months) = First Year Cost ÷ (First Year Value ÷ 12)</p>
            <p>Three-Year Value = First Year Value × 3</p>
            <p>Three-Year ROI % = ((Three-Year Value - Three-Year Cost) ÷ Three-Year Cost) × 100</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Notes About Our Calculation Method</h3>
        <ul className="list-disc ml-5 space-y-1 text-blue-700">
          <li>The calculator uses a conservative approach that focuses on tangible, measurable benefits</li>
          <li>Future benefits are not discounted for net present value (NPV) calculations</li>
          <li>The model assumes consistent annual benefits over the three-year period</li>
          <li>Industry benchmarks are drawn from CIPD and CIPP research on HR technology implementations</li>
        </ul>
      </div>
    </div>
  );
};