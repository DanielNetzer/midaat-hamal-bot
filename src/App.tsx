import React from 'react';
import ChatBot from 'react-simple-chatbot';
import './App.css';
import ChatBotContainer from "./components/ChatBotContainer/ChatBotContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">בוט חמ״ל קורונה - מידעת</header>
      <section>
        <ChatBotContainer/>
      </section>
    </div>
  );
}

export default App;
