'use client';

import { Button } from './components/button';
import { Input } from './components/input';
import { ScrollArea } from './components/scroll-area';
import { ArrowLeft, ChevronDown, Share2, X, Smile } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function Chat() {
  const [messages, setMessages] = useState([]);  // State to store the list of messages
  const [message, setMessage] = useState('');  // State to store the current message being typed

  // Create the socket connection to the Next.js API route
  const socket = io('http://localhost:3001');  // Update this URL if your backend is running elsewhere

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receive-message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('receive-message');  // Remove event listener when component unmounts
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send-message', message);  // Emit the message to the server
      setMessage('');  // Clear the input field after sending
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/threads">
              <Button variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-500">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
            </Link>
            <h1 className="text-base font-medium text-gray-900">"Chat"</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/share1">
              <Button variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-500">
                <Share2 className="h-5 w-5 text-gray-600" />
              </Button>
            </Link>
            <Link href="/discover">
              <Button variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-500">
                <ChevronDown className="h-5 w-5 text-gray-600" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-500">
              <X className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-200 text-sm rounded-xl p-4 text-center text-gray-700">
            {messages.length === 0 ? (
              "Send an invite message to start chatting! 👋"
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="text-gray-700">
                  {msg}
                </div>
              ))
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        <div className="max-w-2xl mx-auto relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="pr-20 text-sm py-4 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5 text-gray-500" />
            </Button>
            <Button variant="primary" size="sm" className="px-4 py-2" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
