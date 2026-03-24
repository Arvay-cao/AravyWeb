import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Calendar, 
  Tag,
  Search,
  FileText,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { getPublishedPosts, getDraftPosts, deletePost } from '@/utils/blogStorage';
import type { BlogPost } from '@/types/blog';

export default function AdminBlog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [publishedPosts, setPublishedPosts] = useState<BlogPost[]>([]);
  const [draftPosts, setDraftPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const defaultTab = searchParams.get('tab') === 'drafts' ? 'drafts' : 'published';

  const loadPosts = () => {
    setPublishedPosts(getPublishedPosts());
    setDraftPosts(getDraftPosts());
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = (id: string) => {
    if (deletePost(id)) {
      loadPosts();
      setDeleteId(null);
    }
  };

  const filterPosts = (posts: BlogPost[]) => {
    if (!searchQuery) return posts;
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const PostCard = ({ post }: { post: BlogPost }) => (
    <div className="bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10 p-4 hover:border-[#8c8c91]/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-[#f0f0f0] font-medium truncate">{post.title}</h3>
          <p className="text-[#8c8c91] text-sm mt-1 line-clamp-2">{post.excerpt}</p>
          
          <div className="flex items-center gap-4 mt-3 text-xs text-[#8c8c91]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt || post.updatedAt)}
            </span>
            {post.tags.length > 0 && (
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {post.tags.slice(0, 3).join(', ')}
                {post.tags.length > 3 && ` +${post.tags.length - 3}`}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Link to={`/blog/${post.id}`} target="_blank">
            <Button variant="ghost" size="sm" className="text-[#8c8c91] hover:text-[#f0f0f0]">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Link to={`/admin/blog/edit?id=${post.id}`}>
            <Button variant="ghost" size="sm" className="text-[#8c8c91] hover:text-[#f0f0f0]">
              <Edit2 className="w-4 h-4" />
            </Button>
          </Link>
          <AlertDialog open={deleteId === post.id} onOpenChange={(open) => !open && setDeleteId(null)}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                onClick={() => setDeleteId(post.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0]">
              <AlertDialogHeader>
                <AlertDialogTitle>确认删除</AlertDialogTitle>
                <AlertDialogDescription className="text-[#8c8c91]">
                  确定要删除文章「{post.title}」吗？此操作无法撤销。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20">
                  取消
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  删除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-[#f0f0f0]">博客管理</h1>
          <p className="text-[#8c8c91] mt-1">管理您的文章和草稿</p>
        </div>
        <Link to="/admin/blog/edit">
          <Button className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]">
            <Plus className="w-4 h-4 mr-2" />
            写文章
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8c91]" />
        <Input
          placeholder="搜索文章标题或标签..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="bg-[#1a1a1a] border border-[#8c8c91]/10">
          <TabsTrigger 
            value="published" 
            className="data-[state=active]:bg-[#8c8c91]/20 data-[state=active]:text-[#f0f0f0]"
            onClick={() => setSearchParams({})}
          >
            已发布 ({publishedPosts.length})
          </TabsTrigger>
          <TabsTrigger 
            value="drafts"
            className="data-[state=active]:bg-[#8c8c91]/20 data-[state=active]:text-[#f0f0f0]"
            onClick={() => setSearchParams({ tab: 'drafts' })}
          >
            草稿箱 ({draftPosts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="mt-6">
          {filterPosts(publishedPosts).length === 0 ? (
            <div className="text-center py-12 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10">
              <FileText className="w-12 h-12 text-[#8c8c91]/30 mx-auto mb-4" />
              <p className="text-[#8c8c91]">
                {searchQuery ? '没有找到匹配的文章' : '暂无发布的文章'}
              </p>
              {!searchQuery && (
                <Link to="/admin/blog/edit">
                  <Button className="mt-4 bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]">
                    写第一篇文章
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filterPosts(publishedPosts).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
          {filterPosts(draftPosts).length === 0 ? (
            <div className="text-center py-12 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10">
              <Save className="w-12 h-12 text-[#8c8c91]/30 mx-auto mb-4" />
              <p className="text-[#8c8c91]">
                {searchQuery ? '没有找到匹配的草稿' : '暂无草稿'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filterPosts(draftPosts).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
