import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Tag, ArrowRight, Edit, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPublishedPosts } from '@/utils/blogStorage';
import type { BlogPost } from '@/types/blog';
import useCustomCursor from '@/hooks/useCustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Initialize custom cursor
  useCustomCursor();

  useEffect(() => {
    // Check if user is admin (simple check for demo)
    const adminMode = sessionStorage.getItem('admin_mode') === 'true';
    setIsAdmin(adminMode);
    
    const publishedPosts = getPublishedPosts();
    setPosts(publishedPosts);
  }, []);

  useEffect(() => {
    // Scroll animations
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [posts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#8c8c91]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-light tracking-tight text-[#f0f0f0]">
            陈明远<span className="text-[#8c8c91]">.</span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link to="/" className="text-sm text-[#8c8c91] hover:text-[#f0f0f0] transition-colors">
              首页
            </Link>
            <Link to="/#projects" className="text-sm text-[#8c8c91] hover:text-[#f0f0f0] transition-colors">
              项目
            </Link>
            <Link to="/blog" className="text-sm text-[#f0f0f0]">
              博客
            </Link>
            {isAdmin && (
              <Link to="/blog/edit">
                <Button size="sm" className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]">
                  <Plus className="w-4 h-4 mr-1" />
                  写文章
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[#8c8c91] text-sm tracking-widest uppercase mb-4">Blog</p>
              <h1 className="text-5xl md:text-7xl font-light text-[#f0f0f0] tracking-tight">
                技术博客
              </h1>
            </div>
            <p className="text-[#8c8c91] text-lg max-w-md text-right hidden md:block">
              分享前端开发经验、技术心得与项目实践
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-[#8c8c91] text-xl">暂无文章</p>
              {isAdmin && (
                <Link to="/blog/edit" className="mt-6 inline-block">
                  <Button className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]">
                    <Plus className="w-4 h-4 mr-2" />
                    写第一篇文章
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="blog-card group bg-[#1a1a1a] rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-500"
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="aspect-[16/10] overflow-hidden bg-[#8c8c91]/10">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          onLoad={() => {
                            const coverImage = post.coverImage!;
                            const isBase64 = coverImage.startsWith('data:image');
                            console.log('✅ 列表封面加载成功:', {
                              title: post.title,
                              type: isBase64 ? 'Base64' : 'URL',
                              size: isBase64 ? `${coverImage.length} 字符` : 'N/A'
                            });
                          }}
                          onError={(e) => {
                            const coverImage = post.coverImage!;
                            const isBase64 = coverImage.startsWith('data:image');
                            console.error('❌ 列表封面加载失败:', {
                              title: post.title,
                              type: isBase64 ? 'Base64' : 'URL',
                              src: isBase64 ? 'Base64 (...)' : coverImage
                            });
                            
                            const imgElement = e.target as HTMLImageElement;
                            imgElement.style.display = 'none';
                            const placeholder = document.createElement('div');
                            placeholder.className = 'w-full h-full flex items-center justify-center text-red-400 text-sm';
                            placeholder.textContent = '图片加载失败';
                            imgElement.parentElement?.appendChild(placeholder);
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[#8c8c91] text-4xl font-light">{post.title[0]}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="flex items-center text-[#8c8c91] text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                      {post.tags.length > 0 && (
                        <span className="flex items-center text-[#8c8c91] text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {post.tags[0]}
                        </span>
                      )}
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <h2 className="text-xl font-medium text-[#f0f0f0] mb-3 group-hover:text-[#8c8c91] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-[#8c8c91] text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center text-sm text-[#f0f0f0] hover:text-[#8c8c91] transition-colors"
                      >
                        阅读更多
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      {isAdmin && (
                        <Link to={`/blog/edit?id=${post.id}`}>
                          <Button variant="ghost" size="sm" className="text-[#8c8c91] hover:text-[#f0f0f0]">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#8c8c91] text-sm">
            &copy; {new Date().getFullYear()} 陈明远. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-[#8c8c91] hover:text-[#f0f0f0] text-sm transition-colors">
              首页
            </Link>
            <Link to="/#projects" className="text-[#8c8c91] hover:text-[#f0f0f0] text-sm transition-colors">
              项目
            </Link>
            <Link to="/blog" className="text-[#f0f0f0] text-sm">
              博客
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
