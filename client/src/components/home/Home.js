import React from 'react';
import './Home.css';

import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';
import ScrollUpArrow from './ScrollUpArrow';

const Home = () => {
  return (
    <main id="home">
      <Hero />
      <Features />
      <Footer />

      <ScrollUpArrow />
    </main>
  );
};

export default Home;
