import React from 'react';
import type { Action } from '../../types';

interface RecentActionsProps {
  actions: Action[];
}

const RecentActions: React.FC<RecentActionsProps> = ({ actions }) => {
  const getActionIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      planting: '🌱',
      composting: '♻️',
      recycling: '🗑️',
      water_saving: '💧',
    };
    return icons[type] || '✅';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Actions</h3>
      {actions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No actions yet. Start logging your green activities!</p>
      ) : (
        <div className="space-y-4">
          {actions.map((action) => (
            <div
              key={action._id}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="text-2xl">{getActionIcon(action.actionType)}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{action.title}</p>
                <p className="text-sm text-gray-600">{action.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <span>📅 {formatDate(action.date)}</span>
                  <span className="text-primary font-semibold">+{action.points} pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActions;