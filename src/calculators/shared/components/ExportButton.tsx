import React from 'react';

export interface ExportButtonProps {
  onClick: () => void;
  label?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ 
  onClick, 
  label = 'Export' 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {label}
    </button>
  );
};
