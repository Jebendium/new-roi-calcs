import React, { useState } from 'react';

interface InfoTooltipProps {
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

/**
 * InfoTooltip - A reusable tooltip component for displaying additional information
 * 
 * Used primarily in form fields to provide explanatory context
 */
export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  content,
  position = 'top'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2'
  };
  
  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 border-t-slate-800 border-l-transparent border-r-transparent border-b-transparent',
    right: 'left-[-6px] top-1/2 transform -translate-y-1/2 border-r-slate-800 border-t-transparent border-b-transparent border-l-transparent',
    bottom: 'top-[-6px] left-1/2 transform -translate-x-1/2 border-b-slate-800 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-6px] top-1/2 transform -translate-y-1/2 border-l-slate-800 border-t-transparent border-b-transparent border-r-transparent'
  };
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <button
        type="button"
        className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="More information"
      >
        i
      </button>
      
      {isVisible && (
        <div className={`absolute z-10 w-64 ${positionClasses[position]}`}>
          <div className="bg-slate-800 text-white text-xs rounded py-2 px-3 shadow-lg">
            <div className={`absolute border-4 ${arrowClasses[position]}`}></div>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;