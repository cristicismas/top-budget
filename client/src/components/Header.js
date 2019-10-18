import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';

const Header = props => {
  const isAuthenticated = props.user.isAuthenticated;
  const { pathname } = useLocation();

  return (
    <header>
      <h1>
        <Link to="/">TopBudget</Link>
      </h1>

      {isAuthenticated ? (
        <nav>
          <Link className={pathname.includes('dashboard') ? 'active' : null} to="/dashboard">
            Dashboard
          </Link>
          <Link className={pathname.includes('settings') ? 'active' : null} to="/settings">
            Settings
          </Link>
        </nav>
      ) : (
        <nav>
          <Link className={pathname.includes('signup') ? 'active' : null} to="/signup">
            Sign Up
          </Link>
          <Link className={pathname.includes('login') ? 'active' : null} to="/login">
            Log In
          </Link>
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
  null
)(Header);
