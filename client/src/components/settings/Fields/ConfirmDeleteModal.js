import React from 'react';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = props => {
  return (
    <section id="confirm-delete">
      <h2 className="confirm-delete-title">Are you sure?</h2>

      <p className="confirm-delete-warning">
        Are you sure you want to delete this / these fields?
        <br />
        Deleting fields is an irreversible action.
      </p>

      <div className="buttons-group">
        <button id="cancel-btn" onClick={props.closeOverlay}>
          Cancel
        </button>
        <button id="confirm-delete-btn" onClick={props.handleDelete}>
          Confirm
        </button>
      </div>
    </section>
  );
};

export default ConfirmDeleteModal;
