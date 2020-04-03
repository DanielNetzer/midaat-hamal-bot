import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { StyleRulesCallback } from '@material-ui/styles';
import { WithStyles, withStyles } from '@material-ui/core';
import { VonageAIMsg } from '../VonageAIMsg/VonageAIMsg';

interface IProps {}

interface ILocalState {}

// @ts-ignore
const styles: StyleRulesCallback = ({ palette, spacing }) => ({
  botContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 'auto'
  }
});

@(withStyles(styles) as any)
export default class ChatBotApp extends Component<
  IProps & Partial<WithStyles<any>>
> {
  public state: ILocalState = {};

  public render() {
    const { classes } = this.props;
    return (
      <section className={classes!.botContainer}>
        <ChatBot
          headerTitle={'מידעת - בוט תשובות ושאלות'}
          botAvatar={
            'https://cdn1.iconfinder.com/data/icons/bots/280/bot-10-2-512.png'
          }
          width={'100vw'}
          height={'100vh'}
          placeholder="הקלד את ההודעה..."
          steps={this.getBotSteps()}
        />
      </section>
    );
  }
  private getBotSteps = () => {
    return [
      {
        id: 'welcome',
        component: <VonageAIMsg />,
        waitAction: true,
        asMessage: true
      },
      {
        id: 'query',
        user: true,
        trigger: 'vgai'
      },
      {
        id: 'vgai',
        component: <VonageAIMsg />,
        waitAction: true,
        asMessage: true
      },
      {
        id: 'more_query',
        message: 'משהו נוסף שתרצה לדעת?',
        trigger: 'query'
      },
      {
        id: 'end',
        message: '♥️',
        end: true
      }
    ];
  };
}
