import { useEffect } from 'react'

const VideoSection = () => {
  // Initialize video and animation elements
  useEffect(() => {
    const videoSection = document.getElementById('video')
    
    // Add active class to trigger animations when section is visible
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      
      if (scrollPosition > window.innerHeight * 0.5) {
        videoSection?.classList.add('active')
      } else {
        videoSection?.classList.remove('active')
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return (
    <section className="section" id="video">
      <div className="section-bg"></div>
      <div className="overlay-glow"></div>
      
      <div className="section-content relative z-10">
        <div className="absolute inset-0 bg-black/90"></div>
        <div className="relative z-20 flex flex-col items-center h-full pt-20">
          {/* Headline first with proper margin */}
          <div className="w-full mb-12 video-content">
            <h2 className="text-center font-mot:text-48px mot:leading-[1.17] mot:mx-auto pc:text-68px pc:leading-[1.35] pc:pb-[3.3vw] mo:w-328rpx pad:w-720rpx section-title-ani text-white" ani-section-title="" textkey="2d7v0" zn-text="">
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
          
          {/* Video container below headline */}
          <div className="w-full max-w-5xl mx-auto video-content">
            <div className="video-container">
              <div className="w-full relative rounded-[24px] md:rounded-[32px] overflow-hidden bg-gray-900 shadow-2xl">
                {/* Video Player */}
                <video 
                  className="w-full h-full object-cover" 
                  style={{ aspectRatio: '16/9' }}
                  src="/images/ahmedvideo.mp4" 
                  poster="/images/poster.jpg" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
                {/* Video overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection 