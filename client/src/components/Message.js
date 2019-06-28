import React from 'react';
import '../css/Message.css';

const Message = props => {
  let style = {
    color: '#333',
    textAlign: 'center',
    padding: '5px 10px',
    margin: '20px auto',
    opacity: '.9',
    width: '250px',
    position: 'relative',
    borderRadius: '5px'
  };

  if (props.type === 'error') {
    style = {
      ...style,
      backgroundColor: '#ff2525',
      border: '1px solid #900404'
    };
  } else if (props.type === 'success') {
    style = {
      ...style,
      backgroundColor: '#27e24b',
      border: '1px solid #17630a'
    };
  } else {
    style = {
      ...style,
      backgroundColor: '#f1e979',
      border: '1px solid #e1b400'
    };
  }

  if (!props.message) return null;

  return (
    <div className="message" style={style}>
      <span
        onClick={props.clearMessage}
        className="close-message-btn">
        ✕
      </span>

      <p>{props.message}</p>
    </div>
  );
};

export default Message;
