import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { MovieGrid } from '../components/movies/MovieGrid';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useWatchlist } from '../contexts/WatchlistContext';
import { Movie } from '../types';
import { getMovieDetails } from '../services/movieService';

export function WatchlistPage() {
  const { isAuthenticated, user } = useAuth();
  const { watchlist, toggleWatched } = useWatchlist();
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'watched' | 'to-watch'>('all');

  useEffect(() => {
    async function fetchWatchlistMovies() {
      if (!isAuthenticated || watchlist.length === 0) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Fetch details for each movie in the watchlist
        const moviePromises = watchlist.map(item => getMovieDetails(item.movieId));
        const moviesData = await Promise.all(moviePromises);
        
        setMovies(moviesData);
      } catch (error) {
        console.error('Failed to fetch watchlist movies', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchWatchlistMovies();
  }, [isAuthenticated, watchlist]);

  const filteredMovies = movies.filter(movie => {
    const watchlistItem = watchlist.find(item => item.movieId === movie.id);
    
    if (filter === 'watched') {
      return watchlistItem && watchlistItem.watched;
    } else if (filter === 'to-watch') {
      return watchlistItem && !watchlistItem.watched;
    }
    
    return true;
  });

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Watchlist</h1>
            <p className="text-gray-300 mb-6">
              You need to be logged in to view and manage your watchlist.
            </p>
            <Button onClick={() => window.location.href = '/login'}>
              Log In
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
            <p className="text-gray-400 mt-2">
              {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} in your list
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button 
              variant={filter === 'all' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'to-watch' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('to-watch')}
            >
              To Watch
            </Button>
            <Button 
              variant={filter === 'watched' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('watched')}
            >
              Watched
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : watchlist.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-300 mb-4">Your watchlist is empty</p>
            <Button onClick={() => window.location.href = '/'}>
              Discover Movies
            </Button>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-300 mb-4">No movies match the selected filter</p>
            <Button onClick={() => setFilter('all')}>
              Show All Movies
            </Button>
          </div>
        ) : (
          <MovieGrid movies={filteredMovies} />
        )}
      </div>
    </Layout>
  );
}