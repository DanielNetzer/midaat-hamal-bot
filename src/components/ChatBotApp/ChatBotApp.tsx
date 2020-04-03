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
    marginTop: 'auto'
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
            'http://midaat.org.il/wp-content/uploads/2020/03/Logo-for-web2@2x.png'
          }
          steps={this.getBotSteps()}
        />
      </section>
    );
  }
  private getBotSteps = () => {
    return [
      {
        id: 'welcome',
        message: 'ברוכים הבאים לחמ״ל קורונה מקבוצת מדעת, מה תרצו לדעת?',
        trigger: 'query'
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
        asMessage: true,
        trigger: 'welcome'
      }
    ];
  };
}
