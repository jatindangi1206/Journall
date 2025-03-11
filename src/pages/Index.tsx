
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ArticleCard from '../components/ui/ArticleCard';
import FeaturedArticle from '../components/ui/FeaturedArticle';
import SectionDivider from '../components/ui/SectionDivider';

const Index = () => {
  // Updated article data for March 11, 2025
  const featuredArticle = {
    id: "1",
    title: "The Future of Urban Architecture: Sustainable Vertical Climate Arks",
    description: "Singapore's groundbreaking solarpunk project combines cutting-edge sustainability with tourism, completed five years ahead of schedule.",
    imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Environment",
    date: "March 11, 2025",
    author: "Alexandra Rivers"
  };

  const topStories = [
    {
      id: "2",
      title: "Google Launches Gemini 2.0 Flash and Career Dreamer AI Tools",
      description: "Tech giant expands AI portfolio with new developer tools and an innovative career planning assistant.",
      imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "Technology",
      date: "March 11, 2025",
      author: "Jonathan Chen"
    },
    {
      id: "3",
      title: "Government Shutdown Looms as Congress Stalls on Funding",
      description: "Federal agencies prepare contingency plans as deadline approaches on March 17.",
      imageUrl: "https://www.federaltimes.com/resizer/v2/3QKXWLTJ4NAPZO6JEN6D3HQNPI.jpg?auth=d720c2ed0f65c91b21880d3f7b2d598e72bec7b70d23a125d096fc8df9b7258e&width=1024&height=778",
      category: "Politics",
      date: "March 10, 2025",
      author: "Sophia Rodriguez"
    },
    {
      id: "4",
      title: "President Appoints Loyalists to Naval Academy Board",
      description: "Former press secretary and personal valet among controversial appointments intensifying focus on military oversight.",
      imageUrl: "https://www.politico.com/dims4/default/868fdc7/2147483647/strip/true/crop/6000x4000+0+0/resize/1260x840!/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2Fbd%2F31%2Fa64de5504444be64e098c6719b6a%2Fhttps-delivery-gettyimages.com%2Fdownloads%2F2154470762",
      category: "Politics",
      date: "March 9, 2025",
      author: "Marcus Williams"
    }
  ];

  const politicsArticles = [
    {
      id: "5",
      title: "U.S.-Canada Trade Tensions Rise Over Tariff Threats",
      imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "Politics",
      date: "March 8, 2025",
      author: "Robert Johnson"
    },
    {
      id: "6",
      title: "Ukraine Seeks Ceasefire Talks as Military Aid Reduced",
      imageUrl: "https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Ac47698d2-d6ea-4fd0-9b2b-c6f4ce7966ff?source=next-article&fit=scale-down&quality=highest&width=700&dpr=2",
      category: "Politics",
      date: "March 7, 2025",
      author: "Jennifer Adams"
    },
    {
      id: "7",
      title: "Marist Poll: 56% Say New Administration Moving Too Quickly",
      imageUrl: "https://maristpoll.marist.edu/wp-content/uploads/2025/03/USA-Map_Cracked-Foundationv1.jpg",
      category: "Politics",
      date: "March 6, 2025",
      author: "Michael Thompson"
    },
    {
      id: "8",
      title: "VA Staffing Cuts Raise Concerns About Veteran Healthcare",
      imageUrl: "https://ktvz.b-cdn.net/2022/03/VA-US-Department-of-Veterans-Affairs.jpg",
      category: "Politics",
      date: "March 5, 2025",
      author: "Sarah Collins"
    }
  ];

  const technologyArticles = [
    {
      id: "9",
      title: "IBM's 10,000-Qubit Processor Achieves Commercial Error Correction",
      imageUrl: "https://imageio.forbes.com/specials-images/imageserve/6482148f741c2a2fbe595934/Thats-COLD-/960x0.jpg?height=948&width=711&fit=bounds",
      category: "Technology",
      date: "March 10, 2025",
      author: "David Kim"
    },
    {
      id: "10",
      title: "EU Implements 'Neural Receipts' for AI Transparency",
      imageUrl: "https://images.unsplash.com/photo-1625314868143-20e93ce3ff33?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Technology",
      date: "March 9, 2025",
      author: "Rachel Foster"
    },
    {
      id: "11",
      title: "YouTube Integrates Veo 2 AI Video Generator for Shorts",
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
      category: "Technology",
      date: "March 8, 2025",
      author: "Brian Mitchell"
    },
    {
      id: "12",
      title: "Private Athena Lander Reaches Moon's South Pole",
      imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "Technology",
      date: "March 7, 2025",
      author: "Emma Garcia"
    }
  ];

  const artsArticles = [
    {
      id: "13",
      title: "Glastonbury 2025 Lineup Announced with The 1975, Neil Young",
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "Arts",
      date: "March 11, 2025",
      author: "Olivia Wright"
    },
    {
      id: "14",
      title: "Kara Walker's SFMOMA Exhibit Blends Historical and Futuristic Themes",
      imageUrl: "https://d1hhug17qm51in.cloudfront.net/www-media/2024/05/19122251/SFM_Walker_020.jpg",
      category: "Arts",
      date: "March 10, 2025",
      author: "Thomas Wilson"
    },
    {
      id: "15",
      title: "Kennedy Center Overhaul Prompts Artist Boycotts",
      imageUrl: "https://s.yimg.com/ny/api/res/1.2/Aq_fZqpzZgS4tTp.TgJYCA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD04Mjg-/https://media.zenfs.com/en/washington_post_entertainment_articles_637/cfdc8b62a2d2fbab082c4d25a4d805a1",
      category: "Arts",
      date: "March 9, 2025",
      author: "Natasha Davis"
    },
    {
      id: "16",
      title: "Gen Z's Analog Revival: Typewriter Sales Surge Among Digital Natives",
      imageUrl: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "Arts",
      date: "March 8, 2025",
      author: "James Peterson"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Featured Article */}
        <section className="container-fluid py-8 md:py-12">
          <FeaturedArticle {...featuredArticle} />
        </section>
        
        {/* Top Stories */}
        <section className="container-fluid py-8">
          <SectionDivider title="Top Stories" className="mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topStories.map(article => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </section>
        
        {/* Politics Section */}
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
        
        {/* Technology Section */}
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
        
        {/* Arts Section */}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
