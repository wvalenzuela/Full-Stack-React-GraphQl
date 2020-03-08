// Debugging with the Apollo Client Developer tools
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import '../../assets/css/style.css';
import './components/fontawesome';

import Feed from './Feed';
import Chats from './Chats';
import Bar from './components/bar';
import { UserConsumer } from './components/context/user';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Helmet>
          <title>Graphbook - Feed</title>
          <meta
            name="description"
            content="Newsfeed of all your friends on Graphbook"
          />
        </Helmet>
        <UserConsumer>
          <Bar />
          <Feed />
          <Chats />
        </UserConsumer>
      </div>
    );
  }
}

export default App;
