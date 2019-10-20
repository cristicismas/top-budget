import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addMessage } from '../../store/actions/messages';
import './NavigationButtons.css';

const NavigationButtons = props => {
  const { expenses, showBack, showNext } = props;
  const history = useHistory();

  const handleDashboardClick = () => {
    if (expenses.length) {
      history.push('/dashboard');
    } else {
      props.addMessage('Please add at least one expense before continuing.');
    }
  };

  return (
    <nav id="nav-buttons">
      <button className={showBack ? '' : 'disabled'} onClick={showBack ? props.onBack : () => {}}>
        Back
      </button>

      {showNext ? (
        <button onClick={props.onNext}>Next</button>
      ) : (
        <button className={expenses.length ? '' : 'disabled'} onClick={handleDashboardClick}>
          Done
        </button>
      )}
    </nav>
  );
};

const mapStateToProps = state => ({
  expenses: state.expenses
});

export default connect(
  mapStateToProps,
  { addMessage }
)(NavigationButtons);
