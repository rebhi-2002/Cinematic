export interface User {
  id: string;
  email: string;
  username: string;
  profileImage?: string;
  subscription?: SubscriptionPlan;
  favoriteGenres: number[];
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: 'Basic' | 'Standard' | 'Premium';
  price: number;
  quality: '720p' | '1080p' | '4K';
  maxDevices: number;
  features: string[];
  isActive: boolean;
  renewalDate: string;
}

export type MediaType = 'movie' | 'tv' | 'person';

export interface Media {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  media_type: MediaType;
}

export interface Movie extends Media {
  media_type: 'movie';
  release_date: string;
  runtime?: number;
}

export interface TVShow extends Media {
  media_type: 'tv';
  name: string;
  first_air_date: string;
  episode_run_time: number[];
}

export interface WatchlistItem {
  id: string;
  mediaId: number;
  userId: string;
  mediaType: MediaType;
  addedDate: string;
  watched: boolean;
  progress: number;
}

export interface PlaybackState {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  quality?: '480p' | '720p' | '1080p' | '4K';
  subtitle?: string;
  audioTrack?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  isKids: boolean;
  preferences: {
    autoplay: boolean;
    defaultSubtitle?: string;
    defaultAudio?: string;
    maturityLevel: 'Kids' | 'Teen' | 'Adult';
  };
}

export interface Review {
  id: string;
  mediaId: number;
  userId: string;
  rating: number;
  content: string;
  createdAt: string;
  user: {
    username: string;
    avatar: string;
  };
}