import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

const modalRoot = document.getElementById('modal-root');

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

  return createPortal(
    <div className="overlay-container" style={{ height: window.innerHeight }}>
      <div className="overlay" ref={overlayRef}>
        {!props.hideCloseOverlayButton && (
          <button type="button" className="close-overlay-btn" onClick={() => props.closeOverlay()}>
            ✕
          </button>
        )}
        {props.children}
      </div>
    </div>,
    modalRoot
  );
};

export default Overlay;
