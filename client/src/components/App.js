import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../css/Header.css';

import Header from './Header';
import Home from './Home';
import AuthForm from './auth/AuthForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/signup" render={() => <AuthForm type="signup" />} />
        <Route path="/login" render={() => <AuthForm type="login" />} />
      </div>
    </Router>
  );
}

export default App;
