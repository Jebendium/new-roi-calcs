import React from 'react';
import { 
  Grid, 
  Box, 
  Button
} from '@mui/material';
import { BenefitType, BenefitConfig } from '../../lib/calculationFunctions';
import WhatIfScenario from './WhatIfScenario';
import CalculatorForm from './CalculatorForm';
import { SelectChangeEvent } from '@mui/material';

interface WhatIfScenarioTabProps {
  taxYear: string;
  employeeCount: string;
  averageSalary: string;
  benefitConfig: {
    [key in BenefitType]: BenefitConfig;
  };
  scenarioBenefitConfig: {
    [key in BenefitType]: BenefitConfig;
  };
  onTaxYearChange: (event: SelectChangeEvent) => void;
  onEmployeeCountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAverageSalaryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOriginalConfigChange: (benefitType: BenefitType, config: BenefitConfig) => void;
  onScenarioConfigChange: (benefitType: BenefitType, config: BenefitConfig) => void;
  onCalculateScenario: () => void;
  onResetScenario: () => void;
}

/**
 * Component for the What-If Scenario tab
 */
const WhatIfScenarioTab: React.FC<WhatIfScenarioTabProps> = ({
  taxYear,
  employeeCount,
  averageSalary,
  benefitConfig,
  scenarioBenefitConfig,
  onTaxYearChange,
  onEmployeeCountChange,
  onAverageSalaryChange,
  onOriginalConfigChange,
  onScenarioConfigChange,
  onCalculateScenario,
  onResetScenario
}) => {
  return (
    <>
      <CalculatorForm
        taxYear={taxYear}
        employeeCount={employeeCount}
        averageSalary={averageSalary}
        onTaxYearChange={onTaxYearChange}
        onEmployeeCountChange={onEmployeeCountChange}
        onAverageSalaryChange={onAverageSalaryChange}
      />
      
      <Grid item xs={12}>
        <WhatIfScenario
          originalConfig={benefitConfig}
          scenarioConfig={scenarioBenefitConfig}
          onOriginalChange={onOriginalConfigChange}
          onScenarioChange={onScenarioConfigChange}
        />
      </Grid>
      
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onResetScenario}>
            Reset Scenario
          </Button>
          <Button variant="contained" onClick={onCalculateScenario}>
            Calculate Scenario
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default WhatIfScenarioTab;
