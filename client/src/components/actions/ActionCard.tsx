import React from 'react';
import type { Action, User } from '../../types';

interface ActionCardProps {
  action: Action;
}

const ActionCard: React.FC<ActionCardProps> = ({ action }) => {
  const getActionIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      planting: '🌱',
      composting: '♻️',
      recycling: '🗑️',
      water_saving: '💧',
    };
    return icons[type] || '✅';
  };

  const getActionColor = (type: string) => {
    const colors: { [key: string]: string } = {
      planting: 'bg-green-100 text-green-800',
      composting: 'bg-yellow-100 text-yellow-800',
      recycling: 'bg-blue-100 text-blue-800',
      water_saving: 'bg-cyan-100 text-cyan-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const user = action.userId as User;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{getActionIcon(action.actionType)}</span>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{action.title}</h3>
            <p className="text-sm text-gray-600">
              by {typeof user === 'object' ? user.name : 'User'} • {formatDate(action.date)}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(
            action.actionType
          )}`}
        >
          +{action.points} pts
        </span>
      </div>

      <p className="text-gray-700 mb-4">{action.description}</p>

      {action.imageUrl && (
        <img
          src={action.imageUrl}
          alt={action.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <div className="flex items-center justify-between text-sm">
        <div className="flex space-x-4 text-gray-600">
          {action.impactMetric.co2Saved > 0 && (
            <span>🌍 {action.impactMetric.co2Saved} kg CO2</span>
          )}
          {action.impactMetric.waterSaved > 0 && (
            <span>💧 {action.impactMetric.waterSaved} L water</span>
          )}
          {action.impactMetric.treesPlanted > 0 && (
            <span>🌳 {action.impactMetric.treesPlanted} trees</span>
          )}
        </div>
        {action.verified && <span className="text-green-600 font-semibold">✓ Verified</span>}
      </div>
    </div>
  );
};

export default ActionCard;