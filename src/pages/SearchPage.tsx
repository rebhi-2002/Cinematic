import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { MovieGrid } from '../components/movies/MovieGrid';
import { SearchFilters } from '../components/search/SearchFilters';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { searchMovies, getMoviesByGenre } from '../services/movieService';
import { Movie } from '../types';

export function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Filters
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [releaseYear, setReleaseYear] = useState('');

  useEffect(() => {
    async function fetchMovies() {
      if (!initialQuery && !genre) return;
      
      setIsLoading(true);
      setError('');
      
      try {
        let results: Movie[] = [];
        
        if (initialQuery) {
          results = await searchMovies(initialQuery);
        } else if (genre) {
          results = await getMoviesByGenre(parseInt(genre));
        }
        
        // Apply client-side filtering for demo
        // In a real app, these would be API parameters
        
        // Filter by year if set
        if (releaseYear) {
          results = results.filter(movie => 
            movie.release_date && movie.release_date.startsWith(releaseYear)
          );
        }
        
        // Sort results
        results = sortResults(results, sortBy);
        
        setMovies(results);
      } catch (err) {
        console.error('Search failed', err);
        setError('Failed to fetch search results. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMovies();
  }, [initialQuery, genre, sortBy, releaseYear]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const sortResults = (results: Movie[], sort: string): Movie[] => {
    const [field, direction] = sort.split('.');
    const sortOrder = direction === 'desc' ? -1 : 1;
    
    return [...results].sort((a, b) => {
      if (field === 'popularity') {
        return sortOrder * ((a.vote_count || 0) - (b.vote_count || 0));
      } else if (field === 'vote_average') {
        return sortOrder * ((a.vote_average || 0) - (b.vote_average || 0));
      } else if (field === 'release_date') {
        const dateA = a.release_date || '';
        const dateB = b.release_date || '';
        return sortOrder * dateA.localeCompare(dateB);
      } else if (field === 'title') {
        return sortOrder * a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Search Movies</h1>
          
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12"
            />
            <Button 
              type="submit" 
              className="absolute right-0 top-0 bottom-0 rounded-l-none"
              aria-label="Search"
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
          </form>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <SearchFilters
              genre={genre}
              sortBy={sortBy}
              releaseYear={releaseYear}
              onGenreChange={setGenre}
              onSortByChange={setSortBy}
              onReleaseYearChange={setReleaseYear}
            />
          </div>
          
          {/* Results */}
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="bg-destructive/20 border border-destructive rounded-lg p-4">
                <p className="text-white">{error}</p>
              </div>
            ) : movies.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  {initialQuery 
                    ? `Search results for "${initialQuery}"`
                    : genre
                      ? 'Genre results'
                      : 'Browse movies'
                  }
                </h2>
                <MovieGrid movies={movies} />
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-300 mb-4">
                  {initialQuery 
                    ? `No results found for "${initialQuery}"`
                    : 'Use the search bar or filters to find movies'
                  }
                </p>
                {initialQuery && (
                  <p className="text-gray-400 text-sm">
                    Try using different keywords or removing some filters
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}