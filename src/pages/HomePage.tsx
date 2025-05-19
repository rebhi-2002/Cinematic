import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { MovieHero } from '../components/movies/MovieHero';
import { MovieCarousel } from '../components/movies/MovieCarousel';
import { 
  getTrendingMovies, 
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from '../services/movieService';
import { Movie } from '../types';

export function HomePage() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        
        const [trending, popular, topRated, upcoming] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies()
        ]);
        
        if (trending.length > 0) {
          // Pick a random movie for hero section
          const randomIndex = Math.floor(Math.random() * Math.min(5, trending.length));
          setFeaturedMovie(trending[randomIndex]);
        }
        
        setTrendingMovies(trending);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setUpcomingMovies(upcoming);
      } catch (err) {
        console.error('Failed to fetch movies', err);
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMovies();
  }, []);

  if (isLoading && !featuredMovie) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-destructive/20 border border-destructive rounded-lg p-4">
            <p className="text-white">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      {featuredMovie && <MovieHero movie={featuredMovie} />}
      
      {/* Movie Sections */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Trending Movies */}
        <MovieCarousel 
          title="Trending Now" 
          movies={trendingMovies} 
          viewAllLink="/movies/trending"
        />
        
        {/* Popular Movies */}
        <MovieCarousel 
          title="Popular Movies" 
          movies={popularMovies} 
          viewAllLink="/movies/popular"
        />
        
        {/* Top Rated Movies */}
        <MovieCarousel 
          title="Top Rated" 
          movies={topRatedMovies} 
          viewAllLink="/movies/top-rated"
        />
        
        {/* Upcoming Movies */}
        <MovieCarousel 
          title="Coming Soon" 
          movies={upcomingMovies} 
          viewAllLink="/movies/upcoming"
        />
      </div>
    </Layout>
  );
}