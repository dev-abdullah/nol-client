import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Station from './components/station';
import Sidebar from './components/sidebar';
import Login from './components/signin-form';
import Signup from './components/signup-form';
import Dashboard from './components/dashboard';
import Transaction from './components/transaction';
import LoadCard from './components/load-card';
import SwipeCard from './components/swipe-card';
import Profile from './components/profile';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUser } from './store/actions/userAction';


class App extends Component {

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.props.getUser(token)
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="row">
            <div className="col-2">
              <Sidebar />
            </div>
            <div className="col-10">
              <Routes>
                <Route path="/" element={<Station />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transaction />} />
                <Route path="/load_card" element={<LoadCard />} />
                <Route path="/swipe_card" element={<SwipeCard />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser: getUser
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
