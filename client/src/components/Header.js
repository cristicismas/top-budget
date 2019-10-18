import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/user';
import './Header.css';

const Header = props => {
  const isAuthenticated = props.user.isAuthenticated;

  return (
    <header>
      <h1>
        <Link to="/">TopBudget</Link>
      </h1>

      {isAuthenticated ? (
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      ) : (
        <nav>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </nav>
      )}
    </header>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
