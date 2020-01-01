import React from 'react';
import './FieldsRemoveGroup.css';

import Field from '../../general/Field';

const FieldsRemoveGroup = props => {
  const { type, objects, dim, editMode } = props;

  const fields = objects.map(object => (
    <Field
      editMode={editMode}
      type={type}
      object={object}
      handleFieldClick={() => props.handleFieldClick(type, object)}
      key={object.id}
      toDelete={true}
    />
  ));

  return (
    <div className={`fields ${dim ? 'dim' : ''}`} id={type}>
      {fields}
    </div>
  );
};

export default FieldsRemoveGroup;
