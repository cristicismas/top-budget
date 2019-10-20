import React from 'react';
import './AddExpense.css';

import AddExpenseModal from '../general/AddExpenseModal';

const AddExpense = () => {
  return (
    <section id="add-expense">
      <h2 className="sub-title">Well done! This is the last step. Please add at least one expense.</h2>

      <AddExpenseModal
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
