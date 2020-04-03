import React from 'react';
import ChatBot from 'react-simple-chatbot';
import './App.css';

export function generateSession(date: Date): string {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
}

const newDate = new Date();
const sessionId = generateSession(newDate);
const apiKey =
  'z1tKfnDm0QUKKn+OqhJxLUaPIoQG8DMSsk83Si3WxyXgLNXXXCqpzP2c90S2r+SySL+4YIP16EPnuWq6KYAI53MR6rc+Y8M24KV/OrnCay56xjOjyFeGnws+imK1HSZYRfJlGGnheZ7uXA==';

const steps = [
  {
    id: '0',
    message: 'ברוכים הבאים לחמ״ל קורונה מקבוצת מדעת, מה תרצו לדעת?',
    trigger: '1'
  },
  {
    id: '1',
    user: true,
    trigger: '2'
  },
  {
    id: '2',
    message: async ({ value }: { value: string }) => {
      const body = JSON.stringify({
        userId: 'midaat',
        input: value,
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
      console.log(nluResponse);
      const botResponse = nluResponse.say.sentencesAsOneLine;
      console.log(botResponse);
      return botResponse;
    },
    trigger: async ({ value }: { value: string }) => {
      console.log(value);
      return '0';
    }
  }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">בוט חמ״ל קורונה - מידעת</header>
      <section>
        <ChatBot steps={steps} />
      </section>
    </div>
  );
}

export default App;
