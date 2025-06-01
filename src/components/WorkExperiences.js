// WorkExperiences.js
// Import and re-export the default export from WorkExperiences.jsx
import WorkExperiences from './WorkExperiences.jsx';

// Re-export as default
export default WorkExperiences;

// The code below is kept for reference but won't be executed since we're using the React component
// -------------------------------------------------------------------------

/* 
// This code is no longer used directly but is kept for reference
document.addEventListener('DOMContentLoaded', () => {
  const workExpSection = document.querySelector('.work-exp-section');
  const workExpContainer = document.querySelector('.work-exp-container');
  const serviceSection = document.querySelector('.services-section, .service-section');
  
  if (!workExpSection || !workExpContainer) return;
  
  // Set the initial height to match content
  const setInitialHeight = () => {
    // Set height based on content (min 200vh to ensure enough scroll distance)
    const contentHeight = Math.max(workExpContainer.scrollHeight, window.innerHeight * 2);
    workExpSection.style.height = `${contentHeight}px`;
  };
  
  // Call once on load
  setInitialHeight();
  
  // Also call on window resize
  window.addEventListener('resize', setInitialHeight);
  
  // Handle scroll animations
  window.addEventListener('scroll', () => {
    const rect = workExpSection.getBoundingClientRect();
    const scrollPosition = window.scrollY;
    const sectionTop = scrollPosition + rect.top;
    const sectionBottom = sectionTop + rect.height;
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress through the section
    const sectionProgress = (scrollPosition - sectionTop) / (rect.height - windowHeight);
    
    // When the user has scrolled past the section
    if (scrollPosition > sectionBottom - windowHeight) {
      workExpSection.classList.add('scrolled-past');
      workExpContainer.classList.add('scrolled-past');
      
      // Ensure service section is visible and has higher z-index
      if (serviceSection) {
        serviceSection.style.zIndex = '2';
      }
    } else {
      workExpSection.classList.remove('scrolled-past');
      workExpContainer.classList.remove('scrolled-past');
      
      // Normal animation during scroll (scale, fade, etc.)
      if (sectionProgress >= 0 && sectionProgress <= 1) {
        // Apply scroll-based animations
        const scale = 1 - (sectionProgress * 0.1); // Subtle scale effect
        const opacity = 1 - (Math.max(0, sectionProgress - 0.8) * 5); // Fade out at end
        
        workExpContainer.style.transform = `scale(${scale})`;
        workExpContainer.style.opacity = opacity;
      }
    }
  });
});
*/ 