import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

interface BenefitSavingsResult {
  taxSavings: number;
  niSavings: number;
  totalSavings: number;
  takeHomeIncrease: number;
}

interface EmployeeCalculationResult {
  annualTaxSavings: number;
  annualNISavings: number;
  totalAnnualSavings: number;
  monthlyTakeHomeIncrease: number;
  benefitBreakdown: {
    [key: string]: BenefitSavingsResult;
  };
  projectionResults?: {
    totalContributions: number;
    potValue: number;
  } | null;
}

interface EmployeeSavingsChartsProps {
  result: EmployeeCalculationResult;
  grossSalary: string;
}

// Define standard color palette to match the Employer NI calculator
const COLORS = ['#1890ff', '#52c41a', '#ff4d4f', '#faad14', '#722ed1'];

// Explicitly define colors for the pension projection chart
const CONTRIBUTION_COLOR = '#1890ff'; // Blue for contributions
const PENSION_POT_COLOR = '#52c41a'; // Green for pension pot

/**
 * EmployeeSavingsCharts component for visualizing Employee Tax & NI Savings results
 */
const EmployeeSavingsCharts: React.FC<EmployeeSavingsChartsProps> = ({ result, grossSalary }) => {
  // Calculate taxable pay after benefits
  const calculateTaxablePayAfterBenefits = (originalSalary: number, benefitBreakdown: Record<string, BenefitSavingsResult>): number => {
    // Calculate total annual sacrifice amount
    let totalSacrificeAmount = 0;
    
    // Sum up the sacrifice amounts
    Object.entries(benefitBreakdown).forEach(([_benefitType, data]) => {
      // Actual amount sacrificed is tax savings + NI savings divided by respective rates
      // This is a simplification - in a real scenario, we would use the exact sacrifice amounts
      // For this visualization, we'll use the total savings divided by average tax rate as an approximation
      if (data.totalSavings > 0) {
        const approximateSacrifice = (data.taxSavings + data.niSavings) / 0.32; // Approximate average tax + NI rate
        totalSacrificeAmount += approximateSacrifice;
      }
    });
    
    return Math.max(0, originalSalary - totalSacrificeAmount);
  };

  // Format benefit types for display
  const formatBenefitType = (type: string): string => {
    const benefitTypeMap: Record<string, string> = {
      'PENSION': 'Pension',
      'CYCLE_TO_WORK': 'Cycle to Work',
      'EV_CAR_SCHEME': 'Electric Vehicle',
      'CHILDCARE': 'Childcare',
      'HOLIDAY_TRADING': 'Holiday Trading'
    };
    return benefitTypeMap[type] || type;
  };
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Data for tax vs NI savings pie chart
  const taxVsNISavingsData = [
    { name: 'Tax Savings', value: result.annualTaxSavings },
    { name: 'NI Savings', value: result.annualNISavings }
  ];

  // Prepare data for benefit breakdown bar chart
  const benefitBreakdownData = Object.entries(result.benefitBreakdown).map(([benefitType, data]) => ({
    name: formatBenefitType(benefitType),
    'Tax Savings': data.taxSavings,
    'NI Savings': data.niSavings
  }));

  // Generate pension projection data for the area chart (if enabled)
  const generatePensionProjectionData = () => {
    if (!result.projectionResults) return [];
    
    const yearlyContribution = result.projectionResults.totalContributions / 30;
    const data = [];
    let accumulatedAmount = 0;
    
    for (let year = 0; year <= 30; year++) {
      if (year > 0) {
        // 5% growth on previous year plus new contribution
        accumulatedAmount = (accumulatedAmount * 1.05) + yearlyContribution;
      }
      
      data.push({
        year,
        contributions: Math.round(year * yearlyContribution),
        potValue: Math.round(accumulatedAmount)
      });
    }
    
    return data;
  };

  const pensionProjectionData = generatePensionProjectionData();

  return (
    <div className="mt-8 space-y-8">
      {/* First row - Tax vs NI Savings and Benefit Breakdown side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tax vs NI Savings Breakdown */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Tax & NI Savings Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taxVsNISavingsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taxVsNISavingsData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            <p>This chart shows the proportion of your savings from reduced Income Tax versus reduced National Insurance contributions.</p>
          </div>
        </div>

        {/* Benefit Breakdown Bar Chart */}
        {benefitBreakdownData.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-medium text-slate-800 mb-4">Benefit Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={benefitBreakdownData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `£${Math.round(value)}`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend verticalAlign="bottom" height={36} />
                  <Bar dataKey="Tax Savings" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="NI Savings" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              <p>This chart shows the tax and NI savings for each benefit you&apos;ve selected.</p>
            </div>
          </div>
        )}
      </div>

      {/* Pension Projection Area Chart (only if projection exists) */}
      {result.projectionResults && pensionProjectionData.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-medium text-slate-800 mb-4">30-Year Pension Projection</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={pensionProjectionData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year" 
                  label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} 
                />
                <YAxis 
                  tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} 
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))} 
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend verticalAlign="bottom" height={36} />
                {/* IMPORTANT: Render pension pot area FIRST (will be at the bottom) */}
                <Area 
                  type="monotone" 
                  dataKey="potValue" 
                  name="Pension Pot Value" 
                  stroke="#52c41a" 
                  fill="#52c41a" 
                  fillOpacity={0.6}
                />
                {/* IMPORTANT: Render contributions area SECOND (will be on top) */}
                <Area 
                  type="monotone" 
                  dataKey="contributions" 
                  name="Your Contributions" 
                  stroke="#1890ff" 
                  fill="#1890ff" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            <p>The chart shows your contributions (blue) and the projected growth of your pension pot (green) over 30 years, assuming a 5% annual growth rate.</p>
          </div>
        </div>
      )}

      {/* Taxable Pay Comparison */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-medium text-slate-800 mb-4">Taxable Pay Comparison</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: 'Before Benefits', value: Number(grossSalary), fill: COLORS[0] },
                { name: 'After Benefits', value: calculateTaxablePayAfterBenefits(Number(grossSalary), result.benefitBreakdown), fill: COLORS[1] }
              ]}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                domain={[0, Number(grossSalary) * 1.1]} 
              />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend verticalAlign="bottom" height={36} />
              <Bar 
                dataKey="value" 
                name="Taxable Pay"
                radius={[4, 4, 0, 0]}
              >
                {[
                  { name: 'Before Benefits', fill: COLORS[0] },
                  { name: 'After Benefits', fill: COLORS[1] }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-xs text-slate-500">
          <p>This chart shows your taxable pay before and after salary sacrifice benefits, illustrating the reduction in taxable income.</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSavingsCharts;
