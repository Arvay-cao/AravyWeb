import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, Calendar, Tag, Search, FileText, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from '@/components/ui/alert-dialog';
import { getPublishedPosts, getDraftPosts, deletePost } from '@/utils/blogStorage';
export default function AdminBlog() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [publishedPosts, setPublishedPosts] = useState([]);
    const [draftPosts, setDraftPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteId, setDeleteId] = useState(null);
    const defaultTab = searchParams.get('tab') === 'drafts' ? 'drafts' : 'published';
    const loadPosts = () => {
        setPublishedPosts(getPublishedPosts());
        setDraftPosts(getDraftPosts());
    };
    useEffect(() => {
        loadPosts();
    }, []);
    const handleDelete = (id) => {
        if (deletePost(id)) {
            loadPosts();
            setDeleteId(null);
        }
    };
    const filterPosts = (posts) => {
        if (!searchQuery)
            return posts;
        return posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
    const PostCard = ({ post }) => (_jsx("div", { className: "bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10 p-4 hover:border-[#8c8c91]/30 transition-colors", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "text-[#f0f0f0] font-medium truncate", children: post.title }), _jsx("p", { className: "text-[#8c8c91] text-sm mt-1 line-clamp-2", children: post.excerpt }), _jsxs("div", { className: "flex items-center gap-4 mt-3 text-xs text-[#8c8c91]", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Calendar, { className: "w-3 h-3" }), formatDate(post.publishedAt || post.updatedAt)] }), post.tags.length > 0 && (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Tag, { className: "w-3 h-3" }), post.tags.slice(0, 3).join(', '), post.tags.length > 3 && ` +${post.tags.length - 3}`] }))] })] }), _jsxs("div", { className: "flex items-center gap-2 ml-4", children: [_jsx(Link, { to: `/blog/${post.id}`, target: "_blank", children: _jsx(Button, { variant: "ghost", size: "sm", className: "text-[#8c8c91] hover:text-[#f0f0f0]", children: _jsx(Eye, { className: "w-4 h-4" }) }) }), _jsx(Link, { to: `/admin/blog/edit?id=${post.id}`, children: _jsx(Button, { variant: "ghost", size: "sm", className: "text-[#8c8c91] hover:text-[#f0f0f0]", children: _jsx(Edit2, { className: "w-4 h-4" }) }) }), _jsxs(AlertDialog, { open: deleteId === post.id, onOpenChange: (open) => !open && setDeleteId(null), children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "sm", className: "text-red-400 hover:text-red-300 hover:bg-red-500/10", onClick: () => setDeleteId(post.id), children: _jsx(Trash2, { className: "w-4 h-4" }) }) }), _jsxs(AlertDialogContent, { className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0]", children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "\u786E\u8BA4\u5220\u9664" }), _jsxs(AlertDialogDescription, { className: "text-[#8c8c91]", children: ["\u786E\u5B9A\u8981\u5220\u9664\u6587\u7AE0\u300C", post.title, "\u300D\u5417\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002"] })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { className: "bg-transparent border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: "\u53D6\u6D88" }), _jsx(AlertDialogAction, { onClick: () => handleDelete(post.id), className: "bg-red-500 text-white hover:bg-red-600", children: "\u5220\u9664" })] })] })] })] })] }) }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-light text-[#f0f0f0]", children: "\u535A\u5BA2\u7BA1\u7406" }), _jsx("p", { className: "text-[#8c8c91] mt-1", children: "\u7BA1\u7406\u60A8\u7684\u6587\u7AE0\u548C\u8349\u7A3F" })] }), _jsx(Link, { to: "/admin/blog/edit", children: _jsxs(Button, { className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "\u5199\u6587\u7AE0"] }) })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8c91]" }), _jsx(Input, { placeholder: "\u641C\u7D22\u6587\u7AE0\u6807\u9898\u6216\u6807\u7B7E...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50" })] }), _jsxs(Tabs, { defaultValue: defaultTab, className: "w-full", children: [_jsxs(TabsList, { className: "bg-[#1a1a1a] border border-[#8c8c91]/10", children: [_jsxs(TabsTrigger, { value: "published", className: "data-[state=active]:bg-[#8c8c91]/20 data-[state=active]:text-[#f0f0f0]", onClick: () => setSearchParams({}), children: ["\u5DF2\u53D1\u5E03 (", publishedPosts.length, ")"] }), _jsxs(TabsTrigger, { value: "drafts", className: "data-[state=active]:bg-[#8c8c91]/20 data-[state=active]:text-[#f0f0f0]", onClick: () => setSearchParams({ tab: 'drafts' }), children: ["\u8349\u7A3F\u7BB1 (", draftPosts.length, ")"] })] }), _jsx(TabsContent, { value: "published", className: "mt-6", children: filterPosts(publishedPosts).length === 0 ? (_jsxs("div", { className: "text-center py-12 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10", children: [_jsx(FileText, { className: "w-12 h-12 text-[#8c8c91]/30 mx-auto mb-4" }), _jsx("p", { className: "text-[#8c8c91]", children: searchQuery ? '没有找到匹配的文章' : '暂无发布的文章' }), !searchQuery && (_jsx(Link, { to: "/admin/blog/edit", children: _jsx(Button, { className: "mt-4 bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: "\u5199\u7B2C\u4E00\u7BC7\u6587\u7AE0" }) }))] })) : (_jsx("div", { className: "space-y-4", children: filterPosts(publishedPosts).map((post) => (_jsx(PostCard, { post: post }, post.id))) })) }), _jsx(TabsContent, { value: "drafts", className: "mt-6", children: filterPosts(draftPosts).length === 0 ? (_jsxs("div", { className: "text-center py-12 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10", children: [_jsx(Save, { className: "w-12 h-12 text-[#8c8c91]/30 mx-auto mb-4" }), _jsx("p", { className: "text-[#8c8c91]", children: searchQuery ? '没有找到匹配的草稿' : '暂无草稿' })] })) : (_jsx("div", { className: "space-y-4", children: filterPosts(draftPosts).map((post) => (_jsx(PostCard, { post: post }, post.id))) })) })] })] }));
}
