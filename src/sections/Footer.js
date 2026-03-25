import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowUpRight, Github, Linkedin, Mail, Globe, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footerConfig } from '../config';
const socialIconMap = {
    GitHub: Github,
    Twitter,
    LinkedIn: Linkedin,
    Email: Mail,
    Globe,
};
const Footer = () => {
    const currentYear = new Date().getFullYear();
    if (!footerConfig.brandName)
        return null;
    return (_jsxs("footer", { className: "relative w-full bg-[#1a1a1a] overflow-hidden", children: [footerConfig.marqueeText && (_jsx("div", { className: "py-20 overflow-hidden border-t border-[#8c8c91]/10", children: _jsx("div", { className: "animate-marquee whitespace-nowrap flex", children: [...Array(4)].map((_, i) => (_jsx("span", { className: "text-[#8c8c91]/10 text-[15vw] font-light tracking-tight mx-8", style: { WebkitTextStroke: '1px rgba(140,140,145,0.2)' }, children: footerConfig.marqueeText }, i))) }) })), _jsx("div", { className: "px-8 lg:px-16 py-16 border-t border-[#8c8c91]/10", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsx("h3", { className: "text-[#f0f0f0] text-2xl font-light mb-4", children: footerConfig.brandName }), _jsx("p", { className: "text-[#8c8c91] text-sm max-w-sm mb-6", children: footerConfig.brandDescription }), _jsx("div", { className: "flex items-center gap-4", children: footerConfig.socialLinks.map((link, i) => {
                                                const IconComponent = socialIconMap[link.label] || Globe;
                                                return (_jsx("a", { href: link.href, target: "_blank", rel: "noopener noreferrer", "data-cursor": "hover", className: "w-10 h-10 border border-[#8c8c91]/20 rounded-lg flex items-center justify-center text-[#8c8c91] hover:text-[#f0f0f0] hover:border-[#8c8c91]/40 transition-colors", children: _jsx(IconComponent, { className: "w-4 h-4" }) }, i));
                                            }) })] }), footerConfig.quickLinks.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: "text-[#8c8c91] text-sm tracking-widest uppercase mb-6", children: footerConfig.quickLinksTitle }), _jsx("ul", { className: "space-y-3", children: footerConfig.quickLinks.map((link, i) => (_jsx("li", { children: link.href.startsWith('#/') ? (_jsxs(Link, { to: link.href.slice(1), className: "group text-[#8c8c91] text-sm hover:text-[#f0f0f0] transition-colors flex items-center gap-2", children: [link.label, _jsx(ArrowUpRight, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" })] })) : (_jsxs("a", { href: link.href, "data-cursor": "hover", className: "group text-[#8c8c91] text-sm hover:text-[#f0f0f0] transition-colors flex items-center gap-2", children: [link.label, _jsx(ArrowUpRight, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" })] })) }, i))) })] })), footerConfig.contactItems.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: "text-[#8c8c91] text-sm tracking-widest uppercase mb-6", children: footerConfig.contactTitle }), _jsx("ul", { className: "space-y-3", children: footerConfig.contactItems.map((item, i) => (_jsx("li", { className: "text-[#8c8c91] text-sm", dangerouslySetInnerHTML: { __html: item } }, i))) })] }))] }), _jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#8c8c91]/10", children: [_jsxs("p", { className: "text-[#8c8c91]/50 text-xs mb-4 md:mb-0", children: [currentYear, " ", footerConfig.brandName, ". All rights reserved."] }), footerConfig.bottomLinks.length > 0 && (_jsx("div", { className: "flex items-center gap-6", children: footerConfig.bottomLinks.map((link, i) => (_jsx("a", { href: link.href, "data-cursor": "hover", className: "text-[#8c8c91]/50 text-xs hover:text-[#8c8c91] transition-colors", children: link.label }, i))) }))] })] }) })] }));
};
export default Footer;
