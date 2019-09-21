import React from 'react';

import ColorCircle from './ColorCircle';

const ExpenseField = props => (
  <div className="flex-group">
    <ColorCircle color={props.field ? props.field.color : '#888'} />
    {props.field ? props.field.name : 'Not specified'}
  </div>
);

export default ExpenseField;