import React, { Component } from 'react';
import ChatBotApp from '../ChatBotApp/ChatBotApp';
import AuthContainer from '../AuthContainer/AuthContainer';

interface IProps {}
export default class ChatBotContainer extends Component<IProps> {
  public state = {
    isAuthorized: false
  };

  public render() {
    const { isAuthorized } = this.state;
    return isAuthorized ? (
      <ChatBotApp />
    ) : (
      <AuthContainer onFormSubmit={this.validateAuth} />
    );
  }

  private validateAuth = (user: string, pass: string) => {
    // if(user === "midaatchatbot" && pass === "!WhatsappDoc!1") {
    if (user === '1' && pass === '1') {
      const newState = this.state;
      newState.isAuthorized = true;
      this.setState(newState);
    }
  };
}
