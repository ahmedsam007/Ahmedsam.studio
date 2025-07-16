import { useEffect } from 'react';

const LoadingIndicator = ({ 
  type = 'spinner', // 'spinner', 'overlay', 'inline'
  size = 'medium', // 'small', 'medium', 'large'
  text = null,
  className = '',
  darkMode = false,
  useGradientAnimation = false // Use the same gradient animation as footer logo
}) => {
  // Size configurations
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12', 
    large: 'w-20 h-20'
  };

  // Animation class based on preference
  const animationClass = useGradientAnimation ? 'animate-gradient-logo' : 'animate-pulse';

  // Render different types of loading indicators
  const renderSpinner = () => (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <div 
          className={`${sizeClasses[size]} ${animationClass}`}
        >
          <img 
            src="/images/icons/loading.svg" 
            alt="Loading..." 
            className="w-full h-full"
          />
        </div>
        {text && (
          <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'} animate-pulse`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );

  const renderOverlay = () => (
    <div className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-4 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl">
        <div 
          className={`${sizeClasses[size]} ${animationClass}`}
        >
          <img 
            src="/images/icons/loading.svg" 
            alt="Loading..." 
            className="w-full h-full"
          />
        </div>
        {text && (
          <p className="text-gray-700 dark:text-gray-300 font-medium animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );

  const renderInline = () => (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div 
        className={`${sizeClasses[size]} ${animationClass}`}
      >
        <img 
          src="/images/icons/loading.svg" 
          alt="Loading..." 
          className="w-full h-full"
        />
      </div>
      {text && (
        <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'} animate-pulse`}>
          {text}
        </span>
      )}
    </div>
  );

  // Custom CSS for gradient animation
  useEffect(() => {
    if (useGradientAnimation) {
      const style = document.createElement('style');
      style.textContent = `
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
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [useGradientAnimation]);

  // Render based on type
  switch (type) {
    case 'overlay':
      return renderOverlay();
    case 'inline':
      return renderInline();
    case 'spinner':
    default:
      return renderSpinner();
  }
};

export default LoadingIndicator; 