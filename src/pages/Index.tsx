import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ArticleCard from '../components/ui/ArticleCard';
import FeaturedArticle from '../components/ui/FeaturedArticle';
import SectionDivider from '../components/ui/SectionDivider';
import { getPublishedArticles, Article } from '../lib/articleService';

// Convert Article to ArticleCard props
const articleToCardProps = (article: Article) => ({
  ...article,
  description: article.subheading || article.content[0] || '',
  imageUrl: article.imageUrl || '/placeholder.svg'
});

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const publishedArticles = await getPublishedArticles();
        setArticles(publishedArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Get the most recent article as featured
  const featuredArticle = articles.length > 0 ? articleToCardProps(articles[0]) : null;

  // Get articles by category
  const getArticlesByCategory = (category: string) => {
    return articles
      .filter(article => article.category.toLowerCase() === category.toLowerCase())
      .slice(0, 4) // Get up to 4 articles per category
      .map(articleToCardProps);
  };

  // Get top 3 most recent articles (excluding featured)
  const topStories = articles.slice(1, 4).map(articleToCardProps);

  // Get category specific articles
  const politicsArticles = getArticlesByCategory('Politics');
  const technologyArticles = getArticlesByCategory('Technology');
  const artsArticles = getArticlesByCategory('Arts');

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container-fluid py-8">
          <p className="text-center text-gray-500">Loading articles...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container-fluid py-8">
          <p className="text-center text-gray-500">No articles published yet.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Featured Article */}
        {featuredArticle && (
          <section className="container-fluid py-8 md:py-12">
            <FeaturedArticle {...featuredArticle} />
          </section>
        )}
        
        {/* Top Stories */}
        {topStories.length > 0 && (
          <section className="container-fluid py-8">
            <SectionDivider title="Top Stories" className="mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topStories.map(article => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          </section>
        )}
        
        {/* Politics Section */}
        {politicsArticles.length > 0 && (
          <section className="container-fluid py-8">
            <SectionDivider 
              title="Politics" 
              link="/section/politics" 
              withViewMore={true} 
              className="mb-8" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {politicsArticles.map(article => (
                <ArticleCard 
                  key={article.id} 
                  {...article}
                  size="small"
                />
              ))}
            </div>
          </section>
        )}
        
        {/* Technology Section */}
        {technologyArticles.length > 0 && (
          <section className="container-fluid py-8">
            <SectionDivider 
              title="Technology" 
              link="/section/technology" 
              withViewMore={true} 
              className="mb-8" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technologyArticles.map(article => (
                <ArticleCard 
                  key={article.id} 
                  {...article}
                  size="small"
                />
              ))}
            </div>
          </section>
        )}
        
        {/* Arts Section */}
        {artsArticles.length > 0 && (
          <section className="container-fluid py-8">
            <SectionDivider 
              title="Arts & Culture" 
              link="/section/arts" 
              withViewMore={true} 
              className="mb-8" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {artsArticles.map(article => (
                <ArticleCard 
                  key={article.id} 
                  {...article}
                  size="small"
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

export default Index;
