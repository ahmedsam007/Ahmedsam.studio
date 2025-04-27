import { useRef } from 'react'

const VideoSection = () => {
  const videoRef = useRef(null);



  return (
    <section 
      // Apply new padding values
      className="section w-full bg-black pt-[12rem] pb-[6rem] px-0" 
      id="video" 
      // Ensure style attribute is removed
    >
      <div className="w-full mb-8 md:mb-12 pt-[96px]">
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
        className="w-full mx-auto overflow-hidden"
      >
        <video
          ref={videoRef}
          className="w-full h-auto object-cover block pt-[12rem] pb-[12rem] px-0"
          src="/images/ahmedvideo.mp4"
          poster="/images/poster.jpeg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          // style={{ border: '3px solid lime' }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}

export default VideoSection 