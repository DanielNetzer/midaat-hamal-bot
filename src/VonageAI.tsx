import { Component } from 'react';

interface VonageAIProps {
  steps: any;
  triggerNextStep: any;
}

interface VonageAIState {
  loading: boolean;
  result: string;
  trigger: boolean;
}

export class VonageAI extends Component<VonageAIProps, VonageAIState> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false
    };
  }
}
