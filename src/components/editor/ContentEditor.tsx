import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Plus, 
  Minus, 
  Bold, 
  Italic, 
  Quote,
  List,
  ListOrdered,
  AlignLeft
} from 'lucide-react';

interface ContentEditorProps {
  content: string[];
  pullQuote?: string;
  onContentChange: (content: string[]) => void;
  onPullQuoteChange: (quote: string) => void;
}

interface Selection {
  start: number;
  end: number;
}

type FormatType = 'bold' | 'italic' | 'quote' | 'bullet' | 'number';

const ContentEditor = ({ 
  content, 
  pullQuote = '', 
  onContentChange,
  onPullQuoteChange
}: ContentEditorProps) => {
  const [activeFormats, setActiveFormats] = useState<FormatType[]>([]);
  const [selections, setSelections] = useState<{ [key: number]: Selection }>({});
  
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

  const handleSelection = (index: number, textarea: HTMLTextAreaElement) => {
    const { selectionStart, selectionEnd } = textarea;
    setSelections({
      ...selections,
      [index]: { start: selectionStart, end: selectionEnd }
    });
  };

  const applyFormat = (index: number, format: FormatType) => {
    const textarea = document.getElementById(`paragraph-${index}`) as HTMLTextAreaElement;
    if (!textarea) return;

    const selection = selections[index];
    if (!selection) return;

    const { start, end } = selection;
    const text = textarea.value;
    let newText = text;
    let newStart = start;
    let newEnd = end;

    switch (format) {
      case 'bold':
        newText = text.slice(0, start) + `**${text.slice(start, end)}**` + text.slice(end);
        newEnd += 4;
        break;
      case 'italic':
        newText = text.slice(0, start) + `_${text.slice(start, end)}_` + text.slice(end);
        newEnd += 2;
        break;
      case 'quote':
        newText = text.slice(0, start) + `> ${text.slice(start, end)}` + text.slice(end);
        newEnd += 2;
        break;
      case 'bullet':
        if (start === 0 || text[start - 1] === '\n') {
          newText = text.slice(0, start) + `• ${text.slice(start, end)}` + text.slice(end);
          newEnd += 2;
        }
        break;
      case 'number':
        if (start === 0 || text[start - 1] === '\n') {
          newText = text.slice(0, start) + `1. ${text.slice(start, end)}` + text.slice(end);
          newEnd += 3;
        }
        break;
    }

    handleParagraphChange(index, newText);
    
    // Restore selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  };

  const getActiveFormats = (index: number): FormatType[] => {
    const text = content[index];
    const selection = selections[index];
    if (!selection || !text) return [];

    const activeFormats: FormatType[] = [];
    const selectedText = text.slice(selection.start, selection.end);

    if (selectedText.startsWith('**') && selectedText.endsWith('**')) {
      activeFormats.push('bold');
    }
    if (selectedText.startsWith('_') && selectedText.endsWith('_')) {
      activeFormats.push('italic');
    }
    if (selectedText.startsWith('> ')) {
      activeFormats.push('quote');
    }
    if (selectedText.startsWith('• ')) {
      activeFormats.push('bullet');
    }
    if (/^\d+\.\s/.test(selectedText)) {
      activeFormats.push('number');
    }

    return activeFormats;
  };

  return (
    <div className="space-y-6">
      {content.map((paragraph, index) => (
        <div key={index} className="relative group">
          <div className="mb-2 flex items-center space-x-2">
            <ToggleGroup type="multiple" className="justify-start">
              <ToggleGroupItem
                value="bold"
                aria-label="Toggle bold"
                onClick={() => applyFormat(index, 'bold')}
              >
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="italic"
                aria-label="Toggle italic"
                onClick={() => applyFormat(index, 'italic')}
              >
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="quote"
                aria-label="Toggle quote"
                onClick={() => applyFormat(index, 'quote')}
              >
                <Quote className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="bullet"
                aria-label="Toggle bullet list"
                onClick={() => applyFormat(index, 'bullet')}
              >
                <List className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="number"
                aria-label="Toggle numbered list"
                onClick={() => applyFormat(index, 'number')}
              >
                <ListOrdered className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <Textarea
            id={`paragraph-${index}`}
            value={paragraph}
            onChange={(e) => handleParagraphChange(index, e.target.value)}
            onSelect={(e) => handleSelection(index, e.target as HTMLTextAreaElement)}
            placeholder={`Write paragraph ${index + 1}...`}
            className="min-h-[150px] font-serif text-body leading-relaxed"
          />
          
          <div className="absolute -right-12 top-12 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
