import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, Calendar, Tag, Edit, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MarkdownPreview from '@/components/MarkdownPreview';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { getPostById, deletePost } from '@/utils/blogStorage';
import type { BlogPost } from '@/types/blog';
import useCustomCursor from '@/hooks/useCustomCursor';

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize custom cursor
  useCustomCursor();

  useEffect(() => {
    const adminMode = sessionStorage.getItem('admin_mode') === 'true';
    setIsAdmin(adminMode);

    if (id) {
      const foundPost = getPostById(id);
      if (foundPost) {
        setPost(foundPost);
      }
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (post) {
      gsap.fromTo(
        '.blog-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [post]);

  const handleDelete = () => {
    if (id && deletePost(id)) {
      navigate('/blog');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const estimateReadTime = (content: string) => {
    const words = content.length / 2; // Approximate for Chinese
    const minutes = Math.ceil(words / 300);
    return Math.max(1, minutes);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-[#8c8c91]">加载中...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f0f0f0] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-light mb-4">文章未找到</h1>
        <Link to="/blog">
          <Button variant="outline" className="border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回博客
          </Button>
        </Link>
      </div>
    );
  }

  // If post is draft and not admin, show not found
  if (post.status === 'draft' && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f0f0f0] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-light mb-4">文章未找到</h1>
        <Link to="/blog">
          <Button variant="outline" className="border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回博客
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#8c8c91]/20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
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
          </nav>
        </div>
      </header>

      {/* Article */}
      <article className="blog-content pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center text-[#8c8c91] hover:text-[#f0f0f0] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回博客
          </Link>

          {/* Draft Badge */}
          {post.status === 'draft' && (
            <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-sm rounded-full mb-6">
              草稿
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#f0f0f0] mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-12 pb-8 border-b border-[#8c8c91]/20">
            <span className="flex items-center text-[#8c8c91]">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
            <span className="flex items-center text-[#8c8c91]">
              <Clock className="w-4 h-4 mr-2" />
              {estimateReadTime(post.content)} 分钟阅读
            </span>
            {post.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#8c8c91]" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[#1a1a1a] text-[#8c8c91] text-sm rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="aspect-[21/9] rounded-lg overflow-hidden mb-12 bg-[#1a1a1a]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
                onLoad={() => {
                  const coverImage = post.coverImage!;
                  const isBase64 = coverImage.startsWith('data:image');
                  console.log('✅ 封面图片加载成功:', {
                    title: post.title,
                    type: isBase64 ? 'Base64' : 'URL',
                    size: isBase64 ? `${coverImage.length} 字符` : 'N/A'
                  });
                }}
                onError={(e) => {
                  const coverImage = post.coverImage!;
                  const isBase64 = coverImage.startsWith('data:image');
                  console.error('❌ 封面图片加载失败:', {
                    title: post.title,
                    type: isBase64 ? 'Base64' : 'URL',
                    size: isBase64 ? `${coverImage.length} 字符` : 'N/A',
                    src: isBase64 ? 'Base64 (...)' : coverImage,
                    error: e.nativeEvent
                  });
                  
                  const imgElement = e.target as HTMLImageElement;
                  const parent = imgElement.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex items-center justify-center h-full text-red-400">
                        <div class="text-center">
                          <p class="text-lg mb-2">封面图片加载失败</p>
                          <p class="text-sm opacity-70">图片类型：${isBase64 ? 'Base64' : '外部链接'}</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <MarkdownPreview content={post.content} />
          </div>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="mt-16 pt-8 border-t border-[#8c8c91]/20 flex items-center justify-between">
              <Link to={`/blog/edit?id=${post.id}`}>
                <Button variant="outline" className="border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20">
                  <Edit className="w-4 h-4 mr-2" />
                  编辑文章
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/20">
                    <Trash2 className="w-4 h-4 mr-2" />
                    删除文章
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>确认删除</AlertDialogTitle>
                    <AlertDialogDescription className="text-[#8c8c91]">
                      此操作无法撤销。文章将被永久删除。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20">
                      取消
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      删除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
