import * as React from 'react';
import ChatBot from 'react-simple-chatbot';
import { VonageAIMsg } from '../VonageAIMsg/VonageAIMsg';

interface ChatBotContainerProps {}

interface ChatBotContainerState {}

export default class ChatBotContainer extends React.Component<
  ChatBotContainerProps & ChatBotContainerState
> {
  public state: ChatBotContainerState = {};

  public render() {
    return <ChatBot steps={this.getBotSteps()} />;
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
        replace: true,
        trigger: ({ value, steps }: { value: string; steps: any }) => {
          console.log(value, steps);
          return 'welcome';
        },
        delay: 0
      }
    ];
  };
}
