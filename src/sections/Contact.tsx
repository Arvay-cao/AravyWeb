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
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!contactConfig.headline) return;

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

    // Content animation
    const contentTrigger = ScrollTrigger.create({
      trigger: content,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          content.querySelectorAll('.animate-item'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
      },
      once: true,
    });
    triggersRef.current.push(contentTrigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  if (!contactConfig.headline) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, just show an alert
    alert('感谢您的留言！我会尽快回复您。');
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 lg:px-16 bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-20">
          <p className="animate-item text-[#8c8c91] text-sm tracking-widest uppercase mb-4">
            {contactConfig.label}
          </p>
          <h2 className="animate-item text-[#f0f0f0] text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
            {contactConfig.headline}
          </h2>
          <p className="animate-item text-[#8c8c91] text-lg max-w-2xl">
            {contactConfig.description}
          </p>
        </div>

        {/* Content Grid */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            {contactConfig.infoCards.map((card, index) => (
              <div
                key={index}
                className="animate-item flex items-start gap-4 p-6 bg-[#1a1a1a] rounded-xl"
              >
                <div className="w-12 h-12 bg-[#050505] rounded-lg flex items-center justify-center flex-shrink-0">
                  {card.icon === 'Mail' && <Mail className="w-5 h-5 text-[#8c8c91]" />}
                  {card.icon === 'MapPin' && <MapPin className="w-5 h-5 text-[#8c8c91]" />}
                  {card.icon === 'Phone' && <Phone className="w-5 h-5 text-[#8c8c91]" />}
                </div>
                <div>
                  <h3 className="text-[#f0f0f0] font-medium mb-1">{card.title}</h3>
                  <p
                    className="text-[#8c8c91] text-sm"
                    dangerouslySetInnerHTML={{ __html: card.content }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="animate-item space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[#8c8c91] text-sm mb-2 block">姓名</label>
                <Input
                  placeholder="您的姓名"
                  className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]"
                />
              </div>
              <div>
                <label className="text-[#8c8c91] text-sm mb-2 block">邮箱</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]"
                />
              </div>
            </div>
            <div>
              <label className="text-[#8c8c91] text-sm mb-2 block">主题</label>
              <Input
                placeholder="留言主题"
                className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91]"
              />
            </div>
            <div>
              <label className="text-[#8c8c91] text-sm mb-2 block">留言内容</label>
              <Textarea
                placeholder="请输入您的留言..."
                rows={6}
                className="bg-[#1a1a1a] border-[#8c8c91]/20 text-[#f0f0f0] placeholder:text-[#8c8c91]/50 focus:border-[#8c8c91] resize-none"
              />
            </div>
            <Button
              type="submit"
              className="bg-[#f0f0f0] text-[#050505] hover:bg-[#8c8c91] w-full md:w-auto"
            >
              <Send className="w-4 h-4 mr-2" />
              发送留言
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
