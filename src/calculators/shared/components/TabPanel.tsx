import React from 'react';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
  id?: string;
}

/**
 * TabPanel - A reusable component for tabbed interfaces
 * 
 * Used for displaying content in tabs across calculator interfaces
 * Handles accessibility attributes for tab panels
 */
export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  id = 'tabpanel'
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${id}-${index}`}
      aria-labelledby={`${id}-tab-${index}`}
      className="py-4"
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;