import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, register } from '../../store/actions/user';
import './AuthForm.css';

const AuthForm = props => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const { login, register } = props;

    if (props.type === 'signup') {
      register({
        username,
        email,
        password
      }).then(() => {
        history.push('/dashboard');
      });
    } else {
      login({
        username,
        password
      }).then(() => {
        history.push('/dashboard');
      });
    }
  };

  const formAction = props.type === 'login' ? 'Log In' : 'Sign Up';

  return (
    <div id="auth">
      <h2 id="form-title">{formAction}</h2>

      <form id="auth-form" onSubmit={handleSubmit}>
        {props.type === 'signup' ? (
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
    </div>
  );
};

export default connect(
  null,
  {
    login,
    register
  }
)(AuthForm);
