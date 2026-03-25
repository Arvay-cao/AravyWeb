import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Send, X, Plus, Image as ImageIcon, FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs';
import RichTextEditor from '@/components/RichTextEditor';
import MarkdownPreview from '@/components/MarkdownPreview';
import { createPost, updatePost, getPostById, getDraftPosts } from '@/utils/blogStorage';
export default function AdminBlogEdit() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const postId = searchParams.get('id');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [drafts, setDrafts] = useState([]);
    const [showDraftsDialog, setShowDraftsDialog] = useState(false);
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
    const fileInputRef = useRef(null);
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
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };
    const validateForm = () => {
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
    const getFormData = () => ({
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
        }
        else {
            createPost(formData, 'draft');
        }
        setIsDirty(false);
        alert('草稿已保存');
        loadDrafts();
    };
    const handlePublish = () => {
        if (!validateForm())
            return;
        const formData = getFormData();
        let post;
        if (postId) {
            post = updatePost(postId, formData, 'published');
        }
        else {
            post = createPost(formData, 'published');
        }
        if (post) {
            setIsDirty(false);
            navigate('/admin/blog');
        }
    };
    const handleLoadDraft = (draft) => {
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
    const handleFileUpload = (e) => {
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
                const result = event.target?.result;
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
        }
        else {
            navigate('/admin/blog');
        }
    };
    // Warn before leaving with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: handleBack, className: "text-[#8c8c91] hover:text-[#f0f0f0]", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }), _jsx("div", { children: _jsx("h1", { className: "text-2xl font-light text-[#f0f0f0]", children: postId ? '编辑文章' : '写文章' }) })] }), _jsxs("div", { className: "flex items-center gap-3", children: [!postId && (_jsxs(Button, { variant: "outline", onClick: () => setShowDraftsDialog(true), className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: [_jsx(FileText, { className: "w-4 h-4 mr-2" }), "\u8349\u7A3F\u7BB1"] })), _jsxs(Button, { variant: "outline", onClick: handleSaveDraft, className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), "\u4FDD\u5B58\u8349\u7A3F"] }), _jsxs(Button, { onClick: handlePublish, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Send, { className: "w-4 h-4 mr-2" }), "\u53D1\u5E03"] })] })] }), _jsxs(Tabs, { defaultValue: "edit", className: "w-full", children: [_jsxs(TabsList, { className: "bg-[#1a1a1a] border border-[#8c8c91]/10", children: [_jsx(TabsTrigger, { value: "edit", className: "data-[state=active]:bg-[#8c8c91]/20 data-[state=active]:text-[#f0f0f0]", children: "\u7F16\u8F91" }), _jsx(TabsTrigger, { value: "preview", className: "data-[state=active]:bg-[#8c8c91]/20 data-[state=active]:text-[#f0f0f0]", children: "\u9884\u89C8" })] }), _jsxs(TabsContent, { value: "edit", className: "space-y-6 mt-6", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-[#8c8c91] mb-2 block", children: "\u6587\u7AE0\u6807\u9898" }), _jsx(Input, { placeholder: "\u8F93\u5165\u6587\u7AE0\u6807\u9898...", value: title, onChange: (e) => setTitle(e.target.value), className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 text-xl h-14 focus:border-[#8c8c91]" })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-[#8c8c91] mb-2 block", children: "\u5C01\u9762\u56FE\u7247" }), coverImage ? (_jsxs("div", { className: "relative group aspect-[21/9] rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#8c8c91]/10", children: [_jsx("img", { src: coverImage, alt: "Cover", className: "w-full h-full object-cover" }), _jsxs("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4", children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleFileUpload, className: "hidden" }), _jsx(Button, { onClick: triggerFileInput, variant: "ghost", size: "icon", className: "rounded-full bg-transparent text-[#f0f0f0] hover:bg-[#f0f0f0] hover:text-[#050505] w-12 h-12", children: _jsx(Upload, { className: "w-5 h-5" }) }), _jsx(Button, { onClick: handleRemoveImage, variant: "ghost", size: "icon", className: "rounded-full bg-transparent text-red-400 hover:bg-red-500 hover:text-white w-12 h-12", children: _jsx(X, { className: "w-5 h-5" }) })] })] })) : (_jsxs("div", { className: "flex gap-3", children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleFileUpload, className: "hidden" }), _jsx(Button, { onClick: triggerFileInput, variant: "outline", className: "flex-1 border-[#8c8c91]/30 bg-[#1a1a1a] text-[#f0f0f0] hover:border-[#8c8c91] hover:text-[#f0f0f0] h-32", children: _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Upload, { className: "w-6 h-6" }), _jsx("span", { children: "\u4E0A\u4F20\u56FE\u7247" })] }) }), _jsx(Button, { onClick: () => setShowImageDialog(true), variant: "outline", className: "flex-1 border-[#8c8c91]/30 bg-[#1a1a1a] text-[#f0f0f0] hover:border-[#8c8c91] hover:text-[#f0f0f0] h-32", children: _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(ImageIcon, { className: "w-6 h-6" }), _jsx("span", { children: "\u8F93\u5165\u94FE\u63A5" })] }) })] }))] }), _jsxs("div", { children: [_jsx(Label, { className: "text-[#8c8c91] mb-2 block", children: "\u6587\u7AE0\u6458\u8981" }), _jsx(Textarea, { placeholder: "\u8F93\u5165\u6587\u7AE0\u6458\u8981\uFF0C\u8FD9\u5C06\u663E\u793A\u5728\u6587\u7AE0\u5217\u8868\u4E2D...", value: excerpt, onChange: (e) => setExcerpt(e.target.value), className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 min-h-[80px] focus:border-[#8c8c91] resize-none" })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-[#8c8c91] mb-2 block", children: "\u6807\u7B7E" }), _jsx("div", { className: "flex flex-wrap items-center gap-2 mb-2", children: tags.map((tag) => (_jsxs(Badge, { variant: "secondary", className: "bg-[#050505] text-[#f0f0f0] hover:bg-[#8c8c91]/30 flex items-center gap-1", children: [tag, _jsx("button", { onClick: () => handleRemoveTag(tag), className: "ml-1 hover:text-red-400", children: _jsx(X, { className: "w-3 h-3" }) })] }, tag))) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "\u6DFB\u52A0\u6807\u7B7E\uFF0C\u6309\u56DE\u8F66\u786E\u8BA4", value: tagInput, onChange: (e) => setTagInput(e.target.value), onKeyDown: handleKeyDown, className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]" }), _jsx(Button, { variant: "outline", onClick: handleAddTag, className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: _jsx(Plus, { className: "w-4 h-4" }) })] })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-[#8c8c91] mb-2 block", children: "\u6587\u7AE0\u5185\u5BB9" }), _jsx(RichTextEditor, { value: content, onChange: setContent, placeholder: "\u4F7F\u7528 Markdown \u8BED\u6CD5\u5199\u4F5C\uFF0C\u652F\u6301\u52A0\u7C97\u3001\u659C\u4F53\u3001\u6807\u9898\u3001\u4EE3\u7801\u5757\u3001\u56FE\u7247\u7B49..." })] })] }), _jsx(TabsContent, { value: "preview", className: "mt-6", children: _jsxs("div", { className: "bg-[#1a1a1a] rounded-lg p-8 border border-[#8c8c91]/10 min-h-[600px]", children: [_jsx("h1", { className: "text-4xl font-light text-[#f0f0f0] mb-6", children: title || '无标题' }), coverImage && (_jsx("div", { className: "aspect-[21/9] rounded-lg overflow-hidden mb-8", children: _jsx("img", { src: coverImage, alt: "Cover", className: "w-full h-full object-cover" }) })), tags.length > 0 && (_jsx("div", { className: "flex gap-2 mb-6", children: tags.map((tag) => (_jsx(Badge, { variant: "secondary", className: "bg-[#050505] text-[#8c8c91]", children: tag }, tag))) })), _jsx(MarkdownPreview, { content: content || '暂无内容' })] }) })] }), _jsx(Dialog, { open: showDraftsDialog, onOpenChange: setShowDraftsDialog, children: _jsxs(DialogContent, { className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] max-w-2xl max-h-[80vh] overflow-y-auto", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "\u8349\u7A3F\u7BB1" }), _jsx(DialogDescription, { className: "text-[#8c8c91]", children: "\u9009\u62E9\u8349\u7A3F\u7EE7\u7EED\u7F16\u8F91" })] }), _jsx("div", { className: "space-y-4 mt-4", children: drafts.length === 0 ? (_jsx("p", { className: "text-[#8c8c91] text-center py-8", children: "\u6682\u65E0\u8349\u7A3F" })) : (drafts.map((draft) => (_jsxs("div", { onClick: () => handleLoadDraft(draft), className: "p-4 bg-[#050505] rounded-lg cursor-pointer hover:bg-[#050505]/80 transition-colors border border-[#8c8c91]/10", children: [_jsx("h3", { className: "text-[#f0f0f0] font-medium mb-1", children: draft.title }), _jsx("p", { className: "text-[#8c8c91] text-sm line-clamp-2 mb-2", children: draft.excerpt }), _jsxs("p", { className: "text-[#8c8c91] text-xs", children: ["\u6700\u540E\u7F16\u8F91: ", new Date(draft.updatedAt).toLocaleString('zh-CN')] })] }, draft.id)))) })] }) }), _jsx(Dialog, { open: showImageDialog, onOpenChange: setShowImageDialog, children: _jsxs(DialogContent, { className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "\u6DFB\u52A0\u5C01\u9762\u56FE\u7247" }), _jsx(DialogDescription, { className: "text-[#8c8c91]", children: "\u8F93\u5165\u56FE\u7247 URL \u5730\u5740" })] }), _jsx(Input, { placeholder: "https://example.com/image.jpg", value: imageUrl, onChange: (e) => setImageUrl(e.target.value), onKeyDown: (e) => {
                                if (e.key === 'Enter') {
                                    handleAddImage();
                                }
                            }, className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]" }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setShowImageDialog(false), className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: "\u53D6\u6D88" }), _jsx(Button, { onClick: handleAddImage, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: "\u6DFB\u52A0" })] })] }) }), _jsx(Dialog, { open: showUnsavedDialog, onOpenChange: setShowUnsavedDialog, children: _jsxs(DialogContent, { className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "\u672A\u4FDD\u5B58\u7684\u66F4\u6539" }), _jsx(DialogDescription, { className: "text-[#8c8c91]", children: "\u60A8\u6709\u672A\u4FDD\u5B58\u7684\u66F4\u6539\uFF0C\u786E\u5B9A\u8981\u79BB\u5F00\u5417\uFF1F" })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setShowUnsavedDialog(false), className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: "\u7EE7\u7EED\u7F16\u8F91" }), _jsx(Button, { onClick: () => {
                                        setShowUnsavedDialog(false);
                                        navigate('/admin/blog');
                                    }, className: "bg-red-500 text-white hover:bg-red-600", children: "\u653E\u5F03\u66F4\u6539" })] })] }) })] }));
}
