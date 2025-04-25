'use client';

import React from 'react';
import { CalculatorType } from '../types/calculator';

interface ScenarioTabsProps {
  scenarios: { id: string; name: string }[];
  activeScenarioId: string;
  setActiveScenarioId: (id: string) => void;
  removeScenario: (id: string) => void;
  onAddScenario: () => void;
}

const ScenarioTabs: React.FC<ScenarioTabsProps> = ({
  scenarios,
  activeScenarioId,
  setActiveScenarioId,
  removeScenario,
  onAddScenario,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 w-full">
      {scenarios.map(s => (
        <button
          key={s.id}
          className={`px-4 py-2 rounded-t flex items-center transition-all duration-300 hover:bg-white/90 ${
            s.id === activeScenarioId 
              ? 'bg-white shadow-lg text-primary-700 font-medium border-b-2 border-primary-500' 
              : 'bg-white/80 text-charcoal-500'
          }`}
          onClick={() => setActiveScenarioId(s.id)}
        >
          {s.name}
          {scenarios.length > 1 && (
            <span
              className="ml-2 w-5 h-5 flex items-center justify-center rounded-full text-xs bg-red-100 text-red-600 hover:bg-red-200"
              onClick={e => { e.stopPropagation(); removeScenario(s.id); }}
              aria-label="Remove scenario"
            >×</span>
          )}
        </button>
      ))}
      <button
        className="px-4 py-2 rounded-t bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium hover:from-primary-700 hover:to-primary-600 shadow-lg transition-all duration-300"
        onClick={onAddScenario}
        aria-label="Add scenario"
      >
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add Scenario
        </span>
      </button>
    </div>
  );
};

export default ScenarioTabs;