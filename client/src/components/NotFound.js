import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <section id="not-found">
      <h1 className="title">404</h1>

      <p className="description">
        Sorry!
        <br />
        <br />
        The page you are trying to access does not exist.
      </p>
      <Link className="home-btn" to="/">
        Go Back Home
      </Link>
    </section>
  );
};

export default NotFound;
