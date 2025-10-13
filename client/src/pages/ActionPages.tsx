import React, { useState } from 'react';
import ActionForm from '../components/actions/ActionForm';
import ActionList from '../components/actions/ActionList';
import Button from '../components/common/Button';

const ActionsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setShowForm(false);
    setRefreshKey((prev) => prev + 1); // Trigger refresh
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Actions</h1>
            <p className="text-gray-600 mt-2">
              See what others are doing to make the planet greener
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'View Actions' : '+ Log Action'}
          </Button>
        </div>

        {showForm ? (
          <div className="mb-8">
            <ActionForm onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
          </div>
        ) : (
          <ActionList key={refreshKey} />
        )}
      </div>
    </div>
  );
};

export default ActionsPage;