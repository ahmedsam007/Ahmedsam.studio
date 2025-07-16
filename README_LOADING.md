# Loading Indicators System

This project includes a comprehensive loading indicator system using your custom `loading.svg` icon. The system provides multiple components for different loading scenarios.

## Components

### 1. LoadingIndicator
The main component that provides three different display modes:

#### Props:
- `type`: 'spinner' | 'overlay' | 'inline' (default: 'spinner')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `text`: string | null (optional loading text)
- `className`: string (additional CSS classes)
- `darkMode`: boolean (optimizes colors for dark backgrounds)
- `useGradientAnimation`: boolean (use gradient color-shifting animation like footer logo)

#### Usage Examples:

```jsx
// Basic spinner
<LoadingIndicator type="spinner" size="medium" text="Loading..." />

// Inline loading for buttons/forms
<LoadingIndicator type="inline" size="small" text="Saving..." darkMode={true} />

// Full overlay
<LoadingIndicator type="overlay" size="large" text="Processing..." />

// With gradient animation (like footer logo)
<LoadingIndicator type="spinner" size="large" text="Loading..." useGradientAnimation={true} />
```

### 2. PageLoader
Full-screen loading component that tracks real website loading progress, including all resources (images, stylesheets, scripts).

#### Props:
- `onLoadComplete`: function (callback when loading completes)
- `minLoadTime`: number (minimum loading time in ms, default: 1500, also serves as fallback timeout)

#### Usage:
```jsx
const [isLoading, setIsLoading] = useState(true);

const handleLoadComplete = () => {
  setIsLoading(false);
};

if (isLoading) {
  return <PageLoader onLoadComplete={handleLoadComplete} minLoadTime={2000} />;
}
```

#### How It Works:
The PageLoader tracks real loading progress through multiple stages:
1. **Document Loading (10%)**: Initial HTML parsing
2. **Document Interactive (30%)**: DOM ready, scripts loaded
3. **Document Complete (50%)**: Basic document loading finished
4. **Resource Loading (50-90%)**: Images, stylesheets, and scripts loading
5. **Complete (100%)**: All resources loaded successfully

**Real Resource Tracking:**
- Monitors all `<img>` elements loading
- Tracks `<link rel="stylesheet">` loading
- Monitors `<script src="...">` loading
- Uses `document.readyState` for document phases
- Listens to `window.load` event for final completion

**Safety Features:**
- Fallback timer prevents indefinite loading (max 5 seconds or `minLoadTime`)
- Handles failed resource loads gracefully
- Multiple completion triggers ensure reliable behavior

### 3. ImageLoader
Smart image loading component with loading states and error handling.

#### Props:
- `src`: string (image source)
- `alt`: string (alt text)
- `className`: string (image CSS classes)
- `containerClassName`: string (container CSS classes)
- `showLoadingText`: boolean (show "Loading image..." text)
- `darkMode`: boolean (dark mode styling)
- `onLoad`: function (callback when image loads)
- `onError`: function (callback when image fails to load)

#### Usage:
```jsx
<ImageLoader
  src="/images/portfolio-image.jpg"
  alt="Portfolio Project"
  className="w-full h-64 object-cover rounded-lg"
  containerClassName="w-full h-64"
  showLoadingText={true}
  onLoad={() => console.log('Image loaded')}
  onError={() => console.log('Image failed to load')}
/>
```

## Integration Examples

### Form Submission Loading
```jsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    await submitForm();
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <button disabled={isSubmitting}>
    {isSubmitting ? (
      <LoadingIndicator type="inline" size="small" darkMode={true} />
    ) : (
      'Submit'
    )}
  </button>
);
```

### Button Loading States
```jsx
<button
  onClick={handleAction}
  disabled={isLoading}
  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
>
  {isLoading ? (
    <>
      <LoadingIndicator type="inline" size="small" darkMode={true} />
      <span>Processing...</span>
    </>
  ) : (
    'Click Me'
  )}
</button>
```

### Data Fetching
```jsx
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetchData()
    .then(setData)
    .finally(() => setIsLoading(false));
}, []);

if (isLoading) {
  return <LoadingIndicator type="spinner" size="large" text="Loading data..." />;
}
```

## Customization

### Size Configuration
The loading indicators use these size classes:
- Small: `w-6 h-6` (24px)
- Medium: `w-12 h-12` (48px)  
- Large: `w-20 h-20` (80px)

### Animation
The loading icon supports two animation types:
1. **Pulse Animation** (default): Subtle opacity fade in/out for a gentle effect
2. **Gradient Animation**: Color-shifting animation that cycles through hue rotations, brightness, and saturation - same as your footer logo

The gradient animation uses CSS filters to create a dynamic color-shifting effect:
```css
@keyframes gradientShift {
  0% { filter: hue-rotate(0deg) brightness(1) saturate(1); }
  25% { filter: hue-rotate(90deg) brightness(1.1) saturate(1.2); }
  50% { filter: hue-rotate(180deg) brightness(1.2) saturate(1.4); }
  75% { filter: hue-rotate(270deg) brightness(1.1) saturate(1.2); }
  100% { filter: hue-rotate(360deg) brightness(1) saturate(1); }
}
```

### Dark Mode Support
Set `darkMode={true}` for components used on dark backgrounds. This optimizes text colors and transparency values.

## Best Practices

1. **Use appropriate sizes**: Small for inline elements, medium for cards, large for full-screen
2. **Provide meaningful text**: Help users understand what's happening
3. **Handle errors gracefully**: Use ImageLoader for images to show fallbacks
4. **Disable interactions**: Disable buttons/forms during loading states
5. **Consistent timing**: Use similar loading durations across your app

## File Structure
```
src/components/
├── LoadingIndicator.jsx    # Main loading component
├── PageLoader.jsx          # Full-screen loader
├── ImageLoader.jsx         # Image loading component
└── LoadingExamples.jsx     # Demo/examples component
```

## Demo
See `LoadingExamples.jsx` for a comprehensive demonstration of all loading indicator variations and usage patterns. 