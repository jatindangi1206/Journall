import React from 'react';
import { cn } from '@/lib/utils';

interface FormattedContentProps {
  content: string;
  className?: string;
}

const FormattedContent: React.FC<FormattedContentProps> = ({ content, className }) => {
  const renderFormattedText = (text: string) => {
    // Replace bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace italic text
    text = text.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Handle blockquotes
    if (text.startsWith('> ')) {
      return (
        <blockquote className="border-l-4 border-nyt-gray pl-4 italic">
          {text.substring(2)}
        </blockquote>
      );
    }
    
    // Handle bullet points
    if (text.startsWith('• ')) {
      return (
        <li className="ml-4">
          {text.substring(2)}
        </li>
      );
    }
    
    // Handle numbered lists
    const numberedListMatch = text.match(/^\d+\.\s(.*)/);
    if (numberedListMatch) {
      return (
        <li className="ml-4 list-decimal">
          {numberedListMatch[1]}
        </li>
      );
    }
    
    // Return regular paragraph with any inline formatting
    return (
      <span 
        dangerouslySetInnerHTML={{ 
          __html: text
        }} 
      />
    );
  };

  const processContent = (content: string) => {
    const lines = content.split('\n');
    let currentList: JSX.Element[] = [];
    let isOrderedList = false;
    let isBulletList = false;
    
    return lines.reduce<JSX.Element[]>((elements, line, index) => {
      if (!line.trim()) {
        if (currentList.length > 0) {
          elements.push(
            isOrderedList ? 
              <ol key={`list-${index}`} className="list-decimal pl-6 mb-4">{currentList}</ol> :
              <ul key={`list-${index}`} className="list-disc pl-6 mb-4">{currentList}</ul>
          );
          currentList = [];
          isOrderedList = false;
          isBulletList = false;
        }
        return elements;
      }

      const isNumbered = /^\d+\.\s/.test(line);
      const isBullet = line.startsWith('• ');

      if (isNumbered || isBullet) {
        if (currentList.length === 0) {
          isOrderedList = isNumbered;
          isBulletList = isBullet;
        } else if ((isOrderedList && !isNumbered) || (isBulletList && !isBullet)) {
          elements.push(
            isOrderedList ?
              <ol key={`list-${index}`} className="list-decimal pl-6 mb-4">{currentList}</ol> :
              <ul key={`list-${index}`} className="list-disc pl-6 mb-4">{currentList}</ul>
          );
          currentList = [];
          isOrderedList = isNumbered;
          isBulletList = isBullet;
        }
        currentList.push(
          <React.Fragment key={index}>
            {renderFormattedText(line)}
          </React.Fragment>
        );
      } else {
        if (currentList.length > 0) {
          elements.push(
            isOrderedList ?
              <ol key={`list-${index}`} className="list-decimal pl-6 mb-4">{currentList}</ol> :
              <ul key={`list-${index}`} className="list-disc pl-6 mb-4">{currentList}</ul>
          );
          currentList = [];
          isOrderedList = false;
          isBulletList = false;
        }
        elements.push(
          <p key={index} className="mb-4">
            {renderFormattedText(line)}
          </p>
        );
      }

      return elements;
    }, []);
  };

  return (
    <div className={cn("article-content space-y-4", className)}>
      {processContent(content)}
    </div>
  );
};

export default FormattedContent;