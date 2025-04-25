import React from 'react';
import { FormValues, EmployerNIResult } from '../../core/types';

interface SalaryBandData {
  bandName: string;
  salaryRange: string;
  employeeCount: number;
  niSavings: number;
  savingsPerEmployee: number;
}

interface SalaryBandsTabProps {
  result: EmployerNIResult;
  formValues: FormValues;
}

/**
 * SalaryBandsTab - Component for displaying NI savings by salary band
 * 
 * This component breaks down employer NI savings across different salary bands
 * to show where the organization realizes the most savings.
 */
const SalaryBandsTab: React.FC<SalaryBandsTabProps> = ({
  result,
  formValues
}) => {
  // This would typically come from the calculation results
  // For now we'll create sample data based on the form values
  const sampleBandData: SalaryBandData[] = generateSampleBandData(formValues);
  
  // Format currency values for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', { 
      style: 'currency', 
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-slate-800 mb-4">
        Savings by Salary Band
      </h3>
      <p className="text-slate-600 mb-6">
        Employer NI savings are not uniform across all salary levels. This analysis breaks down savings by salary band
        to help you understand where the greatest savings opportunities exist.
      </p>
      
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Salary Band
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Employee Count
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Total NI Savings
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Savings Per Employee
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  % of Total Savings
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {sampleBandData.map((band, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {band.bandName}
                    <div className="text-xs text-slate-500 mt-1">{band.salaryRange}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {band.employeeCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {formatCurrency(band.niSavings)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {formatCurrency(band.savingsPerEmployee)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {((band.niSavings / result.annualSavings) * 100).toFixed(1)}%
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(band.niSavings / result.annualSavings) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
              
              {/* Totals row */}
              <tr className="bg-slate-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  All Employees
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {formValues.employeeCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {formatCurrency(result.annualSavings)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {formatCurrency(result.savingsPerEmployee)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  100%
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full w-full"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-8">
          <h4 className="text-md font-medium text-slate-800 mb-4">
            Insights
          </h4>
          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            <p className="mb-2">
              <strong>Key observations:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Employees in the higher salary bands typically generate the most NI savings per person</li>
              <li>Middle salary bands often contribute the most to total savings due to employee numbers</li>
              <li>Consider focusing salary sacrifice benefits promotion on bands with the highest potential savings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate sample salary band data
function generateSampleBandData(formValues: FormValues): SalaryBandData[] {
  const totalEmployees = Number(formValues.employeeCount) || 100;
  const avgSalary = Number(formValues.averageSalary) || 30000;
  const pensionContrib = Number(formValues.pensionContribution) || 5;
  
  // Define some salary bands
  const bands = [
    { 
      bandName: "Entry Level", 
      minSalary: avgSalary * 0.5, 
      maxSalary: avgSalary * 0.8,
      distribution: 0.25 // 25% of employees
    },
    { 
      bandName: "Junior", 
      minSalary: avgSalary * 0.8, 
      maxSalary: avgSalary * 1.0,
      distribution: 0.35 // 35% of employees
    },
    { 
      bandName: "Mid-Level", 
      minSalary: avgSalary * 1.0, 
      maxSalary: avgSalary * 1.3,
      distribution: 0.25 // 25% of employees
    },
    { 
      bandName: "Senior", 
      minSalary: avgSalary * 1.3, 
      maxSalary: avgSalary * 1.8,
      distribution: 0.1 // 10% of employees
    },
    { 
      bandName: "Executive", 
      minSalary: avgSalary * 1.8, 
      maxSalary: avgSalary * 3.0,
      distribution: 0.05 // 5% of employees
    }
  ];
  
  // Calculate NI rate - simplified for example
  const niRate = 0.138; // 13.8% employer NI rate
  const totalAnnualSavings = totalEmployees * avgSalary * (pensionContrib / 100) * niRate;
  
  return bands.map(band => {
    const employeeCount = Math.round(totalEmployees * band.distribution);
    const avgBandSalary = (band.minSalary + band.maxSalary) / 2;
    const savingsPerEmployee = avgBandSalary * (pensionContrib / 100) * niRate;
    const niSavings = savingsPerEmployee * employeeCount;
    
    return {
      bandName: band.bandName,
      salaryRange: `£${Math.round(band.minSalary).toLocaleString()} - £${Math.round(band.maxSalary).toLocaleString()}`,
      employeeCount,
      niSavings,
      savingsPerEmployee
    };
  });
}

export default SalaryBandsTab;