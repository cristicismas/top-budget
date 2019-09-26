import React from 'react';
import '../../css/Overlay.css';

const Overlay = props => {
  return (
    <div className="overlay-container">
      <div className="overlay">
        <button type="button" className="close-overlay-btn" onClick={() => props.closeOverlay()}>
          ✕
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Overlay;
