# ✨ Modern Shimmer Effects 2025

This project includes a comprehensive shimmer effect system with trendy 2025 visual effects for images, text, and UI components.

## 🚀 Quick Start

To see all shimmer effects in action, visit:
```
http://localhost:5173?demo=shimmer
```

## 📦 Components Included

### 1. ShimmerWrapper
Versatile wrapper component for loading states and container effects.

```jsx
import ShimmerWrapper from './components/ShimmerWrapper';

<ShimmerWrapper 
  variant="glass" 
  size="lg" 
  isLoading={true}
  darkMode={false}
>
  <YourContent />
</ShimmerWrapper>
```

**Variants:**
- `default` - Standard shimmer
- `glass` - Glassmorphism effect with backdrop blur
- `rainbow` - Multi-color iridescent effect
- `gold` - Metallic gold shimmer
- `skeleton` - Loading skeleton style

### 2. ShimmerText
Animated text with shimmer effects and multiple trigger options.

```jsx
import ShimmerText from './components/ShimmerText';

<ShimmerText 
  variant="rainbow" 
  trigger="hover" 
  className="text-2xl font-bold"
>
  Beautiful Text!
</ShimmerText>
```

**Variants:**
- `default` - White shimmer
- `rainbow` - Multi-color rainbow
- `gold` - Golden metallic

**Triggers:**
- `auto` - Automatic on load
- `hover` - On mouse hover
- `click` - On click
- `scroll` - On scroll into view

### 3. EnhancedImageLoader
Advanced image loader with shimmer loading states and premium Gleamy effects.

```jsx
import EnhancedImageLoader from './components/EnhancedImageLoader';

<EnhancedImageLoader
  src="/image.jpg"
  alt="Demo Image"
  shimmerVariant="glass"
  gleamyEffect="gold"
  showShimmerOnHover={true}
/>
```

**Gleamy Effects (Premium):**
- `gold` - Gold metallic effect
- `silver` - Silver metallic effect
- `iridescent` - Color-shifting effect
- `holographic` - Holographic effect

### 4. ShimmerCard
Card components with built-in shimmer effects and hover animations.

```jsx
import ShimmerCard, { ShimmerHeroCard, ShimmerProjectCard } from './components/ShimmerCard';

<ShimmerCard variant="glass" hover={true}>
  <div className="p-6">Your card content</div>
</ShimmerCard>

<ShimmerHeroCard
  title="Hero Card"
  subtitle="Description"
  image="/image.jpg"
/>
```

## 🎨 CSS Classes

All shimmer effects come with CSS utility classes:

```css
/* Base shimmer effects */
.shimmer-wrapper
.shimmer-glass
.shimmer-rainbow
.shimmer-gold
.shimmer-skeleton

/* Text effects */
.shimmer-text
.shimmer-text.rainbow
.shimmer-text.gold

/* Size variants */
.shimmer-xs, .shimmer-sm, .shimmer-md, .shimmer-lg, .shimmer-xl

/* Shape variants */
.shimmer-circle, .shimmer-rounded, .shimmer-rounded-lg

/* Speed variants */
.shimmer-slow, .shimmer-fast

/* Utility classes */
.shimmer-hover, .shimmer-infinite, .shimmer-once
```

## 🌟 Premium Effects with Gleamy

The system includes premium visual effects powered by the Gleamy library:

```jsx
import { GleamyProvider, Gold, Silver, Iridescent, Holographic } from 'gleamy';

<GleamyProvider>
  <div className="relative">
    <Gold height="100%" width="100%" />
    <YourContent />
  </div>
</GleamyProvider>
```

## 📱 Responsive & Accessible

- Respects `prefers-reduced-motion` settings
- Dark mode support
- Mobile-optimized animations
- Performance optimized with GPU acceleration

## 🎯 Integration Examples

### Hero Section with Shimmer Text
```jsx
<ShimmerText 
  variant="rainbow"
  trigger="auto"
  delay={2000}
  tag="h1"
  className="hero-title"
>
  Your Amazing Title
</ShimmerText>
```

### Loading State with Glass Effect
```jsx
<ShimmerWrapper 
  variant="glass" 
  isLoading={isLoading}
  darkMode={darkMode}
>
  {isLoading ? null : <YourContent />}
</ShimmerWrapper>
```

### Premium Image with Hover Effects
```jsx
<EnhancedImageLoader
  src="/hero-image.jpg"
  gleamyEffect="iridescent"
  showShimmerOnHover={true}
  className="w-full h-64 object-cover rounded-lg"
/>
```

## 🚀 Performance Tips

1. Use `shimmer-once` for one-time animations
2. Combine with GSAP for complex sequences
3. Preload images for smooth shimmer transitions
4. Use CSS custom properties for theme customization

## 🎨 Customization

Override CSS variables to match your brand:

```css
:root {
  --shimmer-duration: 2s;
  --shimmer-primary: rgba(your-color, 0.8);
  --shimmer-accent: rgba(your-accent, 0.6);
}
```

---

Built with ❤️ for modern web experiences in 2025! 