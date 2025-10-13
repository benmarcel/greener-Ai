import React from 'react';


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">🌱 Greener AI</h3>
            <p className="text-gray-400 text-sm">
             Your AI-powered companion for sustainable living, gardening, and making a real
            environmental impact.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/community" className="text-gray-400 hover:text-white">
                  Community
                </a>
              </li>
              <li>
                <a href="/ai-chat" className="text-gray-400 hover:text-white">
                  AI Assistant
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">
              #1MillionDevs4Africa Hackathon
              <br />
              Building tech for climate action
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025  Greener AI. Built with 💚 for the planet.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;