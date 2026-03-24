export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}