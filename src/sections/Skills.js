import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsConfig } from '../config';
gsap.registerPlugin(ScrollTrigger);
const Skills = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const contentRef = useRef(null);
    const triggersRef = useRef([]);
    useEffect(() => {
        if (!skillsConfig.headline)
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
        // Skills animation
        const skillItems = content.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            const itemTrigger = ScrollTrigger.create({
                trigger: item,
                start: 'top 85%',
                onEnter: () => {
                    gsap.fromTo(item, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: index * 0.05, ease: 'power3.out' });
                },
                once: true,
            });
            triggersRef.current.push(itemTrigger);
        });
        return () => {
            triggersRef.current.forEach((t) => t.kill());
            triggersRef.current = [];
        };
    }, []);
    if (!skillsConfig.headline)
        return null;
    return (_jsx("section", { ref: sectionRef, className: "relative py-32 px-6 lg:px-16 bg-[#1a1a1a]", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { ref: headingRef, className: "mb-20", children: [_jsx("p", { className: "animate-item text-[#8c8c91] text-sm tracking-widest uppercase mb-4", children: skillsConfig.label }), _jsx("h2", { className: "animate-item text-[#f0f0f0] text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6", children: skillsConfig.headline }), _jsx("p", { className: "animate-item text-[#8c8c91] text-lg max-w-2xl", children: skillsConfig.description })] }), _jsx("div", { ref: contentRef, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: skillsConfig.categories.map((category) => (_jsxs("div", { className: "skill-item bg-[#050505] rounded-xl p-6", children: [_jsxs("h3", { className: "text-[#f0f0f0] text-lg font-medium mb-4 flex items-center gap-3", children: [_jsx("span", { className: "w-2 h-2 bg-[#8c8c91] rounded-full" }), category.name] }), _jsx("div", { className: "flex flex-wrap gap-2", children: category.skills.map((skill) => (_jsx("span", { className: "px-3 py-1.5 bg-[#1a1a1a] text-[#8c8c91] text-sm rounded-lg hover:bg-[#8c8c91]/20 hover:text-[#f0f0f0] transition-colors cursor-default", children: skill }, skill))) })] }, category.name))) }), skillsConfig.experience && skillsConfig.experience.length > 0 && (_jsxs("div", { className: "mt-20", children: [_jsx("h3", { className: "text-[#f0f0f0] text-2xl font-light mb-8", children: "\u5DE5\u4F5C\u7ECF\u5386" }), _jsx("div", { className: "space-y-6", children: skillsConfig.experience.map((exp, index) => (_jsxs("div", { className: "skill-item flex flex-col md:flex-row md:items-start gap-4 p-6 bg-[#050505] rounded-xl", children: [_jsx("div", { className: "md:w-48 flex-shrink-0", children: _jsx("span", { className: "text-[#8c8c91] text-sm", children: exp.period }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "text-[#f0f0f0] text-lg font-medium mb-1", children: exp.position }), _jsx("p", { className: "text-[#8c8c91] text-sm mb-2", children: exp.company }), _jsx("p", { className: "text-[#8c8c91]/70 text-sm", children: exp.description })] })] }, index))) })] }))] }) }));
};
export default Skills;
