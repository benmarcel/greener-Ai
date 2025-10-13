import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Greener AI {' '}
            <span className="text-primary">Greener Planet</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your AI-powered companion for sustainable living, gardening, and making a real
            environmental impact.
</p>
<div className="flex justify-center space-x-4">
{isAuthenticated ? (
<Link to="/dashboard">
<Button className="text-lg px-8 py-3">Go to Dashboard</Button>
</Link>
) : (
<>
<Link to="/register">
<Button className="text-lg px-8 py-3">Get Started</Button>
</Link>
<Link to="/ai-chat">
<Button variant="secondary" className="text-lg px-8 py-3">
Try AI Assistant
</Button>
</Link>
</>
)}
</div>
</div>
</div>{/* Features Section */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
      What You Can Do with Greener AI
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-4xl mb-4">🤖</div>
        <h3 className="text-xl font-bold mb-2">AI-Powered Advice</h3>
        <p className="text-gray-600">
          Get instant, personalized sustainability and gardening advice tailored to your
          climate and location.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-xl font-bold mb-2">Track Your Impact</h3>
        <p className="text-gray-600">
          Log your green actions, earn points, and see your real environmental impact with
          CO2 saved, water conserved, and more.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-4xl mb-4">🌍</div>
        <h3 className="text-xl font-bold mb-2">Join the Community</h3>
        <p className="text-gray-600">
          Share tips, learn from others, and see collective impact as we build a greener
          planet together.
        </p>
      </div>
    </div>
  </div>

  {/* Focus Areas */}
  <div className="bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Focus Areas</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: '🌱', title: 'Soil Health' },
          { icon: '🌾', title: 'Sustainable Agriculture' },
          { icon: '🌳', title: 'Reforestation' },
          { icon: '🏞️', title: 'Land Rehabilitation' },
        ].map((area, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-5xl mb-2">{area.icon}</div>
            <h3 className="font-semibold text-lg">{area.title}</h3>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* CTA Section */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">
      Ready to Make a Difference?
    </h2>
    <p className="text-xl text-gray-600 mb-8">
      Join thousands making the planet greener, one action at a time.
    </p>
    {!isAuthenticated && (
      <Link to="/register">
        <Button className="text-lg px-8 py-3">Join Greener AI Today</Button>
      </Link>
    )}
  </div>
</div>);
};
export default Home;