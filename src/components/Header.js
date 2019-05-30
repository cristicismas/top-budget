import React from 'react';

function Header() {
  return (
    <header>
      <h1><a href='/'>TopBudget</a></h1>

      <nav>
        <a href="/signup">Sign Up</a>
        <a href="/login">Log In</a>
      </nav>
    </header>
  );
}

export default Header;
