import { CalculatorType } from '../types/calculator';

interface CalculatorInfo {
  type: CalculatorType;
  title: string;
  description: string;
  iconSvg: string;
  gradient: string;
  benefits: string[];
}

// Define the calculators that are actually implemented and ready to use
const IMPLEMENTED_CALCULATORS = ['employer-ni', 'employee-savings', 'business-roi'];

export const calculatorData: CalculatorInfo[] = [
  { 
    type: 'employer-ni', 
    title: 'Employer NI Savings Calculator',
    description: 'Calculate employer National Insurance savings from salary sacrifice schemes. See how much your business can save by implementing benefits.',
    iconSvg: '<path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>' ,
    gradient: 'from-blue-600 to-blue-500',
    benefits: [
      'Reduce employer National Insurance contributions',
      'Calculate savings across your entire workforce',
      'See precise annual savings based on salary sacrifice amounts',
      'New: Multi-benefit scenario analysis and what-if projections'
    ]
  },
  { 
    type: 'employee-savings', 
    title: 'Employee Tax & NI Savings Calculator',
    description: 'Calculate employee tax and NI savings from salary sacrifice benefits. Help your employees understand their total benefits package value.',
    iconSvg: '<path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>',
    gradient: 'from-purple-600 to-purple-500',
    benefits: [
      'Demonstrate employee benefit value to your staff',
      'Calculate tax and NI savings for each employee',
      'Help employees make better decisions on benefit selection'
    ]
  },
  { 
    type: 'business-roi', 
    title: 'HR Systems ROI Calculator',
    description: 'Calculate ROI for HRIS, managed payroll, or payroll software. Assess the business case for investing in HR technology.',
    iconSvg: '<path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 14.5L11.5 10L14.5 13L19 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>',
    gradient: 'from-green-600 to-green-500',
    benefits: [
      'Calculate total cost of ownership for HR systems',
      'Quantify efficiency savings from automation',
      'Determine payback period and long-term ROI'
    ]
  },
  { 
    type: 'childcare-vouchers', 
    title: 'Childcare Vouchers Savings Calculator',
    description: 'Estimate savings from childcare voucher salary sacrifice. Calculate tax benefits for employees with children in qualifying childcare.',
    iconSvg: '<path d="M15 19C15 16.7909 13.2091 15 11 15C8.79086 15 7 16.7909 7 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M18 8L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M21 11L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>',
    gradient: 'from-amber-500 to-amber-400',
    benefits: [
      'Understand tax & NI savings on childcare costs',
      'Calculate monthly and annual benefit values',
      'Compare with other childcare support schemes'
    ]
  },
  { 
    type: 'holiday-trading', 
    title: 'Holiday Trading Calculator',
    description: 'Estimate impact of buying or selling annual leave. Calculate the financial implications of flexible holiday allowance.',
    iconSvg: '<rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M9 15L11 17L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>',
    gradient: 'from-indigo-600 to-indigo-500',
    benefits: [
      'See the true cost of buying additional holiday days',
      'Calculate net pay impact of selling unused leave',
      'Support flexible benefits through clear financial insights'
    ]
  },
  { 
    type: 'p11d-ev-car', 
    title: 'P11D Electric Vehicle Car Benefit Calculator',
    description: 'Calculate P11D value and tax impact for electric vehicle schemes. Assess the real cost of EV salary sacrifice and company car schemes.',
    iconSvg: '<path d="M17 3V7L19 9H5L7 7V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 13L5 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M19 13L19 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M3 9H21V13H3V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 21L16 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M5 18V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M19 18V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>',
    gradient: 'from-rose-600 to-rose-500',
    benefits: [
      'Calculate accurate P11D values for electric vehicles',
      'Compare costs with traditional combustion vehicles',
      'Understand BIK (Benefit in Kind) rates for EVs'
    ]
  }
];