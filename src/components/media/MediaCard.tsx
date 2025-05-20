import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Movie, TVShow } from '../../types';
import { getPosterUrl, truncateText, formatVoteAverage, getYearFromDate } from '../../utils/helpers';

interface MediaCardProps {
  media: Movie | TVShow;
  className?: string;
}

export function MediaCard({ media, className = '' }: MediaCardProps) {
  const isMovie = 'title' in media;
  const title = isMovie ? media.title : media.name;
  const releaseDate = isMovie ? media.release_date : media.first_air_date;
  
  return (
    <Link 
      to={`/${isMovie ? 'movie' : 'tv'}/${media.id}`}
      className={`group block rounded-lg overflow-hidden bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={getPosterUrl(media.poster_path)} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center space-x-2 text-sm">
            <span className="bg-primary/80 text-white px-2 py-0.5 rounded flex items-center">
              <Star className="h-3 w-3 mr-1 fill-white text-white" />
              {formatVoteAverage(media.vote_average)}
            </span>
            {releaseDate && (
              <span className="bg-gray-700/80 text-white px-2 py-0.5 rounded flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {getYearFromDate(releaseDate)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
          {truncateText(title, 30)}
        </h3>
        <p className="mt-2 text-sm text-gray-400 line-clamp-2">
          {truncateText(media.overview, 100)}
        </p>
      </div>
    </Link>
  );
}