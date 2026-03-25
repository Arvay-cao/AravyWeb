import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactConfig } from '../config';
gsap.registerPlugin(ScrollTrigger);
const Contact = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const contentRef = useRef(null);
    const triggersRef = useRef([]);
    useEffect(() => {
        if (!contactConfig.headline)
            return;
        const section = sectionRef.current;
        const heading = headingRef.current;
        const content = contentRef.current;
        if (!section || !heading || !content)
            return;
        // Heading animation
        const headingTrigger = ScrollTrigger.create({
            trigger: heading,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(heading.querySelectorAll('.animate-item'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
            },
            once: true,
        });
        triggersRef.current.push(headingTrigger);
        // Content animation
        const contentTrigger = ScrollTrigger.create({
            trigger: content,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(content.querySelectorAll('.animate-item'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
            },
            once: true,
        });
        triggersRef.current.push(contentTrigger);
        return () => {
            triggersRef.current.forEach((t) => t.kill());
            triggersRef.current = [];
        };
    }, []);
    if (!contactConfig.headline)
        return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        // For demo, just show an alert
        alert('感谢您的留言！我会尽快回复您。');
    };
    return (_jsx("section", { ref: sectionRef, className: "relative py-32 px-6 lg:px-16 bg-[#050505]", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { ref: headingRef, className: "mb-20", children: [_jsx("p", { className: "animate-item text-[#8c8c91] text-sm tracking-widest uppercase mb-4", children: contactConfig.label }), _jsx("h2", { className: "animate-item text-[#f0f0f0] text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6", children: contactConfig.headline }), _jsx("p", { className: "animate-item text-[#8c8c91] text-lg max-w-2xl", children: contactConfig.description })] }), _jsxs("div", { ref: contentRef, className: "grid grid-cols-1 lg:grid-cols-2 gap-16", children: [_jsx("div", { className: "space-y-8", children: contactConfig.infoCards.map((card, index) => (_jsxs("div", { className: "animate-item flex items-start gap-4 p-6 bg-[#1a1a1a] rounded-xl", children: [_jsxs("div", { className: "w-12 h-12 bg-[#050505] rounded-lg flex items-center justify-center flex-shrink-0", children: [card.icon === 'Mail' && _jsx(Mail, { className: "w-5 h-5 text-[#8c8c91]" }), card.icon === 'MapPin' && _jsx(MapPin, { className: "w-5 h-5 text-[#8c8c91]" }), card.icon === 'Phone' && _jsx(Phone, { className: "w-5 h-5 text-[#8c8c91]" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-[#f0f0f0] font-medium mb-1", children: card.title }), _jsx("p", { className: "text-[#8c8c91] text-sm", dangerouslySetInnerHTML: { __html: card.content } })] })] }, index))) }), _jsxs("form", { onSubmit: handleSubmit, className: "animate-item space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "text-[#8c8c91] text-sm mb-2 block", children: "\u59D3\u540D" }), _jsx(Input, { placeholder: "\u60A8\u7684\u59D3\u540D", className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[#8c8c91] text-sm mb-2 block", children: "\u90AE\u7BB1" }), _jsx(Input, { type: "email", placeholder: "your@email.com", className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[#8c8c91] text-sm mb-2 block", children: "\u4E3B\u9898" }), _jsx(Input, { placeholder: "\u7559\u8A00\u4E3B\u9898", className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[#8c8c91] text-sm mb-2 block", children: "\u7559\u8A00\u5185\u5BB9" }), _jsx(Textarea, { placeholder: "\u8BF7\u8F93\u5165\u60A8\u7684\u7559\u8A00...", rows: 6, className: "bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91] resize-none" })] }), _jsxs(Button, { type: "submit", className: "bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91] w-full md:w-auto", children: [_jsx(Send, { className: "w-4 h-4 mr-2" }), "\u53D1\u9001\u7559\u8A00"] })] })] })] }) }));
};
export default Contact;
