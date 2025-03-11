
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface FeaturedArticleProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  author: string;
  className?: string;
}

const FeaturedArticle = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  category, 
  date, 
  author, 
  className
}: FeaturedArticleProps) => {
  return (
    <article className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 animate-scale-in", className)}>
      <div className="order-2 md:order-1 flex flex-col justify-center">
        <div className="mb-4">
          <span className="text-nyt-red font-sans text-sm font-semibold uppercase tracking-wide mr-3">{category}</span>
          <span className="text-nyt-gray font-sans text-sm">{date}</span>
        </div>
        
        <Link to={`/article/${id}`}>
          <h2 className="font-serif text-featured leading-tight mb-4 transition-colors hover:text-nyt-gray-dark">
            {title}
          </h2>
        </Link>
        
        <p className="text-nyt-gray-dark font-serif text-xl mb-4 leading-relaxed">
          {description}
        </p>
        
        <p className="text-nyt-gray-dark font-sans text-caption">By {author}</p>
      </div>
      
      <div className="overflow-hidden order-1 md:order-2">
        <Link to={`/article/${id}`}>
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-[30rem] object-cover image-hover transition-transform duration-500 hover:scale-[1.02]"
          />
        </Link>
      </div>
    </article>
  );
};

export default FeaturedArticle;
