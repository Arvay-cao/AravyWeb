import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const leftTextRef = useRef(null);
    const rightTextRef = useRef(null);
    const navRef = useRef(null);
    const badgeRef = useRef(null);
    const bottomRef = useRef(null);
    const triggersRef = useRef([]);
    useEffect(() => {
        if (!heroConfig.brandLeft && !heroConfig.brandRight)
            return;
        const section = sectionRef.current;
        const image = imageRef.current;
        const leftText = leftTextRef.current;
        const rightText = rightTextRef.current;
        const nav = navRef.current;
        const badge = badgeRef.current;
        const bottom = bottomRef.current;
        if (!section || !image || !leftText || !rightText || !nav || !badge || !bottom)
            return;
        // Set initial states
        gsap.set([leftText, rightText], { opacity: 0, y: 60 });
        gsap.set(image, { opacity: 0, scale: 1.08, y: 40 });
        gsap.set(nav, { opacity: 0, y: -20 });
        gsap.set(badge, { opacity: 0, y: 20 });
        gsap.set(bottom, { opacity: 0 });
        // Entrance timeline
        const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            delay: 0.3,
        });
        tl.to(image, { opacity: 1, scale: 1, y: 0, duration: 1.4 })
            .to(leftText, { opacity: 1, y: 0, duration: 1 }, '-=1')
            .to(rightText, { opacity: 1, y: 0, duration: 1 }, '-=0.85')
            .to(nav, { opacity: 1, y: 0, duration: 0.7 }, '-=0.7')
            .to(badge, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
            .to(bottom, { opacity: 1, duration: 0.5 }, '-=0.3');
        // Scroll parallax — image moves slower, text drifts outward
        const scrollTrigger = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
            onUpdate: (self) => {
                const p = self.progress;
                gsap.set(image, { y: p * 120 });
                gsap.set(leftText, { y: p * 200, x: p * -60 });
                gsap.set(rightText, { y: p * 180, x: p * 60 });
                gsap.set(badge, { y: p * 80 });
            },
        });
        triggersRef.current.push(scrollTrigger);
        return () => {
            triggersRef.current.forEach((t) => t.kill());
            triggersRef.current = [];
            tl.kill();
        };
    }, []);
    if (!heroConfig.brandLeft && !heroConfig.brandRight)
        return null;
    return (_jsxs("section", { ref: sectionRef, className: "relative h-screen w-full overflow-hidden bg-[#050505]", children: [_jsxs("nav", { ref: navRef, className: "absolute top-0 left-0 w-full z-50 px-8 lg:px-16 py-6 flex items-center justify-between will-change-transform", children: [_jsxs(Link, { to: "/", className: "text-[#f0f0f0] text-xl font-light tracking-tight", children: [heroConfig.brandLeft, _jsx("span", { className: "text-[#8c8c91]", children: "." })] }), _jsx("div", { className: "flex items-center gap-8", children: heroConfig.navLinks.map((link, i) => (_jsx("a", { href: link.href, className: "text-[#8c8c91] hover:text-[#f0f0f0] transition-colors text-sm", children: link.label }, i))) })] }), _jsxs("div", { className: "relative z-10 flex items-center justify-center h-full px-6 lg:px-12", children: [_jsxs("div", { ref: leftTextRef, className: "flex flex-col items-end text-right flex-1 pr-6 lg:pr-12 will-change-transform", children: [_jsx("h1", { className: "text-[#f0f0f0] text-[10vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] font-light tracking-tight", children: heroConfig.brandLeft }), _jsx("p", { className: "text-[#8c8c91] text-sm md:text-base max-w-[280px] mt-6 leading-relaxed", children: heroConfig.tagline }), _jsx("div", { className: "flex items-center gap-4 mt-6", children: heroConfig.socialLinks.map((link, i) => (_jsxs("a", { href: link.href, target: "_blank", rel: "noopener noreferrer", className: "text-[#8c8c91] hover:text-[#f0f0f0] transition-colors", "data-cursor": "hover", children: [link.label === 'GitHub' && _jsx(Github, { className: "w-5 h-5" }), link.label === 'LinkedIn' && _jsx(Linkedin, { className: "w-5 h-5" }), link.label === 'Email' && _jsx(Mail, { className: "w-5 h-5" })] }, i))) })] }), _jsxs("div", { ref: imageRef, className: "relative flex-shrink-0 w-[32vw] md:w-[28vw] lg:w-[24vw] max-w-[420px] will-change-transform", children: [_jsx("div", { ref: badgeRef, className: "absolute -top-8 left-1/2 -translate-x-1/2 text-[#8c8c91] text-xs whitespace-nowrap will-change-transform", children: heroConfig.badge }), _jsx("div", { className: "relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]", children: heroConfig.heroImage ? (_jsx("img", { src: heroConfig.heroImage, alt: heroConfig.heroImageAlt, className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center", children: _jsx("span", { className: "text-[#8c8c91] text-6xl font-light", children: heroConfig.brandLeft?.[0] }) })) })] }), _jsxs("div", { ref: rightTextRef, className: "flex flex-col items-start text-left flex-1 pl-6 lg:pl-12 will-change-transform", children: [_jsx("h1", { className: "text-[#f0f0f0] text-[10vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] font-light tracking-tight", children: heroConfig.brandRight }), _jsx("p", { className: "text-[#8c8c91] mt-6 text-xs tracking-widest uppercase", children: heroConfig.since }), heroConfig.email && (_jsxs("a", { href: `mailto:${heroConfig.email}`, className: "text-[#8c8c91] hover:text-[#f0f0f0] transition-colors text-sm mt-4 flex items-center gap-2", "data-cursor": "hover", children: [_jsx(Mail, { className: "w-4 h-4" }), heroConfig.email] }))] })] }), _jsxs("div", { ref: bottomRef, className: "absolute bottom-0 left-0 w-full z-20 px-8 lg:px-16 py-5 flex items-center justify-between border-t border-[#8c8c91]/10", children: [_jsxs("p", { className: "text-[#8c8c91]/50 text-xs flex items-center gap-2", children: [_jsx(ArrowDown, { className: "w-4 h-4 animate-bounce" }), heroConfig.scrollText] }), _jsx("p", { className: "text-[#8c8c91]/50 text-xs", children: heroConfig.copyrightText })] })] }));
};
export default Hero;
