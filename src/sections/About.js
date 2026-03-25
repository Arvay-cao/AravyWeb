import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';
gsap.registerPlugin(ScrollTrigger);
const About = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const galleryRef = useRef(null);
    const statsRef = useRef(null);
    const triggersRef = useRef([]);
    useEffect(() => {
        if (!aboutConfig.headline)
            return;
        const section = sectionRef.current;
        const text = textRef.current;
        const gallery = galleryRef.current;
        const stats = statsRef.current;
        if (!section || !text || !gallery || !stats)
            return;
        // Text reveal
        const textElements = text.querySelectorAll('.reveal-text');
        textElements.forEach((el) => {
            gsap.set(el, { opacity: 0, y: 50 });
            const trigger = ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
                },
            });
            triggersRef.current.push(trigger);
        });
        // Gallery column parallax — contained within the gallery wrapper
        const columns = gallery.querySelectorAll('.gallery-col');
        columns.forEach((col) => {
            const speed = parseFloat(col.dataset.speed || '0');
            const trigger = ScrollTrigger.create({
                trigger: gallery,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
                onUpdate: (self) => {
                    gsap.set(col, { y: self.progress * speed });
                },
            });
            triggersRef.current.push(trigger);
        });
        // Gallery images: opacity 0.4 -> 1 + slide up
        const imgWraps = gallery.querySelectorAll('.gallery-img-wrap');
        imgWraps.forEach((wrap) => {
            const offset = parseFloat(wrap.dataset.offset || '0');
            gsap.set(wrap, { opacity: 0.4, y: offset });
            const trigger = ScrollTrigger.create({
                trigger: wrap,
                start: 'top 92%',
                end: 'top 40%',
                scrub: 0.6,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.set(wrap, {
                        opacity: 0.4 + progress * 0.6,
                        y: offset * (1 - progress),
                    });
                },
            });
            triggersRef.current.push(trigger);
        });
        // Stats reveal
        const statItems = stats.querySelectorAll('.stat-item');
        statItems.forEach((el, i) => {
            gsap.set(el, { opacity: 0, y: 40 });
            const trigger = ScrollTrigger.create({
                trigger: el,
                start: 'top 90%',
                onEnter: () => {
                    gsap.to(el, {
                        opacity: 1, y: 0, duration: 0.8,
                        delay: i * 0.1, ease: 'power3.out',
                    });
                },
            });
            triggersRef.current.push(trigger);
        });
        return () => {
            triggersRef.current.forEach((t) => t.kill());
            triggersRef.current = [];
        };
    }, []);
    if (!aboutConfig.headline)
        return null;
    // Split gallery images into 3 columns
    const col1Images = aboutConfig.galleryImages.filter((_, i) => i % 3 === 0);
    const col2Images = aboutConfig.galleryImages.filter((_, i) => i % 3 === 1);
    const col3Images = aboutConfig.galleryImages.filter((_, i) => i % 3 === 2);
    return (_jsxs("section", { id: "about", ref: sectionRef, className: "relative w-full bg-[#1a1a1a]", children: [_jsxs("div", { ref: textRef, className: "max-w-6xl mx-auto pt-32 pb-20 px-8 lg:px-16", children: [_jsx("p", { className: "reveal-text text-[#8c8c91] text-sm tracking-widest uppercase mb-6", style: { willChange: 'transform, opacity' }, children: aboutConfig.label }), _jsx("h2", { className: "reveal-text text-[#f0f0f0] text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8", style: { willChange: 'transform, opacity' }, children: aboutConfig.headline }), _jsx("p", { className: "reveal-text text-[#8c8c91] text-lg md:text-xl max-w-2xl leading-relaxed", style: { willChange: 'transform, opacity' }, children: aboutConfig.description })] }), _jsx("div", { className: "overflow-hidden", children: _jsx("div", { ref: galleryRef, className: "relative max-w-7xl mx-auto px-4 lg:px-8 pb-16", children: _jsxs("div", { className: "grid grid-cols-3 gap-4 lg:gap-5", children: [_jsx("div", { className: "gallery-col space-y-4 lg:space-y-5 will-change-transform", "data-speed": "-80", children: col1Images.map((img, i) => (_jsxs("div", { className: "gallery-img-wrap overflow-hidden rounded-lg will-change-transform", "data-offset": i === 0 ? "60" : "120", children: [_jsx("img", { src: img.src, alt: img.alt, className: "w-full h-auto object-cover", style: { aspectRatio: i === 0 ? '3/4' : '4/5' } }), _jsx("p", { className: "text-[#8c8c91]/50 mt-3 text-xs", children: img.label })] }, i))) }), _jsx("div", { className: "gallery-col space-y-4 lg:space-y-5 pt-20 lg:pt-32 will-change-transform", "data-speed": "100", children: col2Images.map((img, i) => (_jsxs("div", { className: "gallery-img-wrap overflow-hidden rounded-lg will-change-transform", "data-offset": i === 0 ? "80" : "160", children: [_jsx("img", { src: img.src, alt: img.alt, className: "w-full h-auto object-cover", style: { aspectRatio: '3/4' } }), _jsx("p", { className: "text-[#8c8c91]/50 mt-3 text-xs", children: img.label })] }, i))) }), _jsx("div", { className: "gallery-col space-y-4 lg:space-y-5 will-change-transform", "data-speed": "-120", children: col3Images.map((img, i) => (_jsxs("div", { className: "gallery-img-wrap overflow-hidden rounded-lg will-change-transform", "data-offset": i === 0 ? "40" : "140", children: [_jsx("img", { src: img.src, alt: img.alt, className: "w-full h-auto object-cover", style: { aspectRatio: i === 0 ? '4/5' : '3/4' } }), _jsx("p", { className: "text-[#8c8c91]/50 mt-3 text-xs", children: img.label })] }, i))) })] }) }) }), aboutConfig.stats.length > 0 && (_jsx("div", { ref: statsRef, className: "relative z-10 max-w-7xl mx-auto px-8 lg:px-16 py-24 bg-[#1a1a1a]", children: _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#8c8c91]/10 pt-12", children: aboutConfig.stats.map((stat, i) => (_jsxs("div", { className: "stat-item", children: [_jsx("p", { className: "text-[#f0f0f0] text-4xl md:text-5xl font-light mb-2", children: stat.value }), _jsx("p", { className: "text-[#8c8c91] text-sm", children: stat.label })] }, i))) }) })), aboutConfig.bottomText && (_jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-8 lg:px-16 pb-32 bg-[#1a1a1a]", children: _jsx("div", { className: "grid grid-cols-12", children: _jsx("div", { className: "col-span-12 md:col-span-5 md:col-start-8", children: _jsx("p", { className: "reveal-text text-[#8c8c91] text-base lg:text-lg leading-relaxed", children: aboutConfig.bottomText }) }) }) }))] }));
};
export default About;
