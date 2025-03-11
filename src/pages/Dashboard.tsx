
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SectionDivider from '../components/ui/SectionDivider';
import { 
  getArticles, 
  getDrafts, 
  getPublishedArticles,
  deleteArticle,
  publishArticle,
  Article
} from '@/lib/articleService';
import { toast } from 'sonner';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Send, 
  Calendar, 
  Tag, 
  FileText, 
  Eye 
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  
  useEffect(() => {
    loadArticles();
  }, [activeTab]);
  
  const loadArticles = () => {
    try {
      let loadedArticles: Article[];
      
      switch (activeTab) {
        case 'drafts':
          loadedArticles = getDrafts();
          break;
        case 'published':
          loadedArticles = getPublishedArticles();
          break;
        case 'all':
        default:
          loadedArticles = getArticles();
          break;
      }
      
      // Sort by date, newest first
      loadedArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setArticles(loadedArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
      toast.error('Failed to load articles');
    }
  };
  
  const handleCreateNew = () => {
    navigate('/editor');
  };
  
  const handleEdit = (id: string) => {
    navigate(`/editor/${id}`);
  };
  
  const handleDelete = (id: string) => {
    setArticleToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (articleToDelete) {
      try {
        deleteArticle(articleToDelete);
        loadArticles();
        toast.success('Article deleted successfully');
      } catch (error) {
        console.error('Error deleting article:', error);
        toast.error('Failed to delete article');
      }
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
    }
  };
  
  const handlePublish = (id: string) => {
    try {
      const published = publishArticle(id);
      if (published) {
        loadArticles();
        toast.success('Article published successfully');
      }
    } catch (error) {
      console.error('Error publishing article:', error);
      toast.error('Failed to publish article');
    }
  };
  
  const getArticleStatusBadge = (isDraft: boolean) => {
    return isDraft ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Draft
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Published
      </span>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-white">
        <div className="container-fluid max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl font-bold">Content Dashboard</h1>
            
            <Button 
              onClick={handleCreateNew}
              className="flex items-center bg-nyt-red hover:bg-nyt-red/90"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Article
            </Button>
          </div>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6 font-sans">
              <TabsTrigger value="all">All Articles</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="py-2">
              <ArticleTable 
                articles={articles} 
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPublish={handlePublish}
              />
            </TabsContent>
            
            <TabsContent value="drafts" className="py-2">
              <ArticleTable 
                articles={articles} 
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPublish={handlePublish}
              />
            </TabsContent>
            
            <TabsContent value="published" className="py-2">
              <ArticleTable 
                articles={articles} 
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPublish={handlePublish}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

interface ArticleTableProps {
  articles: Article[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
}

const ArticleTable = ({ articles, onEdit, onDelete, onPublish }: ArticleTableProps) => {
  const navigate = useNavigate();
  
  if (articles.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No articles found</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new article.</p>
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell className="font-serif font-medium">{article.title}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4 text-nyt-gray" />
                {article.category}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-nyt-gray" />
                {article.date}
              </div>
            </TableCell>
            <TableCell>
              {article.isDraft ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Draft
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Published
                </span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate(`/article/${article.id}`)}
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(article.id)}
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                {article.isDraft && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPublish(article.id)}
                    title="Publish"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(article.id)}
                  className="text-red-500 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Dashboard;
