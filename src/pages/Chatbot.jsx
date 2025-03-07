import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoSend, IoMedical, IoClose } from 'react-icons/io5';
import { FaRobot } from 'react-icons/fa';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      const userMessage = { text: message, isUser: true, timestamp: new Date() };
      setChatHistory(prev => [...prev, userMessage]);

      const res = await axios.post('http://localhost:5000/chat', { message });
      
      const aiMessage = { 
        text: res.data.response, 
        isUser: false, 
        timestamp: new Date(),
        icon: <FaRobot className="text-3xl text-emerald-500" />
      };
      setChatHistory(prev => [...prev, aiMessage]);
      
      toast.success('Health AI Responded!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to get response');
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClear = () => {
    setChatHistory([]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col shadow-2xl rounded-2xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-2xl">
          <div className="flex items-center space-x-4">
            <IoMedical className="text-3xl text-white" />
            <h1 className="text-2xl font-bold text-white">
              HealthAI Companion
              <span className="block text-sm font-normal opacity-90">Powered by MediGPT-4</span>
            </h1>
          </div>
          <button 
            onClick={handleClear}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <IoClose className="text-2xl text-white" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent h-32 pointer-events-none" />
          {chatHistory.map((msg, index) => (
            <div 
              key={index}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`max-w-3xl p-4 rounded-2xl ${
                msg.isUser 
                  ? 'bg-emerald-600 text-white ml-8'
                  : 'bg-gray-100 text-gray-800 mr-8'
              } transition-all duration-200 shadow-md`}>
                {!msg.isUser && (
                  <div className="flex items-center space-x-2 mb-3">
                    {msg.icon}
                    <span className="text-sm font-semibold">HealthAI</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </p>
                <span className={`text-xs mt-2 block ${
                  msg.isUser ? 'text-emerald-100' : 'text-gray-500'
                }`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-start space-x-3 ml-8">
              <div className="animate-pulse">
                <FaRobot className="text-3xl text-emerald-500" />
              </div>
              <div className="dot-flashing"></div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-6 bg-gray-50 rounded-b-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-4">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about diabetes management, nutrition plans, or health advice..."
                className="flex-1 p-4 text-lg border-2 border-gray-200 rounded-xl resize-none transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 bg-white shadow-sm"
                rows={1}
                style={{ minHeight: '64px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="h-14 w-14 flex items-center justify-center bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-emerald-200"
              >
                <IoSend className="text-2xl" />
              </button>
            </div>
            <div className="mt-4 flex justify-between items-center px-2">
              <span className="text-sm text-gray-500">
                Secured with HIPAA-compliant encryption
              </span>
              <button
                onClick={handleClear}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;