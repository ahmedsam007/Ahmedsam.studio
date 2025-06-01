import React, { useEffect, useRef, useCallback, useState } from 'react';
import './WorkExperiences.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

// Import required GSAP plugins separately
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

// Register plugins outside component to ensure they're registered globally
gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger);

// Add some additional styles to make buttons more clickable
const buttonStyles = {
  cursor: 'pointer',
  position: 'relative',
  zIndex: 10,
  userSelect: 'none'
};

// Style for button children to ensure clicks pass through to the button
const buttonChildrenStyles = { pointerEvents: 'none' };

// Work experience data
const workExperiences = [
  {
    id: 1,
    image: "/images/unicc.jpeg",
    logo: "/images/UNICClogo.png",
    caption: "Full time",
    description: "Led frontend development for United Nations digital projects. Created accessible web applications used by international organizations worldwide.",
    alt: "UNICC work experience"
  },
  {
    id: 2,
    image: "/images/freelancer.png",
    logo: "/images/upwork-logo.png",
    caption: "Freelancer",
    description: "Worked with multiple clients on website development and UX/UI design. Delivered custom solutions for businesses across different sectors.",
    alt: "Abstract layout By FAKURIANDESIGN through Unsplash"
  },
  {
    id: 3,
    image: "/images/fasrly.png",
    logo: "/images/fasrlylogo.png",
    caption: "Part time",
    description: "Built e-commerce platforms and custom CMS solutions. Improved conversion rates and user experience for online retail clients.",
    alt: "Abstract layout By FAKURIANDESIGN through Unsplash"
  },
  {
    id: 4,
    image: "/images/elham.png",
    logo: "/images/elham-logo.png",
    caption:"Part time",
    description: "Developed innovative web solutions for emerging tech startups. Created responsive designs and interactive features for enhanced user engagement.",
    alt: "Elham work experience"
  }
];

const customYears = ['2016', '2019', '2019', '2020']; // Define your custom years array
const customTotals = ['Present', '2020', '2020']; // Define corresponding totals for each year

