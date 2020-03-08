import React, { Component } from 'react';

export default class ChatInput extends Component {
  handleKeyPress = event => {
    // const self = this;
    const { chat, addMessage, handleTextChanged, textInput } = this.props;

    if (event.key === 'Enter' && textInput.length) {
      addMessage({
        variables: { message: { text: textInput, chatId: chat.id } }
      }).then(() => {
        handleTextChanged('');
      });
    }
  };
  onChangeChatInput = event => {
    event.preventDefault();
    this.props.handleTextChanged(event.target.value);
  };
  render() {
    const { textInput } = this.props;
    return (
      <div className="input">
        <input
          type="text"
          value={textInput}
          onChange={this.onChangeChatInput}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}
