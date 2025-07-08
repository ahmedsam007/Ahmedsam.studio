import React from 'react';

const legalLinks = [
  { label: 'Cookies Policy', href: '#' },
  { label: 'Legal Terms', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

const connectLinks = [
  { label: 'Behance', href: '#' },
  { label: 'X(Twitter)', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'Upwork', href: '#' },
  { label: 'Mostaqel', href: '#' },
];

const Footer = () => {
  return (
    <footer className="bg-white text-neutral-800 pt-16 pb-8">
      {/* Dotted Divider with larger spacing */}
      <div
        className="w-full mb-8"
        style={{
          borderTop: '2px dotted #d1d5db', // Tailwind's neutral-300
          borderTopStyle: 'dotted',
          borderTopWidth: '2px',
          borderImage: 'repeating-linear-gradient(to right, #d1d5db 0 2px, transparent 1px 8px) 30',
        }}
      ></div>
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left: Legal Links */}
        <div className="flex flex-wrap gap-6 text-sm font-medium">
          {legalLinks.map(link => (
            <a key={link.label} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </div>
        {/* Right: Connect Text Links */}
        <div className="flex items-center gap-2 md:gap-4 flex-wrap">
          <span className="font-semibold text-base mr-2">Connect:</span>
          {connectLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 