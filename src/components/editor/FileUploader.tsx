
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileType } from "lucide-react";
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
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    // Validate file type
    if (!['pdf', 'doc', 'docx', 'txt', 'pages'].includes(fileExtension || '')) {
      toast.error('Unsupported file format. Please upload a PDF, Word, or Pages document.');
      return;
    }
    
    setUploadedFileName(file.name);
    setIsUploading(true);
    
    try {
      const extractedData = await extractContentFromFile(file);
      onContentExtracted(extractedData);
      toast.success('Document successfully processed');
    } catch (error) {
      toast.error('Failed to process document. Please try again.');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="border-2 border-dashed border-nyt-gray-light rounded-md p-6 text-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="p-3 bg-nyt-background rounded-full">
          <FileType className="h-8 w-8 text-nyt-gray" />
        </div>
        
        <div className="text-center">
          <h3 className="font-serif text-lg font-semibold mb-1">
            {isUploading ? 'Processing document...' : 'Upload your document'}
          </h3>
          <p className="text-nyt-gray text-sm max-w-xs mx-auto">
            {uploadedFileName || 'Upload a PDF, Word, or Pages document to automatically format it in New York Times style'}
          </p>
        </div>
        
        <div className="relative w-full max-w-xs">
          <Input
            type="file"
            accept=".pdf,.doc,.docx,.txt,.pages"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <Button 
            variant="outline" 
            className="w-full relative"
            disabled={isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Processing...' : 'Select file'}
          </Button>
        </div>
        
        {uploadedFileName && (
          <p className="text-xs text-nyt-gray">
            Current file: {uploadedFileName}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
