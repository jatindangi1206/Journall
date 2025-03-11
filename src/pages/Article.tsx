import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SectionDivider from '../components/ui/SectionDivider';
import ArticleCard from '../components/ui/ArticleCard';
import FormattedContent from '../components/editor/FormattedContent';
import { Share2, Bookmark, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Article as ArticleType, getArticleById, getPublishedArticles } from '../lib/articleService';
import { toast } from 'sonner';

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleType[]>([]);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);
        
        // Fetch the article
        const fetchedArticle = await getArticleById(id);
        if (!fetchedArticle || fetchedArticle.isDraft) {
          toast.error('Article not found');
          navigate('/');
          return;
        }

        // Get related articles (same category, excluding current article)
        const allPublished = await getPublishedArticles();
        const related = allPublished
          .filter(a => a.category === fetchedArticle.category && a.id !== id)
          .slice(0, 3);

        setArticle(fetchedArticle);
        setRelatedArticles(related);
        window.scrollTo(0, 0);
      } catch (error) {
        toast.error('Failed to load article');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container-fluid py-8">
          <p className="text-center text-gray-500">Loading article...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Article Header */}
        <header className="w-full pt-8 pb-4 animate-fade-in">
          <div className="container-fluid max-w-4xl">
            <div className="text-center mb-6">
              <Link 
                to={`/section/${article.category.toLowerCase()}`}
                className="text-nyt-red font-sans text-sm font-semibold uppercase tracking-wide mb-4 inline-block"
              >
                {article.category}
              </Link>
              
              <h1 className="font-serif text-featured md:text-5xl leading-tight mb-6">
                {article.title}
              </h1>
              
              {article.subheading && (
                <p className="font-serif text-subhead text-nyt-gray-dark mb-6 max-w-3xl mx-auto">
                  {article.subheading}
                </p>
              )}
              
              <div className="flex items-center justify-center mb-2 text-nyt-gray text-sm font-sans">
                <span className="mr-4">By {article.author}</span>
                <span>{new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Article Hero Image */}
        {article.imageUrl && (
          <section className="w-full mb-8 animate-scale-in">
            <div className="container-fluid max-w-5xl">
              <figure>
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-[30rem] md:h-[40rem] object-cover"
                />
                {article.imageCaption && (
                  <figcaption className="text-caption font-sans text-nyt-gray mt-2 text-center">
                    {article.imageCaption}
                  </figcaption>
                )}
              </figure>
            </div>
          </section>
        )}
        
        {/* Article Content */}
        <section className="container-fluid max-w-4xl pb-16 animate-slide-in">
          <div className="flex flex-col lg:flex-row">
            {/* Sharing Sidebar - Desktop */}
            <div className="hidden lg:flex flex-col items-center w-16 sticky top-24 self-start mr-8">
              <button 
                className="w-10 h-10 rounded-full bg-white border border-nyt-gray-light flex items-center justify-center mb-4 hover:bg-nyt-gray-light transition-colors"
                aria-label="Share article"
                onClick={() => setIsShareOpen(!isShareOpen)}
              >
                <Share2 className="h-5 w-5 text-nyt-gray-dark" />
              </button>
              
              {isShareOpen && (
                <div className="flex flex-col space-y-4 animate-fade-in">
                  <button aria-label="Share on Facebook" className="w-10 h-10 rounded-full bg-white border border-nyt-gray-light flex items-center justify-center hover:bg-nyt-gray-light transition-colors">
                    <Facebook className="h-5 w-5 text-nyt-gray-dark" />
                  </button>
                  <button aria-label="Share on Twitter" className="w-10 h-10 rounded-full bg-white border border-nyt-gray-light flex items-center justify-center hover:bg-nyt-gray-light transition-colors">
                    <Twitter className="h-5 w-5 text-nyt-gray-dark" />
                  </button>
                  <button aria-label="Share on LinkedIn" className="w-10 h-10 rounded-full bg-white border border-nyt-gray-light flex items-center justify-center hover:bg-nyt-gray-light transition-colors">
                    <Linkedin className="h-5 w-5 text-nyt-gray-dark" />
                  </button>
                </div>
              )}
              
              <button 
                className="w-10 h-10 rounded-full bg-white border border-nyt-gray-light flex items-center justify-center mt-4 hover:bg-nyt-gray-light transition-colors"
                aria-label="Save article"
              >
                <Bookmark className="h-5 w-5 text-nyt-gray-dark" />
              </button>
            </div>
            
            {/* Article Body */}
            <article className="flex-grow">
              <div className="article-content space-y-6">
                {article.content.map((paragraph, index) => {
                  // Insert pull quote after 2nd paragraph
                  if (index === 1 && article.pullQuote) {
                    return (
                      <React.Fragment key={index}>
                        <FormattedContent content={paragraph} className="font-serif text-body text-nyt-black" />
                        <blockquote className="pull-quote my-8">
                          {article.pullQuote}
                        </blockquote>
                      </React.Fragment>
                    );
                  }
                  return (
                    <FormattedContent 
                      key={index} 
                      content={paragraph}
                      className="font-serif text-body text-nyt-black"
                    />
                  );
                })}
              </div>
              
              {/* Sharing Icons - Mobile */}
              <div className="flex justify-center space-x-4 my-8 lg:hidden">
                <button aria-label="Share on Facebook" className="w-10 h-10 rounded-full bg-white border border-nyt-gray-light flex items-center justify-center hover:bg-nyt-gray-light transition-colors">
                  <Facebook className="h-5 w-5 text-nyt-gray-dark" />
                </button>
                <button aria-label="Share on Twitter" className="w-10 h-10 rounded-full bg-white border border-nyt-gray-light flex items-center justify-center hover:bg-nyt-gray-light transition-colors">
                  <Twitter className="h-5 w-5 text-nyt-gray-dark" />
                </button>
                <button aria-label="Share on LinkedIn" className="w-10 h-10 rounded-full bg-white border border-nyt-gray-light flex items-center justify-center hover:bg-nyt-gray-light transition-colors">
                  <Linkedin className="h-5 w-5 text-nyt-gray-dark" />
                </button>
                <button aria-label="Save article" className="w-10 h-10 rounded-full bg-white border border-nyt-gray-light flex items-center justify-center hover:bg-nyt-gray-light transition-colors">
                  <Bookmark className="h-5 w-5 text-nyt-gray-dark" />
                </button>
              </div>
            </article>
          </div>
        </section>
        
        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="container-fluid py-8">
            <SectionDivider title="Related Articles" className="mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map(relatedArticle => (
                <ArticleCard 
                  key={relatedArticle.id} 
                  {...articleToCardProps(relatedArticle)}
                  size="medium"
                />
              ))}
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// Helper function to convert Article to ArticleCard props
const articleToCardProps = (article: ArticleType) => ({
  ...article,
  description: article.subheading || article.content[0] || '',
  imageUrl: article.imageUrl || '/placeholder.svg'
});

export default Article;
