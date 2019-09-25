import React from 'react';

const ColorCircle = props => {
  return <div className="expense-color" style={{ backgroundColor: props.color }} />;
};

export default ColorCircle;
