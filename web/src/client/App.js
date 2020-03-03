import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import '../../assets/css/style.css';

import Feed from './Feed';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Helmet>
          <title>Medical - Feed</title>
          <meta
            name="description"
            content="Newsfeed of all your friends on Graphbook"
          />
        </Helmet>
        <Feed />
      </div>
    );
  }
}

export default App;
