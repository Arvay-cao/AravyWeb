import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSiteConfig, saveSiteConfig } from '@/utils/configStorage';
import { heroConfig as defaultHeroConfig } from '@/config';
export default function AdminConfigHero() {
    const [config, setConfig] = useState({
        brandLeft: '',
        brandRight: '',
        tagline: '',
        badge: '',
        since: '',
        email: '',
        heroImage: '',
        heroImageAlt: '',
        scrollText: '',
        copyrightText: '',
    });
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        const savedConfig = getSiteConfig();
        setConfig({
            brandLeft: savedConfig.hero?.brandLeft || defaultHeroConfig.brandLeft,
            brandRight: savedConfig.hero?.brandRight || defaultHeroConfig.brandRight,
            tagline: savedConfig.hero?.tagline || defaultHeroConfig.tagline,
            badge: savedConfig.hero?.badge || defaultHeroConfig.badge,
            since: savedConfig.hero?.since || defaultHeroConfig.since,
            email: savedConfig.hero?.email || defaultHeroConfig.email,
            heroImage: savedConfig.hero?.heroImage || defaultHeroConfig.heroImage,
            heroImageAlt: savedConfig.hero?.heroImageAlt || defaultHeroConfig.heroImageAlt,
            scrollText: savedConfig.hero?.scrollText || defaultHeroConfig.scrollText,
            copyrightText: savedConfig.hero?.copyrightText || defaultHeroConfig.copyrightText,
        });
    }, []);
    const handleSave = () => {
        saveSiteConfig({
            hero: config,
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };
    const handleReset = () => {
        setConfig({
            brandLeft: defaultHeroConfig.brandLeft,
            brandRight: defaultHeroConfig.brandRight,
            tagline: defaultHeroConfig.tagline,
            badge: defaultHeroConfig.badge,
            since: defaultHeroConfig.since,
            email: defaultHeroConfig.email,
            heroImage: defaultHeroConfig.heroImage,
            heroImageAlt: defaultHeroConfig.heroImageAlt,
            scrollText: defaultHeroConfig.scrollText,
            copyrightText: defaultHeroConfig.copyrightText,
        });
    };
    const updateField = (field, value) => {
        setConfig((prev) => ({ ...prev, [field]: value }));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-light text-[#f0f0f0]", children: "\u9996\u9875\u914D\u7F6E" }), _jsx("p", { className: "text-[#8c8c91] mt-1", children: "\u914D\u7F6E Hero \u533A\u57DF\u7684\u663E\u793A\u5185\u5BB9" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", onClick: handleReset, className: "border-[#8c8c91] text-[#f0f0f0] hover:bg-[#8c8c91]/20", children: [_jsx(RotateCcw, { className: "w-4 h-4 mr-2" }), "\u91CD\u7F6E"] }), _jsxs(Button, { onClick: handleSave, className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91]", children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), isSaved ? '已保存' : '保存'] })] })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-[#f0f0f0] text-lg", children: "\u5B9E\u65F6\u9884\u89C8" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "bg-[#050505] rounded-lg p-8 flex items-center justify-center gap-8", children: [_jsxs("div", { className: "text-right", children: [_jsx("h2", { className: "text-4xl font-light text-[#f0f0f0]", children: config.brandLeft || '姓名' }), _jsx("p", { className: "text-[#8c8c91] text-sm mt-2 max-w-[200px]", children: config.tagline || '简介' })] }), _jsx("div", { className: "w-32 h-40 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-xl flex items-center justify-center", children: config.heroImage ? (_jsx("img", { src: config.heroImage, alt: config.heroImageAlt, className: "w-full h-full object-cover rounded-xl" })) : (_jsx("span", { className: "text-[#8c8c91] text-4xl font-light", children: (config.brandLeft || '姓')[0] })) }), _jsxs("div", { className: "text-left", children: [_jsx("h2", { className: "text-4xl font-light text-[#f0f0f0]", children: config.brandRight || '职位' }), _jsx("p", { className: "text-[#8c8c91] text-xs mt-2 uppercase tracking-widest", children: config.since || '经验' })] })] }) })] }), _jsxs(Card, { className: "bg-[#1a1a1a] border-[#8c8c91]/10", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-[#f0f0f0] text-lg", children: "\u914D\u7F6E\u9879" }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u5DE6\u4FA7\u540D\u79F0" }), _jsx(Input, { value: config.brandLeft, onChange: (e) => updateField('brandLeft', e.target.value), placeholder: "\u4F8B\u5982\uFF1A\u9648\u660E\u8FDC", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u53F3\u4FA7\u804C\u4F4D" }), _jsx(Input, { value: config.brandRight, onChange: (e) => updateField('brandRight', e.target.value), placeholder: "\u4F8B\u5982\uFF1ADeveloper", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u4E2A\u4EBA\u7B80\u4ECB" }), _jsx(Textarea, { value: config.tagline, onChange: (e) => updateField('tagline', e.target.value), placeholder: "\u7B80\u77ED\u7684\u4E2A\u4EBA\u4ECB\u7ECD...", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 min-h-[80px]" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u5FBD\u7AE0\u6587\u5B57" }), _jsx(Input, { value: config.badge, onChange: (e) => updateField('badge', e.target.value), placeholder: "\u4F8B\u5982\uFF1AFrontend Engineer", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u7ECF\u9A8C\u5E74\u9650" }), _jsx(Input, { value: config.since, onChange: (e) => updateField('since', e.target.value), placeholder: "\u4F8B\u5982\uFF1A5+ Years Experience", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u90AE\u7BB1" }), _jsx(Input, { value: config.email, onChange: (e) => updateField('email', e.target.value), placeholder: "your@email.com", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u5934\u50CF\u56FE\u7247 URL" }), _jsx(Input, { value: config.heroImage, onChange: (e) => updateField('heroImage', e.target.value), placeholder: "https://example.com/avatar.jpg", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u6EDA\u52A8\u63D0\u793A\u6587\u5B57" }), _jsx(Input, { value: config.scrollText, onChange: (e) => updateField('scrollText', e.target.value), placeholder: "\u5411\u4E0B\u6EDA\u52A8\u63A2\u7D22\u66F4\u591A", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[#8c8c91]", children: "\u7248\u6743\u6587\u5B57" }), _jsx(Input, { value: config.copyrightText, onChange: (e) => updateField('copyrightText', e.target.value), placeholder: "\u00A9 2024", className: "bg-[#050505] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50" })] })] })] })] })] }));
}
