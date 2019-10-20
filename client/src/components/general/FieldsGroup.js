import React from 'react';
import Field from './Field';
import './FieldsGroup.css';

const FieldsGroup = props => {
  const { type, label, objects } = props;

  const fields = objects.map(object => (
    <Field
      type={type}
      object={object}
      handleFieldClick={() => props.handleFieldClick(type, object)}
      key={`${type}-${object.id}`}
    />
  ));

  return (
    <div className="fields-group">
      <h2 className="fields-label">{label}</h2>
      <div className="fields" id={type}>
        {fields}
      </div>
    </div>
  );
};

export default FieldsGroup;
