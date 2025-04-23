import React, { useState, useEffect, useRef } from 'react';

const Cursor = () => {
    const dotRef = useRef(null);
    const circleRef = useRef(null);
    const requestRef = useRef(null);

    const [mousePos, setMousePos] = useState({ x: -100, y: -100 }); // Start off-screen
    const [circlePos, setCirclePos] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };

        const handleMouseDown = () => {
            setIsActive(true);
        };

        const handleMouseUp = () => {
            setIsActive(false);
        };

        const handleMouseEnter = (event) => {
            if (event.target.closest('a, button, input, select, textarea, [role="button"]')) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (event) => {
            if (event.target.closest('a, button, input, select, textarea, [role="button"]')) {
                setIsHovering(false);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        // Use event delegation on the document for hover effects
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        // Animation loop for the circle
        const animateCircle = () => {
            setCirclePos(prev => {
                const dx = mousePos.x - prev.x;
                const dy = mousePos.y - prev.y;
                return {
                    x: prev.x + dx * 0.1, // Adjust easing factor (0.1 is smoother)
                    y: prev.y + dy * 0.1
                };
            });
            requestRef.current = requestAnimationFrame(animateCircle);
        };

        requestRef.current = requestAnimationFrame(animateCircle);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(requestRef.current);
        };
    }, [mousePos]); // Rerun effect only if mousePos changes for circle animation logic

    // Apply styles directly for position, use classes for states
    const dotStyle = {
        transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
    };
    const circleStyle = {
        transform: `translate(${circlePos.x}px, ${circlePos.y}px)`
    };

    const dotClasses = `cursor-dot ${isHovering ? 'hover' : ''} ${isActive ? 'active' : ''}`;
    const circleClasses = `cursor-circle ${isHovering ? 'hover' : ''} ${isActive ? 'active' : ''}`;

    return (
        <>
            <div ref={dotRef} className={dotClasses} style={dotStyle} />
            <div ref={circleRef} className={circleClasses} style={circleStyle} />
        </>
    );
};

export default Cursor; 