import React, { useState } from 'react';
import { GleamyProvider, Gold, Silver, Iridescent, Holographic } from 'gleamy';
import ShimmerWrapper from './ShimmerWrapper';
import ShimmerText from './ShimmerText';
import '../styles/shimmer.css';

const ShimmerCard = ({ 
  children,
  variant = 'glass', // 'glass', 'gold', 'rainbow', 'holographic', 'custom'
  hover = true,
  className = '',
  style = {},
  gleamyEffect = null,
  onHover,
  darkMode = false,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) onHover(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onHover) onHover(false);
  };

  // Base card styles
  const baseClasses = `
    relative overflow-hidden transition-all duration-300 ease-out
    transform-gpu cursor-pointer
    ${hover ? 'hover:scale-105 hover:shadow-2xl' : ''}
    ${className}
  `;

  // Render Gleamy effect
  const renderGleamyEffect = () => {
    if (!gleamyEffect) return null;

    const effectProps = {
      height: "100%",
      width: "100%",
      style: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 1,
        opacity: isHovered ? 0.8 : 0.4,
        transition: 'opacity 0.3s ease'
      }
    };

    switch (gleamyEffect) {
      case 'gold':
        return <Gold {...effectProps} />;
      case 'silver':
        return <Silver {...effectProps} />;
      case 'iridescent':
        return <Iridescent {...effectProps} />;
      case 'holographic':
        return <Holographic {...effectProps} />;
      default:
        return null;
    }
  };

  // Render with Gleamy effects
  if (gleamyEffect) {
    return (
      <GleamyProvider>
        <div
          className={baseClasses}
          style={style}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {renderGleamyEffect()}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </GleamyProvider>
    );
  }

  // Render with CSS shimmer effects
  return (
    <ShimmerWrapper
      variant={variant}
      className={`${baseClasses} ${isHovered && hover ? 'shimmer-hover' : ''}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      darkMode={darkMode}
      showContent={true}
      {...props}
    >
      {children}
    </ShimmerWrapper>
  );
};

// Preset card components for common use cases
export const ShimmerHeroCard = ({ title, subtitle, image, ...props }) => (
  <ShimmerCard variant="glass" hover={true} {...props}>
    <div className="p-6">
      {image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        </div>
      )}
      <ShimmerText variant="gold" trigger="hover" tag="h3" className="text-xl font-bold mb-2">
        {title}
      </ShimmerText>
      <p className="text-gray-600 dark:text-gray-300">
        {subtitle}
      </p>
    </div>
  </ShimmerCard>
);

export const ShimmerProjectCard = ({ title, description, tags = [], ...props }) => (
  <ShimmerCard variant="rainbow" hover={true} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg" {...props}>
    <div className="p-6">
      <ShimmerText variant="rainbow" trigger="hover" tag="h4" className="text-lg font-semibold mb-3">
        {title}
      </ShimmerText>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </ShimmerCard>
);

export const ShimmerTestimonialCard = ({ quote, author, role, avatar, ...props }) => (
  <ShimmerCard variant="glass" hover={true} className="bg-white/80 dark:bg-gray-800/80 rounded-xl backdrop-blur-sm" {...props}>
    <div className="p-6">
      <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4">
        "{quote}"
      </blockquote>
      <div className="flex items-center">
        {avatar && (
          <img src={avatar} alt={author} className="w-10 h-10 rounded-full mr-3" />
        )}
        <div>
          <ShimmerText variant="gold" trigger="hover" tag="p" className="font-semibold">
            {author}
          </ShimmerText>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  </ShimmerCard>
);

export default ShimmerCard; 