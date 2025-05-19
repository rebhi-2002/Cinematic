import React from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { Review } from '../../types';
import { formatDate } from '../../utils/helpers';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { author, content, created_at, author_details } = review;
  
  // Function to render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const maxRating = 5;
    const normalizedRating = Math.round(rating / 2); // TMDb uses 10-point scale
    
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-4 w-4 ${i <= normalizedRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
        />
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
            {author_details.avatar_path ? (
              <img 
                src={`https://image.tmdb.org/t/p/w45${author_details.avatar_path}`} 
                alt={author} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-400 font-semibold">
                {author.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="ml-3">
            <div className="font-medium text-white">{author}</div>
            <div className="text-xs text-gray-400">{formatDate(created_at)}</div>
          </div>
        </div>
        
        {author_details.rating ? (
          <div className="flex items-center">
            {renderStars(author_details.rating)}
          </div>
        ) : null}
      </div>
      
      <div className="prose prose-sm prose-invert max-w-none mb-4">
        <p className="text-gray-300">{content}</p>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-400">
        <button className="flex items-center hover:text-white transition-colors">
          <ThumbsUp className="h-4 w-4 mr-1" />
          Helpful
        </button>
        <button className="flex items-center hover:text-white transition-colors">
          <Flag className="h-4 w-4 mr-1" />
          Report
        </button>
      </div>
    </div>
  );
}