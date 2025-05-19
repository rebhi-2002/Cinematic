import React from 'react';
import { Movie } from '../../types';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  className?: string;
}

export function MovieGrid({ movies, title, className = '' }: MovieGridProps) {
  if (!movies.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No movies found.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}