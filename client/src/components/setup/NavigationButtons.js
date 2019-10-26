import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../store/actions/messages';
import ICONS from '../../constants/icons';
import './NavigationButtons.css';

import Icon from '../general/Icon';

const NavigationButtons = props => {
  const { showBack, showNext } = props;
  const expenses = useSelector(state => state.expenses);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleDashboardClick = () => {
    if (expenses.length) {
      history.push('/dashboard');
    } else {
      dispatch(addMessage('Please add at least one expense before continuing.'));
    }
  };

  return (
    <nav id="nav-buttons">
      <button className={showBack ? '' : 'disabled'} onClick={showBack ? props.onBack : () => {}}>
        <Icon icon={ICONS.ARROW} size={20} fill="#eee" className="back-arrow icon" />
        Back
      </button>

      {showNext ? (
        <button onClick={props.onNext}>
          Next
          <Icon icon={ICONS.ARROW} size={20} fill="#eee" className="next-arrow icon" />
        </button>
      ) : (
        <button className={expenses.length ? '' : 'disabled'} onClick={handleDashboardClick}>
          Done
          <Icon icon={ICONS.CHECK} size={20} fill="#eee" className="check-icon icon" />
        </button>
      )}
    </nav>
  );
};

export default NavigationButtons;
