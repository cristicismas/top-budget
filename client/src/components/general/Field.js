import React from 'react';
import ICONS from '../../constants/icons';
import Icon from '../general/Icon';
import './Field.css';

const Field = props => {
  const { type, object, toDelete, isEditable } = props;

  const handleEditFieldButton = e => {
    e.stopPropagation();
    props.handleEditFieldButton();
  };

  const Color = () => (object.color ? <div className="field-color" style={{ backgroundColor: object.color }} /> : null);

  return (
    <div
      className={`field ${toDelete ? 'to-delete' : ''}`}
      onClick={() => props.handleFieldClick()}
      id={`${type}-${object.id}`}>
      <Color />

      {object.name}

      {isEditable && (
        <button className="edit-field-btn" onClick={handleEditFieldButton}>
          <Icon size={20} fill="#ccc" icon={ICONS.EDIT} className="edit-field-icon" />
        </button>
      )}
    </div>
  );
};

export default Field;
