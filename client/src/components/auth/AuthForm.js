import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { authenticate } from '../../store/actions/user';
import AUTH_TYPES from '../../constants/auth';
import './AuthForm.css';

const AuthForm = props => {
  const history = useHistory();
  const { pathname } = useLocation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formType = pathname.includes(AUTH_TYPES.LOG_IN) ? AUTH_TYPES.LOG_IN : AUTH_TYPES.SIGN_UP;

  const handleSubmit = e => {
    e.preventDefault();
    const { authenticate } = props;

    authenticate(
      {
        username,
        email,
        password
      },
      formType
    ).then(() => {
      props.getExpenses();
      props.getCategories();
      props.getLocations();
      props.getSources();

      history.push('/dashboard');
    });
  };

  const formAction = formType === 'login' ? 'Log In' : 'Sign Up';

  return (
    <main id="auth">
      <h2 id="form-title">{formAction}</h2>

      <form id="auth-form" onSubmit={handleSubmit}>
        {formType === AUTH_TYPES.SIGN_UP ? (
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        ) : null}

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="topbudgeteer_19"
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Min. 5 characters"
            value={password}
            minLength="5"
            maxLength="70"
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" id="submit-button">
          {formAction}
        </button>
      </form>
    </main>
  );
};

export default connect(
  null,
  {
    authenticate
  }
)(AuthForm);
