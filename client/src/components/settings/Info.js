import React from 'react';
import './Info.css';

const Info = ({ user, logout }) => {
  const { username, email } = user.userdata.user ? user.userdata.user : {};

  return (
    <section id="info">
      <h2 className="sub-title">Account Information</h2>

      <div className="user-info">
        <div className="info-group">
          <h3 className="tertiary-title">Username</h3>
          <div>{username}</div>
        </div>

        <div className="info-group">
          <h3 className="tertiary-title">Email</h3>
          <div>{email}</div>
        </div>

        <button id="logout-btn" onClick={logout}>Log Out</button>
      </div>
    </section>
  );
};

export default Info;
