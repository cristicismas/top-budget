import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/Header.css';

class Header extends Component {
  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;

    return (
      <header>
        <h1><Link to='/'>TopBudget</Link></h1>
        
        {
          isAuthenticated ? (
            <nav>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/logout">Logout</Link>
            </nav>
          ) : (
            <nav>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </nav>
          )
        }
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
