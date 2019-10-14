import React, { useEffect } from 'react';
import ICONS from '../../constants/icons';
import Icon from '../general/Icon';

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

const ScrollUpArrow = () => {
  useEffect(() => {
    const header = document.querySelector('header');
    const scrollUpButton = document.getElementById('scroll-up-btn');

    window.onscroll = e => {
      if (isElementInViewport(header, 0)) {
        scrollUpButton.style.opacity = 0;
        scrollUpButton.style.cursor = 'default';
      } else {
        scrollUpButton.style.opacity = 1;
        scrollUpButton.style.cursor = 'pointer';
      }
    };
  }, []);

  return (
    <button type="button" id="scroll-up-btn" onClick={scrollUp}>
      <Icon icon={ICONS.ARROW} size={35} fill="#ccc" />
    </button>
  );
};

export default ScrollUpArrow;
