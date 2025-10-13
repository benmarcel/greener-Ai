import React, { useEffect, useState } from 'react';
import type { LeaderboardUser } from '../../types';
import { dashboardService } from '../../services/dashboardService';
import LoadingSpinner from '../common/LoadingSpinner';

const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await dashboardService.getLeaderboard(10);
      setLeaders(data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">🏆 Top Contributors</h3>
      <div className="space-y-3">
        {leaders.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span
                className={`font-bold text-lg ${
                  index === 0
                    ? 'text-yellow-500'
                    : index === 1
                    ? 'text-gray-400'
                    : index === 2
                    ? 'text-amber-600'
                    : 'text-gray-600'
                }`}
              >
                #{index + 1}
              </span>
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.location}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary">{user.points} pts</p>
              <p className="text-xs text-gray-500">Level {user.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;