import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const Inbox = () => {
  const messages = [
    {
      id: 1,
      sender: 'John Doe',
      timestamp: '2 hrs ago',
      preview: 'Hey, just wanted to check in about the project status...',
    },
    {
      id: 2,
      sender: 'Jane Smith',
      timestamp: '1 day ago',
      preview: 'Can we schedule a meeting for tomorrow to discuss...',
    },
    {
      id: 3,
      sender: 'Team AI',
      timestamp: '3 days ago',
      preview: 'Welcome to our platform! Let us know if you need he...',
    },
    {
      id: 4,
      sender: 'Peter',
      timestamp: '2 hrs ago',
      preview: 'Hey, just wanted to check in about the project status...',
    },
    {
      id: 5,
      sender: 'William',
      timestamp: '3 days ago',
      preview: 'Can we schedule a meeting for tomorrow to discuss...',
    },
    {
      id: 6,
      sender: 'Assemble',
      timestamp: '5 days ago',
      preview: 'Welcome to our platform! Let us know if you need he...',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Inbox</h2>
        <FiMail className="text-blue-600 text-2xl" />
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition duration-200 shadow-sm hover:shadow-md animate-fade-in"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <FaUserCircle className="text-gray-400 text-4xl" />
            </div>

            {/* Message Content */}
            <div className="flex-grow ml-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-700">{msg.sender}</h3>
                <span className="text-gray-500 text-xs">{msg.timestamp}</span>
              </div>
              <p className="text-gray-600 text-sm truncate">{msg.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;
