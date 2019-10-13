import React, { useRef, useEffect } from 'react';
import './Overlay.css';

const useOutsideClickDetector = (ref, closeOverlay) => {
  const handleOutsideClick = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeOverlay();
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });
};

const Overlay = props => {
  const overlayRef = useRef(null);
  useOutsideClickDetector(overlayRef, props.closeOverlay);

  // When component mounts, disable scrolling on 'body'
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      // When component unmounts, enable scrolling.
      document.body.style.overflow = 'auto';
    };
  });

  return (
    <div className="overlay-container">
      <div className="overlay" ref={overlayRef}>
        <button type="button" className="close-overlay-btn" onClick={() => props.closeOverlay()}>
          ✕
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Overlay;
