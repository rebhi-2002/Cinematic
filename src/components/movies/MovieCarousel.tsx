import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../../types';
import { MovieCard } from './MovieCard';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
}

export function MovieCarousel({ title, movies, viewAllLink }: MovieCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    
    const position = carouselRef.current.scrollLeft;
    const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    
    setScrollPosition(position);
    setShowLeftArrow(position > 0);
    setShowRightArrow(position < maxScrollLeft - 10);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      handleScroll(); // Call initially to set correct arrow visibility
      
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const { current: carousel } = carouselRef;
    const scrollAmount = carousel.clientWidth * 0.75;
    
    const newPosition = direction === 'left'
      ? scrollPosition - scrollAmount
      : scrollPosition + scrollAmount;
    
    carousel.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Adjust scrolling speed
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        
        {viewAllLink && (
          <a 
            href={viewAllLink} 
            className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            View All
          </a>
        )}
      </div>
      
      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}
        
        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="overflow-x-auto hide-scrollbar cursor-grab"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="flex space-x-4 py-4">
            {movies.map((movie) => (
              <div key={movie.id} className="flex-none w-48 sm:w-56 md:w-64">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Arrow */}
        {showRightArrow && (
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}
      </div>
    </div>
  );
}