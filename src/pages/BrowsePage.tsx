import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { MovieCarousel } from '../components/movies/MovieCarousel';
import { MovieHero } from '../components/movies/MovieHero';
import { Button } from '../components/ui/Button';
import { GENRES } from '../utils/constants';
import { 
  getPopularMovies, 
  getTopRatedMovies, 
  getMoviesByGenre 
} from '../services/movieService';
import { Movie } from '../types';
import { useAuth } from '../contexts/AuthContext';

export function BrowsePage() {
  const { user } = useAuth();
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const [popular, topRated] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies()
        ]);
        
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
      } catch (err) {
        console.error('Failed to fetch movies', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMovies();
  }, []);

  useEffect(() => {
    async function fetchGenreMovies() {
      if (!selectedGenre) return;
      
      try {
        const movies = await getMoviesByGenre(selectedGenre);
        setGenreMovies(movies);
      } catch (err) {
        console.error('Failed to fetch genre movies', err);
      }
    }
    
    fetchGenreMovies();
  }, [selectedGenre]);

  // Get user's favorite genres if logged in
  const userGenres = user?.favoriteGenres || [];
  const recommendedGenres = GENRES.filter(genre => userGenres.includes(genre.id));

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Featured Movie Hero */}
      {popularMovies.length > 0 && (
        <MovieHero movie={popularMovies[0]} />
      )}

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Genre Quick Select */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Browse by Genre</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {GENRES.slice(0, 12).map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`aspect-video flex items-center justify-center p-4 rounded-lg text-white font-medium transition-all duration-300 ${
                  selectedGenre === genre.id
                    ? 'bg-primary hover:bg-primary-dark'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Genre Movies */}
        {selectedGenre && genreMovies.length > 0 && (
          <MovieCarousel
            title={`${GENRES.find(g => g.id === selectedGenre)?.name} Movies`}
            movies={genreMovies}
            viewAllLink={`/search?genre=${selectedGenre}`}
          />
        )}

        {/* Personalized Recommendations */}
        {user && recommendedGenres.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <div className="grid grid-cols-1 gap-8">
              {recommendedGenres.slice(0, 3).map(genre => (
                <MovieCarousel
                  key={genre.id}
                  title={`Because you like ${genre.name}`}
                  movies={popularMovies.filter(movie => 
                    movie.genre_ids.includes(genre.id)
                  )}
                  viewAllLink={`/search?genre=${genre.id}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Popular & Top Rated Sections */}
        <MovieCarousel
          title="Popular Now"
          movies={popularMovies}
          viewAllLink="/search?sort=popularity.desc"
        />

        <MovieCarousel
          title="Top Rated"
          movies={topRatedMovies}
          viewAllLink="/search?sort=vote_average.desc"
        />
      </div>
    </Layout>
  );
}