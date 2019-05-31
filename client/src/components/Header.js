import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1><Link to='/'>TopBudget</Link></h1>

      <nav>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </nav>
    </header>
  );
}

export default Header;
