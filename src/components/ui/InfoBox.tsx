import React from 'react';

interface InfoBoxProps {
  title?: string;
  variant?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

/**
 * Information box component for displaying important contextual information
 * Used across calculators to provide consistent guidance and explanation
 */
const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  variant = 'info',
  children,
  className = '',
  icon,
}) => {
  const variantStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  };

  const iconColor = {
    info: 'text-blue-600',
    warning: 'text-amber-600',
    success: 'text-green-600',
  };

  return (
    <div
      className={`border rounded-lg p-4 ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-start gap-3">
        {icon && <div className={`mt-0.5 ${iconColor[variant]}`}>{icon}</div>}
        <div>
          {title && (
            <h4 className="font-semibold text-base mb-1">{title}</h4>
          )}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;