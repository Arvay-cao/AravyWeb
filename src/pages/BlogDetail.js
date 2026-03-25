import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, Calendar, Tag, Edit, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MarkdownPreview from '@/components/MarkdownPreview';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from '@/components/ui/alert-dialog';
import { getPostById, deletePost } from '@/utils/blogStorage';
import useCustomCursor from '@/hooks/useCustomCursor';
export default function BlogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
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
            gsap.fromTo('.blog-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        }
    }, [post]);
    const handleDelete = () => {
        if (id && deletePost(id)) {
            navigate('/blog');
        }
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    const estimateReadTime = (content) => {
        const words = content.length / 2; // Approximate for Chinese
        const minutes = Math.ceil(words / 300);
        return Math.max(1, minutes);
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-[#050505] flex items-center justify-center", children: _jsx("div", { className: "text-[#8c8c91]", children: "\u52A0\u8F7D\u4E2D..." }) }));
    }
    if (!post) {
        return (_jsxs("div", { className: "min-h-screen bg-[#050505] text-[#f0f0f0] flex flex-col items-center justify-center", children: [_jsx("h1", { className: "text-4xl font-light mb-4", children: "\u6587\u7AE0\u672A\u627E\u5230" }), _jsx(Link, { to: "/blog", children: _jsxs(Button, { variant: "outline", className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "\u8FD4\u56DE\u535A\u5BA2"] }) })] }));
    }
    // If post is draft and not admin, show not found
    if (post.status === 'draft' && !isAdmin) {
        return (_jsxs("div", { className: "min-h-screen bg-[#050505] text-[#f0f0f0] flex flex-col items-center justify-center", children: [_jsx("h1", { className: "text-4xl font-light mb-4", children: "\u6587\u7AE0\u672A\u627E\u5230" }), _jsx(Link, { to: "/blog", children: _jsxs(Button, { variant: "outline", className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "\u8FD4\u56DE\u535A\u5BA2"] }) })] }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-[#050505] text-[#f0f0f0]", children: [_jsx("header", { className: "fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#8c8c91]/20", children: _jsxs("div", { className: "max-w-4xl mx-auto px-6 py-4 flex items-center justify-between", children: [_jsxs(Link, { to: "/", className: "text-xl font-light tracking-tight text-[#f0f0f0]", children: ["\u9648\u660E\u8FDC", _jsx("span", { className: "text-[#8c8c91]", children: "." })] }), _jsxs("nav", { className: "flex items-center gap-8", children: [_jsx(Link, { to: "/", className: "text-sm text-[#8c8c91] hover:text-[#f0f0f0] transition-colors", children: "\u9996\u9875" }), _jsx(Link, { to: "/#projects", className: "text-sm text-[#8c8c91] hover:text-[#f0f0f0] transition-colors", children: "\u9879\u76EE" }), _jsx(Link, { to: "/blog", className: "text-sm text-[#f0f0f0]", children: "\u535A\u5BA2" })] })] }) }), _jsx("article", { className: "blog-content pt-32 pb-20 px-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs(Link, { to: "/blog", className: "inline-flex items-center text-[#8c8c91] hover:text-[#f0f0f0] transition-colors mb-8", children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "\u8FD4\u56DE\u535A\u5BA2"] }), post.status === 'draft' && (_jsx("div", { className: "inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-sm rounded-full mb-6", children: "\u8349\u7A3F" })), _jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-light text-[#f0f0f0] mb-8 leading-tight", children: post.title }), _jsxs("div", { className: "flex flex-wrap items-center gap-6 mb-12 pb-8 border-b border-[#8c8c91]/20", children: [_jsxs("span", { className: "flex items-center text-[#8c8c91]", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), formatDate(post.publishedAt || post.createdAt)] }), _jsxs("span", { className: "flex items-center text-[#8c8c91]", children: [_jsx(Clock, { className: "w-4 h-4 mr-2" }), estimateReadTime(post.content), " \u5206\u949F\u9605\u8BFB"] }), post.tags.length > 0 && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Tag, { className: "w-4 h-4 text-[#8c8c91]" }), post.tags.map((tag) => (_jsx("span", { className: "px-2 py-1 bg-[#1a1a1a] text-[#8c8c91] text-sm rounded", children: tag }, tag)))] }))] }), post.coverImage && (_jsx("div", { className: "aspect-[21/9] rounded-lg overflow-hidden mb-12 bg-[#1a1a1a]", children: _jsx("img", { src: post.coverImage, alt: post.title, className: "w-full h-full object-cover", onLoad: () => {
                                    const coverImage = post.coverImage;
                                    const isBase64 = coverImage.startsWith('data:image');
                                    console.log('✅ 封面图片加载成功:', {
                                        title: post.title,
                                        type: isBase64 ? 'Base64' : 'URL',
                                        size: isBase64 ? `${coverImage.length} 字符` : 'N/A'
                                    });
                                }, onError: (e) => {
                                    const coverImage = post.coverImage;
                                    const isBase64 = coverImage.startsWith('data:image');
                                    console.error('❌ 封面图片加载失败:', {
                                        title: post.title,
                                        type: isBase64 ? 'Base64' : 'URL',
                                        size: isBase64 ? `${coverImage.length} 字符` : 'N/A',
                                        src: isBase64 ? 'Base64 (...)' : coverImage,
                                        error: e.nativeEvent
                                    });
                                    const imgElement = e.target;
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
                                } }) })), _jsx("div", { className: "prose prose-invert prose-lg max-w-none", children: _jsx(MarkdownPreview, { content: post.content }) }), isAdmin && (_jsxs("div", { className: "mt-16 pt-8 border-t border-[#8c8c91]/20 flex items-center justify-between", children: [_jsx(Link, { to: `/blog/edit?id=${post.id}`, children: _jsxs(Button, { variant: "outline", className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: [_jsx(Edit, { className: "w-4 h-4 mr-2" }), "\u7F16\u8F91\u6587\u7AE0"] }) }), _jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "border-red-500/50 text-red-400 hover:bg-red-500/20", children: [_jsx(Trash2, { className: "w-4 h-4 mr-2" }), "\u5220\u9664\u6587\u7AE0"] }) }), _jsxs(AlertDialogContent, { className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0]", children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "\u786E\u8BA4\u5220\u9664" }), _jsx(AlertDialogDescription, { className: "text-[#8c8c91]", children: "\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002\u6587\u7AE0\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002" })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { className: "bg-transparent border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: "\u53D6\u6D88" }), _jsx(AlertDialogAction, { onClick: handleDelete, className: "bg-red-500 text-white hover:bg-red-600", children: "\u5220\u9664" })] })] })] })] }))] }) }), _jsx("footer", { className: "bg-[#1a1a1a] py-12 px-6", children: _jsxs("div", { className: "max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6", children: [_jsxs("p", { className: "text-[#8c8c91] text-sm", children: ["\u00A9 ", new Date().getFullYear(), " \u9648\u660E\u8FDC. All rights reserved."] }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx(Link, { to: "/", className: "text-[#8c8c91] hover:text-[#f0f0f0] text-sm transition-colors", children: "\u9996\u9875" }), _jsx(Link, { to: "/#projects", className: "text-[#8c8c91] hover:text-[#f0f0f0] text-sm transition-colors", children: "\u9879\u76EE" }), _jsx(Link, { to: "/blog", className: "text-[#f0f0f0] text-sm", children: "\u535A\u5BA2" })] })] }) })] }));
}
