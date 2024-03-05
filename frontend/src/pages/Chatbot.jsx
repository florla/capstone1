import React, { useEffect, useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", sender: "bot" }
    ]);
    const [inputText, setInputText] = useState('');

    const [chatLog, setChatLog] = useState([
        { role: "system", content: "You are a helpful assistant for a budgeting website who gives financial advice as a couple of sentences in a JSON output 'response'." },
        { role: "assistant", content: "Hello! If you have any financial questions or need assistance, feel free to ask. I'm here to provide guidance and support."},
      ]); 

    useEffect(() => {
        setChatLog(chatLog);
    }, [chatLog]);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputText.trim() !== '') {
            const userMessage = { text: inputText, sender: "user" };
            setMessages(prevMessages => [...prevMessages, userMessage]); // Append user message to the messages array
            setInputText('');
            // Simulate a response from the chatbot
            // setTimeout(() => {
            //     const botResponse = { text: "I'm sorry, I'm just a demo chatbot and I don't have real responses.", sender: "bot" };
            //     setMessages(prevMessages => [...prevMessages, botResponse]); // Append bot response to the messages array
            // }, 1000);            
            console.log(chatLog);
            fetch(`http://localhost:5000/chat?prompt=${JSON.stringify([...chatLog, { role: "user", content: inputText }])}`).then(response => response.json()).then(data => {
                const botResponse = { text: data.response, sender: "bot" };
                setMessages(prevMessages => [...prevMessages, botResponse]); // Append bot response to the messages array
                setChatLog([...chatLog, { role: "user", content: inputText }, { role: "assistant", content: data.response }]);
            })
            // setChatLog([...chatLog]); // Append user message to the chatLog array
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
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
                    <input type="text" id="chat-input" value={inputText} onChange={handleInputChange} onKeyPress={handleKeyPress} />
                    <button className="waves-effect waves-light btn" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
