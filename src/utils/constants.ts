export const API_KEY = '52ef927bbeb21980cd91386a29403c78';
export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const POSTER_SIZES = {
  SMALL: 'w185',
  MEDIUM: 'w342',
  LARGE: 'w500',
  ORIGINAL: 'original'
} as const;

export const BACKDROP_SIZES = {
  SMALL: 'w300',
  MEDIUM: 'w780',
  LARGE: 'w1280',
  ORIGINAL: 'original'
} as const;

export const PROFILE_SIZES = {
  SMALL: 'w45',
  MEDIUM: 'w185',
  LARGE: 'h632',
  ORIGINAL: 'original'
} as const;

export const STILL_SIZES = {
  SMALL: 'w92',
  MEDIUM: 'w185',
  LARGE: 'w300',
  ORIGINAL: 'original'
} as const;

export const LOGO_SIZES = {
  SMALL: 'w45',
  MEDIUM: 'w185',
  LARGE: 'w500',
  ORIGINAL: 'original'
} as const;

export const GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
] as const;

export const TV_GENRES = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10763, name: 'News' },
  { id: 10764, name: 'Reality' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War & Politics' },
  { id: 37, name: 'Western' }
] as const;

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ru', name: 'Russian' }
] as const;

export const SORT_OPTIONS = {
  POPULARITY_DESC: { value: 'popularity.desc', label: 'Popularity Descending' },
  POPULARITY_ASC: { value: 'popularity.asc', label: 'Popularity Ascending' },
  RATING_DESC: { value: 'vote_average.desc', label: 'Rating Descending' },
  RATING_ASC: { value: 'vote_average.asc', label: 'Rating Ascending' },
  RELEASE_DESC: { value: 'release_date.desc', label: 'Release Date Descending' },
  RELEASE_ASC: { value: 'release_date.asc', label: 'Release Date Ascending' },
  TITLE_ASC: { value: 'title.asc', label: 'Title A-Z' },
  TITLE_DESC: { value: 'title.desc', label: 'Title Z-A' }
} as const;

export const TV_SORT_OPTIONS = {
  ...SORT_OPTIONS,
  FIRST_AIR_DESC: { value: 'first_air_date.desc', label: 'First Air Date Descending' },
  FIRST_AIR_ASC: { value: 'first_air_date.asc', label: 'First Air Date Ascending' }
} as const;

export const DEPARTMENTS = [
  'Acting',
  'Directing',
  'Production',
  'Writing',
  'Sound',
  'Art',
  'Camera',
  'Costume & Make-Up',
  'Editing',
  'Visual Effects',
  'Crew'
] as const;

export const VIDEO_TYPES = [
  'Trailer',
  'Teaser',
  'Clip',
  'Behind the Scenes',
  'Bloopers',
  'Featurette'
] as const;