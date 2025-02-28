import React from 'react';

const WorkoutCard = ({ title, target, duration, difficulty, category, condition, image, youtubeLink, colors }) => {
  // Use passed colors or define defaults if not provided
  const cardColors = colors || {
    primary: "#0F172A",    
    secondary: "#1E293B",  
    accent: "#3B82F6",     
    accentSecondary: "#8B5CF6", 
    textPrimary: "#E2E8F0", 
    textSecondary: "#94A3B8", 
    border: "#334155",     
  };

  // Function to handle card click
  const handleCardClick = () => {
    if (youtubeLink) {
      window.open(youtubeLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
      role="button"
      aria-label={`View ${title} workout on YouTube`}
      tabIndex={0}
      onKeyDown={(e) => {
        // Open link on Enter or Space key
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      style={{
        backgroundColor: cardColors.secondary,
        borderColor: cardColors.border,
        borderWidth: '1px'
      }}
    >
      <div className="h-48 bg-gray-800 relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {youtubeLink && (
          <div className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ 
            backgroundColor: cardColors.accentSecondary, 
            color: cardColors.textPrimary 
          }}>
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg" style={{ color: cardColors.textPrimary }}>{title}</h3>
        
        <div className="mt-1 mb-2 flex items-center">
          <span style={{ 
            color: cardColors.textSecondary, 
            backgroundColor: `${cardColors.border}50`,
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.75rem'
          }}>
            {condition}
          </span>
        </div>
        
        <p style={{ color: cardColors.textSecondary }} className="text-sm">Target: {target}</p>
        
        <div className="flex justify-between mt-3 text-sm">
          <span className="px-2 py-1 rounded" style={{ 
            backgroundColor: `${cardColors.accent}20`, 
            color: cardColors.accent 
          }}>
            {duration}
          </span>
          <span className="px-2 py-1 rounded" style={{ 
            backgroundColor: 
              difficulty === 'Beginner' ? '#10b98120' : 
              difficulty === 'Intermediate' ? '#f59e0b20' : 
              '#ef444420',
            color: 
              difficulty === 'Beginner' ? '#10b981' : 
              difficulty === 'Intermediate' ? '#f59e0b' : 
              '#ef4444'
          }}>
            {difficulty}
          </span>
        </div>
        
        {youtubeLink && (
          <div className="mt-3 flex items-center text-sm" style={{ color: cardColors.accent }}>
            <span>Watch tutorial</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;