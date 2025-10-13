import React, { useState } from 'react';
import { actionService } from '../../services/actionService';
import Button from '../common/Button';

interface ActionFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

const ActionForm: React.FC<ActionFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    actionType: 'planting',
    title: '',
    description: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await actionService.createAction(formData);
      onSuccess();
      // Reset form
      setFormData({
        actionType: 'planting',
        title: '',
        description: '',
        imageUrl: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to log action. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Log Your Green Action</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="actionType" className="block text-sm font-medium text-gray-700 mb-1">
            Action Type
          </label>
          <select
            id="actionType"
            name="actionType"
            value={formData.actionType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="planting">🌱 Planting</option>
            <option value="composting">♻️ Composting</option>
            <option value="recycling">🗑️ Recycling</option>
            <option value="water_saving">💧 Water Saving</option>
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Planted 10 tomato seedlings"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe what you did and the impact it will have..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL (Optional)
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Logging Action...' : 'Log Action'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ActionForm;