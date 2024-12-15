'use client';

import { Button } from './components/button';
import { Input } from './components/input';
import { ScrollArea } from './components/scroll-area';
import { ArrowLeft, ChevronDown, Share2, X, Smile } from 'lucide-react';
import Link from 'next/link'; // Use Link for navigation
import { useState, useEffect } from 'react';

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]); // Store chat messages
  const [input, setInput] = useState(''); // User input message

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:3000/api/socket');
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, { message: data.message, isSentByUser: false }]); // Mark received messages
    };

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    if (socket && input.trim()) {
      const newMessage = input;
      socket.send(JSON.stringify({ message: newMessage }));
      setMessages((prev) => [...prev, { message: newMessage, isSentByUser: true }]); // Mark sent messages
      setInput(''); // Clear input field
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
            <h1 className="text-base font-medium text-gray-900">"Placeholder"</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Share1 Button */}
            <Link href="/share1">
              <Button variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-500">
                <Share2 className="h-5 w-5 text-gray-600" />
              </Button>
            </Link>
            {/* Dropdown Button */}
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

      {/* Navigation */}
      <nav className="px-4 bg-white border-b">
        <div className="flex flex-col gap-2 py-2">
          <Link
            href="/threads"
            className="flex items-center gap-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-500 rounded-md px-3 py-2"
          >
            <ArrowLeft className="h-4 w-4 rotate-180" />
            Threads
          </Link>
          {/* Add a separator divider with right border and shadow */}
          <div className="relative">
            <Link
              href="/discover"
              className="flex items-center gap-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-500 rounded-md px-3 py-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <rect x="9" y="9" width="6" height="6" />
              </svg>
              Discover Chat Channels
            </Link>
            {/* Right Border Separator */}
            <div className="absolute right-0 top-0 bottom-0 border-r-4 border-gray-300 shadow-md" />
          </div>
        </div>
      </nav>

      {/* Chat Area */}
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="max-w-2xl mx-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 text-sm rounded-md ${msg.isSentByUser ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
              >
                {msg.message}
              </div>
            ))
          ) : (
            <div className="bg-gray-200 text-sm rounded-xl p-4 text-center text-gray-700">
              Send an invite message to start chatting! 👋
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        <div className="max-w-2xl mx-auto relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
