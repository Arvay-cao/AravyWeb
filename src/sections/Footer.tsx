import { ArrowUpRight, Github, Linkedin, Mail, Globe, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footerConfig } from '../config';

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Github,
  Twitter,
  LinkedIn: Linkedin,
  Email: Mail,
  Globe,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  if (!footerConfig.brandName) return null;

  return (
    <footer className="relative w-full bg-[#1a1a1a] overflow-hidden">
      {/* Marquee Section */}
      {footerConfig.marqueeText && (
        <div className="py-20 overflow-hidden border-t border-[#8c8c91]/10">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="text-[#8c8c91]/10 text-[15vw] font-light tracking-tight mx-8"
                style={{ WebkitTextStroke: '1px rgba(140,140,145,0.2)' }}
              >
                {footerConfig.marqueeText}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer Content */}
      <div className="px-8 lg:px-16 py-16 border-t border-[#8c8c91]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <h3 className="text-[#f0f0f0] text-2xl font-light mb-4">
                {footerConfig.brandName}
              </h3>
              <p className="text-[#8c8c91] text-sm max-w-sm mb-6">
                {footerConfig.brandDescription}
              </p>
              <div className="flex items-center gap-4">
                {footerConfig.socialLinks.map((link, i) => {
                  const IconComponent = socialIconMap[link.label] || Globe;
                  return (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="w-10 h-10 border border-[#8c8c91]/20 rounded-lg flex items-center justify-center text-[#8c8c91] hover:text-[#f0f0f0] hover:border-[#8c8c91]/40 transition-colors"
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            {footerConfig.quickLinks.length > 0 && (
              <div>
                <h4 className="text-[#8c8c91] text-sm tracking-widest uppercase mb-6">
                  {footerConfig.quickLinksTitle}
                </h4>
                <ul className="space-y-3">
                  {footerConfig.quickLinks.map((link, i) => (
                    <li key={i}>
                      {link.href.startsWith('#/') ? (
                        <Link
                          to={link.href.slice(1)}
                          className="group text-[#8c8c91] text-sm hover:text-[#f0f0f0] transition-colors flex items-center gap-2"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          data-cursor="hover"
                          className="group text-[#8c8c91] text-sm hover:text-[#f0f0f0] transition-colors flex items-center gap-2"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact */}
            {footerConfig.contactItems.length > 0 && (
              <div>
                <h4 className="text-[#8c8c91] text-sm tracking-widest uppercase mb-6">
                  {footerConfig.contactTitle}
                </h4>
                <ul className="space-y-3">
                  {footerConfig.contactItems.map((item, i) => (
                    <li
                      key={i}
                      className="text-[#8c8c91] text-sm"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#8c8c91]/10">
            <p className="text-[#8c8c91]/50 text-xs mb-4 md:mb-0">
              {currentYear} {footerConfig.brandName}. All rights reserved.
            </p>
            {footerConfig.bottomLinks.length > 0 && (
              <div className="flex items-center gap-6">
                {footerConfig.bottomLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    data-cursor="hover"
                    className="text-[#8c8c91]/50 text-xs hover:text-[#8c8c91] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
