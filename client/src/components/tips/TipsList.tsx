import React, { useEffect, useState } from 'react';
import type { Tip } from '../../types';
import { tipService } from '../../services/tipService';
import TipCard from './TipsCard';
import LoadingSpinner from '../common/LoadingSpinner';

interface TipListProps {
  category?: string;
  refreshKey?: number;
}

const TipList: React.FC<TipListProps> = ({ category, refreshKey }) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(1);
    loadTips(1);
  }, [category, refreshKey]);

  const loadTips = async (pageNum: number = page) => {
    try {
      const data = await tipService.getAllTips(pageNum, category);
      setTips((prev) => (pageNum === 1 ? data.tips : [...prev, ...data.tips]));
      setHasMore(pageNum < data.pagination.totalPages);
    } catch (error) {
      console.error('Error loading tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadTips(nextPage);
  };

  if (loading && page === 1) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        {tips.map((tip) => (
          <TipCard key={tip._id} tip={tip} onUpdate={() => loadTips(1)} />
        ))}
      </div>

      {tips.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tips yet. Be the first to share your knowledge!</p>
        </div>
      )}

      {hasMore && tips.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-primary hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TipList;