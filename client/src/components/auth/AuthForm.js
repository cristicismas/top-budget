import React, { Component } from 'react'

export class AuthForm extends Component {
  render() {
    return (
      <div id="auth">
        <h2>{this.props.type === "login" ? "Log In" : "Sign Up"}</h2>
      </div>
    )
  }
}

export default AuthForm
