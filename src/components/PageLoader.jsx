import { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';

const PageLoader = ({ onLoadComplete, minLoadTime = 1500 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let resourcesLoaded = 0;
    let totalResources = 0;
    let documentReady = false;

    // Track document ready state
    const updateDocumentProgress = () => {
      if (document.readyState === 'loading') {
        setProgress(10); // Document is loading
      } else if (document.readyState === 'interactive') {
        setProgress(30); // Document has finished loading and parsing
        documentReady = true;
      } else if (document.readyState === 'complete') {
        setProgress(50); // Document and all resources have finished loading
        documentReady = true;
      }
    };

    // Initial document state check
    updateDocumentProgress();

    // Listen for document ready state changes
    const handleReadyStateChange = () => {
      updateDocumentProgress();
    };

    document.addEventListener('readystatechange', handleReadyStateChange);

    // Track resource loading
    const trackResources = () => {
      // Get all images
      const images = document.querySelectorAll('img');
      // Get all stylesheets
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      // Get all scripts
      const scripts = document.querySelectorAll('script[src]');

      totalResources = images.length + stylesheets.length + scripts.length;

      const updateProgress = () => {
        const baseProgress = documentReady ? 50 : 30;
        const resourceProgress = totalResources > 0 ? (resourcesLoaded / totalResources) * 40 : 40;
        const newProgress = Math.min(baseProgress + resourceProgress, 90);
        setProgress(newProgress);

        // Check if all resources are loaded
        if (resourcesLoaded >= totalResources && documentReady) {
          setProgress(100);
          setTimeout(() => {
            setIsLoading(false);
            if (onLoadComplete) {
              onLoadComplete();
            }
          }, 300);
        }
      };

      // Track image loading
      images.forEach(img => {
        if (img.complete) {
          resourcesLoaded++;
        } else {
          img.addEventListener('load', () => {
            resourcesLoaded++;
            updateProgress();
          });
          img.addEventListener('error', () => {
            resourcesLoaded++; // Count failed loads too
            updateProgress();
          });
        }
      });

      // Track stylesheet loading
      stylesheets.forEach(link => {
        if (link.sheet) {
          resourcesLoaded++;
        } else {
          link.addEventListener('load', () => {
            resourcesLoaded++;
            updateProgress();
          });
          link.addEventListener('error', () => {
            resourcesLoaded++;
            updateProgress();
          });
        }
      });

      // Track script loading
      scripts.forEach(script => {
        script.addEventListener('load', () => {
          resourcesLoaded++;
          updateProgress();
        });
        script.addEventListener('error', () => {
          resourcesLoaded++;
          updateProgress();
        });
      });

      updateProgress();
    };

    // Wait for DOM to be ready before tracking resources
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', trackResources);
    } else {
      trackResources();
    }

    // Fallback: ensure loading completes within reasonable time
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        if (onLoadComplete) {
          onLoadComplete();
        }
      }, 300);
    }, Math.max(minLoadTime, 5000)); // Max 5 seconds or minLoadTime

    // Listen for window load event (all resources loaded)
    const handleWindowLoad = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        if (onLoadComplete) {
          onLoadComplete();
        }
      }, 300);
    };

    window.addEventListener('load', handleWindowLoad);

    return () => {
      document.removeEventListener('readystatechange', handleReadyStateChange);
      document.removeEventListener('DOMContentLoaded', trackResources);
      window.removeEventListener('load', handleWindowLoad);
      clearTimeout(fallbackTimer);
    };
  }, [onLoadComplete, minLoadTime]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 animate-gradient-logo">
              <img 
                src="/images/icons/loading.svg" 
                alt="Loading..." 
                className="w-full h-full"
              />
            </div>
            {/* Live progress text */}
            <div className="text-center">
              <p className="text-lg font-medium text-white">
                {Math.round(progress)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-gradient-logo {
          filter: hue-rotate(0deg);
          animation: gradientShift 4s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0% { filter: hue-rotate(0deg) brightness(1) saturate(1); }
          25% { filter: hue-rotate(90deg) brightness(1.1) saturate(1.2); }
          50% { filter: hue-rotate(180deg) brightness(1.2) saturate(1.4); }
          75% { filter: hue-rotate(270deg) brightness(1.1) saturate(1.2); }
          100% { filter: hue-rotate(360deg) brightness(1) saturate(1); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader; 