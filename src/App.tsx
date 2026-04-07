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
  const mainRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Initialize smooth scroll
  useLenis();

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
      if (!el) return;

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

  return (
    <div ref={mainRef} className="relative">
      {/* Hero Section */}
      <div id="hero-section">
        <Hero />
      </div>

      {/* About Section */}
      <About />

      {/* Projects Section */}
      <div id="projects">
        <Projects />
      </div>

      {/* Skills Section */}
      <div id="skills">
        <Skills />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact />
      </div>

      {/* Footer */}
      <div id="footer-section">
        <Footer />
      </div>
    </div>
  );
}

function App() {
  // Initialize custom cursor globally for all routes
  useCustomCursor();

  // Set document language and title
  useEffect(() => {
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="blog/edit" element={<AdminBlogEdit />} />
          <Route path="config/hero" element={<AdminConfigHero />} />
          <Route path="config/about" element={<AdminConfigAbout />} />
          <Route path="config/projects" element={<AdminConfigProjects />} />
          <Route path="config/skills" element={<AdminConfigSkills />} />
          <Route path="config/contact" element={<AdminConfigContact />} />
          <Route path="config/footer" element={<AdminConfigFooter />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
