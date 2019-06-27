import React from 'react';

function Option(props) {
  const { type, object } = props;

  const Color = () => 
    object.color ?
    <div className="option-color" style={{ backgroundColor: object.color }} /> :
    null;

  return (
    <div
      className="option"
      onClick={() => props.handleOptionClick()}
      id={`${type}-${object.id}`}>
      <Color />
      {object.name}
    </div>
  );
}

export default Option;