const WorkExperiences = () => {
  const wrapperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const stepsParentRef = useRef(null);
  const totalElementRef = useRef(null);
  const loopApiRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  
  // Animate title on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add('active');
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // horizontalLoop function, adapted to run within a GSAP context provided by useEffect
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};

    if (!gsap || !Draggable) {
      console.error("GSAP or Draggable not found in horizontalLoop");
      return null;
    }

    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate: onChange && function() {
          let i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        },
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      spaceBefore = [],
      xPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
      timeOffset = 0,
      container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth,
      getTotalWidth = () => items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + spaceBefore[0] + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(), b2;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, {
          xPercent: i => xPercents[i]
        });
        totalWidth = getTotalWidth();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
        center && times.forEach((t, i) => {
          times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
        });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0, d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = xPercents[i] / 100 * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
            .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
      },
      onResize = () => refresh(true),
      proxy;

    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);

    function toIndex(index, vars) {
      vars = vars || {};
      (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      proxy && gsap.killTweensOf(proxy); 
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
    }

    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = setCurrent => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
    tl.next = vars => toIndex(tl.current() + 1, vars);
    tl.previous = vars => toIndex(tl.current() - 1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);

    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }

    if (config.draggable) {
      proxy = document.createElement("div");
      let wrap = gsap.utils.wrap(0, 1),
        ratio, startProgress, draggable, dragSnap, lastSnap, initChangeX, wasPlaying,
        align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        syncIndex = () => tl.closestIndex(true);
      
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPressInit() {
          let x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = (startProgress / -ratio) - x;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value) {
          if (Math.abs(startProgress / -ratio - this.x) < 10 && typeof lastSnap !== 'undefined') {
            return lastSnap + initChangeX;
          }
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        }
      })[0];
      tl.draggable = draggable;
    }

    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);

    return tl;
  }
  
  const handleNextClick = useCallback(() => {
    console.log("Next button CLICKED (React synthetic event)");
    if (loopApiRef.current && typeof loopApiRef.current.next === 'function') {
      loopApiRef.current.next({ ease: "power3", duration: 0.725 });
    } else {
      console.error("loopApiRef.current or .next is invalid in handleNextClick", { loopApi: loopApiRef.current });
    }
  }, []);

  const handlePrevClick = useCallback(() => {
    console.log("Prev button CLICKED (React synthetic event)");
    if (loopApiRef.current && typeof loopApiRef.current.previous === 'function') {
      loopApiRef.current.previous({ ease: "power3", duration: 0.725 });
    } else {
      console.error("loopApiRef.current or .previous is invalid in handlePrevClick", { loopApi: loopApiRef.current });
    }
  }, []);
  
  useEffect(() => {
    let ctx;
    let loopApi;

    const initSlider = () => {
      console.log("Starting slider initialization");
      const wrapper = wrapperRef.current;
      const slides = wrapper ? gsap.utils.toArray(wrapper.querySelectorAll('[data-slider="slide"]')) : [];
      
      const nextButtonElement = nextButtonRef.current; 
      const prevButtonElement = prevButtonRef.current;

      const totalElement = totalElementRef.current;
      const stepsParent = stepsParentRef.current;

      console.log("Refs:", { wrapper, slidesLength: slides.length, nextButtonElement, prevButtonElement, totalElement, stepsParent });

      if (!wrapper || !slides.length || !nextButtonElement || !prevButtonElement || !totalElement || !stepsParent) {
        console.warn("Required slider elements not found during initSlider.");
        return null;
      }

      if (!(nextButtonElement instanceof HTMLElement) || !(prevButtonElement instanceof HTMLElement)) {
         console.error("Button refs do not point to HTMLElements!", {nextButtonElement, prevButtonElement});
         return null;
      }

      if (document.body.contains(nextButtonElement) && document.body.contains(prevButtonElement)) {
        console.log("Button elements are confirmed in the document (for ref purposes).");
      } else {
        console.warn("Button elements may NOT be in the document (for ref purposes).");
      }
      
      console.log(`Found ${slides.length} slides`);
      let activeElement;
      const totalSlides = slides.length;

      // Update total slides text, prepend 0 if less than 10
      totalElement.textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides;

      // Create step elements dynamically
      stepsParent.innerHTML = ''; 
      slides.forEach((_, index) => {
        const stepClone = document.createElement('h2');
        stepClone.setAttribute('data-slide-count', 'step');
        stepClone.className = 'count-heading';
        stepClone.textContent = customYears[index] || (index + 1 < 10 ? `0${index + 1}` : index + 1);
        stepsParent.appendChild(stepClone);
      });

      const allSteps = stepsParent.querySelectorAll('[data-slide-count="step"]');
      console.log(`Created ${allSteps.length} step indicators`);
      
      console.log("Creating horizontal loop");
      const currentLoopApi = horizontalLoop(slides, {
        paused: true,
        draggable: true, 
        center: false,
        onChange: (element, index) => { 
          console.log(`Loop onChange - Element:`, element, `Index: ${index}`);
          
          // We add the active class to the 'next' element because our design is offset slightly.
          activeElement && activeElement.classList.remove("active");
          const nextSibling = element.nextElementSibling || slides[0]; 
          nextSibling.classList.add("active");
          activeElement = nextSibling;
          
          // Update the total element based on current slide index
          if (totalElement) {
            if (index === 0) totalElement.textContent = customTotals[0]; // 2016 -> present
            else if (index === 1) totalElement.textContent = customTotals[1]; // 2019 -> 2020
            else if (index === 2) totalElement.textContent = customTotals[2]; // 2020 -> 2020
            else totalElement.textContent = '2024'; // Default fallback to 2024
          }
          
          // Update description text based on current slide - use nextSibling index
          const descriptionElement = document.querySelector('.experience-description');
          if (descriptionElement) {
            const nextSiblingIndex = slides.indexOf(nextSibling);
            const descriptionIndex = nextSiblingIndex >= 0 ? nextSiblingIndex : 0;
            
            gsap.to(descriptionElement, {
              opacity: 0,
              y: -10,
              duration: 0.2,
              onComplete: () => {
                descriptionElement.textContent = workExperiences[descriptionIndex].description || '';
                gsap.to(descriptionElement, {
                  opacity: 0.8,
                  y: 0,
                  duration: 0.3,
                  delay: 0.1
                });
              }
            });
          }
          
          // Move the number to the correct spot
          gsap.to(allSteps, { y: `${-100 * index}%`, ease: "power3", duration: 0.45 });

          if (logoRef.current) {
            const nextSiblingIndex = slides.indexOf(nextSibling);
            const logoIndex = nextSiblingIndex >= 0 ? nextSiblingIndex : 0;
            logoRef.current.src = workExperiences[logoIndex].logo;
            logoRef.current.alt = workExperiences[logoIndex].caption + ' logo';
          }
        }
      });
      
      if (!currentLoopApi) {
        console.error("Failed to create horizontal loop");
        return null;
      }
      
      loopApiRef.current = currentLoopApi;

      // Similar to above, we substract 1 from our clicked index on click because our design is offset
      slides.forEach((slide, i) => {
        const handleSlideClick = () => {
          console.log(`Slide ${i + 1} clicked, calling toIndex: ${i - 1}`);
          if(loopApiRef.current) loopApiRef.current.toIndex(i - 1, { ease: "power3", duration: 0.725 });
        };
        slide.removeEventListener("click", handleSlideClick); 
        slide.addEventListener("click", handleSlideClick); 
      });
      
      console.log("Button event listeners are now handled by React's onClick prop.");
      return currentLoopApi;
    };

    // Initialize within a GSAP context
    ctx = gsap.context(() => {
      loopApi = initSlider();
    });

    // Cleanup function
    return () => {
      console.log("Cleaning up WorkExperiences component");
      if (ctx) {
        console.log("Reverting GSAP context");
        ctx.revert();
      }
      loopApiRef.current = null;
      console.log("GSAP context reverted. Loop API ref cleared.");
    };
  }, []);

  return (
    <div ref={sectionRef} className="work-exp-section dark">
      <div className="work-exp-header work-exp-header-fixed">
        <h1 
          className="work-exp-title section-title text-h1 font-mona"
          ref={titleRef}
          style={{ 
            fontWeight: 700,
            fontSize: '5rem',
            marginBottom: '2rem'
          }}
        >
          The UX Odyssey
        </h1>
        <p className="work-exp-subtitle">Nine years of crafting human-centric flows.</p>
      </div>
      <div ref={containerRef} className="work-exp-container dark">
        <section className="cloneable">
          <div className="overlay">
            <div className="overlay-inner">
              <div className="overlay-count-row">
                <div className="count-column" ref={stepsParentRef}>
                  <h2 data-slide-count="step" className="count-heading">2016</h2>
                </div>
                <div className="count-row-divider"></div>
                <div className="count-column">
                  <h2 data-slide-count="total" ref={totalElementRef} className="count-heading">PRESENT</h2>
                </div>
              </div>
              {/* Logo area */}
              <div className="logo-area">
                <img
                  className="slide-logo"
                  src={workExperiences[0].logo}
                  alt={workExperiences[0].caption + ' logo'}
                  ref={logoRef}
                />
              </div>
              {/* Description area */}
              <div className="description-area">
                <p className="experience-description">{workExperiences[0].description}</p>
              </div>
              <div className="overlay-nav-row">
                <button aria-label="previous slide" data-slider="button-prev" className="button" ref={prevButtonRef} style={buttonStyles} onClick={handlePrevClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 17 12" fill="none" className="button-arrow" style={buttonChildrenStyles}>
                    <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" fill="currentColor"></path>
                  </svg>
                  <div className="button-overlay" style={buttonChildrenStyles}>
                    <div className="overlay-corner"></div>
                    <div className="overlay-corner top-right"></div>
                    <div className="overlay-corner bottom-left"></div>
                    <div className="overlay-corner bottom-right"></div>
                  </div>
                </button>
                <button aria-label="next slide" data-slider="button-next" className="button" ref={nextButtonRef} style={buttonStyles} onClick={handleNextClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 17 12" fill="none" className="button-arrow next" style={buttonChildrenStyles}>
                    <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" fill="currentColor"></path>
                  </svg>
                  <div className="button-overlay" style={buttonChildrenStyles}>
                    <div className="overlay-corner"></div>
                    <div className="overlay-corner top-right"></div>
                    <div className="overlay-corner bottom-left"></div>
                    <div className="overlay-corner bottom-right"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="main">
            <div className="slider-wrap">
              <div data-slider="list" className="slider-list" ref={wrapperRef} style={{touchAction: "pan-y"}}>
                {workExperiences.map((exp) => (
                  <div data-slider="slide" className="slider-slide" key={exp.id}>
                    <div className="slide-inner">
                      <img 
                        src={exp.image} 
                        loading="lazy" 
                        sizes="(max-width: 479px) 100vw, 560px"
                        alt={exp.alt}
                      />
                      <div className="slide-caption">
                        <div className="caption-dot"></div>
                        <p className="caption">{exp.caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WorkExperiences; 