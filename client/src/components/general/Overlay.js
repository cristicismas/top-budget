import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import ICONS from '../../constants/icons';
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
  const { hideCloseOverlayButton } = props;

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

  const overlayStyle = {
    backgroundColor: props.isTransparent ? 'transparent' : '#1a1a24'
  };

  return createPortal(
    <div className="overlay-container" style={{ height: window.innerHeight }}>
      <div className="overlay" style={overlayStyle} ref={hideCloseOverlayButton ? null : overlayRef}>
        {!props.hideCloseOverlayButton && (
          <button type="button" className="close-overlay-btn" onClick={() => props.closeOverlay()}>
            <Icon className="close-overlay-icon" icon={ICONS.CROSS} size={20} fill="#eee" />
          </button>
        )}
        {props.children}
      </div>
    </div>,
    modalRoot
  );
};

export default Overlay;
