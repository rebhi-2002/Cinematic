import React from 'react';
import { GENRES } from '../../utils/constants';
import { Select } from '../ui/Select';

interface SearchFiltersProps {
  genre: string;
  sortBy: string;
  releaseYear: string;
  onGenreChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onReleaseYearChange: (value: string) => void;
}

export function SearchFilters({
  genre,
  sortBy,
  releaseYear,
  onGenreChange,
  onSortByChange,
  onReleaseYearChange
}: SearchFiltersProps) {
  // Generate options for genres
  const genreOptions = [
    { value: '', label: 'All Genres' },
    ...GENRES.map(genre => ({
      value: genre.id.toString(),
      label: genre.name
    }))
  ];

  // Generate options for sort by
  const sortByOptions = [
    { value: 'popularity.desc', label: 'Popularity (Descending)' },
    { value: 'popularity.asc', label: 'Popularity (Ascending)' },
    { value: 'vote_average.desc', label: 'Rating (Descending)' },
    { value: 'vote_average.asc', label: 'Rating (Ascending)' },
    { value: 'release_date.desc', label: 'Release Date (Descending)' },
    { value: 'release_date.asc', label: 'Release Date (Ascending)' },
    { value: 'title.asc', label: 'Title (A-Z)' },
    { value: 'title.desc', label: 'Title (Z-A)' }
  ];

  // Generate options for release years (current year down to 1970)
  const currentYear = new Date().getFullYear();
  const yearOptions = [
    { value: '', label: 'All Years' },
    ...Array.from({ length: currentYear - 1969 }, (_, i) => {
      const year = currentYear - i;
      return { value: year.toString(), label: year.toString() };
    })
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="space-y-4">
        <Select
          label="Genre"
          options={genreOptions}
          value={genre}
          onChange={onGenreChange}
          placeholder="All Genres"
        />
        
        <Select
          label="Sort By"
          options={sortByOptions}
          value={sortBy}
          onChange={onSortByChange}
          placeholder="Select sorting"
        />
        
        <Select
          label="Release Year"
          options={yearOptions}
          value={releaseYear}
          onChange={onReleaseYearChange}
          placeholder="All Years"
        />
      </div>
    </div>
  );
}