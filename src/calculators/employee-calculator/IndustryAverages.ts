// Central reference for industry averages and thresholds for insights

export const INDUSTRY_AVERAGES = {
  totalAnnualSavings: 1200, // Typical annual employee savings (example, £)
  niSavings: 800,           // Typical annual NI savings (example, £)
  taxSavings: 400           // Typical annual tax savings (example, £)
};

export function getSavingsInsight(savings: number, average: number) {
  if (savings > average * 1.2) {
    return {
      type: 'success',
      message: `Your savings are significantly above the UK average. Well done!`
    };
  } else if (savings > average) {
    return {
      type: 'info',
      message: `Your savings are above the UK average.`
    };
  } else if (savings > average * 0.8) {
    return {
      type: 'warning',
      message: `Your savings are close to the UK average. Consider optimising your benefits.`
    };
  } else {
    return {
      type: 'error',
      message: `Your savings are below the UK average. Review your benefit selections for improvement opportunities.`
    };
  }
}
