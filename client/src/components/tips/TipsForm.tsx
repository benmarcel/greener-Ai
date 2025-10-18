import React, { useState } from 'react';
import { tipService } from '../../services/tipService';
import Button from '../common/Button';
import Toast from '../common/Toast';
interface TipFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

const TipForm: React.FC<TipFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'composting',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [status, setStatus] = useState<"success" | "error" | "info" | "warning" >("info");

  const onClose = () => {
    setToast('');
  };

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
    setToast('');
    setLoading(true);

    try {
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      await tipService.createTip({
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags,
      });

      onSuccess();
      setToast('Tip shared successfully!');
      setStatus("success");
      // Reset form
      setFormData({
        title: '',
        content: '',
        category: 'composting',
        tags: '',
      });
    } catch (err: unknown) {
      setStatus("error");
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
        // const response = (err as any).response;
        setStatus("error");
        setToast((err as { response: { data: { message: string } } }).response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Share a Tip</h2>

      {toast && (
        <Toast message={toast} onClose={onClose} type={status} />
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="soil">🌱 Soil Health</option>
            <option value="composting">♻️ Composting</option>
            <option value="pests">🐛 Pest Control</option>
            <option value="climate">🌍 Climate Action</option>
            <option value="water">💧 Water Conservation</option>
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
            placeholder="e.g., Easy Composting Tips for Beginners"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            maxLength={150}
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            required
            value={formData.content}
            onChange={handleChange}
            rows={6}
            placeholder="Share your knowledge and experience..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            maxLength={2000}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.content.length}/2000 characters</p>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., beginner, urban, organic"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Sharing...' : 'Share Tip'}
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

export default TipForm;