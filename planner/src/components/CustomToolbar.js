import React from 'react';

const CustomToolbar = ({ label, onNavigate }) => {
  const goToBack = () => {
    onNavigate('PREVIOUS');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToBack}>&lt;</button>
        <span className="rbc-toolbar-label">{label}</span>
        <button type="button" onClick={goToNext}>&gt;</button>
      </span>
    </div>
  );
};

export default CustomToolbar;