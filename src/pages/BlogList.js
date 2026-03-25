import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Tag, ArrowRight, Edit, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPublishedPosts } from '@/utils/blogStorage';
import useCustomCursor from '@/hooks/useCustomCursor';
gsap.registerPlugin(ScrollTrigger);
export default function BlogList() {
    const [posts, setPosts] = useState([]);
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
            gsap.fromTo(card, { opacity: 0, y: 60 }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                },
            });
        });
        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [posts]);
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    return (_jsxs("div", { className: "min-h-screen bg-[#050505] text-[#f0f0f0]", children: [_jsx("header", { className: "fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#8c8c91]/20", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between", children: [_jsxs(Link, { to: "/", className: "text-xl font-light tracking-tight text-[#f0f0f0]", children: ["\u9648\u660E\u8FDC", _jsx("span", { className: "text-[#8c8c91]", children: "." })] }), _jsxs("nav", { className: "flex items-center gap-8", children: [_jsx(Link, { to: "/", className: "text-sm text-[#8c8c91] hover:text-[#f0f0f0] transition-colors", children: "\u9996\u9875" }), _jsx(Link, { to: "/#projects", className: "text-sm text-[#8c8c91] hover:text-[#f0f0f0] transition-colors", children: "\u9879\u76EE" }), _jsx(Link, { to: "/blog", className: "text-sm text-[#f0f0f0]", children: "\u535A\u5BA2" }), isAdmin && (_jsx(Link, { to: "/blog/edit", children: _jsxs(Button, { size: "sm", className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Plus, { className: "w-4 h-4 mr-1" }), "\u5199\u6587\u7AE0"] }) }))] })] }) }), _jsx("section", { className: "pt-32 pb-20 px-6", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsxs("div", { className: "flex items-end justify-between mb-16", children: [_jsxs("div", { children: [_jsx("p", { className: "text-[#8c8c91] text-sm tracking-widest uppercase mb-4", children: "Blog" }), _jsx("h1", { className: "text-5xl md:text-7xl font-light text-[#f0f0f0] tracking-tight", children: "\u6280\u672F\u535A\u5BA2" })] }), _jsx("p", { className: "text-[#8c8c91] text-lg max-w-md text-right hidden md:block", children: "\u5206\u4EAB\u524D\u7AEF\u5F00\u53D1\u7ECF\u9A8C\u3001\u6280\u672F\u5FC3\u5F97\u4E0E\u9879\u76EE\u5B9E\u8DF5" })] }) }) }), _jsx("section", { className: "pb-32 px-6", children: _jsx("div", { className: "max-w-7xl mx-auto", children: posts.length === 0 ? (_jsxs("div", { className: "text-center py-32", children: [_jsx("p", { className: "text-[#8c8c91] text-xl", children: "\u6682\u65E0\u6587\u7AE0" }), isAdmin && (_jsx(Link, { to: "/blog/edit", className: "mt-6 inline-block", children: _jsxs(Button, { className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "\u5199\u7B2C\u4E00\u7BC7\u6587\u7AE0"] }) }))] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post) => (_jsxs("article", { className: "blog-card group bg-[#1a1a1a] rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-500", children: [_jsx(Link, { to: `/blog/${post.id}`, children: _jsx("div", { className: "aspect-[16/10] overflow-hidden bg-[#8c8c91]/10", children: post.coverImage ? (_jsx("img", { src: post.coverImage, alt: post.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700", onLoad: () => {
                                                const coverImage = post.coverImage;
                                                const isBase64 = coverImage.startsWith('data:image');
                                                console.log('✅ 列表封面加载成功:', {
                                                    title: post.title,
                                                    type: isBase64 ? 'Base64' : 'URL',
                                                    size: isBase64 ? `${coverImage.length} 字符` : 'N/A'
                                                });
                                            }, onError: (e) => {
                                                const coverImage = post.coverImage;
                                                const isBase64 = coverImage.startsWith('data:image');
                                                console.error('❌ 列表封面加载失败:', {
                                                    title: post.title,
                                                    type: isBase64 ? 'Base64' : 'URL',
                                                    src: isBase64 ? 'Base64 (...)' : coverImage
                                                });
                                                const imgElement = e.target;
                                                imgElement.style.display = 'none';
                                                const placeholder = document.createElement('div');
                                                placeholder.className = 'w-full h-full flex items-center justify-center text-red-400 text-sm';
                                                placeholder.textContent = '图片加载失败';
                                                imgElement.parentElement?.appendChild(placeholder);
                                            } })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center", children: _jsx("span", { className: "text-[#8c8c91] text-4xl font-light", children: post.title[0] }) })) }) }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsxs("span", { className: "flex items-center text-[#8c8c91] text-xs", children: [_jsx(Calendar, { className: "w-3 h-3 mr-1" }), formatDate(post.publishedAt || post.createdAt)] }), post.tags.length > 0 && (_jsxs("span", { className: "flex items-center text-[#8c8c91] text-xs", children: [_jsx(Tag, { className: "w-3 h-3 mr-1" }), post.tags[0]] }))] }), _jsx(Link, { to: `/blog/${post.id}`, children: _jsx("h2", { className: "text-xl font-medium text-[#f0f0f0] mb-3 group-hover:text-[#8c8c91] transition-colors line-clamp-2", children: post.title }) }), _jsx("p", { className: "text-[#8c8c91] text-sm line-clamp-3 mb-4", children: post.excerpt }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Link, { to: `/blog/${post.id}`, className: "inline-flex items-center text-sm text-[#f0f0f0] hover:text-[#8c8c91] transition-colors", children: ["\u9605\u8BFB\u66F4\u591A", _jsx(ArrowRight, { className: "w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" })] }), isAdmin && (_jsx(Link, { to: `/blog/edit?id=${post.id}`, children: _jsx(Button, { variant: "ghost", size: "sm", className: "text-[#8c8c91] hover:text-[#f0f0f0]", children: _jsx(Edit, { className: "w-4 h-4" }) }) }))] })] })] }, post.id))) })) }) }), _jsx("footer", { className: "bg-[#1a1a1a] py-12 px-6", children: _jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6", children: [_jsxs("p", { className: "text-[#8c8c91] text-sm", children: ["\u00A9 ", new Date().getFullYear(), " \u9648\u660E\u8FDC. All rights reserved."] }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx(Link, { to: "/", className: "text-[#8c8c91] hover:text-[#f0f0f0] text-sm transition-colors", children: "\u9996\u9875" }), _jsx(Link, { to: "/#projects", className: "text-[#8c8c91] hover:text-[#f0f0f0] text-sm transition-colors", children: "\u9879\u76EE" }), _jsx(Link, { to: "/blog", className: "text-[#f0f0f0] text-sm", children: "\u535A\u5BA2" })] })] }) })] }));
}
