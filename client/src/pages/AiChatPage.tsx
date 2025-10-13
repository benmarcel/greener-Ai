import React from 'react';
import Chatbot from '../components/ai/Chatbot';

const AIChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Assistant</h1>
          <p className="text-lg text-gray-600">
            Get instant answers to your sustainability and gardening questions
          </p>
        </div>
        <Chatbot />
        
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">🌱 Gardening Tips</h3>
            <p className="text-gray-600 text-sm">
              Get advice on growing crops in your specific climate zone
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">♻️ Sustainability</h3>
            <p className="text-gray-600 text-sm">
              Learn practical ways to reduce your environmental impact
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">🌍 Climate Action</h3>
            <p className="text-gray-600 text-sm">
              Discover actions you can take to help fight climate change
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;