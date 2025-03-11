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

// Enhanced content analysis for better categorization
const analyzeContent = (content: string[]): string => {
  const categoryPatterns = [
    { pattern: /(politic|government|election|congress|senate|democrat|republican)/i, category: 'Politics' },
    { pattern: /(tech|software|digital|computer|internet|AI|blockchain|startup)/i, category: 'Technology' },
    { pattern: /(art|culture|music|film|theater|gallery|exhibition|performance)/i, category: 'Arts' },
    { pattern: /(business|economy|market|stock|trade|finance|company)/i, category: 'Business' },
    { pattern: /(science|research|study|discovery|innovation|experiment)/i, category: 'Science' },
    { pattern: /(sport|game|athlete|tournament|championship|team|player)/i, category: 'Sports' }
  ];

  const wordCounts = new Map<string, number>();
  
  content.forEach(paragraph => {
    categoryPatterns.forEach(({ pattern, category }) => {
      const matches = paragraph.match(pattern) || [];
      wordCounts.set(category, (wordCounts.get(category) || 0) + matches.length);
    });
  });

  let maxCount = 0;
  let detectedCategory = 'General';

  wordCounts.forEach((count, category) => {
    if (count > maxCount) {
      maxCount = count;
      detectedCategory = category;
    }
  });

  return detectedCategory;
};

// Extract author information from text
const extractAuthor = (text: string): string => {
  const authorPatterns = [
    /by[\s:]+([\w\s]+?)(?=\n|$)/i,
    /author[\s:]+([\w\s]+?)(?=\n|$)/i,
    /written by[\s:]+([\w\s]+?)(?=\n|$)/i
  ];

  for (const pattern of authorPatterns) {
    const match = text.match(pattern);
    if (match && match[1]?.trim()) {
      return match[1].trim();
    }
  }

  return 'Unknown Author';
};

// Enhanced text processing
const processText = (text: string) => {
  // Split into paragraphs, handling multiple line break types
  const paragraphs = text
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  // Extract title (first non-empty line)
  const title = paragraphs[0] || 'Untitled Document';

  // Remove title from paragraphs
  const content = paragraphs.slice(1);

  // Extract author
  const fullText = text.replace(/\n+/g, ' ');
  const author = extractAuthor(fullText);

  // Analyze content for category
  const category = analyzeContent(content);

  return {
    title,
    content,
    category,
    author
  };
};

// Extract text content from uploaded files
export const extractContentFromFile = async (file: File): Promise<{
  title: string;
  content: string[];
  category: string;
  author: string;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          throw new Error("Failed to read file");
        }
        
        const text = event.target.result.toString();
        const processed = processText(text);
        
        resolve({
          title: processed.title,
          content: processed.content,
          category: processed.category,
          author: processed.author
        });
      } catch (error) {
        reject(new Error("Failed to process document"));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    
    // Read as text
    reader.readAsText(file);
  });
};
