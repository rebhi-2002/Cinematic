import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WatchlistItem, Movie } from '../types';
import { useAuth } from './AuthContext';

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  isInWatchlist: (movieId: number) => boolean;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  toggleWatched: (movieId: number) => void;
  getWatchlistMovies: () => WatchlistItem[];
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  // Load watchlist from localStorage on initialization
  useEffect(() => {
    if (user) {
      const storedWatchlist = localStorage.getItem(`watchlist-${user.id}`);
      if (storedWatchlist) {
        setWatchlist(JSON.parse(storedWatchlist));
      }
    } else {
      setWatchlist([]);
    }
  }, [user]);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`watchlist-${user.id}`, JSON.stringify(watchlist));
    }
  }, [watchlist, user]);

  const isInWatchlist = (movieId: number) => {
    return watchlist.some(item => item.movieId === movieId);
  };

  const addToWatchlist = (movie: Movie) => {
    if (!user) return;
    
    if (!isInWatchlist(movie.id)) {
      const newItem: WatchlistItem = {
        id: `watchlist-${Date.now()}`,
        movieId: movie.id,
        userId: user.id,
        addedDate: new Date().toISOString(),
        watched: false
      };
      
      setWatchlist([...watchlist, newItem]);
    }
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(watchlist.filter(item => item.movieId !== movieId));
  };

  const toggleWatched = (movieId: number) => {
    setWatchlist(
      watchlist.map(item => 
        item.movieId === movieId
          ? { ...item, watched: !item.watched }
          : item
      )
    );
  };

  const getWatchlistMovies = () => {
    return watchlist;
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        isInWatchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatched,
        getWatchlistMovies
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}