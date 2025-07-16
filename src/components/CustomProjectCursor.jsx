import { useRef, useEffect, useState } from 'react';

function CustomProjectCursor({ isVisible, mousePosition }) {
  const cursorRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  // Animate rotation continuously
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50); // Smooth rotation

    return () => clearInterval(interval);
  }, [isVisible]);

  // Update cursor position
  useEffect(() => {
    if (cursorRef.current && isVisible) {
      cursorRef.current.style.left = `${mousePosition.x}px`;
      cursorRef.current.style.top = `${mousePosition.y}px`;
    }
  }, [mousePosition, isVisible]);

  if (!isVisible) return null;

  const text = "OPEN THE PROJECT • ";
  const radius = 35;
  const chars = text.split('');

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
      style={{
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease-out'
      }}
    >
      {/* Main cursor circle */}
      <div 
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#21ff94',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Circular text */}
        <div className="absolute inset-0">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            className="absolute inset-0"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <defs>
              <path
                id="circle-path"
                d="M 40, 40 m -30, 0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
              />
            </defs>
            <text
              fontSize="9"
              fontWeight="600"
              fill="#000000"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="1px"
            >
              <textPath href="#circle-path" startOffset="0%">
                {text.repeat(3)}
              </textPath>
            </text>
          </svg>
        </div>

        {/* Center dot */}
        <div 
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: '#000000'
          }}
        />
      </div>
    </div>
  );
}

export default CustomProjectCursor; 