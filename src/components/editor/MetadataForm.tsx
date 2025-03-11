
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArticleMetadata } from '@/lib/articleService';

interface MetadataFormProps {
  metadata: Partial<ArticleMetadata>;
  onChange: (field: keyof ArticleMetadata, value: any) => void;
}

const MetadataForm = ({ metadata, onChange }: MetadataFormProps) => {
  return (
    <div className="space-y-4 font-sans">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-nyt-black">Title</Label>
        <Input 
          id="title" 
          value={metadata.title || ''} 
          onChange={e => onChange('title', e.target.value)}
          placeholder="Enter article title"
          className="font-serif text-xl"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subheading" className="text-nyt-black">Subheading</Label>
        <Textarea 
          id="subheading" 
          value={metadata.subheading || ''} 
          onChange={e => onChange('subheading', e.target.value)}
          placeholder="Enter article subheading"
          className="font-serif text-lg"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-nyt-black">Category</Label>
          <Input 
            id="category" 
            value={metadata.category || ''} 
            onChange={e => onChange('category', e.target.value)}
            placeholder="e.g., Technology, Science"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="author" className="text-nyt-black">Author</Label>
          <Input 
            id="author" 
            value={metadata.author || ''} 
            onChange={e => onChange('author', e.target.value)}
            placeholder="Your name"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="date" className="text-nyt-black">Date</Label>
        <Input 
          id="date" 
          type="date" 
          value={metadata.date || ''} 
          onChange={e => onChange('date', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl" className="text-nyt-black">Featured Image URL</Label>
        <Input 
          id="imageUrl" 
          value={metadata.imageUrl || ''} 
          onChange={e => onChange('imageUrl', e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageCaption" className="text-nyt-black">Image Caption</Label>
        <Input 
          id="imageCaption" 
          value={metadata.imageCaption || ''} 
          onChange={e => onChange('imageCaption', e.target.value)}
          placeholder="Caption for the featured image"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags" className="text-nyt-black">Tags (comma separated)</Label>
        <Input 
          id="tags" 
          value={metadata.tags?.join(', ') || ''} 
          onChange={e => onChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
          placeholder="academic, research, paper"
        />
      </div>
    </div>
  );
};

export default MetadataForm;
