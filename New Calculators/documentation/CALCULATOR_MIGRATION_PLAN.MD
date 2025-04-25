# Calculator Migration Plan

This document outlines a comprehensive plan to replace the existing calculator implementations with the improved architecture from the "New Calculators" folder.

## Core Principles

- **No God Files**: All files must be under 500 lines of code for maintainability
- **UK English**: All user-facing content must use UK English (including spellings like "organisation", "customise", etc.)
- **Separation of Concerns**: Clearly separate calculation logic, UI components, and state management
- **Accessibility**: Ensure all calculators are fully accessible
- **Type Safety**: Leverage TypeScript for robust type checking
- **Test Coverage**: Maintain comprehensive test coverage throughout the migration

## Phase 1: Setup and Preparation (2 Weeks)

### Week 1: Analysis and Planning

1. **Create a detailed inventory of existing calculators**
   - Document all calculator types and their functionality
   - Map dependencies between components
   - Identify entry points in the application
   
2. **Define the new directory structure**
   ```
   - src/
     - calculators/
       - core/
         - calculation-functions.ts
         - calculator-utils.ts
         - types.ts
       - employee-calculator/
       - employer-calculator/
       - roi-calculators/
       - shared/
         - components/
         - hooks/
   ```
   
3. **Create a compatibility layer**
   - Define adapter functions to maintain backwards compatibility
   - Document API changes between old and new implementations

4. **Set up testing infrastructure**
   - Create test data fixtures for each calculator type
   - Establish baseline expected results for verification

### Week 2: Core Structure Implementation

1. **Create the new directory structure** ✅
   - Set up the folders as defined in the plan
   - Add placeholder README files for documentation

2. **Migrate core calculation files** ✅
   - Move `calculationFunctions.ts` to `src/calculators/core/calculation-functions.ts` with appropriate modifications
   - Move `calculatorUtils.ts` to `src/calculators/core/calculator-utils.ts` with appropriate modifications
   - Create a consolidated `types.ts` file combining types from both implementations
   - Create an `index.ts` file to provide clean exports from the core module

3. **Implement shared components**
   - Migrate reusable UI components to `src/calculators/shared/components/`
   - Ensure all text is properly formatted in UK English

4. **Create shared hooks**
   - Migrate calculation hooks to `src/calculators/shared/hooks/`
   - Improve hooks with memoization for better performance

## Phase 2: Calculator Migration (6 Weeks)

### Week 3-4: Employer NI Calculator

1. **Migrate employer calculator logic**
   - Move core logic from `New Calculators/employer-calculator/` to the new structure
   - Split files over 500 lines into smaller, more focused components
   - Update component imports and references

2. **Implement employer calculator UI components**
   - Migrate form components
   - Migrate results display components
   - Ensure all text uses UK English

3. **Create methodology documentation**
   - Migrate methodology documentation
   - Ensure explanations use UK English
   - Improve documentation with additional examples

4. **Test and validate**
   - Verify calculations match expected results
   - Test UI components in isolation
   - Test integration with the rest of the application

### Week 5-6: Employee Benefit Calculators

1. **Migrate employee calculators**
   - Move employee benefit calculators to new structure
   - Divide large files into smaller components
   - Update references and imports

2. **Implement the Multi-Benefit configuration system**
   - Migrate the multi-benefit configuration components
   - Enhance with improved state management

3. **Create chart components**
   - Migrate chart components for visualizing results
   - Improve visual design and accessibility

4. **Test and validate**
   - Verify all calculations match expected results
   - Test UI components in isolation
   - Test integration with the rest of the application

### Week 7-8: ROI Calculators

1. **Migrate ROI calculators**
   - Move ROI calculators to the new structure
   - Split any files over 500 lines
   - Update imports and references

2. **Implement hooks for ROI calculations**
   - Migrate calculation hooks
   - Add memoization for expensive calculations
   - Ensure proper type safety

3. **Create methodology documentation**
   - Migrate and improve ROI calculator methodology
   - Ensure explanations use UK English
   - Add additional visual aids

4. **Test and validate**
   - Verify calculations match expected results
   - Test component integration
   - Validate methodology explanations

## Phase 3: Integration and Enhancement (4 Weeks)

### Week 9-10: Application Integration

1. **Update main application entry points**
   - Modify `src/components/CalculatorContent.tsx` to use new calculator components
   - Update `src/components/CalculatorSelect.tsx` with any new calculator options
   - Ensure seamless user experience during transition

2. **Implement scenario management**
   - Update scenario management to work with new calculators
   - Migrate `ScenarioTabs.tsx` to work with the new architecture
   - Update `AddScenarioModal.tsx` to support new calculator types

3. **Create consistent navigation**
   - Ensure consistent navigation between calculators
   - Update sidebar and navigation components
   - Maintain user state during calculator switching

4. **Test full application flow**
   - Verify end-to-end user journeys
   - Test all calculators in the integrated application
   - Fix any integration issues

### Week 11-12: Enhancements and Optimisation

1. **Improve state management**
   - Implement React Context for complex calculators
   - Add form state management with React Hook Form or Formik
   - Optimize re-renders with memoization

