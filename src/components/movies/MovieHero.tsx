import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Clock, Plus } from 'lucide-react';
import { Movie } from '../../types';
import { getBackdropUrl, formatVoteAverage, getGenreNamesFromIds, getYearFromDate } from '../../utils/helpers';
import { Button } from '../ui/Button';
import { useWatchlist } from '../../contexts/WatchlistContext';
import { useAuth } from '../../contexts/AuthContext';

interface MovieHeroProps {
  movie: Movie;
}

export function MovieHero({ movie }: MovieHeroProps) {
  const { isAuthenticated } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);
  
  const genres = getGenreNamesFromIds(movie.genre_ids);
  
  return (
    <div className="relative">
      {/* Backdrop Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <img 
          src={getBackdropUrl(movie.backdrop_path)} 
          alt={movie.title} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Poster */}
          <div className="w-56 md:w-72 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="w-full h-auto"
            />
          </div>
          
          {/* Details */}
          <div className="flex-1 max-w-2xl text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-1 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-medium">{formatVoteAverage(movie.vote_average)}</span>
              </div>
              
              {movie.release_date && (
                <span className="text-gray-300 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {getYearFromDate(movie.release_date)}
                </span>
              )}
              
              {genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {genres.slice(0, 3).map((genre) => (
                    <span 
                      key={genre} 
                      className="text-xs text-white bg-gray-800/60 px-2 py-1 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <p className="text-gray-300 mb-8 text-sm md:text-base">
              {movie.overview}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link to={`/movie/${movie.id}`}>
                <Button className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Trailer
                </Button>
              </Link>
              
              {isAuthenticated && (
                <Button 
                  variant={inWatchlist ? 'outline' : 'secondary'}
                  onClick={() => inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                  className="flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}