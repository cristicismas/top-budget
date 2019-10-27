import React from 'react';
import Toggle from './Toggle';
import './Performance.css';

const Performance = ({ toggleDisableAnimations, areAnimationsDisabled }) => {
  return (
    <section id="performance">
      <h2 className="sub-title">Performance</h2>

      <div className="performance-group">
        <h2 className="animations-title">Animations</h2>
        <Toggle handleChange={toggleDisableAnimations} toggled={!areAnimationsDisabled} />
      </div>
    </section>
  );
};

export default Performance;
