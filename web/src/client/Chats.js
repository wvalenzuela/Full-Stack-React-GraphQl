import React, { Component } from 'react';

import ChatWindow from './components/chat/window';
import ChatQuery from './components/queries/chatQuery';
import ChatsQuery from './components/queries/chatsQuery';
import ChatsList from './components/chat/list';

class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openChats: []
    };
  }
  openChat = id => {
    var openChats = this.state.openChats.slice();
    var textInputs = Object.assign({}, this.state.textInputs);
    if (openChats.indexOf(id) === -1) {
      if (openChats.length > 2) {
        openChats = openChats.slice(1);
      }
      openChats.push(id);
      textInputs[id] = '';
    }
    this.setState({ openChats, textInputs });
  };
  closeChat = id => {
    var openChats = this.state.openChats.slice();
    var textInputs = Object.assign({}, this.state.textInputs);
    const index = openChats.indexOf(id);
    openChats.splice(index, 1);
    delete textInputs[id];
    this.setState({ openChats, textInputs });
  };
  render() {
    const { user } = this.props;
    const { openChats } = this.state;
    return (
      <div className="wrapper">
        <ChatsQuery>
          <ChatsList openChat={this.openChat} user={user} />
        </ChatsQuery>
        <div className="openChats">
          {openChats.map((chatId, i) => (
            <ChatQuery key={'chatWindow' + chatId} variables={{ chatId }}>
              <ChatWindow closeChat={this.closeChat} />
            </ChatQuery>
          ))}
        </div>
      </div>
    );
  }
}

export default Chats;
