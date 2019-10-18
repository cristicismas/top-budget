import React from 'react';

const ColorCircle = props => {
  return <span className="expense-color" style={{ backgroundColor: props.color }} />;
};

export default ColorCircle;
