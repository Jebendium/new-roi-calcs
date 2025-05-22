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
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

interface NISavingsChartProps {
  originalNI: number;
  reducedNI: number;
  niSavings: number;
}

interface BenefitBreakdownChartProps {
  benefitBreakdown: {
    [key: string]: {
      niSavings: number;
      additionalSavings: number;
      totalSavings: number;
    };
  };
}

interface MultiYearProjectionProps {
  projectionData: Array<{
    year: string | number;
    employees: number;
    averageSalary: number;
    annualSavings: number;
    cumulativeSavings: number;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const BENEFIT_LABELS: Record<string, string> = {
  'pension': 'Pension',
  'cycle': 'Cycle to Work',
  'car': 'EV Car Scheme',
  'childcare': 'Childcare Vouchers',
  'holiday': 'Holiday Trading'
};

/**
 * NI Savings Comparison Chart showing original vs reduced NI liability
 */
export const NISavingsComparisonChart: React.FC<NISavingsChartProps> = ({ 
  originalNI,
  reducedNI,
  niSavings
}) => {
  const data = [
    { name: 'Original NI', value: originalNI },
    { name: 'Reduced NI', value: reducedNI },
    { name: 'NI Savings', value: niSavings }
  ];

  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="chart-container">
      <h4 className="text-lg font-semibold mb-4">NI Liability Comparison</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Legend />
          <Bar 
            dataKey="value" 
            name="Amount" 
            fill="#1890ff"
            barSize={30}
          >
            {data.map((entry, index) => {
              let color;
              if (index === 0) color = '#ff4d4f'; // red for original NI
              else if (index === 1) color = '#52c41a'; // green for reduced NI
              else color = '#1890ff'; // blue for savings
              
              return <Cell key={`cell-${index}`} fill={color} radius={[4, 4, 0, 0]} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Benefit Breakdown Chart showing savings from each benefit type
 */
export const BenefitBreakdownChart: React.FC<BenefitBreakdownChartProps> = ({ benefitBreakdown }) => {
  const data = Object.entries(benefitBreakdown).map(([key, value]) => ({
    name: BENEFIT_LABELS[key] || key,
    niSavings: value.niSavings,
    additionalSavings: value.additionalSavings,
    totalSavings: value.totalSavings
  }));

  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (data.length === 0) return null;

  return (
    <div className="chart-container">
      <h4 className="text-lg font-semibold mb-4">Savings by Benefit Type</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Legend />
          <Bar dataKey="niSavings" name="NI Savings" fill="#1890ff" stackId="a" radius={[4, 4, 0, 0]} />
          <Bar dataKey="additionalSavings" name="Additional Savings" fill="#52c41a" stackId="a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * NI Savings Distribution Pie Chart showing percentage breakdown of savings
 */
export const NISavingsDistributionChart: React.FC<BenefitBreakdownChartProps> = ({ benefitBreakdown }) => {
  const data = Object.entries(benefitBreakdown)
    .filter(([_, value]) => value.totalSavings > 0)
    .map(([key, value]) => ({
      name: BENEFIT_LABELS[key] || key,
      value: value.totalSavings
    }));

  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercentage = (value: number, total: number) => {
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  const totalSavings = data.reduce((sum, item) => sum + item.value, 0);

  if (data.length === 0) return null;

  return (
    <div className="chart-container">
      <h4 className="text-lg font-semibold mb-4">Savings Distribution</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="60%"
            cy="50%"
            labelLine={true}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${formatPercentage(value, totalSavings)}`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [
              formatCurrency(Number(value)), 
              `${formatPercentage(Number(value), totalSavings)}`
            ]} 
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Multi-Year Projection Chart showing annual and cumulative savings over time
 */
export const MultiYearProjectionChart: React.FC<MultiYearProjectionProps> = ({ projectionData }) => {
  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (!projectionData || projectionData.length === 0) return null;

  return (
    <div className="chart-container">
      <h4 className="text-lg font-semibold mb-4">Multi-Year Projection</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={projectionData}
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis yAxisId="left" tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
          <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Legend />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="annualSavings" 
            name="Annual Savings" 
            stroke="#1890ff" 
            strokeWidth={2}
            activeDot={{ r: 8 }} 
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="cumulativeSavings" 
            name="Cumulative Savings" 
            stroke="#ff4d4f" 
            strokeWidth={2}
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Salary Impact Chart showing the impact on salary bands
 */
export const SalaryImpactChart: React.FC<{
  salaryBands: Array<{
    bandName: string;
    employeeCount: number;
    averageSalary: number;
    niSavings: number;
  }>;
}> = ({ salaryBands }) => {
  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (!salaryBands || salaryBands.length === 0) return null;

  return (
    <div className="chart-container">
      <h4 className="text-lg font-semibold mb-4">Savings by Salary Band</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={salaryBands}
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bandName" />
          <YAxis tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Legend />
          <Bar dataKey="niSavings" name="NI Savings" fill="#1890ff" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Savings Trend Chart showing NI savings over time (for when comparing multiple years)
 */
export const SavingsTrendChart: React.FC<{
  trendData: Array<{
    year: string;
    niSavings: number;
  }>;
}> = ({ trendData }) => {
  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (!trendData || trendData.length === 0) return null;

  return (
    <div className="chart-container">
      <h4 className="text-lg font-semibold mb-4">Savings Trend</h4>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={trendData}
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="niSavings" 
            name="NI Savings" 
            stroke="#8884d8" 
            fill="#8884d8" 
            fillOpacity={0.3} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
