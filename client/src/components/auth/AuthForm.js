import React, { Component } from 'react'
import '../../css/AuthForm.css';

export class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    console.log("Submitted!");
  }

  render() {
    const formAction = this.props.type === 'login' ? 'Log In' : 'Sign Up';

    return (
      <div id="auth">
        <h2 id="form-title">{formAction}</h2>

        <form id="auth-form" onSubmit={this.handleSubmit}>
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

export default AuthForm
