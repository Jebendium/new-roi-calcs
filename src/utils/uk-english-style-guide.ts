/**
 * UK English Style Guide for ROI Calculators
 * 
 * This document outlines the spelling, punctuation and terminology standards
 * to be used throughout the application to maintain UK English consistency.
 */

/**
 * UK English Spelling Variants
 * 
 * Use these UK English spellings instead of US English alternatives:
 * 
 * - "Organisation" not "Organization"
 * - "Centre" not "Center"
 * - "Colour" not "Color"
 * - "Optimise" not "Optimize"
 * - "Customise" not "Customize"
 * - "Analyse" not "Analyze"
 * - "Specialised" not "Specialized"
 * - "Maximise" not "Maximize"
 * - "Visualise" not "Visualize"
 * - "Utilise" not "Utilize"
 * - "Enquiry" not "Inquiry"
 * - "Licence" (noun) "License" (verb)
 * - "Behaviour" not "Behavior"
 * - "Labour" not "Labor"
 * - "Fulfil" not "Fulfill"
 * - "Enrol" not "Enroll"
 * - "Travelled" not "Traveled"
 */

/**
 * UK Currency Formatting
 * 
 * Always use the UK pound symbol (£) before numbers
 * Use comma separators for thousands: £1,000
 * For currency formatting, use:
 * 
 * new Intl.NumberFormat('en-GB', {
 *   style: 'currency',
 *   currency: 'GBP',
 *   minimumFractionDigits: 2,
 *   maximumFractionDigits: 2,
 * }).format(value);
 */

/**
 * UK Date Formatting
 * 
 * Use day/month/year format: DD/MM/YYYY
 * For tax years, use the format: 2025-2026
 * 
 * For date formatting use:
 * 
 * new Intl.DateTimeFormat('en-GB', {
 *   day: '2-digit',
 *   month: '2-digit',
 *   year: 'numeric'
 * }).format(date);
 */

/**
 * UK Financial and HR Terminology
 * 
 * - "National Insurance" not "Social Security"
 * - "Pension Scheme" not "Pension Plan"
 * - "Salary Sacrifice" not "Salary Reduction"
 * - "HMRC" not "IRS"
 * - "PAYE" not "W2"
 * - "P11D" for benefit in kind value forms
 * - "Annual Leave" not "Vacation Time"
 * - "Redundancy" not "Layoff"
 * - "Notice Period" not "Notice" 
 * - "Holiday Trading" not "Vacation Trading"
 * - "Childcare Vouchers" not "Childcare Assistance"
 */

/**
 * HR and Payroll Abbreviations
 * 
 * - NI: National Insurance
 * - HMRC: Her Majesty's Revenue and Customs
 * - PAYE: Pay As You Earn
 * - CIPD: Chartered Institute of Personnel and Development
 * - CIPP: Chartered Institute of Payroll Professionals
 * - HRIS: Human Resource Information System
 * - BiK: Benefit in Kind
 */

/**
 * Tax Constants (2025-2026)
 * 
 * These are the current tax constants used in calculations:
 * 
 * - Personal Allowance: £12,570
 * - Basic Rate Threshold: £50,270
 * - Higher Rate Threshold: £125,140
 * - NI Primary Threshold: £12,570
 * - NI Secondary Threshold: £5,000 (not £9,100)
 * - NI Upper Earnings Limit: £50,270
 * 
 * Rates:
 * - Basic Rate: 20%
 * - Higher Rate: 40% 
 * - Additional Rate: 45%
 * - NI Primary Rate: 12%
 * - NI Secondary Rate: 15%
 * - NI Primary Upper Rate: 2%
 * - NI Secondary Upper Rate: 15%
 */

export {};
