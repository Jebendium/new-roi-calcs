import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Combined Payroll Calculator Methodology | Clear Benefits',
  description: 'An explanation of the methodology used in the Combined Payroll Calculator.',
};

export default function CombinedPayrollMethodologyPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-5xl">
      <Link 
        href="/calculator/combined-payroll"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-1" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
        Back to Calculator
      </Link>

      <h1 className="text-3xl font-bold mb-4">Combined Payroll Calculator Methodology</h1>
      <p className="text-gray-600 mb-8">
        This page explains the methodology behind the calculations used in the Combined Payroll Calculator.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p>
            The Combined Payroll Calculator helps organisations understand the cost implications and potential
            savings associated with different payroll solutions. It analyses both Managed Payroll Services and
            Payroll System options, allowing for direct comparison of costs and benefits.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Managed Payroll Calculation Methodology</h2>
          <p>
            The Managed Payroll Calculator estimates the costs and potential savings involved in outsourcing payroll
            operations to a managed service. The methodology considers:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong>Current Costs:</strong> Includes current payroll software costs, staff salaries dedicated to
              payroll processing, and other related expenses such as training and compliance.
            </li>
            <li>
              <strong>Implementation Costs:</strong> One-time costs associated with transitioning to a managed
              payroll service, including data migration and staff training.
            </li>
            <li>
              <strong>Ongoing Costs:</strong> The recurring fees for the managed payroll service, typically
              calculated per payslip or as a fixed monthly fee.
            </li>
            <li>
              <strong>Efficiency Savings:</strong> Time saved by internal staff who would otherwise be handling
              payroll, allowing them to focus on more strategic tasks.
            </li>
            <li>
              <strong>Error Reduction:</strong> Potential savings from reduced payroll errors, tax penalties,
              and compliance issues.
            </li>
          </ul>
          <p>
            The calculator performs a detailed analysis over a 3-year period, accounting for implementation costs
            in the first year and showing the projected return on investment over time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Payroll System Calculation Methodology</h2>
          <p>
            The Payroll System Calculator helps organisations understand the costs and benefits of implementing
            a new payroll software system that is managed internally. The methodology considers:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong>Current Costs:</strong> Includes existing software costs, staff time spent on payroll
              processing, and any outsourced payroll services.
            </li>
            <li>
              <strong>Implementation Costs:</strong> One-time expenses for purchasing and setting up the new
              system, including software licenses, configuration, data migration, and staff training.
            </li>
            <li>
              <strong>Ongoing Costs:</strong> Annual software subscription or maintenance fees, internal staff
              costs, and any additional support services.
            </li>
            <li>
              <strong>Efficiency Gains:</strong> Time savings from automated processes, reduced manual data
              entry, and streamlined reporting.
            </li>
            <li>
              <strong>Compliance Benefits:</strong> Reduced risk of errors and penalties through automatic
              updates for tax and regulatory changes.
            </li>
          </ul>
          <p>
            The calculator provides a comprehensive breakdown of costs and savings over a 3-year period,
            allowing organisations to see the projected return on investment and break-even point.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Calculation Formulas</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Current Annual Costs</h3>
          <p>
            <strong>Total Current Costs = Software Costs + Staff Costs + Other Costs</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong>Software Costs:</strong> The annual cost of current payroll software or systems.
            </li>
            <li>
              <strong>Staff Costs:</strong> Annual salary costs of staff involved in payroll processing,
              calculated based on the number of employees, time spent on payroll, and average salary.
            </li>
            <li>
              <strong>Other Costs:</strong> Additional expenses such as training, compliance consulting,
              and error correction.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Managed Payroll Costs</h3>
          <p>
            <strong>Year 1 Cost = Implementation Fee + (Monthly Fee × 12)</strong>
          </p>
          <p>
            <strong>Year 2+ Cost = Monthly Fee × 12</strong>
          </p>
          <p>
            The monthly fee is typically calculated based on the number of employees and payroll frequency.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Payroll System Costs</h3>
          <p>
            <strong>Year 1 Cost = Implementation Cost + License Fee + Maintenance Fee + Reduced Staff Costs</strong>
          </p>
          <p>
            <strong>Year 2+ Cost = Annual License Fee + Maintenance Fee + Reduced Staff Costs</strong>
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Return on Investment (ROI)</h3>
          <p>
            <strong>Annual Savings = Total Current Costs - New Annual Costs</strong>
          </p>
          <p>
            <strong>3-Year ROI = (Total 3-Year Savings - Implementation Cost) ÷ Implementation Cost</strong>
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Payback Period</h3>
          <p>
            <strong>Payback Period (months) = Implementation Cost ÷ (Annual Savings ÷ 12)</strong>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Assumptions and Limitations</h2>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              Cost estimates are based on industry averages and may vary depending on your specific
              organisation and requirements.
            </li>
            <li>
              The calculator assumes a linear distribution of costs and savings over time.
            </li>
            <li>
              Efficiency gains and error reduction benefits are estimated based on typical industry
              experiences and may vary.
            </li>
            <li>
              The calculator does not account for potential changes in staff headcount, business growth,
              or regulatory changes that might affect costs.
            </li>
            <li>
              All monetary values are presented in Pounds Sterling (GBP).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Results</h2>
          <p>
            The calculator provides a side-by-side comparison of managed payroll services versus payroll
            systems, allowing you to:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              Compare initial implementation costs and ongoing expenses.
            </li>
            <li>
              Understand the total cost of ownership over a 3-year period.
            </li>
            <li>
              Evaluate the return on investment for each option.
            </li>
            <li>
              Determine the payback period to recoup initial implementation costs.
            </li>
            <li>
              Make an informed decision based on your organisation's specific needs, budget, and priorities.
            </li>
          </ul>
          <p>
            Remember that while financial considerations are important, you should also consider factors such
            as control over your payroll process, compliance requirements, and integration with other HR
            systems when making your decision.
          </p>
        </section>
      </div>
    </div>
  );
}
