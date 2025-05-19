import { 
  GENRES, 
  TV_GENRES,
  IMAGE_BASE_URL, 
  POSTER_SIZES, 
  BACKDROP_SIZES, 
  PROFILE_SIZES,
  STILL_SIZES,
  LOGO_SIZES 
} from './constants';

export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatRuntime(minutes: number | undefined): string {
  if (!minutes) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

export function formatVoteAverage(voteAverage: number): string {
  return voteAverage.toFixed(1);
}

export function getGenreNameById(genreId: number, isTVShow = false): string {
  const genreList = isTVShow ? TV_GENRES : GENRES;
  const genre = genreList.find(g => g.id === genreId);
  return genre ? genre.name : 'Unknown';
}

export function getGenreNamesFromIds(genreIds: number[], isTVShow = false): string[] {
  return genreIds
    .map(id => getGenreNameById(id, isTVShow))
    .filter(name => name !== 'Unknown');
}

export function getPosterUrl(path: string | null, size = POSTER_SIZES.MEDIUM): string {
  if (!path) return '/images/no-poster.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size = BACKDROP_SIZES.LARGE): string {
  if (!path) return '/images/no-backdrop.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getProfileUrl(path: string | null, size = PROFILE_SIZES.MEDIUM): string {
  if (!path) return '/images/no-profile.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getStillUrl(path: string | null, size = STILL_SIZES.MEDIUM): string {
  if (!path) return '/images/no-still.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getLogoUrl(path: string | null, size = LOGO_SIZES.MEDIUM): string {
  if (!path) return '/images/no-logo.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function getYearFromDate(dateString: string): string {
  if (!dateString) return '';
  return new Date(dateString).getFullYear().toString();
}

export function formatMoney(amount: number): string {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(number: number): string {
  if (!number) return '0';
  return new Intl.NumberFormat('en-US').format(number);
}

export function getAge(birthDate: string, deathDate?: string | null): number | null {
  if (!birthDate) return null;
  
  const birth = new Date(birthDate);
  const end = deathDate ? new Date(deathDate) : new Date();
  
  let age = end.getFullYear() - birth.getFullYear();
  const monthDiff = end.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

export function getMediaTypeLabel(type: string): string {
  switch (type) {
    case 'movie':
      return 'Movie';
    case 'tv':
      return 'TV Show';
    case 'person':
      return 'Person';
    default:
      return type;
  }
}

export function sortByReleaseDate<T extends { release_date?: string; first_air_date?: string }>(
  items: T[],
  ascending = false
): T[] {
  return [...items].sort((a, b) => {
    const dateA = a.release_date || a.first_air_date || '';
    const dateB = b.release_date || b.first_air_date || '';
    return ascending 
      ? dateA.localeCompare(dateB)
      : dateB.localeCompare(dateA);
  });
}

export function sortByVoteAverage<T extends { vote_average: number }>(
  items: T[],
  ascending = false
): T[] {
  return [...items].sort((a, b) => {
    return ascending 
      ? a.vote_average - b.vote_average
      : b.vote_average - a.vote_average;
  });
}

export function sortByPopularity<T extends { popularity: number }>(
  items: T[],
  ascending = false
): T[] {
  return [...items].sort((a, b) => {
    return ascending 
      ? a.popularity - b.popularity
      : b.popularity - a.popularity;
  });
}