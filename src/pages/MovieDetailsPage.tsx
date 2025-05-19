import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, Calendar, Plus, Check, Play } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { MovieCarousel } from '../components/movies/MovieCarousel';
import { ReviewCard } from '../components/reviews/ReviewCard';
import { ReviewForm } from '../components/reviews/ReviewForm';
import { getMovieDetails, getMovieReviews } from '../services/movieService';
import { MovieDetails, Review } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useWatchlist } from '../contexts/WatchlistContext';
import { 
  getBackdropUrl, 
  getPosterUrl, 
  formatRuntime, 
  formatDate, 
  formatVoteAverage 
} from '../utils/helpers';

export function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || '0');
  const { isAuthenticated } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'cast' | 'reviews'>('overview');
  const [showTrailer, setShowTrailer] = useState(false);
  const inWatchlist = movieId ? isInWatchlist(movieId) : false;

  useEffect(() => {
    async function fetchMovieData() {
      if (!movieId) {
        setError('Invalid movie ID');
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        const [movieData, reviewsData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieReviews(movieId)
        ]);
        
        setMovie(movieData);
        setReviews(reviewsData);
      } catch (err) {
        console.error('Failed to fetch movie details', err);
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMovieData();
    
    // Reset scroll position when movie ID changes
    window.scrollTo(0, 0);
  }, [movieId]);

  const handleReviewSubmit = async (rating: number, content: string) => {
    // In a real app, this would send the review to an API endpoint
    console.log('Submitting review:', { movieId, rating, content });
    
    // Mock adding review to the current list
    const newReview: Review = {
      id: `temp-${Date.now()}`,
      author: 'You',
      content,
      created_at: new Date().toISOString(),
      author_details: {
        rating: rating * 2, // Convert to 10-point scale
        avatar_path: null,
        username: 'You'
      }
    };
    
    setReviews([newReview, ...reviews]);
  };

  const handleToggleWatchlist = () => {
    if (!movie) return;
    
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (error || !movie) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-destructive/20 border border-destructive rounded-lg p-4">
            <p className="text-white">{error || 'Movie not found'}</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Find trailer video if available
  const trailer = movie.videos?.results.find(
    video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
  );

  return (
    <Layout>
      {/* Movie Hero Banner */}
      <div className="relative">
        {/* Backdrop Image */}
        <div className="absolute inset-0 h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900 z-10"></div>
          <img 
            src={getBackdropUrl(movie.backdrop_path)} 
            alt={movie.title} 
            className="w-full h-full object-cover object-top"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-64 md:w-80 mx-auto md:mx-0 flex-shrink-0 rounded-lg overflow-hidden shadow-xl">
              <img 
                src={getPosterUrl(movie.poster_path, 'w500')} 
                alt={movie.title} 
                className="w-full h-auto"
              />
            </div>
            
            {/* Details */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="text-gray-300 italic mb-4">{movie.tagline}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-1 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-medium">{formatVoteAverage(movie.vote_average)}</span>
                  <span className="text-gray-400 text-sm ml-1">({movie.vote_count} votes)</span>
                </div>
                
                <span className="text-gray-300 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatRuntime(movie.runtime)}
                </span>
                
                <span className="text-gray-300 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(movie.release_date)}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map((genre) => (
                    <span 
                      key={genre.id} 
                      className="text-sm text-white bg-gray-800/80 px-3 py-1 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Overview</h3>
                  <p className="text-gray-300">{movie.overview}</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {trailer && (
                    <Button 
                      onClick={() => setShowTrailer(true)}
                      className="flex items-center"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Watch Trailer
                    </Button>
                  )}
                  
                  {isAuthenticated && (
                    <Button 
                      variant={inWatchlist ? 'outline' : 'secondary'}
                      onClick={handleToggleWatchlist}
                      className="flex items-center"
                    >
                      {inWatchlist ? (
                        <>
                          <Check className="h-5 w-5 mr-2" />
                          In Watchlist
                        </>
                      ) : (
                        <>
                          <Plus className="h-5 w-5 mr-2" />
                          Add to Watchlist
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 border-b border-gray-800">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === 'overview' 
                  ? 'text-white border-b-2 border-primary' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('cast')}
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === 'cast' 
                  ? 'text-white border-b-2 border-primary' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Cast & Crew
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === 'reviews' 
                  ? 'text-white border-b-2 border-primary' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Reviews
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="mb-16">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Synopsis</h3>
                  <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                </div>
                
                {movie.videos && movie.videos.results.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Videos</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {movie.videos.results.slice(0, 4).map(video => (
                        <div key={video.id} className="rounded-lg overflow-hidden bg-gray-800">
                          <iframe
                            width="100%"
                            height="200"
                            src={`https://www.youtube.com/embed/${video.key}`}
                            title={video.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                          <div className="p-3">
                            <h4 className="text-sm font-medium text-white truncate">{video.name}</h4>
                            <p className="text-xs text-gray-400">{video.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Details</h3>
                  <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm">Status:</span>
                      <p className="text-white">{movie.status}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Original Language:</span>
                      <p className="text-white">English</p>
                    </div>
                    {movie.budget > 0 && (
                      <div>
                        <span className="text-gray-400 text-sm">Budget:</span>
                        <p className="text-white">${movie.budget.toLocaleString()}</p>
                      </div>
                    )}
                    {movie.revenue > 0 && (
                      <div>
                        <span className="text-gray-400 text-sm">Revenue:</span>
                        <p className="text-white">${movie.revenue.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Production</h3>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex flex-wrap gap-4">
                        {movie.production_companies.slice(0, 4).map(company => (
                          <div key={company.id} className="text-center">
                            {company.logo_path ? (
                              <img 
                                src={`https://image.tmdb.org/t/p/w92${company.logo_path}`} 
                                alt={company.name}
                                className="h-12 object-contain mx-auto mb-2"
                              />
                            ) : (
                              <div className="h-12 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">{company.name}</span>
                              </div>
                            )}
                            <p className="text-xs text-gray-300">{company.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Cast & Crew Tab */}
          {activeTab === 'cast' && (
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Cast</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {movie.credits?.cast.slice(0, 12).map(person => (
                    <div key={person.id} className="bg-gray-800 rounded-lg overflow-hidden">
                      <div className="aspect-[2/3] overflow-hidden bg-gray-700">
                        {person.profile_path ? (
                          <img 
                            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} 
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-500 text-sm">{person.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-white text-sm truncate">{person.name}</h4>
                        <p className="text-gray-400 text-xs truncate">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Crew</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {movie.credits?.crew
                    .filter(person => ['Director', 'Producer', 'Screenplay', 'Writer'].includes(person.job))
                    .slice(0, 8)
                    .map(person => (
                      <div key={`${person.id}-${person.job}`} className="bg-gray-800 rounded-lg overflow-hidden p-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                            {person.profile_path ? (
                              <img 
                                src={`https://image.tmdb.org/t/p/w45${person.profile_path}`} 
                                alt={person.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-gray-500">{person.name.charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-white text-sm">{person.name}</h4>
                            <p className="text-gray-400 text-xs">{person.job}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">User Reviews</h3>
                
                <div className="mb-8">
                  <ReviewForm 
                    movieId={movie.id} 
                    onSubmit={handleReviewSubmit} 
                  />
                </div>
                
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map(review => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-800 rounded-lg p-6 text-center">
                    <p className="text-gray-400">No reviews yet. Be the first to review this movie!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Similar Movies */}
        {movie.similar && movie.similar.results.length > 0 && (
          <div className="mb-16">
            <MovieCarousel title="Similar Movies" movies={movie.similar.results} />
          </div>
        )}
      </div>
      
      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 p-4">
          <div className="relative w-full max-w-5xl">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              Close
            </button>
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}