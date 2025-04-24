import { useEffect, useRef } from 'react'

const VideoSection = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // Temporarily comment out IntersectionObserver logic
  /*
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch(error => {
              console.error("Video autoplay prevented: ", error);
            });
          } else {
            videoElement.pause();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      observer.disconnect();
    };
  }, []);
  */

  return (
    <section 
      className="section flex flex-col items-center pt-16 md:pt-20 px-4"
      id="video" 
      ref={sectionRef}
    >
      <div className="w-full mb-8 md:mb-12">
        <h2 className="text-center section-title" ani-section-title="" textkey="2d7v0" zn-text="">
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', height: 'fit-content', display: 'inline-flex', alignItems: 'baseline' }}>
            <span className="section-title-char">P</span>
            <span className="section-title-char">u</span>
            <span className="section-title-char">s</span>
            <span className="section-title-char">h</span>
            <span className="section-title-char">i</span>
            <span className="section-title-char">n</span>
            <span className="section-title-char">g</span>
            <span className="section-title-char">&nbsp;</span>
            <span className="section-title-char">B</span>
            <span className="section-title-char">o</span>
            <span className="section-title-char">u</span>
            <span className="section-title-char">n</span>
            <span className="section-title-char">d</span>
            <span className="section-title-char">a</span>
            <span className="section-title-char">r</span>
            <span className="section-title-char">i</span>
            <span className="section-title-char">e</span>
            <span className="section-title-char">s</span>
          </span>
        </h2>
      </div>
      
      <div 
        className="w-full max-w-5xl mx-auto bg-blue-500 rounded-lg overflow-hidden" 
        style={{ aspectRatio: '16 / 9', minHeight: '200px' }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover block"
          src="/images/ahmedvideo.mp4"
          poster="/images/poster.jpeg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{ border: '3px solid lime' }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}

export default VideoSection 