import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import '../../css/AuthForm.css';

export class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.props.type === 'signup') {
      this.props.signup({ ...this.state });
    } else {
      this.props.login({
        username: this.state.username,
        password: this.state.password   
      });
    }
  }

  render() {
    const formAction = this.props.type === 'login' ? 'Log In' : 'Sign Up';

    return (
      <div id="auth">
        <h2 id="form-title">{formAction}</h2>

        <form id="auth-form" onSubmit={this.handleSubmit}>
          {
            this.props.type === 'signup' ? (
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  onChange={this.onChange} />
              </div>
            ) : null
          }

          <div className="form-group">
            <label htmlFor="email">Username:</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="topbudgeteer_19"
              required
              onChange={this.onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Min. 5 characters"
              minLength="5"
              maxLength="70"
              required
              onChange={this.onChange} />
          </div>

          <button type="submit" id="submit-button">{formAction}</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: credentials => dispatch(actions.authSignup(credentials)),
    login: credentials => dispatch(actions.authLogin(credentials))
  }
}

export default connect(null, mapDispatchToProps)(AuthForm);
