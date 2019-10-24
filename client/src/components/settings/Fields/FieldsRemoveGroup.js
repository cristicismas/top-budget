import React from 'react';
import './FieldsRemoveGroup.css';

import Field from '../../general/Field';

const FieldsRemoveGroup = props => {
  const { type, objects, dim } = props;

  const fields = objects.map(object => (
    <Field
      type={type}
      object={object}
      handleFieldClick={() => props.handleFieldClick(type, object)}
      handleEditFieldButton={() => props.handleEditFieldButton(type, object)}
      isEditable={true}
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
