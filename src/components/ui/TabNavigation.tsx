import React from 'react';

interface TabNavigationProps {
  tabs: string[];
  activeTabIndex: number;
  onTabChange: (index: number) => void;
  className?: string;
}

/**
 * Standardized tab navigation component for multi-step calculators
 * To be used across all calculators for consistent UI/UX
 */
const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTabIndex,
  onTabChange,
  className = '',
}) => {
  return (
    <div className={`flex overflow-x-auto border-b border-slate-200 mb-6 ${className}`}>
      {tabs.map((label, idx) => (
        <button
          key={label}
          className={`py-2 px-6 -mb-px border-b-2 font-medium transition-all duration-200 focus:outline-none ${
            activeTabIndex === idx
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-blue-600 hover:border-blue-200 bg-slate-50'
          }`}
          onClick={() => onTabChange(idx)}
          aria-selected={activeTabIndex === idx}
          aria-controls={`tab-panel-${idx}`}
          role="tab"
          tabIndex={0}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;