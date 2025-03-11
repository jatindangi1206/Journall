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

const API_URL = 'http://localhost:3000/api/articles';

// Get all articles
export const getArticles = async (): Promise<Article[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return response.json();
};

// Get a single article by ID
export const getArticleById = async (id: string): Promise<Article | undefined> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    if (response.status === 404) return undefined;
    throw new Error('Failed to fetch article');
  }
  return response.json();
};

// Save a new article or update an existing one
export const saveArticle = async (article: Omit<Article, 'id'> & { id?: string }): Promise<Article> => {
  const method = article.id ? 'PUT' : 'POST';
  const url = article.id ? `${API_URL}/${article.id}` : API_URL;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    throw new Error('Failed to save article');
  }
  return response.json();
};

// Delete an article
export const deleteArticle = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete article');
  }
};

// Get all drafts
export const getDrafts = async (): Promise<Article[]> => {
  const response = await fetch(`${API_URL}/status/drafts`);
  if (!response.ok) {
    throw new Error('Failed to fetch drafts');
  }
  return response.json();
};

// Get all published articles
export const getPublishedArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${API_URL}/status/published`);
  if (!response.ok) {
    throw new Error('Failed to fetch published articles');
  }
  return response.json();
};

// Publish a draft
export const publishArticle = async (id: string): Promise<Article | undefined> => {
  const article = await getArticleById(id);
  if (article && article.isDraft) {
    const updatedArticle = { ...article, isDraft: false };
    return saveArticle(updatedArticle);
  }
  return article;
};

// Process text content from uploaded files
export const extractContentFromFile = async (file: File): Promise<{
  title: string;
  content: string[];
  category: string;
  author: string;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        if (!event.target?.result) {
          throw new Error("Failed to read file");
        }
        
        const text = event.target.result.toString();
        const lines = text.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 0);
        
        resolve({
          title: lines[0] || 'Untitled Document',
          content: lines.slice(1),
          category: 'General',
          author: 'Unknown Author'
        });
      } catch (error) {
        reject(new Error("Failed to process document"));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    
    reader.readAsText(file);
  });
};
