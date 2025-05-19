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

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  runtime?: number;
  media_type?: 'movie';
  streamUrl?: string;
  trailerUrl?: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  homepage: string;
  production_companies: ProductionCompany[];
  videos: {
    results: Video[];
  };
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  similar: {
    results: Movie[];
  };
  recommendations: {
    results: Movie[];
  };
  reviews: {
    results: Review[];
  };
}

export interface WatchlistItem {
  id: string;
  movieId: number;
  userId: string;
  addedDate: string;
  watched: boolean;
  watchedDate?: string;
  progress?: number;
}

export interface PlaybackState {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  quality: '480p' | '720p' | '1080p' | '4K';
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  subtitle?: string;
  audioTrack?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  isKids: boolean;
  preferences: {
    autoplay: boolean;
    defaultSubtitle?: string;
    defaultAudio?: string;
    maturityLevel: 'Kids' | 'Teen' | 'Adult';
  };
}

// ... (keeping existing types)