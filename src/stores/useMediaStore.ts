import { create } from 'zustand';
import { Movie, TVShow, MediaType } from '../types';
import { 
  getPopularMovies, 
  getTrendingMovies, 
  getTopRatedMovies,
  getMoviesByGenre,
  searchMovies
} from '../services/movieService';

interface MediaState {
  trending: (Movie | TVShow)[];
  popular: (Movie | TVShow)[];
  topRated: (Movie | TVShow)[];
  genreResults: (Movie | TVShow)[];
  searchResults: (Movie | TVShow)[];
  isLoading: boolean;
  error: string | null;
  selectedGenre: number | null;
  mediaType: MediaType;
  fetchTrending: () => Promise<void>;
  fetchPopular: () => Promise<void>;
  fetchTopRated: () => Promise<void>;
  fetchByGenre: (genreId: number) => Promise<void>;
  search: (query: string) => Promise<void>;
  setMediaType: (type: MediaType) => void;
  setSelectedGenre: (genreId: number | null) => void;
}

export const useMediaStore = create<MediaState>((set, get) => ({
  trending: [],
  popular: [],
  topRated: [],
  genreResults: [],
  searchResults: [],
  isLoading: false,
  error: null,
  selectedGenre: null,
  mediaType: 'movie',

  fetchTrending: async () => {
    try {
      set({ isLoading: true, error: null });
      const results = await getTrendingMovies();
      set({ trending: results, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchPopular: async () => {
    try {
      set({ isLoading: true, error: null });
      const results = await getPopularMovies();
      set({ popular: results, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchTopRated: async () => {
    try {
      set({ isLoading: true, error: null });
      const results = await getTopRatedMovies();
      set({ topRated: results, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchByGenre: async (genreId: number) => {
    try {
      set({ isLoading: true, error: null, selectedGenre: genreId });
      const results = await getMoviesByGenre(genreId);
      set({ genreResults: results, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  search: async (query: string) => {
    try {
      set({ isLoading: true, error: null });
      const results = await searchMovies(query);
      set({ searchResults: results, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setMediaType: (type: MediaType) => set({ mediaType: type }),
  setSelectedGenre: (genreId: number | null) => set({ selectedGenre: genreId }),
}));