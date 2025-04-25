import React, { useState, useRef, useEffect } from 'react';

interface InfoTooltipProps {
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  maxWidth?: number;
  icon?: React.ReactNode;
}

/**
 * Information tooltip component with hover functionality
 * Displays an info icon that shows explanatory text on hover
 */
const InfoTooltip: React.FC<InfoTooltipProps> = ({
  content,
  position = 'top',
  maxWidth = 300,
  icon,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close tooltip
  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  // Position classes based on the position prop
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };

  // Default icon if none provided
  const defaultIcon = (
    <svg 
      viewBox="0 0 24 24" 
      width="18" 
      height="18" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="text-blue-600 hover:text-blue-700 focus:outline-none"
        onClick={() => setIsVisible(!isVisible)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        aria-label="Information"
      >
        {icon || defaultIcon}
      </button>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 p-3 bg-white border border-slate-200 rounded-md shadow-lg text-sm text-slate-700 ${
            positionClasses[position]
          }`}
          style={{ maxWidth }}
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-white border-${
              position === 'top' ? 'b' : position === 'bottom' ? 't' : ''
            } border-${
              position === 'left' ? 'r' : position === 'right' ? 'l' : ''
            } border-slate-200 transform rotate-45 ${
              position === 'top' ? 'bottom-[-5px] left-1/2 ml-[-4px] border-r' : 
              position === 'right' ? 'left-[-5px] top-1/2 mt-[-4px] border-b' : 
              position === 'bottom' ? 'top-[-5px] left-1/2 ml-[-4px] border-l' : 
              'right-[-5px] top-1/2 mt-[-4px] border-t'
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;