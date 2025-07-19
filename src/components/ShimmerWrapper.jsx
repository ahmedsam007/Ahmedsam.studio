import React from 'react';
import '../styles/shimmer.css';

const ShimmerWrapper = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  shape = 'rounded', 
  speed = 'normal',
  isLoading = false,
  className = '',
  style = {},
  showContent = true,
  darkMode = false,
  ...props 
}) => {
  // Shimmer variant classes
  const variantClasses = {
    default: 'shimmer-wrapper',
    glass: 'shimmer-glass',
    rainbow: 'shimmer-rainbow',
    gold: 'shimmer-gold',
    skeleton: 'shimmer-skeleton'
  };

  // Size classes
  const sizeClasses = {
    xs: 'shimmer-xs',
    sm: 'shimmer-sm',
    md: 'shimmer-md',
    lg: 'shimmer-lg',
    xl: 'shimmer-xl'
  };

  // Shape classes
  const shapeClasses = {
    default: '',
    rounded: 'shimmer-rounded',
    'rounded-lg': 'shimmer-rounded-lg',
    'rounded-xl': 'shimmer-rounded-xl',
    circle: 'shimmer-circle'
  };

  // Speed classes
  const speedClasses = {
    slow: 'shimmer-slow',
    normal: '',
    fast: 'shimmer-fast'
  };

  // Build class names
  const shimmerClasses = [
    variantClasses[variant],
    sizeClasses[size],
    shapeClasses[shape],
    speedClasses[speed],
    darkMode ? 'dark' : '',
    className
  ].filter(Boolean).join(' ');

  // If not loading and we should show content, render children without shimmer
  if (!isLoading && showContent) {
    return <div className={className} style={style} {...props}>{children}</div>;
  }

  // If loading or we want shimmer effect, render with shimmer
  return (
    <div 
      className={shimmerClasses}
      style={style}
      {...props}
    >
      {(showContent && children) ? children : null}
    </div>
  );
};

export default ShimmerWrapper; 