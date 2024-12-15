// app/share1.jsx
import React from 'react';

const Share1 = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm px-4 py-3">
        <h1 className="text-lg font-medium text-gray-900">Share Your Chat</h1>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <h2 className="text-xl text-gray-700">This is the Share1 page. Share your chat here!</h2>
      </main>
    </div>
  );
};

export default Share1;
