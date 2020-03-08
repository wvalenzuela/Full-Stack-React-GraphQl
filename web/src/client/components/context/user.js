import React, { Component, createContext } from 'react';
import { ApolloConsumer } from 'react-apollo';

const { Provider, Consumer } = createContext();

export class UserProvider extends Component {
  render() {
    const { children } = this.props;
    const user = {
      username: 'Local User',
      avatar: '/uploads/avatar1.png'
    };
    return <Provider value={user}>{children}</Provider>;
  }
}
export class UserConsumerPrevCommit extends Component {
  render() {
    const { children } = this.props;
    return (
      <Consumer>
        {user =>
          React.Children.map(children, function(child) {
            return React.cloneElement(child, { user });
          })
        }
      </Consumer>
    );
  }
}

export class UserConsumer extends Component {
  render() {
    const { children } = this.props;
    return (
      <ApolloConsumer>
        {client => {
          // Use client.readQuery to get the current logged in user.
          const user = {
            username: 'Local User',
            avatar: '/uploads/avatar1.png'
          };
          return React.Children.map(children, function(child) {
            return React.cloneElement(child, { user });
          });
        }}
      </ApolloConsumer>
    );
  }
}
