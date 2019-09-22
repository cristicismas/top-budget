import React, { useState, useEffect } from 'react';
import TYPES from '../constants/messageTypes';
import '../css/Message.css';

const Message = props => {
  const { message, setMessage, shouldFadeOut } = props;

  const [opacity, changeOpacity] = useState(0);

  // Fadeout the component and clear the message.
  useEffect(() => {
    changeOpacity(1);

    if (shouldFadeOut) {
      let messageTimeout,
        opacityTimeout = null;

      opacityTimeout = setTimeout(() => {
        changeOpacity(0);

        messageTimeout = setTimeout(() => {
          setMessage('', '');
        }, 500);
      }, 2500);

      return () => {
        clearTimeout(opacityTimeout);
        clearTimeout(messageTimeout);
      };
    }
  }, [message, setMessage, shouldFadeOut]);

  let style = {};

  if (props.type === TYPES.ERROR) {
    style = {
      opacity,
      color: '#ff2525',
      border: '1px solid #900404'
    };
  } else if (props.type === TYPES.SUCCESS) {
    style = {
      opacity,
      color: '#27e24b',
      border: '1px solid #17630a'
    };
  } else {
    style = {
      opacity,
      color: '#f1e979',
      border: '1px solid #e1b400'
    };
  }

  return (
    <div className="message" style={style}>
      <p>{props.message}</p>
    </div>
  );
};

export default Message;
