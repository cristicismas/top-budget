import React from 'react';
import './Field.css';

const Field = props => {
  const { type, object, toDelete } = props;

  const Color = () =>
    object.color ? <div className="field-color" style={{ backgroundColor: object.color }} /> : null;

  return (
    <div
      className={`field ${toDelete ? 'to-delete' : ''}`}
      onClick={() => props.handleFieldClick()}
      id={`${type}-${object.id}`}>
      <Color />
      {object.name}
    </div>
  );
};

export default Field;
