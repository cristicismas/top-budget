import React from 'react';
import '../../../../css/ConfirmDeleteModal.css';

const ConfirmDeleteModal = props => {
  return (
    <section id="confirm-delete">
      <h2 className="confirm-delete-title">Are you sure?</h2>

      <p className="confirm-delete-warning">
        Are you sure you want to delete this / these fields?
        Deleting fields is an irreversible action.
      </p>

      <button id="confirm-delete-btn" onClick={props.handleDelete}>
        Confirm
      </button>
    </section>
  );
};

export default ConfirmDeleteModal;
