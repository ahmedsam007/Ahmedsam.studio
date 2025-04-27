import { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const cursorDotRef = useRef(null)
  const cursorCircleRef = useRef(null)
  const requestRef = useRef(null)
  const previousTimeRef = useRef(null)
  
  // Store target mouse position
  const mousePos = useRef({ x: 0, y: 0 })
  // Store current cursor position (for smooth interpolation)
  const cursorPos = useRef({ dotX: 0, dotY: 0, circleX: 0, circleY: 0 })
  // Configurable smoothing factor (lower = slower/smoother)
  const lerpFactor = 0.15

  // Effect for Custom Cursor
  useEffect(() => {
    const cursorDot = cursorDotRef.current
    const cursorCircle = cursorCircleRef.current
    
    if (!cursorDot || !cursorCircle) return
    
    // Update target mouse position
    const handleMouseMove = (event) => {
      mousePos.current = { x: event.clientX, y: event.clientY }
    }
    
    // Animation loop using requestAnimationFrame
    const animateCursor = (time) => {
      if (previousTimeRef.current !== undefined) {
        // Linear interpolation (lerp) for smooth movement
        cursorPos.current.dotX += (mousePos.current.x - cursorPos.current.dotX) * lerpFactor
        cursorPos.current.dotY += (mousePos.current.y - cursorPos.current.dotY) * lerpFactor
        
        // Slightly different lerp for the circle for a trailing effect
        cursorPos.current.circleX += (mousePos.current.x - cursorPos.current.circleX) * (lerpFactor * 0.7)
        cursorPos.current.circleY += (mousePos.current.y - cursorPos.current.circleY) * (lerpFactor * 0.7)

        // Apply transform for smoother rendering
        cursorDot.style.transform = `translate3d(${cursorPos.current.dotX}px, ${cursorPos.current.dotY}px, 0)`
        cursorCircle.style.transform = `translate3d(${cursorPos.current.circleX}px, ${cursorPos.current.circleY}px, 0)`
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animateCursor)
    }

    // Start the animation loop
    requestRef.current = requestAnimationFrame(animateCursor)

    // Interactive elements that change cursor on hover
    const interactiveElements = document.querySelectorAll('a, button, .interactive')
    
    const handleMouseOver = () => {
      cursorDot.classList.add('hover')
      cursorCircle.classList.add('hover')
    }
    
    const handleMouseOut = () => {
      cursorDot.classList.remove('hover')
      cursorCircle.classList.remove('hover')
    }
    
    const handleMouseDown = () => {
      cursorDot.classList.add('active')
      cursorCircle.classList.add('active')
    }
    
    const handleMouseUp = () => {
      cursorDot.classList.remove('active')
      cursorCircle.classList.remove('active')
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver)
      el.addEventListener('mouseout', handleMouseOut)
    })
    
    // Cleanup function
    return () => {
      // Cancel the animation frame request
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver)
        el.removeEventListener('mouseout', handleMouseOut)
      })
    }
  }, [])
  
  return (
    <>
      <div className="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-circle" ref={cursorCircleRef}></div>
    </>
  )
}

export default CustomCursor 