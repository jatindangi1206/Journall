import React, { useState, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle } from "lucide-react";
import { extractContentFromFile } from '@/lib/articleService';
import { toast } from 'sonner';

interface FileUploaderProps {
  onContentExtracted: (data: {
    title: string;
    content: string[];
    category: string;
    author: string;
  }) => void;
}

const FileUploader = ({ onContentExtracted }: FileUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    'text/plain',
    'text/markdown',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const validateFile = useCallback((file: File): boolean => {
    if (!allowedTypes.includes(file.type)) {
      setError('Unsupported file format. Please upload a TXT, MD, PDF, or Word document.');
      return false;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size too large. Please upload a file smaller than 10MB.');
      return false;
    }

    setError(null);
    return true;
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      toast.error(error || 'Invalid file');
      return;
    }

    setUploadedFileName(file.name);
    setIsUploading(true);
    
    try {
      const extractedData = await extractContentFromFile(file);
      
      // Validate extracted content
      if (!extractedData.title || extractedData.content.length === 0) {
        throw new Error('Could not extract content from file. Please check the file format and try again.');
      }

      onContentExtracted(extractedData);
      toast.success('Document successfully processed');
      
      // Preview the extracted content
      const contentPreview = extractedData.content.slice(0, 2).join('\n');
      console.log('Extracted Content Preview:', {
        title: extractedData.title,
        category: extractedData.category,
        author: extractedData.author,
        contentPreview
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process document';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Document processing error:', error);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      const input = document.createElement('input');
      input.type = 'file';
      input.files = e.dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      input.dispatchEvent(event);
      handleFileChange({ target: input } as any);
    }
  }, [validateFile]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="border-2 border-dashed border-nyt-gray-light rounded-md p-6 text-center bg-white"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="p-3 bg-nyt-background rounded-full">
          <FileText className="h-8 w-8 text-nyt-gray" />
        </div>
        
        <div className="text-center">
          <h3 className="font-serif text-lg font-semibold mb-1">
            {isUploading ? 'Processing document...' : 'Upload your document'}
          </h3>
          <p className="text-nyt-gray text-sm max-w-xs mx-auto">
            {uploadedFileName || 'Drag and drop or click to upload a document file'}
          </p>
        </div>
        
        {error && (
          <div className="flex items-center text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}
        
        <div className="w-full max-w-xs">
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <Button 
            variant="outline" 
            className="w-full relative"
            disabled={isUploading}
            onClick={handleButtonClick}
          >
            {isUploading ? 'Processing...' : 'Select file'}
          </Button>
        </div>
        
        {uploadedFileName && !error && (
          <p className="text-xs text-nyt-gray">
            Current file: {uploadedFileName}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
