import React from 'react';
import Option from './Option';

const OptionsGroup = props => {
  const { type, label, objects } = props;

  const options = objects.map(object => (
    <Option
      type={type}
      object={object}
      handleOptionClick={() => props.handleOptionClick(type, object)}
      key={`${type}-${object.id}`}
    />
  ));

  return (
    <div className="form-group">
      <h2 className="options-label">{label}</h2>
      <div className="options" id={type}>
        {options}
      </div>
    </div>
  );
};

export default OptionsGroup;
