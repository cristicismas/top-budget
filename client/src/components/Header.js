import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ICONS from '../constants/icons';
import walletIcon from '../images/wallet-icon.svg';
import './Header.css';

import Icon from './general/Icon';

const Header = () => {
  const user = useSelector(state => state.user);
  const { isAuthenticated } = user;
  const { pathname } = useLocation();

  return (
    <header>
      <h1>
        <Link to="/">
          <img src={walletIcon} alt="Wallet Icon" className="header-icon" />
          TopBudget
        </Link>
      </h1>

      {isAuthenticated ? (
        <nav>
          <Link className={pathname.includes('dashboard') ? 'active' : null} to="/dashboard">
            Dashboard
            <Icon className="nav-icon" size={25} fill="#eee" icon={ICONS.CHART} />
          </Link>
          <Link className={pathname.includes('settings') ? 'active' : null} to="/settings">
            Settings
            <Icon className="nav-icon" size={25} fill="#eee" icon={ICONS.SETTINGS} />
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

export default Header;
