import React, { useState, useEffect } from 'react';
import TYPES from '../../constants/messageTypes';
import './Message.css';

const Message = props => {
  const { text, shouldFadeOut } = props;

  const [opacity, changeOpacity] = useState(0);

  // Fadeout the component.
  useEffect(() => {
    changeOpacity(1);

    if (shouldFadeOut) {
      const opacityTimeout = setTimeout(() => {
        changeOpacity(0);
      }, 2500);

      return () => {
        clearTimeout(opacityTimeout);
      };
    }
  }, [text, shouldFadeOut]);

  let style = {};

  if (props.type === TYPES.ERROR) {
    style = {
      opacity,
      color: '#ff2525',
      border: '2px solid #900404'
    };
  } else if (props.type === TYPES.SUCCESS) {
    style = {
      opacity,
      color: '#27e24b',
      border: '2px solid #17630a'
    };
  } else {
    style = {
      opacity,
      color: '#f1e979',
      border: '2px solid #e1b400'
    };
  }

  return (
    <div className="message" style={style}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
