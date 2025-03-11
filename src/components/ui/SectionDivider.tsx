
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface SectionDividerProps {
  title: string;
  link?: string;
  className?: string;
  withViewMore?: boolean;
}

const SectionDivider = ({ 
  title, 
  link, 
  className,
  withViewMore = false
}: SectionDividerProps) => {
  return (
    <div className={cn("w-full py-6 animate-fade-in", className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold border-b-2 border-nyt-black inline-block pb-1">{title}</h2>
        
        {withViewMore && link && (
          <Link 
            to={link} 
            className="flex items-center text-nyt-blue hover:text-nyt-black transition-colors font-sans text-sm"
          >
            View More 
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SectionDivider;
