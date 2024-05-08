import React from 'react';
import PropTypes from 'prop-types';

const CustomToolbar = ({ label, onNavigate }) => {
  const navigate = (action) => {
    onNavigate(action);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => navigate('PREV')}>&lt;</button>
        <span className="rbc-toolbar-label">{label}</span>
        <button type="button" onClick={() => navigate('NEXT')}>&gt;</button>
      </span>
    </div>
  );
};

CustomToolbar.propTypes = {
  label: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default CustomToolbar;
