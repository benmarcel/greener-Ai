import React, { useState } from 'react';
import TipForm from '../components/tips/TipsForm';
import TipList from '../components/tips/TipsList';
import Button from '../components/common/Button';

const Community: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);

  const categories = [
    { value: '', label: 'All Tips', icon: '📚' },
    { value: 'soil', label: 'Soil Health', icon: '🌱' },
    { value: 'composting', label: 'Composting', icon: '♻️' },
    { value: 'pests', label: 'Pest Control', icon: '🐛' },
    { value: 'climate', label: 'Climate Action', icon: '🌍' },
    { value: 'water', label: 'Water Conservation', icon: '💧' },
  ];

  const handleSuccess = () => {
    setShowForm(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Tips</h1>
            <p className="text-gray-600 mt-2">Share knowledge and learn from others</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'View Tips' : '+ Share Tip'}
          </Button>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value || undefined)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === (cat.value || undefined)
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form or List */}
        {showForm ? (
          <div className="mb-8">
            <TipForm onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
          </div>
        ) : (
          <TipList category={selectedCategory} refreshKey={refreshKey} />
        )}
      </div>
    </div>
  );
};

export default Community;