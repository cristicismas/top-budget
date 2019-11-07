import React from 'react';
import heroGraph from '../../images/hero-graph.svg';
import { useSelector } from 'react-redux';
import ICONS from '../../constants/icons';
import Icon from '../general/Icon';
import { Link } from 'react-router-dom';
import './Hero.css';

const scrollToFeatures = () => {
  const features = document.getElementById('features');

  features.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

const Hero = () => {
  const user = useSelector(state => state.user);
  const { isAuthenticated } = user;

  return (
    <section id="hero">
      <div className="flex-group">
        <div className="text" data-aos="fade-right">
          <div id="intro">
            <h1 className="title">TopBudget</h1>
            <h2 className="subtitle">Manage your expenses with ease.</h2>
          </div>

          {isAuthenticated ? (
            <div className="cta-buttons">
              <Link to="/dashboard" className="primary">
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="cta-buttons">
              <Link to="/login" className="secondary">
                Log in
              </Link>
              <Link to="/signup" className="primary">
                Get Started
              </Link>
            </div>
          )}
        </div>

        <img src={heroGraph} data-aos="fade-left" alt="Bar Chart" className="hero-image" />
      </div>

      <button type="button" className="scroll-down-btn" onClick={scrollToFeatures}>
        <Icon icon={ICONS.ARROW} size={45} fill="#eee" />
      </button>
    </section>
  );
};

export default Hero;
