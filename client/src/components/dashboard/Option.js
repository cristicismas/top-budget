import React from 'react';
import '../../css/Option.css';

const Option = props => {
  const { type, object, toDelete } = props;

  const Color = () => 
    object.color ?
    <div className="option-color" style={{ backgroundColor: object.color }} /> :
    null;

  return (
    <div
      className={`option ${toDelete ? 'to-delete' : ''}`}
      onClick={() => props.handleOptionClick()}
      id={`${type}-${object.id}`}>
      <Color />
      {object.name}
    </div>
  );
}

export default Option;
