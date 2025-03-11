
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MetadataForm from '../components/editor/MetadataForm';
import ContentEditor from '../components/editor/ContentEditor';
import FileUploader from '../components/editor/FileUploader';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Article, ArticleMetadata, getArticleById, saveArticle, publishArticle } from '@/lib/articleService';
import { toast } from 'sonner';
import { Save, Send, Eye, ArrowLeft, Upload } from 'lucide-react';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('content');
  
  const [article, setArticle] = useState<Article>({
    id: '',
    title: '',
    subheading: '',
    category: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    content: [''],
    isDraft: true,
  });
  
  const [preview, setPreview] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  
  useEffect(() => {
    if (id) {
      const existingArticle = getArticleById(id);
      if (existingArticle) {
        setArticle(existingArticle);
      } else {
        toast.error('Article not found');
        navigate('/dashboard');
      }
    }
  }, [id, navigate]);
  
  const handleMetadataChange = (field: keyof ArticleMetadata, value: any) => {
    setArticle(prev => ({ ...prev, [field]: value }));
  };
  
  const handleContentChange = (content: string[]) => {
    setArticle(prev => ({ ...prev, content }));
  };
  
  const handlePullQuoteChange = (pullQuote: string) => {
    setArticle(prev => ({ ...prev, pullQuote }));
  };
  
  const handleSaveDraft = () => {
    try {
      saveArticle({ ...article, isDraft: true });
      toast.success('Draft saved successfully');
      
      if (!id) {
        // Redirect to the editor with the new ID if this is a new article
        navigate(`/editor/${article.id}`);
      }
    } catch (error) {
      toast.error('Failed to save draft');
      console.error(error);
    }
  };
  
  const handlePublish = () => {
    // Validate required fields
    if (!article.title || !article.category || !article.author || article.content.some(p => !p.trim())) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      const published = saveArticle({ ...article, isDraft: false });
      toast.success('Article published successfully');
      navigate(`/article/${published.id}`);
    } catch (error) {
      toast.error('Failed to publish article');
      console.error(error);
    }
  };
  
  const togglePreview = () => {
    if (!preview && (!article.title || !article.content.some(p => p.trim()))) {
      toast.error('Please add a title and some content to preview');
      return;
    }
    setPreview(!preview);
  };

  const handleExtractedContent = (data: {
    title: string;
    content: string[];
    category: string;
    author: string;
  }) => {
    setArticle(prev => ({
      ...prev,
      title: data.title,
      category: data.category,
      author: data.author,
      content: data.content
    }));
    
    setShowUploader(false);
    setActiveTab('content');
    toast.success('Document content imported. You can now edit and refine it.');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-white py-8">
        <div className="container-fluid max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="mr-3"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="font-serif text-3xl font-bold">
                {id ? 'Edit Article' : 'New Article'}
              </h1>
            </div>
            
            <div className="flex space-x-3">
              {!showUploader && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowUploader(true)}
                  className="flex items-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Document
                </Button>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={togglePreview}
                className="flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                {preview ? 'Edit' : 'Preview'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveDraft}
                className="flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={handlePublish}
                className="flex items-center bg-nyt-red hover:bg-nyt-red/90"
              >
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
          
          {showUploader ? (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-serif text-xl">Import Document</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowUploader(false)}
                >
                  Cancel
                </Button>
              </div>
              <FileUploader onContentExtracted={handleExtractedContent} />
            </div>
          ) : preview ? (
            <div className="animate-fade-in border rounded-md p-8 bg-white">
              {/* Article Preview Header */}
              <header className="mb-8 text-center">
                <span className="text-nyt-red font-sans text-sm font-semibold uppercase tracking-wide mb-4 inline-block">
                  {article.category || 'Category'}
                </span>
                
                <h1 className="font-serif text-featured md:text-5xl leading-tight mb-6">
                  {article.title || 'Article Title'}
                </h1>
                
                {article.subheading && (
                  <p className="font-serif text-subhead text-nyt-gray-dark mb-6 max-w-3xl mx-auto">
                    {article.subheading}
                  </p>
                )}
                
                <div className="flex items-center justify-center mb-2 text-nyt-gray text-sm font-sans">
                  <span className="mr-4">By {article.author || 'Author'}</span>
                  <span>{article.date}</span>
                </div>
              </header>
              
              {/* Article Preview Image */}
              {article.imageUrl && (
                <figure className="mb-8">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-[30rem] object-cover"
                  />
                  {article.imageCaption && (
                    <figcaption className="text-caption font-sans text-nyt-gray mt-2 text-center">
                      {article.imageCaption}
                    </figcaption>
                  )}
                </figure>
              )}
              
              {/* Article Preview Content */}
              <div className="article-content font-serif text-body text-nyt-black space-y-6">
                {article.content.map((paragraph, index) => {
                  // Insert pull quote after 2nd paragraph
                  if (index === 1 && article.pullQuote) {
                    return (
                      <React.Fragment key={index}>
                        <p>{paragraph}</p>
                        <blockquote className="pull-quote">
                          {article.pullQuote}
                        </blockquote>
                      </React.Fragment>
                    );
                  }
                  return <p key={index}>{paragraph || 'Paragraph content...'}</p>;
                })}
              </div>
            </div>
          ) : (
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-6 font-sans">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="py-2">
                <ContentEditor 
                  content={article.content}
                  pullQuote={article.pullQuote}
                  onContentChange={handleContentChange}
                  onPullQuoteChange={handlePullQuoteChange}
                />
              </TabsContent>
              
              <TabsContent value="metadata" className="py-2">
                <MetadataForm 
                  metadata={article}
                  onChange={handleMetadataChange}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Editor;
