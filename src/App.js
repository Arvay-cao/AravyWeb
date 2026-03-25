import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
// Config
import { siteConfig } from './config';
// Hooks
import useLenis from './hooks/useLenis';
import useCustomCursor from './hooks/useCustomCursor';
// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
// Pages
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminBlog from './pages/AdminBlog';
import AdminBlogEdit from './pages/AdminBlogEdit';
import AdminConfigHero from './pages/AdminConfigHero';
import AdminConfigAbout from './pages/AdminConfigAbout';
import AdminConfigProjects from './pages/AdminConfigProjects';
import AdminConfigSkills from './pages/AdminConfigSkills';
import AdminConfigContact from './pages/AdminConfigContact';
import AdminConfigFooter from './pages/AdminConfigFooter';
gsap.registerPlugin(ScrollTrigger);
function HomePage() {
    const mainRef = useRef(null);
    const triggersRef = useRef([]);
    // Initialize smooth scroll
    useLenis();
    // Initialize custom cursor
    useCustomCursor();
    useEffect(() => {
        // Background color transitions based on sections
        const sections = [
            { selector: '#hero-section', color: '#050505' },
            { selector: '#about', color: '#1a1a1a' },
            { selector: '#projects', color: '#050505' },
            { selector: '#skills', color: '#1a1a1a' },
            { selector: '#contact', color: '#050505' },
            { selector: '#footer-section', color: '#1a1a1a' },
        ];
        sections.forEach(({ selector, color }) => {
            const el = document.querySelector(selector);
            if (!el)
                return;
            const trigger = ScrollTrigger.create({
                trigger: el,
                start: 'top 60%',
                end: 'bottom 40%',
                onEnter: () => {
                    gsap.to('body', {
                        backgroundColor: color,
                        duration: 0.6,
                        ease: 'power2.out',
                    });
                },
                onEnterBack: () => {
                    gsap.to('body', {
                        backgroundColor: color,
                        duration: 0.6,
                        ease: 'power2.out',
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
    return (_jsxs("div", { ref: mainRef, className: "relative", children: [_jsx("div", { id: "hero-section", children: _jsx(Hero, {}) }), _jsx(About, {}), _jsx("div", { id: "projects", children: _jsx(Projects, {}) }), _jsx("div", { id: "skills", children: _jsx(Skills, {}) }), _jsx("div", { id: "contact", children: _jsx(Contact, {}) }), _jsx("div", { id: "footer-section", children: _jsx(Footer, {}) })] }));
}
function App() {
    // Set document language and title
    useEffect(() => {
        if (siteConfig.language) {
            document.documentElement.lang = siteConfig.language;
        }
        if (siteConfig.title) {
            document.title = siteConfig.title;
        }
    }, []);
    return (_jsx(HashRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/blog", element: _jsx(BlogList, {}) }), _jsx(Route, { path: "/blog/:id", element: _jsx(BlogDetail, {}) }), _jsx(Route, { path: "/admin/login", element: _jsx(AdminLogin, {}) }), _jsxs(Route, { path: "/admin", element: _jsx(AdminLayout, {}), children: [_jsx(Route, { path: "dashboard", element: _jsx(AdminDashboard, {}) }), _jsx(Route, { path: "blog", element: _jsx(AdminBlog, {}) }), _jsx(Route, { path: "blog/edit", element: _jsx(AdminBlogEdit, {}) }), _jsx(Route, { path: "config/hero", element: _jsx(AdminConfigHero, {}) }), _jsx(Route, { path: "config/about", element: _jsx(AdminConfigAbout, {}) }), _jsx(Route, { path: "config/projects", element: _jsx(AdminConfigProjects, {}) }), _jsx(Route, { path: "config/skills", element: _jsx(AdminConfigSkills, {}) }), _jsx(Route, { path: "config/contact", element: _jsx(AdminConfigContact, {}) }), _jsx(Route, { path: "config/footer", element: _jsx(AdminConfigFooter, {}) })] })] }) }));
}
export default App;
