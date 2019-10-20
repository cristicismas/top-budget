import React from 'react';
import './Home.css';

import Hero from './Hero';
import Features from './Features';
import ScrollUpArrow from './ScrollUpArrow';

const Home = () => {
  return (
    <main id="home">
      <Hero />
      <Features />

      <ScrollUpArrow />
    </main>
  );
};

export default Home;
