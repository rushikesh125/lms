'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minimize2, Maximize2, Send, Bot, BrainCog } from 'lucide-react';

const PopupChatbot = () => {
  // States for controlling the chatbot
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! How can I help you today?",
      isBot: true,
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  // Toggle chatbot open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  // Toggle chat minimized/expanded
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Handle sending messages
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessage = {
      id: messages.length + 1,
      text: input,
      isBot: false,
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thank you for your message! This is a demo response.",
        isBot: true,
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat button (always visible) */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-40 h-14 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
        >
          <BrainCog size={24} />
          Ask Questions 
        </button>
      )}

      {/* Chat popup */}
      {isOpen && (
        <div 
          className={`fixed right-6 ${
            isMinimized ? 'bottom-6 h-16 w-72' : 'bottom-6 h-[500px] w-80 sm:w-96'
          } bg-white rounded-2xl shadow-xl border border-gray-200 transition-all duration-300 z-50 overflow-hidden`}
        >
          {/* Header */}
          <div className="bg-purple-500 text-white p-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full p-1">
                <Bot size={20} className="text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Chat Assistant</h3>
                {!isMinimized && (
                  <p className="text-xs text-purple-100">Online</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={toggleMinimize} className="text-white hover:text-purple-200 transition-colors">
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button onClick={toggleChat} className="text-white hover:text-purple-200 transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages area (only shown when not minimized) */}
          {!isMinimized && (
            <div className="h-[calc(100%-128px)] overflow-y-auto p-4 bg-gray-50">
              <div className="flex flex-col gap-3">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                        message.isBot 
                          ? 'bg-white border border-gray-200 text-gray-800' 
                          : 'bg-purple-500 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input area (only shown when not minimized) */}
          {!isMinimized && (
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 py-2 px-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PopupChatbot;