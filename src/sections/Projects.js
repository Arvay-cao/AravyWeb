import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import { projectsConfig } from '../config';
gsap.registerPlugin(ScrollTrigger);
const Projects = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const gridRef = useRef(null);
    const triggersRef = useRef([]);
    useEffect(() => {
        if (!projectsConfig.headline || projectsConfig.projects.length === 0)
            return;
        const section = sectionRef.current;
        const heading = headingRef.current;
        const grid = gridRef.current;
        if (!section || !heading || !grid)
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
        // Grid cards animation
        const cards = grid.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            const cardTrigger = ScrollTrigger.create({
                trigger: card,
                start: 'top 85%',
                onEnter: () => {
                    gsap.fromTo(card, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, delay: index * 0.1, ease: 'power3.out' });
                },
                once: true,
            });
            triggersRef.current.push(cardTrigger);
        });
        return () => {
            triggersRef.current.forEach((t) => t.kill());
            triggersRef.current = [];
        };
    }, []);
    if (!projectsConfig.headline || projectsConfig.projects.length === 0)
        return null;
    return (_jsx("section", { ref: sectionRef, className: "relative py-32 px-6 lg:px-16 bg-[#050505]", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { ref: headingRef, className: "mb-20", children: [_jsx("p", { className: "animate-item text-[#8c8c91] text-sm tracking-widest uppercase mb-4", children: projectsConfig.label }), _jsx("h2", { className: "animate-item text-[#f0f0f0] text-4xl md:text-5xl lg:text-6xl font-light tracking-tight", children: projectsConfig.headline })] }), _jsx("div", { ref: gridRef, className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: projectsConfig.projects.map((project) => (_jsxs("article", { className: "project-card group relative bg-[#1a1a1a] rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-500", children: [_jsx("div", { className: "aspect-[16/10] overflow-hidden bg-[#0a0a0a]", children: project.image ? (_jsx("img", { src: project.image, alt: project.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center", children: _jsx("span", { className: "text-[#8c8c91] text-4xl font-light", children: project.title[0] }) })) }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("span", { className: "text-[#8c8c91] text-xs", children: project.category }), _jsx("span", { className: "text-[#8c8c91]/30", children: "|" }), _jsx("span", { className: "text-[#8c8c91] text-xs", children: project.year })] }), _jsx("h3", { className: "text-xl font-medium text-[#f0f0f0] mb-3 group-hover:text-[#8c8c91] transition-colors", children: project.title }), _jsx("p", { className: "text-[#8c8c91] text-sm mb-4 line-clamp-2", children: project.description }), _jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: project.techStack.map((tech) => (_jsx("span", { className: "px-2 py-1 bg-[#050505] text-[#8c8c91] text-xs rounded", children: tech }, tech))) }), _jsxs("div", { className: "flex items-center gap-4", children: [project.demoUrl && (_jsxs("a", { href: project.demoUrl, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center text-sm text-[#f0f0f0] hover:text-[#8c8c91] transition-colors", "data-cursor": "hover", children: [_jsx(ExternalLink, { className: "w-4 h-4 mr-1" }), "\u67E5\u770B\u6F14\u793A"] })), project.repoUrl && (_jsxs("a", { href: project.repoUrl, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center text-sm text-[#8c8c91] hover:text-[#f0f0f0] transition-colors", "data-cursor": "hover", children: [_jsx(Github, { className: "w-4 h-4 mr-1" }), "\u6E90\u4EE3\u7801"] }))] })] })] }, project.id))) })] }) }));
};
export default Projects;
