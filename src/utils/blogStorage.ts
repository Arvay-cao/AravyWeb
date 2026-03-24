import type { BlogPost, BlogFormData } from '@/types/blog';

const STORAGE_KEY = 'portfolio_blog_posts';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getAllPosts = (): BlogPost[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const getPublishedPosts = (): BlogPost[] => {
  return getAllPosts()
    .filter((post) => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
};

export const getDraftPosts = (): BlogPost[] => {
  return getAllPosts()
    .filter((post) => post.status === 'draft')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};

export const getPostById = (id: string): BlogPost | null => {
  const posts = getAllPosts();
  return posts.find((post) => post.id === id) || null;
};

export const createPost = (data: BlogFormData, status: 'draft' | 'published'): BlogPost => {
  const now = new Date().toISOString();
  const newPost: BlogPost = {
    id: generateId(),
    ...data,
    status,
    createdAt: now,
    updatedAt: now,
    ...(status === 'published' && { publishedAt: now }),
  };

  const posts = getAllPosts();
  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return newPost;
};

export const updatePost = (id: string, data: Partial<BlogFormData>, status?: 'draft' | 'published'): BlogPost | null => {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) return null;

  const now = new Date().toISOString();
  const updatedPost: BlogPost = {
    ...posts[index],
    ...data,
    updatedAt: now,
  };

  if (status) {
    updatedPost.status = status;
    if (status === 'published' && !updatedPost.publishedAt) {
      updatedPost.publishedAt = now;
    }
  }

  posts[index] = updatedPost;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return updatedPost;
};

export const deletePost = (id: string): boolean => {
  const posts = getAllPosts();
  const filtered = posts.filter((post) => post.id !== id);
  
  if (filtered.length === posts.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

export const publishDraft = (id: string): BlogPost | null => {
  return updatePost(id, {}, 'published');
};
