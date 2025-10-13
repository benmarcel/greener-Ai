import React from 'react';

interface ImpactChartProps {
  co2Saved: number;
  waterSaved: number;
  treesPlanted: number;
}

const ImpactChart: React.FC<ImpactChartProps> = ({ co2Saved, waterSaved, treesPlanted }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Your Environmental Impact</h3>
      <div className="space-y-6">
        {/* CO2 Saved */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">🌍 CO2 Saved</span>
            <span className="text-sm font-bold text-primary">{co2Saved} kg</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((co2Saved / 100) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Water Saved */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">💧 Water Saved</span>
            <span className="text-sm font-bold text-blue-600">{waterSaved} L</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((waterSaved / 500) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Trees Planted */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">🌳 Trees Planted</span>
            <span className="text-sm font-bold text-green-700">{treesPlanted}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-700 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((treesPlanted / 50) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactChart;