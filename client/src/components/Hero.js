import React from 'react';
import ICONS from '../constants/icons';
import Icon from './Icon';
import { Link } from 'react-router-dom';
import '../css/Hero.css';

const Hero = () => {
  return (
    <section id="hero">
      <div id="intro" data-aos="fade-down">
        <h1 className="title">TopBudget</h1>
        <h2 className="subtitle">Manage your expenses with ease.</h2>
      </div>

      <div className="cta-buttons">
        <Link to="/dashboard" className="secondary">
          Dashboard
        </Link>
        <Link to="/login" className="primary">
          Get Started
        </Link>
      </div>

      <button className="scroll-down-btn">
        <Icon icon={ICONS.ARROW} size={45} fill='#eee' />
      </button>
    </section>
  );
};

export default Hero;
