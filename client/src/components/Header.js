import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <h1><Link to='/'>TopBudget</Link></h1>
  
        {
          this.props.isAuthenticated ? (
            <nav>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/logout">Log Out</Link>
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

export default Header;
