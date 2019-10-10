import React, { Component } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import '../../css/Dashboard.css';

import Settings from './Settings/Settings';
import Stats from './Stats/Stats';
import AddExpenseForm from './AddExpense/AddExpenseForm';
import Message from '../Message';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      type: ''
    };

    this.setMessage = this.setMessage.bind(this);
  }

  componentDidMount() {
    this.props.getExpenses();
    this.props.getCategories();
    this.props.getLocations();
    this.props.getSources();
  }

  setMessage(message, type) {
    this.setState({
      message,
      type
    });
  }

  render() {
    const { message, type } = this.state;

    const { user } = this.props;

    const pathname = this.props.location.pathname;
    const token = localStorage.getItem('token');

    if (token) {
      return (
        <section id="dashboard">
          <nav>
            <Link to="/dashboard/settings" className={pathname === '/dashboard/settings' ? 'active' : null}>
              Settings
            </Link>

            <Link to="/dashboard" className={pathname === '/dashboard' ? 'active' : null}>
              Add Expense
            </Link>

            <Link to="/dashboard/stats" className={pathname === '/dashboard/stats' ? 'active' : null}>
              Stats
            </Link>
          </nav>

          {message && <Message message={message} type={type} shouldFadeOut={true} setMessage={this.setMessage} />}

          <Route exact path="/dashboard" render={() => <AddExpenseForm setMessage={this.setMessage} user={user} />} />

          <Route path="/dashboard/settings" render={() => <Settings user={user} />} />

          <Route path="/dashboard/stats" render={() => <Stats user={user} setMessage={this.setMessage} />} />
        </section>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Dashboard;