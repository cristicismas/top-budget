import React from 'react';

import ColorCircle from '../ColorCircle';

const ExpenseField = props => (
  <div className="expense-field flex-group">
    <ColorCircle color={props.field ? props.field.color : '#888'} />
    {props.field ? props.field.name : '―'}
  </div>
);

export default ExpenseField;
