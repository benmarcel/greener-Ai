import React, { useState } from "react";
import { actionService } from "../../services/actionService";
import Button from "../common/Button";
import Toast from "../common/Toast";
interface ActionFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

const ActionForm: React.FC<ActionFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    actionType: "planting",
    title: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "success" | "error" | "info" | "warning"
  >("info");
  const [toast, setToast] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onClose = () => {
    setToast("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast("");
    setLoading(true);

    try {
      await actionService.createAction(formData);
      onSuccess();
      // Reset form
      setFormData({
        actionType: "planting",
        title: "",
        description: "",
        imageUrl: "",
      });
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
      ) {
        setStatus("error");
        setToast(
          (err as { response: { data: { message: string } } }).response.data
            .message
        );
      } else {
        setStatus("error");
        setToast("Failed to log action. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Log Your Green Action
      </h2>

      {toast && <Toast message={toast} onClose={onClose} type={status} />}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="actionType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            maxLength={500}
            required
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder=" Briefly describe what you did and the impact it will have..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          {loading ? "Logging Action..." : "Log Action"}
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
