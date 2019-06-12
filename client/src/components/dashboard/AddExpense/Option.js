import React from 'react';

function Option(props) {
  const { type, object } = props;

  return (
    <div
      className="option"
      onClick={() => props.handleOptionClick()}
      id={`${type}-${object.id}`}>
      {object.name}
    </div>
  );
}

export default Option;
