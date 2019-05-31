import React from 'react';
import '../css/Hero.css';

function Hero() {
  return (
    <section id="hero">
      <div id="intro">
        <h1>TopBudget</h1>
        <h2>Money management made easy.</h2>
      </div>
      <ul id="features">
        <div className="feature-group">
          <li className="feature">Very easy to add expenses</li>
          <li className="feature">Easy to understand graphs</li>
          <li className="feature">Intuitive design</li>
        </div>
        
        <div className="feature-group">
          <li className="feature">Works great on any device</li>
          <li className="feature">Ability to track how much you spend</li>
          <li className="feature">Completely FREE!</li>
        </div>
      </ul>
    </section>
  );
}

export default Hero;