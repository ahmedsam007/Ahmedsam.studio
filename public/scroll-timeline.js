// scroll-timeline polyfill from https://github.com/flackr/scroll-timeline
(function () {
  'use strict';

  // Public API
  // ----------------
  window.ScrollTimeline = ScrollTimeline;

  const DEFAULT_OPTIONS = {
    scrollSource: document.scrollingElement,
    orientation: 'block',
    fill: 'auto'
  };

  // Represents the timeline for a scroll animation.
  function ScrollTimeline(options = {}) {
    // Parse options using default values for undefined parameters.
    this.scrollSource = options.scrollSource || DEFAULT_OPTIONS.scrollSource;
    this.orientation = options.orientation || DEFAULT_OPTIONS.orientation;
    this.fill = options.fill || DEFAULT_OPTIONS.fill;

    // Basic validation
    if (!(this.scrollSource instanceof Element) && this.scrollSource !== document.scrollingElement) {
      throw new Error('ScrollTimeline: scrollSource must be an Element or document.scrollingElement');
    }

    // Setup internal state
    this._animations = new Set();
    this._prevScrollOffset = this.scrollOffset;
    
    // Start listening for scroll events
    this._setupScrollListener();
  }

  ScrollTimeline.prototype = {
    _setupScrollListener: function() {
      if (!this._scrollHandler) {
        this._scrollHandler = () => {
          const newOffset = this.scrollOffset;
          if (newOffset !== this._prevScrollOffset) {
            this._prevScrollOffset = newOffset;
            this._updateAnimations();
          }
        };
        
        // Add passive scroll listener
        this.scrollSource.addEventListener('scroll', this._scrollHandler, { passive: true });
        
        // Initial update
        this._updateAnimations();
      }
    },

    _updateAnimations: function() {
      const timelineProgress = this.getProgress();
      for (const animation of this._animations) {
        this._updateAnimation(animation, timelineProgress);
      }
    },

    _updateAnimation: function(animation, timelineProgress) {
      // Skip if animation is not running
      if (animation.playState !== 'running') return;
      
      const duration = animation.effect.getTiming().duration;
      // Apply the current time based on scroll progress
      animation.currentTime = timelineProgress * duration;
    },

    // Returns a value between 0 and 1 indicating scroll progress
    getProgress: function() {
      const scrollOffset = this.scrollOffset;
      const scrollRange = this.scrollRange;
      
      if (scrollRange === 0) return 0;
      return Math.max(0, Math.min(1, scrollOffset / scrollRange));
    },

    // Get current scroll offset based on orientation
    get scrollOffset() {
      if (this.orientation === 'block' || this.orientation === 'vertical') {
        return this.scrollSource.scrollTop;
      } else {
        return this.scrollSource.scrollLeft;
      }
    },

    // Get scroll range based on orientation
    get scrollRange() {
      if (this.orientation === 'block' || this.orientation === 'vertical') {
        return this.scrollSource.scrollHeight - this.scrollSource.clientHeight;
      } else {
        return this.scrollSource.scrollWidth - this.scrollSource.clientWidth;
      }
    }
  };

  // Patch Element.prototype.animate to support ScrollTimeline
  const originalAnimate = Element.prototype.animate;
  Element.prototype.animate = function(keyframes, options) {
    const animation = originalAnimate.call(this, keyframes, options);
    
    // Check if we're using a ScrollTimeline
    if (options && options.timeline instanceof ScrollTimeline) {
      const timeline = options.timeline;
      timeline._animations.add(animation);
      
      // Apply initial state
      const progress = timeline.getProgress();
      const duration = animation.effect.getTiming().duration;
      animation.currentTime = progress * duration;
    }
    
    return animation;
  };
})(); 