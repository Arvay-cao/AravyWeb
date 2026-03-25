import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Eye, Edit3, Save, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPublishedPosts, getDraftPosts } from '@/utils/blogStorage';
import { getSiteConfig } from '@/utils/configStorage';
export default function AdminDashboard() {
    const [stats, setStats] = useState({
        publishedPosts: 0,
        draftPosts: 0,
        totalViews: 0,
    });
    const [recentPosts, setRecentPosts] = useState([]);
    useEffect(() => {
        const published = getPublishedPosts();
        const drafts = getDraftPosts();
        getSiteConfig();
        setStats({
            publishedPosts: published.length,
            draftPosts: drafts.length,
            totalViews: 0, // 实际项目中从后端获取
        });
        // 获取最近发布的文章
        const recent = published.slice(0, 5).map(post => ({
            id: post.id,
            title: post.title,
            date: new Date(post.publishedAt || post.createdAt).toLocaleDateString('zh-CN'),
        }));
        setRecentPosts(recent);
    }, []);
    const quickActions = [
        { icon: Edit3, label: '写文章', href: '/admin/blog/edit', color: 'bg-blue-500/20 text-blue-400' },
        { icon: FileText, label: '博客管理', href: '/admin/blog', color: 'bg-green-500/20 text-green-400' },
        { icon: Save, label: '草稿箱', href: '/admin/blog?tab=drafts', color: 'bg-amber-500/20 text-amber-400' },
        { icon: Eye, label: '查看网站', href: '/', color: 'bg-purple-500/20 text-purple-400' },
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-light text-[#f0f0f0]", children: "\u4EEA\u8868\u76D8" }), _jsx("p", { className: "text-[#8c8c91] mt-1", children: "\u6B22\u8FCE\u56DE\u6765\uFF0C\u7BA1\u7406\u5458" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-[#8c8c91] text-sm font-normal", children: "\u5DF2\u53D1\u5E03\u6587\u7AE0" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-end justify-between", children: [_jsx("span", { className: "text-4xl font-light text-[#f0f0f0]", children: stats.publishedPosts }), _jsx(FileText, { className: "w-8 h-8 text-[#8c8c91]/50" })] }) })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-[#8c8c91] text-sm font-normal", children: "\u8349\u7A3F\u7BB1" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-end justify-between", children: [_jsx("span", { className: "text-4xl font-light text-[#f0f0f0]", children: stats.draftPosts }), _jsx(Save, { className: "w-8 h-8 text-[#8c8c91]/50" })] }) })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-[#8c8c91] text-sm font-normal", children: "\u603B\u9605\u8BFB\u91CF" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-end justify-between", children: [_jsx("span", { className: "text-4xl font-light text-[#f0f0f0]", children: stats.totalViews }), _jsx(Eye, { className: "w-8 h-8 text-[#8c8c91]/50" })] }) })] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-medium text-[#f0f0f0] mb-4", children: "\u5FEB\u6377\u64CD\u4F5C" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: quickActions.map((action) => (_jsxs(Link, { to: action.href, className: "flex flex-col items-center p-6 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10 hover:border-[#8c8c91]/30 transition-colors", children: [_jsx("div", { className: `w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.color}`, children: _jsx(action.icon, { className: "w-6 h-6" }) }), _jsx("span", { className: "text-[#f0f0f0] text-sm", children: action.label })] }, action.href))) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-lg font-medium text-[#f0f0f0]", children: "\u6700\u8FD1\u53D1\u5E03" }), _jsx(Link, { to: "/admin/blog", className: "text-[#8c8c91] hover:text-[#f0f0f0] text-sm", children: "\u67E5\u770B\u5168\u90E8" })] }), recentPosts.length === 0 ? (_jsx(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: _jsxs(CardContent, { className: "py-12 text-center", children: [_jsx(FileText, { className: "w-12 h-12 text-[#8c8c91]/30 mx-auto mb-4" }), _jsx("p", { className: "text-[#8c8c91]", children: "\u6682\u65E0\u53D1\u5E03\u7684\u6587\u7AE0" }), _jsx(Link, { to: "/admin/blog/edit", children: _jsx(Button, { className: "mt-4 bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: "\u5199\u7B2C\u4E00\u7BC7\u6587\u7AE0" }) })] }) })) : (_jsx(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: _jsx(CardContent, { className: "p-0", children: recentPosts.map((post, index) => (_jsxs("div", { className: `flex items-center justify-between p-4 ${index !== recentPosts.length - 1 ? 'border-b border-[#8c8c91]/10' : ''}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(FileText, { className: "w-4 h-4 text-[#8c8c91]" }), _jsx("span", { className: "text-[#f0f0f0]", children: post.title })] }), _jsxs("div", { className: "flex items-center gap-2 text-[#8c8c91] text-sm", children: [_jsx(Calendar, { className: "w-3 h-3" }), post.date] })] }, post.id))) }) }))] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-medium text-[#f0f0f0] mb-4", children: "\u7F51\u7AD9\u914D\u7F6E" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
                            { label: '首页配置', href: '/admin/config/hero', status: '已配置' },
                            { label: '关于配置', href: '/admin/config/about', status: '已配置' },
                            { label: '项目配置', href: '/admin/config/projects', status: '已配置' },
                            { label: '技能配置', href: '/admin/config/skills', status: '已配置' },
                        ].map((config) => (_jsxs(Link, { to: config.href, className: "p-4 bg-[#1a1a1a] rounded-lg border border-[#8c8c91]/10 hover:border-[#8c8c91]/30 transition-colors", children: [_jsx("p", { className: "text-[#f0f0f0] text-sm", children: config.label }), _jsx("p", { className: "text-green-400 text-xs mt-1", children: config.status })] }, config.href))) })] })] }));
}
