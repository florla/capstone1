import React, { useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", sender: "bot" }
    ]);
    const [inputText, setInputText] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputText.trim() !== '') {
            const userMessage = { text: inputText, sender: "user" };
            setMessages(prevMessages => [...prevMessages, userMessage]); // Append user message to the messages array
            setInputText('');
            // Simulate a response from the chatbot
            setTimeout(() => {
                const botResponse = { text: "I'm sorry, I'm just a demo chatbot and I don't have real responses.", sender: "bot" };
                setMessages(prevMessages => [...prevMessages, botResponse]); // Append bot response to the messages array
            }, 1000);
        }
    };

    return (
        <div>
            <div className="container">
                <h3>Chatbot</h3>
                <div className="chat-container">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                            <span className="message-text">{message.text}</span>
                        </div>
                    ))}
                </div>
                <div className="input-field">
                    <input type="text" id="chat-input" value={inputText} onChange={handleInputChange} />
                    <button className="waves-effect waves-light btn" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
