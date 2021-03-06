import React, { Children, cloneElement, useRef, useEffect } from 'react';
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

const useScrollDetector = closeOverlay => {
  useEffect(() => {
    if (window.innerWidth >= 550) {
      document.addEventListener('scroll', closeOverlay);
    } else {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('scroll', closeOverlay);
      document.body.style.overflow = 'auto';
    };
  });
};

const Overlay = props => {
  const { hideCloseOverlayButton } = props;
  const modalRoot = document.getElementById('modal-root');

  const overlayRef = useRef(null);
  useOutsideClickDetector(overlayRef, props.closeOverlay);

  useScrollDetector(props.closeOverlay);

  const overlayStyle = {
    backgroundColor: props.isTransparent ? 'transparent' : '#1a1a24'
  };

  const childrenWithCloseOverlay = Children.map(props.children, child =>
    cloneElement(child, { closeOverlay: props.closeOverlay })
  );

  return createPortal(
    <div className="overlay-container" style={{ height: window.innerHeight }}>
      <div className="overlay" style={overlayStyle} ref={hideCloseOverlayButton ? null : overlayRef}>
        {!props.hideCloseOverlayButton && (
          <button type="button" className="close-overlay-btn" onClick={() => props.closeOverlay()}>
            <Icon className="close-overlay-icon" icon={ICONS.CROSS} size={20} fill="#eee" />
          </button>
        )}
        {childrenWithCloseOverlay}
      </div>
    </div>,
    modalRoot
  );
};

export default Overlay;
