import { API_BASE_URL, API_KEY } from '../utils/constants';
import { Movie, MovieDetails, Review, Person, TVShow } from '../types';

async function fetchData<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params
  });
  
  const response = await fetch(`${API_BASE_URL}${endpoint}?${queryParams}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  
  return response.json();
}

// Movies
export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchData<{ results: Movie[] }>('/trending/movie/week');
  return data.results;
}

export async function getPopularMovies(): Promise<Movie[]> {
  const data = await fetchData<{ results: Movie[] }>('/movie/popular');
  return data.results;
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const data = await fetchData<{ results: Movie[] }>('/movie/top_rated');
  return data.results;
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const data = await fetchData<{ results: Movie[] }>('/movie/upcoming');
  return data.results;
}

export async function getNowPlayingMovies(): Promise<Movie[]> {
  const data = await fetchData<{ results: Movie[] }>('/movie/now_playing');
  return data.results;
}

export async function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  const data = await fetchData<{ results: Movie[] }>('/discover/movie', {
    with_genres: genreId.toString()
  });
  return data.results;
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  return fetchData<MovieDetails>(`/movie/${movieId}`, {
    append_to_response: 'videos,credits,similar,recommendations,reviews'
  });
}

export async function getMovieReviews(movieId: number): Promise<Review[]> {
  const data = await fetchData<{ results: Review[] }>(`/movie/${movieId}/reviews`);
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];
  
  const data = await fetchData<{ results: Movie[] }>('/search/movie', { query });
  return data.results;
}

// TV Shows
export async function getTrendingTVShows(): Promise<TVShow[]> {
  const data = await fetchData<{ results: TVShow[] }>('/trending/tv/week');
  return data.results;
}

export async function getPopularTVShows(): Promise<TVShow[]> {
  const data = await fetchData<{ results: TVShow[] }>('/tv/popular');
  return data.results;
}

export async function getTopRatedTVShows(): Promise<TVShow[]> {
  const data = await fetchData<{ results: TVShow[] }>('/tv/top_rated');
  return data.results;
}

export async function getAiringTodayTVShows(): Promise<TVShow[]> {
  const data = await fetchData<{ results: TVShow[] }>('/tv/airing_today');
  return data.results;
}

export async function getTVShowDetails(tvId: number): Promise<TVShow> {
  return fetchData<TVShow>(`/tv/${tvId}`, {
    append_to_response: 'videos,credits,similar,recommendations,reviews'
  });
}

// People
export async function getPopularPeople(): Promise<Person[]> {
  const data = await fetchData<{ results: Person[] }>('/person/popular');
  return data.results;
}

export async function getPersonDetails(personId: number): Promise<Person> {
  return fetchData<Person>(`/person/${personId}`, {
    append_to_response: 'movie_credits,tv_credits,images'
  });
}

// Search
export async function multiSearch(query: string): Promise<(Movie | TVShow | Person)[]> {
  if (!query) return [];
  
  const data = await fetchData<{ results: (Movie | TVShow | Person)[] }>('/search/multi', { query });
  return data.results;
}

// Discover
export async function discoverMovies(params: Record<string, string> = {}): Promise<Movie[]> {
  const data = await fetchData<{ results: Movie[] }>('/discover/movie', params);
  return data.results;
}

export async function discoverTVShows(params: Record<string, string> = {}): Promise<TVShow[]> {
  const data = await fetchData<{ results: TVShow[] }>('/discover/tv', params);
  return data.results;
}