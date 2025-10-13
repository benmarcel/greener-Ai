import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { dashboardService } from '../services/dashboardService';
import type { DashboardStats, CommunityStats } from '../types';
import StatsCard from '../components/dashboard/StatsCard';
import ImpactChart from '../components/dashboard/ImpactChart';
import Leaderboard from '../components/dashboard/Leaderboard';
import RecentActions from '../components/dashboard/RecentActions';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [userStats, commStats] = await Promise.all([
        dashboardService.getUserStats(),
        dashboardService.getCommunityStats(),
      ]);
      setStats(userStats);
      setCommunityStats(commStats);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Here's your sustainability journey so far</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Points"
            value={stats?.stats.totalPoints || 0}
            icon="⭐"
            color="bg-yellow-500"
            subtitle={`Level ${stats?.stats.level || 1}`}
          />
          <StatsCard
            title="Actions Logged"
            value={stats?.stats.totalActions || 0}
            icon="✅"
            color="bg-green-500"
          />
          <StatsCard
            title="Tips Shared"
            value={stats?.stats.totalTips || 0}
            icon="💡"
            color="bg-blue-500"
          />
          <StatsCard
            title="CO2 Saved"
            value={`${stats?.stats.totalImpact.co2Saved || 0} kg`}
            icon="🌍"
            color="bg-primary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Impact & Recent Actions */}
          <div className="lg:col-span-2 space-y-8">
            <ImpactChart
              co2Saved={stats?.stats.totalImpact.co2Saved || 0}
              waterSaved={stats?.stats.totalImpact.waterSaved || 0}
              treesPlanted={stats?.stats.totalImpact.treesPlanted || 0}
            />
            <RecentActions actions={stats?.recentActions || []} />
          </div>

          {/* Right Column - Leaderboard */}
          <div>
            <Leaderboard />
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-gradient-to-r from-primary to-green-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">🌍 Community Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-3xl font-bold">{communityStats?.totalUsers || 0}</p>
              <p className="text-green-100">Active Members</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{communityStats?.totalActions || 0}</p>
              <p className="text-green-100">Actions Taken</p>
            </div>
            <div>
              <p className="text-3xl font-bold">
                {communityStats?.communityImpact.co2Saved || 0} kg
              </p>
              <p className="text-green-100">CO2 Saved Together</p>
            </div>
            <div>
              <p className="text-3xl font-bold">
                {communityStats?.communityImpact.treesPlanted || 0}
              </p>
              <p className="text-green-100">Trees Planted</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/actions/new"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-bold text-lg mb-2">Log an Action</h3>
            <p className="text-gray-600 text-sm">Record your green activities and earn points</p>
          </Link>
          <Link
            to="/ai-chat"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="font-bold text-lg mb-2">Ask AI Assistant</h3>
            <p className="text-gray-600 text-sm">Get instant sustainability advice</p>
          </Link>
          <Link
            to="/community"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-4xl mb-3">👥</div>
            <h3 className="font-bold text-lg mb-2">Community Tips</h3>
            <p className="text-gray-600 text-sm">Share and learn from others</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;