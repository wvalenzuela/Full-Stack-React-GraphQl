import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import '../../assets/css/style.css';
import './components/fontawesome';

import Feed from './Feed';
import Chats from './Chats';
import Bar from './components/bar';

import LoginRegisterForm from './components/loginregister';
import CurrentUserQuery from './components/queries/currentUser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  componentDidMount() {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.setState({ loggedIn: true });
    }
  }
  changeLoginState = loggedIn => {
    this.setState({ loggedIn });
  };
  render() {
    const { loggedIn } = this.state;
    return (
      <div className="container">
        <Helmet>
          <title>Graphbook - Feed</title>
          <meta
            name="description"
            content="Newsfeed of all your friends on Graphbook"
          />
        </Helmet>
        {loggedIn ? (
          <CurrentUserQuery>
            <Bar changeLoginState={this.changeLoginState} />
            <Feed />
            <Chats />
          </CurrentUserQuery>
        ) : (
          <LoginRegisterForm changeLoginState={this.changeLoginState} />
        )}
      </div>
    );
  }
}

export default App;
