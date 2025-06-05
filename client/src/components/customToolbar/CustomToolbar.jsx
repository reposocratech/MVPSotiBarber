import React from 'react';

const CustomToolbar = ({ label, onNavigate, onView, views, view }) => {
  return (
    <div className="rbc-toolbar">
      <div className="rbc-btn-group">
        <button onClick={() => onNavigate('PREV')}>‹</button>
        <button onClick={() => onNavigate('TODAY')}>Hoy</button>
        <button onClick={() => onNavigate('NEXT')}>›</button>
      </div>
      <span className="rbc-toolbar-label">{label}</span>
      <div className="rbc-btn-group">
        {views.map((v) => (
          <button
            key={v}
            className={v === view ? 'rbc-active' : ''}
            onClick={() => onView(v)}
          >
            {v === 'day' ? 'Día' : v === 'week' ? 'Semana' : v}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomToolbar;