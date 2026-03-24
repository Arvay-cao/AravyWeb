import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!heroConfig.brandLeft && !heroConfig.brandRight) return;

    const section = sectionRef.current;
    const image = imageRef.current;
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;
    const nav = navRef.current;
    const badge = badgeRef.current;
    const bottom = bottomRef.current;

    if (!section || !image || !leftText || !rightText || !nav || !badge || !bottom) return;

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

  if (!heroConfig.brandLeft && !heroConfig.brandRight) return null;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#050505]"
    >
      {/* Navigation */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 w-full z-50 px-8 lg:px-16 py-6 flex items-center justify-between will-change-transform"
      >
        <Link to="/" className="text-[#f0f0f0] text-xl font-light tracking-tight">
          {heroConfig.brandLeft}<span className="text-[#8c8c91]">.</span>
        </Link>
        <div className="flex items-center gap-8">
          {heroConfig.navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              className="text-[#8c8c91] hover:text-[#f0f0f0] transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main hero content — 3-column: text | image | text */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 lg:px-12">
        {/* Left text block */}
        <div
          ref={leftTextRef}
          className="flex flex-col items-end text-right flex-1 pr-6 lg:pr-12 will-change-transform"
        >
          <h1 className="text-[#f0f0f0] text-[10vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] font-light tracking-tight">
            {heroConfig.brandLeft}
          </h1>
          <p className="text-[#8c8c91] text-sm md:text-base max-w-[280px] mt-6 leading-relaxed">
            {heroConfig.tagline}
          </p>
          <div className="flex items-center gap-4 mt-6">
            {heroConfig.socialLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8c8c91] hover:text-[#f0f0f0] transition-colors"
                data-cursor="hover"
              >
                {link.label === 'GitHub' && <Github className="w-5 h-5" />}
                {link.label === 'LinkedIn' && <Linkedin className="w-5 h-5" />}
                {link.label === 'Email' && <Mail className="w-5 h-5" />}
              </a>
            ))}
          </div>
        </div>

        {/* Center image */}
        <div
          ref={imageRef}
          className="relative flex-shrink-0 w-[32vw] md:w-[28vw] lg:w-[24vw] max-w-[420px] will-change-transform"
        >
          {/* Badge above image */}
          <div
            ref={badgeRef}
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-[#8c8c91] text-xs whitespace-nowrap will-change-transform"
          >
            {heroConfig.badge}
          </div>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
            {heroConfig.heroImage ? (
              <img
                src={heroConfig.heroImage}
                alt={heroConfig.heroImageAlt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[#8c8c91] text-6xl font-light">
                  {heroConfig.brandLeft?.[0]}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right text block */}
        <div
          ref={rightTextRef}
          className="flex flex-col items-start text-left flex-1 pl-6 lg:pl-12 will-change-transform"
        >
          <h1 className="text-[#f0f0f0] text-[10vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] font-light tracking-tight">
            {heroConfig.brandRight}
          </h1>
          <p className="text-[#8c8c91] mt-6 text-xs tracking-widest uppercase">
            {heroConfig.since}
          </p>
          {heroConfig.email && (
            <a
              href={`mailto:${heroConfig.email}`}
              className="text-[#8c8c91] hover:text-[#f0f0f0] transition-colors text-sm mt-4 flex items-center gap-2"
              data-cursor="hover"
            >
              <Mail className="w-4 h-4" />
              {heroConfig.email}
            </a>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 w-full z-20 px-8 lg:px-16 py-5 flex items-center justify-between border-t border-[#8c8c91]/10"
      >
        <p className="text-[#8c8c91]/50 text-xs flex items-center gap-2">
          <ArrowDown className="w-4 h-4 animate-bounce" />
          {heroConfig.scrollText}
        </p>
        <p className="text-[#8c8c91]/50 text-xs">{heroConfig.copyrightText}</p>
      </div>
    </section>
  );
};

export default Hero;
