import React, { Component } from 'react';
import AddMessageMutation from '../mutations/addMessage';
import ChatInput from './input';

export default class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: ''
    };
  }
  handleTextChanged = textInput => {
    this.setState({ textInput: textInput });
  };
  render() {
    const { chat, closeChat, user } = this.props;
    // console.log({ ChatWindow: chat });
    return (
      <div className="chatWindow">
        <div className="header">
          <span>{chat.users[1].username}</span>
          <button className="close" onClick={() => closeChat(chat.id)}>
            X
          </button>
        </div>
        <div className="messages">
          {chat.messages.map((message, j) => (
            <div
              key={'message' + message.id}
              className={'message ' + (message.user.id > 1 ? 'left' : 'right')}>
              {message.text}
            </div>
          ))}
        </div>
        <AddMessageMutation chat={chat}>
          <ChatInput
            handleTextChanged={this.handleTextChanged}
            textInput={this.state.textInput}
          />
        </AddMessageMutation>
      </div>
    );
  }
}
