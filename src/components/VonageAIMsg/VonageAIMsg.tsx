import React, { Component } from 'react';
import { Loading } from 'react-simple-chatbot';

interface VonageAIState {
  loading: boolean;
  result: string;
  trigger: boolean;
  sessionId: string;
  apiKey: string;
}

export class VonageAIMsg extends Component<any, VonageAIState> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
      apiKey:
        'z1tKfnDm0QUKKn+OqhJxLUaPIoQG8DMSsk83Si3WxyXgLNXXXCqpzP2c90S2r+SySL+4YIP16EPnuWq6KYAI53MR6rc+Y8M24KV/OrnCay56xjOjyFeGnws+imK1HSZYRfJlGGnheZ7uXA==',
      sessionId: this.generateSession(new Date())
    };

    this.triggerNext = this.triggerNext.bind(this);
  }

  private generateSession(date: Date): string {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
  }

  async componentDidMount() {
    const { previousStep } = this.props;
    const { sessionId, apiKey } = this.state;
    const body = JSON.stringify({
      userId: 'midaat',
      input: previousStep.value,
      sessionId
    });

    const httpResponse = await fetch('https://api.over.ai/api/ai/call', {
      method: 'POST',
      body,
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    const nluResponse = await httpResponse.json();
    const botResponse = nluResponse.say.sentencesAsOneLine;

    // TODO: if bot response contain 'לא הצלחתי להבין' should trigger a new question,
    // if bot response is an answer should trigger 'should_another_question' step...

    this.setState({ result: botResponse, loading: false });
  }

  triggerNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { loading, result } = this.state;
    return loading ? <Loading /> : result;
  }
}
