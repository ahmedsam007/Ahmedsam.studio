import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const sectionRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const videoRef = useRef(null);
  const textOverlayRef = useRef(null);
  const storyAnimRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stickyContainer = stickyContainerRef.current;
    const video = videoRef.current;
    const textOverlay = textOverlayRef.current;

    // Attempt to play video on user interaction
    const playVideo = () => {
      if (video && video.paused) {
        video.play().catch(error => console.error("Video play failed:", error));
      }
    };
    // Add event listeners for user interaction to play video
    document.addEventListener('click', playVideo, { once: true });
    document.addEventListener('scroll', playVideo, { once: true });
    // Fallback for browsers that might not autoplay even when muted
    if (video) {
      video.play().catch(error => {
        // Autoplay was prevented, waiting for user interaction
        console.log("Video autoplay prevented, will play on interaction.");
      });
    }

    // Base video styles
    gsap.set(video, {
      width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center center',
    });
    // Base textOverlay styles
    gsap.set(textOverlay, { opacity: 0, yPercent: 10, pointerEvents: 'none' });
    // Set initial background of the section to transparent
    gsap.set(section, { backgroundColor: 'rgba(0,0,0,0)' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%', // Increase scroll distance for a longer effect
        scrub: 1.5,    // Smoother scrubbing
        pin: stickyContainer,
        anticipatePin: 1,
        id: 'video_scroll_scrub_trigger',
      },
    });

    // Video animation: Scale down, slight blur out, then clear up
    tl.fromTo(video,
      { scale: 1.2, filter: 'brightness(70%) blur(3px)' },
      { scale: 1, filter: 'brightness(100%) blur(0px)', ease: 'power1.inOut', duration: 1 }
    )
    // Text animation: Fade in and move up, then fade out
    .fromTo(textOverlay,
      { opacity: 0, yPercent: 30 },
      { opacity: 1, yPercent: 0, ease: 'power2.out', duration: 0.6, pointerEvents: 'auto' },
      0.2 // Start text animation slightly after video animation begins
    )
    .to(textOverlay,
        { opacity: 0, yPercent: -20, ease: 'power2.in', duration: 0.4 },
        '>0.8' // Start fade out towards the end of the video animation duration
    )
    // Video exit animation: move up and scale down magnetically
    .to(video,
        { 
            yPercent: -105, // Move up more than its full height to ensure it's off-screen
            scale: 0.7,     // Scale down to give a receding effect
            ease: 'power2.in', // Accelerate as it moves out
            duration: 0.6     // Duration of the exit animation
        },
        '>-0.1' // Start this slightly before the background fade fully completes or adjust as needed
                 // This ensures it starts smoothly as the section transitions out.
    );

    return () => {
      if (tl) tl.revert(); // Reverts the timeline and its ScrollTriggers, restores initial values
      document.removeEventListener('click', playVideo);
      document.removeEventListener('scroll', playVideo);
    };
  }, []);

  useEffect(() => {
    if (!storyAnimRef.current) return;

    gsap.set(storyAnimRef.current, { opacity: 0, y: 80 });

    const anim = gsap.to(storyAnimRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // when the section top hits 80% of viewport
        toggleActions: "play none none reverse",
      }
    });

    return () => {
      anim && anim.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="video-section-scroll"
      className="w-full relative" // Removed bg-black, will be controlled by GSAP
      style={{ height: '270vh' }} // Section height: 100vh for anim, 200vh for scroll past
    >
      <div
        ref={stickyContainerRef}
        className="sticky-container w-screen h-screen top-0 left-0 overflow-hidden"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/images/ahmedvideo.mp4" // Make sure this path is correct
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          Your browser does not support the video tag.
        </video>
        <div
          ref={textOverlayRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-5 z-10"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-tight"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            Innovate & Create
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl font-light"
             style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.6)' }}>
            Discover the next wave of digital experiences.
          </p>
        </div>
      </div>
      <div className="section-content pt-32" ref={storyAnimRef}>
        {/* ...existing content... */}
      </div>
    </section>
  );
};

export default VideoSection; 