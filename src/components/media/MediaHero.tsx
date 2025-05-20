import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Clock, Plus, Check } from 'lucide-react';
import { Movie, TVShow } from '../../types';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useWatchlist } from '../../contexts/WatchlistContext';
import { 
  getBackdropUrl, 
  formatVoteAverage, 
  getGenreNamesFromIds, 
  getYearFromDate 
} from '../../utils/helpers';

interface MediaHeroProps {
  media: Movie | TVShow;
}

export function MediaHero({ media }: MediaHeroProps) {
  const { isAuthenticated } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  
  const isMovie = 'title' in media;
  const title = isMovie ? media.title : media.name;
  const releaseDate = isMovie ? media.release_date : media.first_air_date;
  const inWatchlist = isInWatchlist(media.id);
  
  const genres = getGenreNamesFromIds(media.genre_ids, !isMovie);
  
  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <img 
          src={getBackdropUrl(media.backdrop_path)} 
          alt={title} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="relative z-20 container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-1 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">{formatVoteAverage(media.vote_average)}</span>
            </div>
            
            {releaseDate && (
              <span className="text-gray-300 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {getYearFromDate(releaseDate)}
              </span>
            )}
            
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
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
          
          <p className="text-gray-300 text-lg mb-8 line-clamp-3">
            {media.overview}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to={`/${isMovie ? 'movie' : 'tv'}/${media.id}`}>
              <Button className="flex items-center">
                <Play className="h-5 w-5 mr-2" />
                Watch Now
              </Button>
            </Link>
            
            {isAuthenticated && (
              <Button 
                variant={inWatchlist ? 'outline' : 'secondary'}
                onClick={() => inWatchlist 
                  ? removeFromWatchlist(media.id)
                  : addToWatchlist(media)
                }
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
  );
}