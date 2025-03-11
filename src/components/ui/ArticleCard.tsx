
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface ArticleCardProps {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  date: string;
  author: string;
  isFeatured?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const ArticleCard = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  category, 
  date, 
  author,
  isFeatured = false,
  size = 'medium',
  className
}: ArticleCardProps) => {
  return (
    <article 
      className={cn(
        "group flex flex-col animate-fade-in",
        {
          'gap-3': size === 'small',
          'gap-4': size === 'medium',
          'gap-5': size === 'large',
        },
        className
      )}
    >
      <Link to={`/article/${id}`} className="overflow-hidden block">
        <img 
          src={imageUrl} 
          alt={title}
          className={cn(
            "w-full object-cover image-hover transition-transform duration-500 group-hover:scale-[1.02]",
            {
              'h-48': size === 'small',
              'h-64': size === 'medium',
              'h-96': size === 'large',
              'aspect-[16/9]': true
            }
          )}
        />
      </Link>
      
      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-nyt-red font-sans text-caption font-semibold uppercase tracking-wide">{category}</span>
          <span className="text-nyt-gray font-sans text-caption">{date}</span>
        </div>
        
        <Link to={`/article/${id}`}>
          <h2 
            className={cn(
              "font-serif text-nyt-black mb-2 transition-colors group-hover:text-nyt-gray-dark leading-tight",
              {
                'text-xl': size === 'small',
                'text-headline': size === 'medium',
                'text-featured': size === 'large',
              }
            )}
          >
            {title}
          </h2>
        </Link>
        
        {description && (
          <p className="text-nyt-gray-dark font-serif mb-2 line-clamp-3">{description}</p>
        )}
        
        <span className="text-nyt-gray font-sans text-caption">By {author}</span>
      </div>
    </article>
  );
};

export default ArticleCard;
