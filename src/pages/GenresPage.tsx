import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { GENRES } from '../utils/constants';
import { getMoviesByGenre } from '../services/movieService';
import { Movie } from '../types';

export function GenresPage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchGenreMovies() {
      if (!selectedGenre) return;
      
      setIsLoading(true);
      try {
        const movies = await getMoviesByGenre(selectedGenre);
        setGenreMovies(movies.slice(0, 6)); // Only show first 6 movies
      } catch (error) {
        console.error('Failed to fetch genre movies', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchGenreMovies();
  }, [selectedGenre]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-12">Explore by Genre</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {GENRES.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              onMouseEnter={() => setSelectedGenre(genre.id)}
              className={`aspect-video flex items-center justify-center p-4 rounded-lg text-white font-medium transition-all duration-300 ${
                selectedGenre === genre.id
                  ? 'bg-primary hover:bg-primary-dark shadow-lg scale-105'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
        
        {selectedGenre && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                {GENRES.find(g => g.id === selectedGenre)?.name} Movies
              </h2>
              <Link 
                to={`/search?genre=${selectedGenre}`}
                className="text-primary hover:text-primary-light font-medium"
              >
                View All
              </Link>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {genreMovies.map((movie) => (
                  <Link 
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="group relative aspect-[2/3] rounded-lg overflow-hidden"
                  >
                    <img 
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-medium">{movie.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}