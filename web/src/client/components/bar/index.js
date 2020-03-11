import React, { Component } from 'react';
import SearchBar from './search';
import UserBar from './user';
import { UserConsumer } from '../context/user';
import Logout from './logout';

class Bar extends Component {
  render() {
    return (
      <div className="topbar">
        <div className="inner">
          <UserConsumer>
            <SearchBar />
            <UserBar />
          </UserConsumer>
        </div>
        <div className="buttons">
          <Logout />
        </div>
      </div>
    );
  }
}

export default Bar;
