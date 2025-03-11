
export interface ArticleMetadata {
  id: string;
  title: string;
  subheading?: string;
  category: string;
  author: string;
  date: string;
  imageUrl?: string;
  imageCaption?: string;
  tags?: string[];
  isDraft: boolean;
}

export interface Article extends ArticleMetadata {
  content: string[];
  pullQuote?: string;
}

// Helper to generate a unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Get all articles
export const getArticles = (): Article[] => {
  const articles = localStorage.getItem('articles');
  return articles ? JSON.parse(articles) : [];
};

// Get a single article by ID
export const getArticleById = (id: string): Article | undefined => {
  const articles = getArticles();
  return articles.find(article => article.id === id);
};

// Save a new article or update an existing one
export const saveArticle = (article: Omit<Article, 'id'> & { id?: string }): Article => {
  const articles = getArticles();
  const newArticle = {
    ...article,
    id: article.id || generateId()
  };
  
  const existingIndex = articles.findIndex(a => a.id === newArticle.id);
  
  if (existingIndex >= 0) {
    articles[existingIndex] = newArticle;
  } else {
    articles.push(newArticle);
  }
  
  localStorage.setItem('articles', JSON.stringify(articles));
  return newArticle;
};

// Delete an article
export const deleteArticle = (id: string): void => {
  const articles = getArticles();
  const filteredArticles = articles.filter(article => article.id !== id);
  localStorage.setItem('articles', JSON.stringify(filteredArticles));
};

// Get all drafts
export const getDrafts = (): Article[] => {
  return getArticles().filter(article => article.isDraft);
};

// Get all published articles
export const getPublishedArticles = (): Article[] => {
  return getArticles().filter(article => !article.isDraft);
};

// Publish a draft
export const publishArticle = (id: string): Article | undefined => {
  const article = getArticleById(id);
  if (article && article.isDraft) {
    const updatedArticle = { ...article, isDraft: false };
    saveArticle(updatedArticle);
    return updatedArticle;
  }
  return article;
};

// Extract text content from uploaded files
export const extractContentFromFile = async (file: File): Promise<{
  title: string;
  content: string[];
  category: string;
  author: string;
}> => {
  // This is a simplified example. In production, you would need server-side
  // processing for proper file extraction from PDFs, Word docs, etc.
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          throw new Error("Failed to read file");
        }
        
        const text = event.target.result.toString();
        
        // Simple parsing logic - would be more sophisticated in production
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
        
        // Assume first line is title
        const title = lines[0] || 'Untitled Document';
        
        // Try to extract author - look for "By" or "Author:" pattern
        let author = 'Unknown Author';
        let authorIndex = -1;
        
        for (let i = 1; i < Math.min(5, lines.length); i++) {
          if (lines[i].toLowerCase().startsWith('by ') || 
              lines[i].toLowerCase().includes('author:')) {
            author = lines[i].replace(/^by |author:/i, '').trim();
            authorIndex = i;
            break;
          }
        }
        
        // Extract content, skipping title and author
        const content = lines
          .filter((_, index) => index !== 0 && index !== authorIndex)
          .map(line => line.trim())
          .filter(line => line.length > 0);
        
        // Try to determine category from content
        const academicKeywords = [
          { term: 'research', category: 'Research' },
          { term: 'study', category: 'Study' },
          { term: 'analysis', category: 'Analysis' },
          { term: 'review', category: 'Review' },
          { term: 'paper', category: 'Academic' }
        ];
        
        let category = 'Academic';
        
        // Simple category detection
        for (const keyword of academicKeywords) {
          if (content.some(paragraph => 
            paragraph.toLowerCase().includes(keyword.term)
          )) {
            category = keyword.category;
            break;
          }
        }
        
        resolve({
          title,
          content,
          category,
          author
        });
      } catch (error) {
        reject(new Error("Failed to parse document"));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    
    // Read as text for basic extraction
    // In production, you would need different strategies for different file types
    reader.readAsText(file);
  });
};

