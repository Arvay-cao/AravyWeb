import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!skillsConfig.headline) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;

    if (!section || !heading || !content) return;

    // Heading animation
    const headingTrigger = ScrollTrigger.create({
      trigger: heading,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          heading.querySelectorAll('.animate-item'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
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
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, delay: index * 0.05, ease: 'power3.out' }
          );
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

  if (!skillsConfig.headline) return null;

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 lg:px-16 bg-[#1a1a1a]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-20">
          <p className="animate-item text-[#8c8c91] text-sm tracking-widest uppercase mb-4">
            {skillsConfig.label}
          </p>
          <h2 className="animate-item text-[#f0f0f0] text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
            {skillsConfig.headline}
          </h2>
          <p className="animate-item text-[#8c8c91] text-lg max-w-2xl">
            {skillsConfig.description}
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsConfig.categories.map((category) => (
            <div
              key={category.name}
              className="skill-item bg-[#050505] rounded-xl p-6"
            >
              <h3 className="text-[#f0f0f0] text-lg font-medium mb-4 flex items-center gap-3">
                <span className="w-2 h-2 bg-[#8c8c91] rounded-full"></span>
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-[#1a1a1a] text-[#8c8c91] text-sm rounded-lg hover:bg-[#8c8c91]/20 hover:text-[#f0f0f0] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Timeline */}
        {skillsConfig.experience && skillsConfig.experience.length > 0 && (
          <div className="mt-20">
            <h3 className="text-[#f0f0f0] text-2xl font-light mb-8">工作经历</h3>
            <div className="space-y-6">
              {skillsConfig.experience.map((exp, index) => (
                <div
                  key={index}
                  className="skill-item flex flex-col md:flex-row md:items-start gap-4 p-6 bg-[#050505] rounded-xl"
                >
                  <div className="md:w-48 flex-shrink-0">
                    <span className="text-[#8c8c91] text-sm">{exp.period}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#f0f0f0] text-lg font-medium mb-1">
                      {exp.position}
                    </h4>
                    <p className="text-[#8c8c91] text-sm mb-2">{exp.company}</p>
                    <p className="text-[#8c8c91]/70 text-sm">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