2. **Enhance visualisations**
   - Improve chart components with enhanced interactivity
   - Add ability to toggle between different visualization types
   - Ensure all charts are accessible

3. **Add data persistence**
   - Implement localStorage for saving calculator state
   - Add export/import functionality for calculator scenarios
   - Ensure data privacy and security

4. **Optimize performance**
   - Audit and improve calculation performance
   - Implement code splitting for large calculator components
   - Add progressive loading for better user experience

## Phase 4: Cleanup and Documentation (2 Weeks)

### Week 13: Removal of Legacy Code

1. **Deprecate old calculators**
   - Add deprecation warnings to old calculator components
   - Verify all functionality has been migrated
   - Remove old calculation engine files

2. **Clean up imports and dependencies**
   - Remove unused imports and components
   - Update package dependencies
   - Remove legacy code

3. **Final testing**
   - Verify all calculators function correctly
   - Test edge cases and error handling
   - Validate accessibility

### Week 14: Documentation and Training

1. **Update documentation**
   - Create comprehensive README files for each calculator
   - Document the component API and hook usage
   - Create usage examples

2. **Create development guidelines**
   - Document patterns for creating new calculators
   - Create style guide for consistent implementation
   - Document testing approach

3. **Create user documentation**
   - Update user-facing documentation
   - Ensure all documentation uses UK English
   - Create tutorial content for complex calculators

## Specific Improvements to New Calculators

### 1. Enhanced State Management

- Implement React Context for complex calculators to avoid prop drilling
- Add React Hook Form or Formik for better form handling and validation
- Create custom hooks for common state patterns

### 2. Calculation Performance

- Add memoization to expensive calculation functions
- Implement progressive calculation to improve UI responsiveness
- Add background calculation for complex scenarios

### 3. Accessibility Improvements

- Ensure all calculator inputs have proper labels and ARIA attributes
- Add keyboard navigation support
- Improve screen reader compatibility
- Add high contrast mode support

### 4. Enhanced Visualisation

- Implement more interactive charts with tooltips and animations
- Add the ability to switch between chart types (bar, line, pie)
- Improve mobile responsiveness of visualisations
- Add export options for charts (PNG, PDF)

### 5. Data Persistence

- Add ability to save and load calculator configurations
- Implement export/import of calculator scenarios
- Add option to generate shareable links

### 6. Improved Error Handling

- Add comprehensive input validation
- Implement friendly error messages
- Create fallback UI for error states
- Add logging for debugging

### 7. Methodology Transparency

- Enhance methodology documentation with clearer explanations
- Add references to authoritative sources
- Include calculation examples
- Create interactive examples to demonstrate concepts

## Progress Update - April 23, 2025

### Completed Tasks:

1. **Core Structure Implementation** ✅
   - Created the new directory structure in `src/calculators/core/`
   - Migrated calculation functions from `calculationFunctions.ts` to `src/calculators/core/calculation-functions.ts`
   - Migrated utility functions from `calculatorUtils.ts` to `src/calculators/core/calculator-utils.ts`
   - Created a consolidated `types.ts` file
   - Created an `index.ts` file for clean exports

### Core Module Improvements:

1. **Code Organization** 
   - Split functionalities into logical modules
   - Ensured all exported functions and types are properly documented
   - Used consistent naming conventions throughout the codebase

2. **Enhanced Typings**
   - Added more explicit typing for calculations and configuration objects
   - Created type guards for type checking at runtime
   - Added interfaces for all calculator result objects

3. **Extended Utilities**
   - Added additional formatting functions
   - Improved chart data generation utilities
   - Added multi-year projection utilities

### Next Steps:

1. **Shared Components**
   - Migrate and create reusable UI components
   - Ensure consistent styling and accessibility

2. **Employer NI Calculator**
   - Start migrating employer calculator logic and UI components
   - Implement new form validation

## Testing Strategy

### Unit Testing

- Test all calculation functions in isolation
- Verify calculations match expected results for known inputs
- Test edge cases and error handling

### Component Testing

- Test UI components in isolation
- Verify component props and events
- Test accessibility with automated tools

### Integration Testing

- Test calculator components integrated with the application
- Verify data flow between components
- Test user interactions

### End-to-End Testing

- Test complete user journeys
- Verify calculations in the context of the full application
- Test across different browsers and devices

## Migration Checklist for Each Calculator

- [x] Core calculation logic migrated *(completed for core module)*
- [x] Types defined and validated *(completed for core module)*
- [ ] UI components created and styled
- [ ] Form validation implemented
- [ ] Results display components created
- [ ] Charts and visualisations implemented
- [ ] Methodology documentation updated
- [ ] Unit tests created
- [ ] Integration tests created
- [ ] User documentation updated
- [ ] Accessibility verified
- [ ] UK English verified for all user-facing text

## Conclusion

This migration plan provides a comprehensive roadmap for replacing the existing calculators with the improved architecture from the "New Calculators" folder. By following this plan, we will create a more maintainable, performant, and user-friendly calculator system while ensuring all user-facing content is in UK English and no file exceeds 500 lines of code.

The estimated timeline for this migration is 14 weeks, but this may vary based on complexity and team size. Regular progress reviews should be scheduled to track the migration and address any issues that arise.