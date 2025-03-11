import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ArticleCard from '../components/ui/ArticleCard';
import FeaturedArticle from '../components/ui/FeaturedArticle';
import SectionDivider from '../components/ui/SectionDivider';
import { Article, getPublishedArticles } from '../lib/articleService';

// Helper function to convert Article to props
const articleToCardProps = (article: Article) => ({
  id: article.id,
  title: article.title,
  description: article.subheading || article.content[0] || '',
  imageUrl: article.imageUrl || '/placeholder.svg',
  category: article.category,
  date: new Date(article.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }),
  author: article.author
});

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [categoryArticles, setCategoryArticles] = useState<{
    politics: Article[];
    technology: Article[];
    arts: Article[];
  }>({
    politics: [],
    technology: [],
    arts: []
  });

  useEffect(() => {
    // Get all published articles
    const publishedArticles = getPublishedArticles();
    setArticles(publishedArticles);

    // Set featured article (most recent)
    if (publishedArticles.length > 0) {
      setFeaturedArticle(publishedArticles[0]);
    }

    // Get articles by category
    const politics = publishedArticles.filter(a => 
      a.category.toLowerCase() === 'politics'
    ).slice(0, 4);

    const technology = publishedArticles.filter(a => 
      a.category.toLowerCase() === 'technology'
    ).slice(0, 4);

    const arts = publishedArticles.filter(a => 
      a.category.toLowerCase() === 'arts'
    ).slice(0, 4);

    setCategoryArticles({ politics, technology, arts });
  }, []);

  // Get top 3 stories (excluding featured)
  const topStories = articles.slice(1, 4);

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
            <FeaturedArticle {...articleToCardProps(featuredArticle)} />
          </section>
        )}
        
        {/* Top Stories */}
        {topStories.length > 0 && (
          <section className="container-fluid py-8">
            <SectionDivider title="Top Stories" className="mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topStories.map(article => (
                <ArticleCard 
                  key={article.id} 
                  {...articleToCardProps(article)} 
                />
              ))}
            </div>
          </section>
        )}
        
        {/* Politics Section */}
        {categoryArticles.politics.length > 0 && (
          <section className="container-fluid py-8">
            <SectionDivider 
              title="Politics" 
              link="/section/politics" 
              withViewMore={true} 
              className="mb-8" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryArticles.politics.map(article => (
                <ArticleCard 
                  key={article.id} 
                  {...articleToCardProps(article)}
                  size="small"
                />
              ))}
            </div>
          </section>
        )}
        
        {/* Technology Section */}
        {categoryArticles.technology.length > 0 && (
          <section className="container-fluid py-8">
            <SectionDivider 
              title="Technology" 
              link="/section/technology" 
              withViewMore={true} 
              className="mb-8" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryArticles.technology.map(article => (
                <ArticleCard 
                  key={article.id} 
                  {...articleToCardProps(article)}
                  size="small"
                />
              ))}
            </div>
          </section>
        )}
        
        {/* Arts Section */}
        {categoryArticles.arts.length > 0 && (
          <section className="container-fluid py-8">
            <SectionDivider 
              title="Arts & Culture" 
              link="/section/arts" 
              withViewMore={true} 
              className="mb-8" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryArticles.arts.map(article => (
                <ArticleCard 
                  key={article.id} 
                  {...articleToCardProps(article)}
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
