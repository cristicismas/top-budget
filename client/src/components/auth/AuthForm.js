import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { authenticate } from '../../store/actions/user';
import AUTH_TYPES from '../../constants/auth';
import './AuthForm.css';

const AuthForm = props => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formType = pathname.includes(AUTH_TYPES.LOG_IN) ? AUTH_TYPES.LOG_IN : AUTH_TYPES.SIGN_UP;

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      authenticate(
        {
          username,
          email,
          password
        },
        formType
      )
    ).then(() => {
      if (formType === AUTH_TYPES.LOG_IN) {
        history.push('/dashboard');
      } else {
        history.push('/setup');
      }
    });
  };

  const formAction = formType === 'login' ? 'Log In' : 'Sign Up';

  return (
    <main id="auth">
      <h2 id="form-title">{formAction}</h2>

      <form id="auth-form" method="post" onSubmit={handleSubmit}>
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

      {formType === AUTH_TYPES.LOG_IN ? (
        <div className="change-auth-type">
          Do you want to create a new account?
          <Link to="/signup">
            <div className="accent"> Sign up instead.</div>
          </Link>
        </div>
      ) : (
        <div className="change-auth-type">
          Already have an account?
          <Link to="/login">
            <div className="accent"> Log in instead.</div>
          </Link>
        </div>
      )}
    </main>
  );
};

export default AuthForm;
