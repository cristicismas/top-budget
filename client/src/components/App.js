import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../css/Header.css';

import Header from './Header';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
