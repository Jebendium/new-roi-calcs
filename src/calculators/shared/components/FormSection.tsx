import React from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * FormSection - A reusable section container for form inputs
 * 
 * Used to group related inputs with a title and optional description
 */
export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  icon
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-start mb-4">
        {icon && (
          <div className="shrink-0 mr-3">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-slate-600">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormSection;