import React, { useState } from 'react';
import { GleamyProvider, Gold, Silver, Iridescent, Holographic } from 'gleamy';
import ShimmerWrapper from './ShimmerWrapper';
import ShimmerText from './ShimmerText';
import ShimmerCard, { ShimmerHeroCard, ShimmerProjectCard, ShimmerTestimonialCard } from './ShimmerCard';
import EnhancedImageLoader from './EnhancedImageLoader';
import '../styles/shimmer.css';

const ShimmerDemo = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen p-8 transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <ShimmerText 
            variant="rainbow" 
            trigger="auto" 
            tag="h1" 
            className="text-5xl font-bold mb-4"
          >
            ✨ Modern Shimmer Effects 2025 ✨
          </ShimmerText>
          <p className="text-lg mb-6">Discover the most trendy shimmer effects for your website</p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        {/* Text Shimmer Effects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Text Shimmer Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Default Shimmer</h3>
              <ShimmerText variant="default" trigger="hover" className="text-2xl font-bold">
                Hover me!
              </ShimmerText>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Rainbow Shimmer</h3>
              <ShimmerText variant="rainbow" trigger="hover" className="text-2xl font-bold">
                Colorful Magic!
              </ShimmerText>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Gold Shimmer</h3>
              <ShimmerText variant="gold" trigger="hover" className="text-2xl font-bold">
                Golden Touch!
              </ShimmerText>
            </div>
          </div>
        </section>

        {/* Loading Shimmer Effects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Loading Shimmer Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Default Wrapper</h3>
              <ShimmerWrapper variant="default" size="lg" darkMode={darkMode} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Glass Effect</h3>
              <ShimmerWrapper variant="glass" size="lg" darkMode={darkMode} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Rainbow Effect</h3>
              <ShimmerWrapper variant="rainbow" size="lg" darkMode={darkMode} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Gold Effect</h3>
              <ShimmerWrapper variant="gold" size="lg" darkMode={darkMode} />
            </div>
          </div>
        </section>

        {/* Enhanced Image Loader */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Enhanced Image Loader</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-2">Glass Shimmer</h3>
              <EnhancedImageLoader
                src="/images/1.webp"
                alt="Demo Image"
                className="w-full h-32 object-cover rounded-lg"
                shimmerVariant="glass"
                darkMode={darkMode}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Gleamy Gold</h3>
              <EnhancedImageLoader
                src="/images/2.webp"
                alt="Demo Image"
                className="w-full h-32 object-cover rounded-lg"
                gleamyEffect="gold"
                showShimmerOnHover={true}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Gleamy Silver</h3>
              <EnhancedImageLoader
                src="/images/3.webp"
                alt="Demo Image"
                className="w-full h-32 object-cover rounded-lg"
                gleamyEffect="silver"
                showShimmerOnHover={true}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Iridescent</h3>
              <EnhancedImageLoader
                src="/images/4.webp"
                alt="Demo Image"
                className="w-full h-32 object-cover rounded-lg"
                gleamyEffect="iridescent"
                showShimmerOnHover={true}
              />
            </div>
          </div>
        </section>

        {/* Gleamy Premium Effects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Premium Gleamy Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GleamyProvider>
              <div className="relative">
                <h3 className="text-sm font-semibold mb-2">Pure Gold</h3>
                <div className="relative h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg overflow-hidden">
                  <Gold height="100%" width="100%" />
                </div>
              </div>
            </GleamyProvider>
            <GleamyProvider>
              <div className="relative">
                <h3 className="text-sm font-semibold mb-2">Pure Silver</h3>
                <div className="relative h-32 bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg overflow-hidden">
                  <Silver height="100%" width="100%" />
                </div>
              </div>
            </GleamyProvider>
            <GleamyProvider>
              <div className="relative">
                <h3 className="text-sm font-semibold mb-2">Iridescent</h3>
                <div className="relative h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg overflow-hidden">
                  <Iridescent height="100%" width="100%" />
                </div>
              </div>
            </GleamyProvider>
            <GleamyProvider>
              <div className="relative">
                <h3 className="text-sm font-semibold mb-2">Holographic</h3>
                <div className="relative h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg overflow-hidden">
                  <Holographic height="100%" width="100%" />
                </div>
              </div>
            </GleamyProvider>
          </div>
        </section>

        {/* Shimmer Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Shimmer Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ShimmerHeroCard
              title="Hero Card"
              subtitle="This is a hero card with glass shimmer effect"
              image="/images/1.webp"
            />
            <ShimmerProjectCard
              title="Project Card"
              description="A project card with rainbow shimmer and dynamic text effects"
              tags={["React", "Shimmer", "2025"]}
            />
            <ShimmerTestimonialCard
              quote="This shimmer effect is absolutely stunning! It brings our website to life."
              author="Ahmed Sam"
              role="UI/UX Designer"
              avatar="/images/Center.png"
            />
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Interactive Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ShimmerCard 
              variant="glass" 
              hover={true}
              className="p-8 bg-white/20 backdrop-blur-lg border border-white/30"
            >
              <h3 className="text-xl font-bold mb-4">Glass Morphism Card</h3>
              <p className="mb-4">Hover over this card to see the enhanced shimmer effect with glassmorphism styling.</p>
              <ShimmerText variant="rainbow" trigger="hover" className="font-semibold">
                Hover for rainbow text!
              </ShimmerText>
            </ShimmerCard>

            <ShimmerCard 
              gleamyEffect="holographic"
              hover={true}
              className="p-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white"
            >
              <h3 className="text-xl font-bold mb-4">Holographic Card</h3>
              <p className="mb-4">This card uses Gleamy's holographic effect for premium visual appeal.</p>
              <ShimmerText variant="gold" trigger="hover" className="font-semibold">
                Premium Effects!
              </ShimmerText>
            </ShimmerCard>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Usage Examples</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Quick Start Code</h3>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
{`// Import components
import ShimmerText from './components/ShimmerText';
import ShimmerWrapper from './components/ShimmerWrapper';
import EnhancedImageLoader from './components/EnhancedImageLoader';

// Text shimmer
<ShimmerText variant="rainbow" trigger="hover">
  Beautiful Text!
</ShimmerText>

// Loading shimmer
<ShimmerWrapper variant="glass" isLoading={true}>
  Content here...
</ShimmerWrapper>

// Enhanced image with Gleamy effects
<EnhancedImageLoader
  src="/image.jpg"
  gleamyEffect="gold"
  showShimmerOnHover={true}
/>`}
            </pre>
          </div>
        </section>

        <div className="text-center py-8">
          <ShimmerText variant="gold" trigger="auto" tag="p" className="text-lg">
            ✨ Ready to make your website shine in 2025! ✨
          </ShimmerText>
        </div>
      </div>
    </div>
  );
};

export default ShimmerDemo; 