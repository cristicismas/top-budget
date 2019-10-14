import React from 'react';
import './Home.css';

import Hero from './Hero';
import Features from './Features';
import ScrollUpArrow from './ScrollUpArrow';

const Home = () => {
  return (
    <div id="home">
      <Hero />
      <Features />

      <ScrollUpArrow />
    </div>
  );
};

export default Home;
