import React from 'react';
import './OptionsRemoveGroup.css';

import Option from '../../general/Option';

const OptionsRemoveGroup = props => {
  const { type, objects, dim } = props;

  const options = objects.map(object => (
    <Option
      type={type}
      object={object}
      handleOptionClick={() => props.handleOptionClick(type, object)}
      key={object.id}
      toDelete={true}
    />
  ));

  return (
    <div className={`options ${dim ? 'dim' : ''}`} id={type}>
      {options}
    </div>
  );
};

export default OptionsRemoveGroup;