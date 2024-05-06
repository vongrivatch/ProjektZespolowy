import React from 'react';
import { Navigate } from 'react-big-calendar';

const CustomToolbar = ({ onNavigate, label }) => {
  const goToBack = () => {
    onNavigate(Navigate.PREVIOUS);
  };

  const goToNext = () => {
    onNavigate(Navigate.NEXT);
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

export default CustomToolbar