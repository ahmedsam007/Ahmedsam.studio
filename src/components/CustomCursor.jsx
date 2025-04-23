import { useEffect } from 'react'

const CustomCursor = () => {
  // Effect for Custom Cursor
  useEffect(() => {
    const cursorDot = document.querySelector('.cursor-dot')
    const cursorCircle = document.querySelector('.cursor-circle')
    
    if (!cursorDot || !cursorCircle) return
    
    // Interactive elements that change cursor on hover
    const interactiveElements = document.querySelectorAll('a, button, .interactive')
    
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e
      cursorDot.style.left = `${x}px`
      cursorDot.style.top = `${y}px`
      
      // Add a small delay to the circle for smooth following effect
      setTimeout(() => {
        cursorCircle.style.left = `${x}px`
        cursorCircle.style.top = `${y}px`
      }, 50)
    }
    
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
    
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver)
      el.addEventListener('mouseout', handleMouseOut)
    })
    
    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', moveCursor)
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
      <div className="cursor-dot"></div>
      <div className="cursor-circle"></div>
    </>
  )
}

export default CustomCursor 