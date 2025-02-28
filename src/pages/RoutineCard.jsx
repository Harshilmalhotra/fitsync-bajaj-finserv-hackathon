import React from 'react';

const RoutineCard = ({ title, exercises, duration, level }) => {
  const colors = {
    primary: "#0F172A",  // Deep Dark Background (Sidebar, Navbar)
    secondary: "#1E293B", // Card & Section Background
    accent: "#3B82F6", // Primary Accent (Buttons, Highlights, Charts)
    accentSecondary: "#8B5CF6", // Secondary Accent (Interactive Elements)
    textPrimary: "#E2E8F0", // Light Text for Readability
    textSecondary: "#94A3B8", // Muted Text (Less Important Info)
    border: "#334155", // Border Color for Separation
  };

  return (
    <div 
      className="rounded-lg p-6"
      style={{ 
        backgroundColor: colors.secondary,
        borderColor: colors.border,
        border: '1px solid',
      }}
    >
      <h3 className="font-semibold text-xl mb-4" style={{ color: colors.textPrimary }}>
        {title}
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center" style={{ color: colors.textSecondary }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>{exercises} exercises</span>
        </div>
        
        <div className="flex items-center" style={{ color: colors.textSecondary }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{duration}</span>
        </div>
        
        <div className="flex items-center" style={{ color: colors.textSecondary }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>{level}</span>
        </div>
      </div>
      
      <button 
        className="mt-6 w-full py-3 rounded-md text-center font-medium transition-colors"
        style={{ 
          backgroundColor: colors.accent,
          color: colors.textPrimary,
        }}
      >
        Start Routine
      </button>
    </div>
  );
};

export default RoutineCard;