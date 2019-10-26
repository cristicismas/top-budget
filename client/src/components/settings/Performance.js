import React from 'react';
import './Performance.css';

const Performance = ({ disableAnimations, areAnimationsDisabled }) => {
  return (
    <section id="performance">
      <h2 className="sub-title">Performance</h2>

      {areAnimationsDisabled ? (
        <button id="disable-animations-btn" onClick={disableAnimations}>
          Enable animations
        </button>
      ) : (
        <button id="disable-animations-btn" onClick={disableAnimations}>
          Disable animations
        </button>
      )}
    </section>
  );
};

export default Performance;
