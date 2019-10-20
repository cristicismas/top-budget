import React from 'react';
import './AddExpense.css';

import AddExpenseForm from '../general/AddExpenseForm';

const AddExpense = () => {
  return (
    <section id="add-expense">
      <h2 className="sub-title">Well done! This is the last step. Please add at least one expense.</h2>

      <AddExpenseForm
        addExpense={() => {}}
        closeOverlay={() => {}}
        addMessage={() => {}}
        categories={[]}
        locations={[]}
        sources={[]}
        user={{}}
      />
    </section>
  );
};

export default AddExpense;
