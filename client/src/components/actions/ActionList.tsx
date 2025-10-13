import React, { useEffect, useState } from 'react';
import type { Action } from '../../types';
import { actionService } from '../../services/actionService';
import ActionCard from './ActionCard';
import LoadingSpinner from '../common/LoadingSpinner';

const ActionList: React.FC = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadActions();
  }, [page]);

  const loadActions = async () => {
    try {
      const data = await actionService.getAllActions(page);
      setActions((prev) => (page === 1 ? data.actions : [...prev, ...data.actions]));
      setHasMore(data.pagination.hasMore);
    } catch (error) {
      console.error('Error loading actions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
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
        {actions.map((action) => (
          <ActionCard key={action._id} action={action} />
        ))}
      </div>

      {actions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No actions logged yet. Be the first to make an impact!</p>
        </div>
      )}

      {hasMore && actions.length > 0 && (
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

export default ActionList;