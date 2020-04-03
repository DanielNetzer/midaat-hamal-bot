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
    console.log(props);
    this.state = {
      loading: true,
      result: '',
      trigger: false,
      apiKey:
        'OUx111CSASUC2MvEUPwwa9IwZr6gABICe4l6HsbCgCyLC6+f4yt1AoOIwsWnoBsSRGZPOi7C6DMBobr/utHasBoUCu5nt+Rp4T9XYL176K+q08chELYdil7BNVcx9rReEMk26kyFW5ed2w==',
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
    const { previousStep, step } = this.props;
    const { sessionId, apiKey } = this.state;

    const input = step.id === 'welcome' ? 'היי' : previousStep.value;

    console.log(input);

    const body = JSON.stringify({
      userId: 'midaat',
      input,
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
    const botResponse: string = nluResponse.say.sentencesAsOneLine;

    this.setState({ result: botResponse, loading: false });

    // if welcome step or rephrase required, let's trigger query
    let stepId: string;
    if (botResponse.includes('לנסח') || step.id === 'welcome') {
      stepId = 'query';
    } else if (botResponse.includes('תישארו בבית')) {
      stepId = 'end';
    } else {
      stepId = 'more_query';
    }

    this.triggerNext(stepId, botResponse);
  }

  triggerNext(stepId: string, value: string) {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep({ value, trigger: stepId });
    });
  }

  render() {
    const { loading, result } = this.state;
    return loading ? <Loading /> : result;
  }
}
