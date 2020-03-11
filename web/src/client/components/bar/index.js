import React, { Component } from 'react';
import SearchBar from './search';
import UserBar from './user';
import { UserConsumer } from '../context/user';
import Logout from './logout';

class Bar extends Component {
  render() {
    const { changeLoginState } = this.props;
    return (
      <div className="topbar">
        <div className="inner">
          <UserConsumer>
            <SearchBar />
            <UserBar />
          </UserConsumer>
        </div>
        <div className="buttons">
          <Logout changeLoginState={changeLoginState} />
        </div>
      </div>
    );
  }
}

export default Bar;
