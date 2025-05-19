import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface ReviewFormProps {
  movieId: number;
  onSubmit: (rating: number, content: string) => Promise<void>;
}

export function ReviewForm({ movieId, onSubmit }: ReviewFormProps) {
  const { isAuthenticated, user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (content.trim().length < 10) {
      setError('Review must be at least 10 characters');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(rating, content);
      // Reset form after successful submission
      setRating(0);
      setContent('');
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-md text-center">
        <p className="text-gray-300 mb-4">You need to be logged in to write a review.</p>
        <Button variant="primary" onClick={() => window.location.href = '/login'}>
          Log In to Write a Review
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleRatingClick(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                className="mr-1 focus:outline-none"
              >
                <Star 
                  className={`h-8 w-8 ${
                    (hoverRating ? value <= hoverRating : value <= rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-600'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="reviewContent" 
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Your Review
          </label>
          <textarea
            id="reviewContent"
            rows={5}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:ring-primary focus:border-primary"
            placeholder="Share your thoughts about this movie..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <p className="text-xs text-gray-400 mt-1">
            {500 - content.length} characters remaining
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-destructive/20 border border-destructive/50 rounded-md text-white">
            {error}
          </div>
        )}
        
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Submit Review
        </Button>
      </form>
    </div>
  );
}