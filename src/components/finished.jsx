import { useRef } from 'react';


const GreenGlobe = () => {
  

  // Adjust main container: further reduce padding
  return (
    <div className="relative py-4 bg-[#08070e] text-white flex flex-col items-center justify-center">
      {/* Counters section - reduce margin */}
      <div className="w-full max-w-6xl px-8 mb-4 order-2 sm:order-1">
        <div className="relative">
          {/* Optional: Keep or remove background effect */}
          {/* <div className="absolute inset-0 -bottom-32 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-transparent rounded-3xl -z-10 blur-md"></div> */}
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-16">
            {/* Counter Items */}
            <div className="text-center relative">
              <h3 className="counter-number text-4xl sm:text-6xl font-bold">9+</h3>
              <p className="text-lg sm:text-xl mt-2 text-gray-300">Countries</p>
              {/* Optional: Keep or remove lines */}
              {/* <div className="absolute w-px h-16 bg-gradient-to-b from-[#40FB3000] via-[#40FB3080] to-[#40FB3000] -bottom-16 left-1/2 transform -translate-x-1/2"></div> */}
            </div>
            <div className="text-center relative">
              <h3 className="counter-number text-4xl sm:text-6xl font-bold">50+</h3>
              <p className="text-lg sm:text-xl mt-2 text-gray-300">Projects</p>
              {/* <div className="absolute w-px h-16 bg-gradient-to-b from-[#40FB3000] via-[#40FB3080] to-[#40FB3000] -bottom-16 left-1/2 transform -translate-x-1/2"></div> */}
            </div>
            <div className="text-center relative">
              <h3 className="counter-number text-4xl sm:text-6xl font-bold">100%</h3>
              <p className="text-lg sm:text-xl mt-2 text-gray-300">Satisfaction</p>
              {/* <div className="absolute w-px h-16 bg-gradient-to-b from-[#40FB3000] via-[#40FB3080] to-[#40FB3000] -bottom-16 left-1/2 transform -translate-x-1/2"></div> */}
            </div>
            <div className="text-center relative">
              <h3 className="counter-number text-4xl sm:text-6xl font-bold">24/7</h3>
              <p className="text-lg sm:text-xl mt-2 text-gray-300">Support</p>
              {/* <div className="absolute w-px h-16 bg-gradient-to-b from-[#40FB3000] via-[#40FB3080] to-[#40FB3000] -bottom-16 left-1/2 transform -translate-x-1/2"></div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Title - reduce margin */}
      <div className="text-center mb-4 order-1 sm:order-2">
        <h2 className="section-title font-bold">
          {["G","l","o","b","a","l"," ","R","e","a","c","h"].map((char, i) => (
            <span
              key={i}
              className="inline-block"
             >
                {char}
            </span>
          ))}
        </h2>
      </div>

      {/* Removed Globe component and its container div */}
      {/* <div className='cursor-move absolute inset-0 top-[110vh] h-[100vh]'> ... </div> */}
    </div>
  );
};

export default GreenGlobe;


