import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  className,
  label,
  error,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);
  
  return (
    <div className="relative space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      <div
        className={cn(
          "relative flex h-10 w-full items-center justify-between rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer",
          error ? "border-destructive focus:ring-destructive" : "",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!selectedOption ? "text-gray-500" : ""}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </div>
      
      {isOpen && (
        <div 
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-700 bg-gray-800 py-1 shadow-lg"
          onClick={() => setIsOpen(false)}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "px-3 py-2 text-sm cursor-pointer hover:bg-gray-700",
                option.value === value ? "bg-gray-700" : ""
              )}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  );
}