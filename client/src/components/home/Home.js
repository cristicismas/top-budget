import React, { useEffect } from 'react';
import ICONS from '../../constants/icons';
import '../../css/Home.css';

import Hero from './Hero';
import Features from './Features';
import Icon from '../Icon';

const isElementInViewport = (element, offset) => {
  var rect = element.getBoundingClientRect();

  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const scrollUp = () => {
  const header = document.querySelector('header');

  header.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

const Home = () => {
  useEffect(() => {
    const header = document.querySelector('header');
    const scrollUpButton = document.getElementById('scroll-up-btn');

    window.onscroll = e => {
      if (header && scrollUpButton) {
        if (isElementInViewport(header, 0)) {
          scrollUpButton.style.opacity = 0;
          scrollUpButton.style.cursor = 'default';
        } else {
          scrollUpButton.style.opacity = 1;
          scrollUpButton.style.cursor = 'pointer';
        }
      } else {
        console.log(header, scrollUpButton);
      }
    };
  }, []);

  return (
    <div id="home">
      <Hero />
      <Features />

      <button type="button" id="scroll-up-btn" onClick={scrollUp}>
        <Icon icon={ICONS.ARROW} size={35} fill="#ccc" />
      </button>
    </div>
  );
};

export default Home;
