import React, { useState, useEffect } from 'react';
import '../styles/shimmer.css';

const ShimmerText = ({ 
  children,
  text,
  variant = 'default',
  trigger = 'auto', // 'auto', 'hover', 'click', 'scroll'
  delay = 0,
  duration = 2000,
  className = '',
  style = {},
  tag = 'span',
  onAnimationComplete,
  ...props 
}) => {
  const [isAnimating, setIsAnimating] = useState(trigger === 'auto');
  const [hasAnimated, setHasAnimated] = useState(false);

  // Variant classes
  const variantClasses = {
    default: 'shimmer-text',
    rainbow: 'shimmer-text rainbow',
    gold: 'shimmer-text gold'
  };

  // Handle different trigger types
  useEffect(() => {
    if (trigger === 'auto' && !hasAnimated) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        setHasAnimated(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay, hasAnimated]);

  useEffect(() => {
    if (trigger === 'scroll' && !hasAnimated) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setIsAnimating(true);
                setHasAnimated(true);
              }, delay);
            }
          });
        },
        { threshold: 0.5 }
      );

      const element = document.getElementById(`shimmer-text-${Math.random()}`);
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }
  }, [trigger, delay, hasAnimated]);

  // Handle animation end
  useEffect(() => {
    if (isAnimating && duration > 0) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, onAnimationComplete]);

  // Event handlers
  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsAnimating(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsAnimating(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsAnimating(!isAnimating);
    }
  };

  // Build class names
  const textClasses = [
    isAnimating ? variantClasses[variant] : '',
    className
  ].filter(Boolean).join(' ');

  // Custom styles for animation
  const textStyle = {
    ...style,
    animationDuration: duration > 0 ? `${duration / 1000}s` : undefined,
    animationDelay: delay > 0 ? `${delay / 1000}s` : undefined
  };

  // Create the component
  const Tag = tag;
  const content = text || children;

  return (
    <Tag
      className={textClasses}
      style={textStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      id={trigger === 'scroll' ? `shimmer-text-${Math.random()}` : undefined}
      {...props}
    >
      {content}
    </Tag>
  );
};

// Higher-order component for easy wrapping
export const withShimmer = (Component, shimmerProps = {}) => {
  return (props) => (
    <ShimmerText {...shimmerProps} {...props}>
      <Component {...props} />
    </ShimmerText>
  );
};

export default ShimmerText; 