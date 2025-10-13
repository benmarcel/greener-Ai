import React, { useState } from 'react';
import type { Tip, User } from '../../types';
import { tipService } from '../../services/tipService';
import { useAuth } from '../../hooks/useAuth';

interface TipCardProps {
  tip: Tip;
  onUpdate?: () => void;
}

const TipCard: React.FC<TipCardProps> = ({ tip, onUpdate }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(tip.likedBy.includes(user?.id || ''));
  const [likes, setLikes] = useState(tip.likes);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const author = tip.authorId as User;

  const handleLike = async () => {
    try {
      const response = await tipService.likeTip(tip._id);
      setIsLiked(response.isLiked);
      setLikes(response.likes);
    } catch (error) {
      console.error('Error liking tip:', error);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await tipService.addComment(tip._id, comment);
      setComment('');
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      soil: 'bg-amber-100 text-amber-800',
      composting: 'bg-green-100 text-green-800',
      pests: 'bg-red-100 text-red-800',
      climate: 'bg-blue-100 text-blue-800',
      water: 'bg-cyan-100 text-cyan-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(tip.category)}`}
>
{tip.category}
</span>
{tip.isAIGenerated && (
<span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
🤖 AI Generated
</span>
)}
</div>
<h3 className="font-bold text-xl text-gray-900 mb-2">{tip.title}</h3>
<p className="text-sm text-gray-600">
by {typeof author === 'object' ? author.name : 'User'} •{' '}
{new Date(tip.createdAt).toLocaleDateString()}
</p>
</div>
</div>
{/* Content */}
  <p className="text-gray-700 mb-4 whitespace-pre-wrap">{tip.content}</p>

  {/* Tags */}
  {tip.tags.length > 0 && (
    <div className="flex flex-wrap gap-2 mb-4">
      {tip.tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
        >
          #{tag}
        </span>
      ))}
    </div>
  )}

  {/* Actions */}
  <div className="flex items-center justify-between pt-4 border-t">
    <button
      onClick={handleLike}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
        isLiked
          ? 'bg-red-100 text-red-600'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <span>{isLiked ? '❤️' : '🤍'}</span>
      <span className="font-semibold">{likes}</span>
    </button>

    <button
      onClick={() => setShowComments(!showComments)}
      className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
    >
      <span>💬</span>
      <span className="font-semibold">{tip.comments.length}</span>
    </button>
  </div>

  {/* Comments Section */}
  {showComments && (
    <div className="mt-4 pt-4 border-t">
      <h4 className="font-semibold text-gray-900 mb-3">Comments</h4>

      {/* Comment List */}
      <div className="space-y-3 mb-4">
        {tip.comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
        ) : (
          tip.comments.map((comment, index) => {
            const commentUser = comment.userId as User;
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <p className="font-semibold text-sm text-gray-900">
                  {typeof commentUser === 'object' ? commentUser.name : 'User'}
                </p>
                <p className="text-gray-700 text-sm mt-1">{comment.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(comment.date).toLocaleDateString()}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Add Comment */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
        />
        <button
          onClick={handleAddComment}
          disabled={submitting || !comment.trim()}
          className="bg-primary hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
        >
          {submitting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  )}
</div>
);
};
export default TipCard;