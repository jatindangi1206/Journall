
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface ContentEditorProps {
  content: string[];
  pullQuote?: string;
  onContentChange: (content: string[]) => void;
  onPullQuoteChange: (quote: string) => void;
}

const ContentEditor = ({ 
  content, 
  pullQuote = '', 
  onContentChange,
  onPullQuoteChange
}: ContentEditorProps) => {
  const handleParagraphChange = (index: number, value: string) => {
    const newContent = [...content];
    newContent[index] = value;
    onContentChange(newContent);
  };

  const addParagraph = (index: number) => {
    const newContent = [...content];
    newContent.splice(index + 1, 0, '');
    onContentChange(newContent);
  };

  const removeParagraph = (index: number) => {
    if (content.length > 1) {
      const newContent = [...content];
      newContent.splice(index, 1);
      onContentChange(newContent);
    }
  };

  return (
    <div className="space-y-6">
      {content.map((paragraph, index) => (
        <div key={index} className="relative group">
          <Textarea
            value={paragraph}
            onChange={(e) => handleParagraphChange(index, e.target.value)}
            placeholder={`Write paragraph ${index + 1}...`}
            className="min-h-[150px] font-serif text-body leading-relaxed"
          />
          
          <div className="absolute -right-12 top-0 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              type="button" 
              size="icon" 
              variant="outline" 
              onClick={() => addParagraph(index)} 
              title="Add paragraph"
            >
              <Plus className="h-4 w-4" />
            </Button>
            
            <Button 
              type="button" 
              size="icon" 
              variant="outline" 
              onClick={() => removeParagraph(index)} 
              disabled={content.length <= 1}
              title="Remove paragraph"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      <div className="border-l-4 border-nyt-gray-light pl-6 py-4 bg-nyt-background">
        <Label htmlFor="pullQuote" className="text-nyt-black mb-2 block">Pull Quote</Label>
        <Textarea
          id="pullQuote"
          value={pullQuote}
          onChange={(e) => onPullQuoteChange(e.target.value)}
          placeholder="Add a memorable quote from your article..."
          className="font-serif text-xl italic text-nyt-gray-dark"
        />
        <p className="text-caption font-sans text-nyt-gray mt-2">
          This quote will be highlighted in the article.
        </p>
      </div>
    </div>
  );
};

export default ContentEditor;
