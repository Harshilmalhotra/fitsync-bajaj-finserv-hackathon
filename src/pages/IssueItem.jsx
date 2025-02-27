import React from 'react';

const IssueItem = ({ title, severity, recommendation }) => {
  const severityColor =
    severity === 'Severe' ? 'bg-red-100 text-red-600' :
      severity === 'Moderate' ? 'bg-orange-100 text-orange-600' :
        severity === 'Mild' ? 'bg-yellow-100 text-yellow-600' :
          'bg-green-100 text-green-600';

  return (
    <div className="border-b border-gray-100 pb-3">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-medium">{title}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${severityColor}`}>
          {severity}
        </span>
      </div>
      <p className="text-gray-500 text-sm">{recommendation}</p>
    </div>
  );
};

export default IssueItem;