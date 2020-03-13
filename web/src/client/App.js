import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withApollo } from 'react-apollo';

import '../../assets/css/style.css';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';

import './components/fontawesome';

import Feed from './Feed';
import Chats from './Chats';
import Bar from './components/bar';

import LoginRegisterForm from './components/loginregister';
import CurrentUserQuery from './components/queries/currentUser';

class App extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = props.client.onResetStore(() =>
      this.changeLoginState(false)
    );
    this.state = {
      loggedIn: false
    };
  }
  componentWillUnmount() {
    this.unsubscribe();
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
            <Bar />
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

export default withApollo(App);
