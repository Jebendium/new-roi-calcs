'use client';

import React from 'react';

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

/**
 * TabPanel component that shows/hides content based on the active tab
 */
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className={value === index ? 'block' : 'hidden'}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;