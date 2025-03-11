
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SectionDivider from '../components/ui/SectionDivider';
import ArticleCard from '../components/ui/ArticleCard';
import { Share2, Bookmark, Facebook, Twitter, Linkedin } from 'lucide-react';

const Article = () => {
  const { id } = useParams();
  const [isShareOpen, setIsShareOpen] = useState(false);
  
  // On real implementation, this would fetch from an API
  const article = {
    id: id || "1",
    title: "The Architectural Renaissance: How Modern Design is Reshaping Urban Spaces",
    subheading: "As cities evolve to meet environmental and social challenges, architects are reimagining the relationship between buildings and their surroundings",
    category: "Architecture",
    author: "Alexandra Rivers",
    date: "May 15, 2023",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    imageCaption: "The skyline of Shanghai showcases the blend of traditional and modern architectural styles that characterize today's urban development.",
    content: [
      "The 21st century has brought a dramatic shift in how architects approach urban design. With growing concerns about climate change, population density, and quality of life, the world's leading architects are developing innovative solutions that blend functionality, sustainability, and aesthetic beauty.",
      "\"We're seeing a fundamental reconsideration of what cities can be,\" explains renowned architect Carlos Mendoza. \"It's no longer about creating isolated monuments, but about designing integrated ecosystems where buildings interact with their environment and enhance the lives of their inhabitants.\"",
      "This new wave of architectural thinking is particularly evident in rapidly developing urban centers across Asia and the Middle East, where designers have the opportunity to build from the ground up rather than retrofit existing structures. From Singapore's gardens in the sky to Dubai's experiments with climate-controlled neighborhoods, these regions are becoming living laboratories for architectural innovation.",
      "But the renaissance isn't limited to new construction. In cities with rich architectural histories like London, Paris, and New York, designers are finding ways to preserve heritage while adapting spaces to contemporary needs. The transformation of industrial warehouses into light-filled living spaces, the addition of green roofs to decades-old buildings, and the repurposing of historic landmarks for new functions are all part of this global movement.",
      "What makes this architectural renaissance particularly significant is its holistic approach. Today's leading designs consider not just the building itself but its impact on the surrounding community, its environmental footprint, and its contribution to social well-being. This means incorporating public spaces, prioritizing natural light and ventilation, integrating renewable energy sources, and creating mixed-use developments that bring together residential, commercial, and recreational activities.",
      "Technology is playing a crucial role in this evolution. Advanced materials allow for stronger, lighter structures with better insulation. Computational design enables architects to model complex forms and systems before breaking ground. Building automation systems optimize energy use and comfort. And virtual reality gives clients and communities the ability to experience spaces before they're built, allowing for more meaningful feedback during the design process.",
      "The movement toward sustainable architecture is not just idealistic—it's increasingly practical and economical. As cities implement stricter environmental regulations and as clients demand buildings that reflect their values, sustainable design has moved from a niche concern to a mainstream requirement. Studies consistently show that green buildings command higher rents, have lower vacancy rates, and retain their value better than conventional structures.",
      "\"What we're seeing now is that good design—design that considers environmental and social impacts—is actually good business,\" says urban planner Sophia Chen. \"Developers are realizing that investments in quality architecture pay dividends in terms of marketability, operational costs, and long-term value.\"",
      "As this architectural renaissance continues to unfold, we can expect to see even more innovation in how buildings are conceived, constructed, and experienced. The boundaries between indoor and outdoor spaces will continue to blur. Urban agriculture will become more integrated into building design. And new technologies will enable structures that can respond and adapt to changing conditions and needs.",
      "The ultimate goal of this movement is to create cities that are not just functional and efficient, but truly livable—places that nurture human connection, creativity, and well-being while existing in harmony with the natural world. It's an ambitious vision, but one that architects around the globe are bringing closer to reality with each thoughtfully designed building and public space."
    ],
    pullQuote: "We're seeing a fundamental reconsideration of what cities can be. It's no longer about creating isolated monuments, but about designing integrated ecosystems.",
    author_bio: "Alexandra Rivers is an architecture critic and writer based in London. She has covered design trends and urban development for over 15 years.",
    author_image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    relatedArticles: [
      {
        id: "2",
        title: "Sustainable Materials: The Future of Construction",
        imageUrl: "https://images.unsplash.com/photo-1467533003447-e295ff1b0435?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        category: "Architecture",
        date: "May 10, 2023",
        author: "Marcus Thompson"
      },
      {
        id: "3",
        title: "Historic Preservation in the Age of Climate Change",
        imageUrl: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        category: "Architecture",
        date: "May 5, 2023",
        author: "Samira Khan"
      },
      {
        id: "4",
        title: "The Rise of Community-Centered Urban Planning",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        category: "Urban Development",
        date: "April 28, 2023",
        author: "David Chen"
      }
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
              
              <p className="font-serif text-subhead text-nyt-gray-dark mb-6 max-w-3xl mx-auto">
                {article.subheading}
              </p>
              
              <div className="flex items-center justify-center mb-2 text-nyt-gray text-sm font-sans">
                <span className="mr-4">By {article.author}</span>
                <span className="mr-4">{article.date}</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Article Hero Image */}
        <section className="w-full mb-8 animate-scale-in">
          <div className="container-fluid max-w-5xl">
            <figure>
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-[30rem] md:h-[40rem] object-cover"
              />
              <figcaption className="text-caption font-sans text-nyt-gray mt-2 text-center">
                {article.imageCaption}
              </figcaption>
            </figure>
          </div>
        </section>
        
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
              <div className="article-content font-serif text-body text-nyt-black space-y-6">
                {article.content.map((paragraph, index) => {
                  // Insert pull quote after 3rd paragraph
                  if (index === 2) {
                    return (
                      <React.Fragment key={index}>
                        <p>{paragraph}</p>
                        <blockquote className="pull-quote">
                          {article.pullQuote}
                        </blockquote>
                      </React.Fragment>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
              
              {/* Author Bio */}
              <div className="border-t border-b border-nyt-gray-light py-8 my-10 flex items-center">
                <img 
                  src={article.author_image} 
                  alt={article.author}
                  className="w-16 h-16 rounded-full object-cover mr-6"
                />
                <div>
                  <h3 className="font-serif font-bold text-lg mb-2">{article.author}</h3>
                  <p className="font-sans text-sm text-nyt-gray-dark">{article.author_bio}</p>
                </div>
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
        <section className="container-fluid py-8">
          <SectionDivider title="Related Articles" className="mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {article.relatedArticles.map(relatedArticle => (
              <ArticleCard 
                key={relatedArticle.id} 
                {...relatedArticle}
                size="medium"
              />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Article;
