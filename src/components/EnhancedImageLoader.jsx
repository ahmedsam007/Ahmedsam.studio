import React, { useState, useEffect } from 'react';
import { GleamyProvider, Gold, Silver, Iridescent } from 'gleamy';
import ShimmerWrapper from './ShimmerWrapper';
import '../styles/shimmer.css';

const EnhancedImageLoader = ({ 
  src, 
  alt, 
  className = '',
  containerClassName = '',
  shimmerVariant = 'glass', // 'glass', 'gold', 'rainbow', 'skeleton'
  gleamyEffect = null, // 'gold', 'silver', 'iridescent'
  showShimmerOnHover = false,
  darkMode = false,
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);
    
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      if (onLoad) onLoad();
    };
    
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      if (onError) onError();
    };
    
    img.src = src;
  }, [src, onLoad, onError]);

  // Render Gleamy effect if specified
  const renderGleamyEffect = () => {
    if (!gleamyEffect) return null;

    const effectProps = {
      height: "100%",
      width: "100%",
      style: { position: 'absolute', top: 0, left: 0, zIndex: 1 }
    };

    switch (gleamyEffect) {
      case 'gold':
        return <Gold {...effectProps} />;
      case 'silver':
        return <Silver {...effectProps} />;
      case 'iridescent':
        return <Iridescent {...effectProps} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`relative ${containerClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Loading State with Shimmer */}
      {isLoading && (
        <ShimmerWrapper
          variant={shimmerVariant}
          shape="rounded"
          className="absolute inset-0 z-10"
          darkMode={darkMode}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white opacity-70"></div>
          </div>
        </ShimmerWrapper>
      )}
      
      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg z-10">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
      
      {/* Image with Optional Effects */}
      {imageSrc && !hasError && (
        <div className="relative">
          {/* Gleamy Provider for Premium Effects */}
          {gleamyEffect ? (
            <GleamyProvider>
              <div className="relative">
                <img
                  src={imageSrc}
                  alt={alt}
                  className={`transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
                  {...props}
                />
                {(isHovered || !showShimmerOnHover) && renderGleamyEffect()}
              </div>
            </GleamyProvider>
          ) : (
            <>
              <img
                src={imageSrc}
                alt={alt}
                className={`transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
                {...props}
              />
              {/* Hover Shimmer Effect */}
              {showShimmerOnHover && isHovered && (
                <ShimmerWrapper
                  variant={shimmerVariant}
                  className="absolute inset-0 opacity-70 pointer-events-none"
                  darkMode={darkMode}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedImageLoader; 