import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Send, X, Plus, Image as ImageIcon, FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import RichTextEditor from '@/components/RichTextEditor';
import MarkdownPreview from '@/components/MarkdownPreview';
import { createPost, updatePost, getPostById, getDraftPosts } from '@/utils/blogStorage';
import type { BlogPost, BlogFormData } from '@/types/blog';

export default function AdminBlogEdit() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const postId = searchParams.get('id');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [drafts, setDrafts] = useState<BlogPost[]>([]);
  const [showDraftsDialog, setShowDraftsDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load post if editing
  useEffect(() => {
    if (postId) {
      const post = getPostById(postId);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setCoverImage(post.coverImage || '');
        setTags(post.tags);
      }
    }
  }, [postId]);

  // Load drafts
  const loadDrafts = useCallback(() => {
    const draftPosts = getDraftPosts();
    setDrafts(draftPosts);
  }, []);

  useEffect(() => {
    loadDrafts();
  }, [loadDrafts]);

  // Track changes
  useEffect(() => {
    if (title || content || excerpt) {
      setIsDirty(true);
    }
  }, [title, content, excerpt, tags, coverImage]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = (): boolean => {
    if (!title.trim()) {
      alert('请输入文章标题');
      return false;
    }
    if (!content.trim()) {
      alert('请输入文章内容');
      return false;
    }
    if (!excerpt.trim()) {
      alert('请输入文章摘要');
      return false;
    }
    return true;
  };

  const getFormData = (): BlogFormData => ({
    title: title.trim(),
    content: content.trim(),
    excerpt: excerpt.trim(),
    coverImage: coverImage || undefined,
    tags,
  });

  const handleSaveDraft = () => {
    if (!title.trim()) {
      alert('请输入文章标题');
      return;
    }

    const formData = getFormData();

    if (postId) {
      updatePost(postId, formData, 'draft');
    } else {
      createPost(formData, 'draft');
    }

    setIsDirty(false);
    alert('草稿已保存');
    loadDrafts();
  };

  const handlePublish = () => {
    if (!validateForm()) return;

    const formData = getFormData();
    let post: BlogPost | null;

    if (postId) {
      post = updatePost(postId, formData, 'published');
    } else {
      post = createPost(formData, 'published');
    }

    if (post) {
      setIsDirty(false);
      navigate('/admin/blog');
    }
  };

  const handleLoadDraft = (draft: BlogPost) => {
    setTitle(draft.title);
    setContent(draft.content);
    setExcerpt(draft.excerpt);
    setCoverImage(draft.coverImage || '');
    setTags(draft.tags);
    setShowDraftsDialog(false);
    navigate(`/admin/blog/edit?id=${draft.id}`);
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setCoverImage(imageUrl.trim());
      setImageUrl('');
      setShowImageDialog(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        alert('请上传图片文件');
        return;
      }

      // 验证文件大小（限制 5MB）
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过 5MB');
        return;
      }

      // 使用 FileReader 将文件转换为 Base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCoverImage(result);
        setShowImageDialog(false);
      };
      reader.onerror = () => {
        alert('文件读取失败，请重试');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setCoverImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleBack = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
    } else {
      navigate('/admin/blog');
    }
  };

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-[#8c8c91] hover:text-[#f0f0f0]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-light text-[#f0f0f0]">
              {postId ? '编辑文章' : '写文章'}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!postId && (
            <Button
              variant="outline"
              onClick={() => setShowDraftsDialog(true)}
              className="border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20"
            >
              <FileText className="w-4 h-4 mr-2" />
              草稿箱
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          >
            <Save className="w-4 h-4 mr-2" />
            保存草稿
          </Button>
          <Button
            onClick={handlePublish}
            className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]"
          >
            <Send className="w-4 h-4 mr-2" />
            发布
          </Button>
        </div>
      </div>

      {/* Editor */}
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="bg-[#1a1a1a] border border-[#8c8c91]/10">
          <TabsTrigger 
            value="edit" 
            className="data-[state=active]:bg-[#8c8c91]/20 data-[state=active]:text-[#f0f0f0]"
          >
            编辑
          </TabsTrigger>
          <TabsTrigger 
            value="preview"
            className="data-[state=active]:bg-[#8c8c91]/20 data-[state=active]:text-[#f0f0f0]"
          >
            预览
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6 mt-6">
          {/* Title */}
          <div>
            <Label className="text-[#8c8c91] mb-2 block">文章标题</Label>
            <Input
              placeholder="输入文章标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 text-xl h-14 focus:border-[#8c8c91]"
            />
          </div>

          {/* Cover Image */}
          <div>
            <Label className="text-[#8c8c91] mb-2 block">封面图片</Label>
            {coverImage ? (
              <div className="relative group aspect-[21/9] rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#8c8c91]/10">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={triggerFileInput}
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-transparent text-[#f0f0f0] hover:bg-[#f0f0f0] hover:text-[#050505] w-12 h-12"
                  >
                    <Upload className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={handleRemoveImage}
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-transparent text-red-400 hover:bg-red-500 hover:text-white w-12 h-12"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  onClick={triggerFileInput}
                  variant="outline"
                  className="flex-1 border-[#8c8c91]/30 bg-[#1a1a1a] text-[#f0f0f0] hover:border-[#8c8c91] hover:text-[#f0f0f0] h-32"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6" />
                    <span>上传图片</span>
                  </div>
                </Button>
                <Button
                  onClick={() => setShowImageDialog(true)}
                  variant="outline"
                  className="flex-1 border-[#8c8c91]/30 bg-[#1a1a1a] text-[#f0f0f0] hover:border-[#8c8c91] hover:text-[#f0f0f0] h-32"
                >
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="w-6 h-6" />
                    <span>输入链接</span>
                  </div>
                </Button>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <Label className="text-[#8c8c91] mb-2 block">文章摘要</Label>
            <Textarea
              placeholder="输入文章摘要，这将显示在文章列表中..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 min-h-[80px] focus:border-[#8c8c91] resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <Label className="text-[#8c8c91] mb-2 block">标签</Label>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-[#050505] text-[#f0f0f0] hover:bg-[#8c8c91]/30 flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="添加标签，按回车确认"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]"
              />
              <Button
                variant="outline"
                onClick={handleAddTag}
                className="border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div>
            <Label className="text-[#8c8c91] mb-2 block">文章内容</Label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="使用 Markdown 语法写作，支持加粗、斜体、标题、代码块、图片等..."
            />
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <div className="bg-[#1a1a1a] rounded-lg p-8 border border-[#8c8c91]/10 min-h-[600px]">
            <h1 className="text-4xl font-light text-[#f0f0f0] mb-6">
              {title || '无标题'}
            </h1>
            {coverImage && (
              <div className="aspect-[21/9] rounded-lg overflow-hidden mb-8">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {tags.length > 0 && (
              <div className="flex gap-2 mb-6">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-[#050505] text-[#8c8c91]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <MarkdownPreview content={content || '暂无内容'} />
          </div>
        </TabsContent>
      </Tabs>

      {/* Drafts Dialog */}
      <Dialog open={showDraftsDialog} onOpenChange={setShowDraftsDialog}>
        <DialogContent className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>草稿箱</DialogTitle>
            <DialogDescription className="text-[#8c8c91]">
              选择草稿继续编辑
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {drafts.length === 0 ? (
              <p className="text-[#8c8c91] text-center py-8">暂无草稿</p>
            ) : (
              drafts.map((draft) => (
                <div
                  key={draft.id}
                  onClick={() => handleLoadDraft(draft)}
                  className="p-4 bg-[#050505] rounded-lg cursor-pointer hover:bg-[#050505]/80 transition-colors border border-[#8c8c91]/10"
                >
                  <h3 className="text-[#f0f0f0] font-medium mb-1">{draft.title}</h3>
                  <p className="text-[#8c8c91] text-sm line-clamp-2 mb-2">
                    {draft.excerpt}
                  </p>
                  <p className="text-[#8c8c91] text-xs">
                    最后编辑: {new Date(draft.updatedAt).toLocaleString('zh-CN')}
                  </p>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Image URL Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0]">
          <DialogHeader>
            <DialogTitle>添加封面图片</DialogTitle>
            <DialogDescription className="text-[#8c8c91]">
              输入图片 URL 地址
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddImage();
              }
            }}
            className="bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowImageDialog(false)}
              className="border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20"
            >
              取消
            </Button>
            <Button
              onClick={handleAddImage}
              className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]"
            >
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unsaved Changes Dialog */}
      <Dialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <DialogContent className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0]">
          <DialogHeader>
            <DialogTitle>未保存的更改</DialogTitle>
            <DialogDescription className="text-[#8c8c91]">
              您有未保存的更改，确定要离开吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUnsavedDialog(false)}
              className="border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20"
            >
              继续编辑
            </Button>
            <Button
              onClick={() => {
                setShowUnsavedDialog(false);
                navigate('/admin/blog');
              }}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              放弃更改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
