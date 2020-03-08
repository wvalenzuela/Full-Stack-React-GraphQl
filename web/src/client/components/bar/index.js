import React, { Component } from 'react';
import SearchBar from './search';
import UserBar from './user';

class Bar extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="topbar">
        <div className="inner">
          <SearchBar user={user} />
          <UserBar user={user} />
        </div>
      </div>
    );
  }
}

export default Bar;
