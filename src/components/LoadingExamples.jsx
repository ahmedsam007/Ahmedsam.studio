import { useState } from 'react';
import LoadingIndicator from './LoadingIndicator';
import ImageLoader from './ImageLoader';
import PageLoader from './PageLoader';

const LoadingExamples = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsButtonLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsButtonLoading(false);
  };

  const handlePageLoaderDemo = () => {
    setShowPageLoader(true);
  };

  const handlePageLoaderComplete = () => {
    setShowPageLoader(false);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Loading Indicators Demo
      </h1>

      {/* Page Loader Demo */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Page Loader
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Full-screen loading with animated background and progress bar
        </p>
        <button
          onClick={handlePageLoaderDemo}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Show Page Loader
        </button>
        {showPageLoader && (
          <PageLoader onLoadComplete={handlePageLoaderComplete} minLoadTime={3000} />
        )}
      </section>

      {/* Spinner Variations */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Spinner Variations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Small Spinner */}
          <div className="text-center p-4 border rounded-lg">
            <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Small</h3>
            <LoadingIndicator 
              type="spinner"
              size="small"
              text="Loading..."
            />
          </div>

          {/* Medium Spinner */}
          <div className="text-center p-4 border rounded-lg">
            <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Medium</h3>
            <LoadingIndicator 
              type="spinner"
              size="medium"
              text="Processing..."
            />
          </div>

          {/* Large Spinner */}
          <div className="text-center p-4 border rounded-lg">
            <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Large</h3>
            <LoadingIndicator 
              type="spinner"
              size="large"
              text="Please wait..."
            />
          </div>
        </div>
      </section>

      {/* Gradient Animation Demo */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Gradient Animation (Like Footer Logo)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Regular Animation */}
          <div className="text-center p-4 border rounded-lg">
            <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Regular Pulse</h3>
            <LoadingIndicator 
              type="spinner"
              size="large"
              text="Loading..."
              useGradientAnimation={false}
            />
          </div>

          {/* Gradient Animation */}
          <div className="text-center p-4 border rounded-lg">
            <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Gradient Shift</h3>
            <LoadingIndicator 
              type="spinner"
              size="large"
              text="Loading..."
              useGradientAnimation={true}
            />
          </div>
        </div>
      </section>

      {/* Inline Loading */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Inline Loading
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300">Saving document</span>
            <LoadingIndicator 
              type="inline"
              size="small"
              text="Saving..."
            />
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300">Uploading files</span>
            <LoadingIndicator 
              type="inline"
              size="medium"
              text="Uploading..."
              darkMode={false}
            />
          </div>
        </div>
      </section>

      {/* Button Loading States */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Button Loading States
        </h2>
        <div className="space-y-4">
          <button
            onClick={handleButtonClick}
            disabled={isButtonLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isButtonLoading ? (
              <>
                <LoadingIndicator 
                  type="inline" 
                  size="small" 
                  darkMode={true}
                />
                <span>Processing...</span>
              </>
            ) : (
              'Click to Load'
            )}
          </button>
        </div>
      </section>

      {/* Overlay Loading */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Overlay Loading
        </h2>
        <button
          onClick={() => {
            setShowOverlay(true);
            setTimeout(() => setShowOverlay(false), 3000);
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Show Overlay
        </button>
        {showOverlay && (
          <LoadingIndicator 
            type="overlay"
            size="large"
            text="Loading data..."
          />
        )}
      </section>

      {/* Image Loading */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Image Loading
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Successful Image Load */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              Successful Load
            </h3>
            <ImageLoader
              src="/images/1.webp"
              alt="Portfolio Image"
              className="w-full h-48 object-cover rounded-lg"
              containerClassName="w-full h-48"
              showLoadingText={true}
            />
          </div>

          {/* Failed Image Load */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              Failed Load (Demo)
            </h3>
            <ImageLoader
              src="/nonexistent-image.jpg"
              alt="Non-existent Image"
              className="w-full h-48 object-cover rounded-lg"
              containerClassName="w-full h-48"
              showLoadingText={true}
            />
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Usage Examples
        </h2>
        <div className="space-y-4 text-sm">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Basic Spinner:</h3>
            <code className="text-gray-600 dark:text-gray-300">
              {`<LoadingIndicator type="spinner" size="medium" text="Loading..." />`}
            </code>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Inline Loading:</h3>
            <code className="text-gray-600 dark:text-gray-300">
              {`<LoadingIndicator type="inline" size="small" text="Saving..." />`}
            </code>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Image with Loading:</h3>
            <code className="text-gray-600 dark:text-gray-300">
              {`<ImageLoader src="/image.jpg" alt="Description" showLoadingText={true} />`}
            </code>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Gradient Animation:</h3>
            <code className="text-gray-600 dark:text-gray-300">
              {`<LoadingIndicator type="spinner" size="large" useGradientAnimation={true} />`}
            </code>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoadingExamples; 