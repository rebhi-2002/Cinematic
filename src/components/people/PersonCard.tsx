import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { getProfileUrl, truncateText } from '../../utils/helpers';

interface PersonCardProps {
  person: Person;
  className?: string;
}

export function PersonCard({ person, className = '' }: PersonCardProps) {
  return (
    <Link 
      to={`/person/${person.id}`}
      className={`group block rounded-lg overflow-hidden bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={getProfileUrl(person.profile_path)} 
          alt={person.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
          {person.name}
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          {person.known_for_department}
        </p>
      </div>
    </Link>
  );
}