import React from 'react'

function Message(props) {
  let style = {
    color: '#333',
    textAlign: 'center',
    padding: '10px 25px',
    margin: '20px auto',
    opacity: '.9',
    width: '50%',
    borderRadius: '5px'
  };

  if (props.type === 'error') {
    style = {
      ...style,
      backgroundColor: '#ff2525',
      border: '1px solid #900404',
    };
  } else if (props.type === 'success') {
    style = {
      ...style,
      backgroundColor: '#7bf175',
      border: '1px solid #17630a',
    }
  } else {
    style = {
      ...style,
      backgroundColor: '#f1e979',
      border: '1px solid #e1b400',
    }
  }

  return (
    <div style={style}>
      {props.message}
    </div>
  )
}

export default Message
