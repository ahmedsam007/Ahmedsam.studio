import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const UnifiedBackground = ({ children }) => {
    const containerRef = useRef(null);
    const starCanvasRef = useRef(null);
    const skyOverlayRef = useRef(null);

    // Enhanced Parallax Starfield Effect
    useEffect(() => {
        const canvas = starCanvasRef.current;
        if (!canvas || !containerRef.current) return;

        const updateCanvasSize = () => {
            const container = containerRef.current;
            let width = window.innerWidth;
            let height = container.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        const ctx = canvas.getContext('2d');
        let width = canvas.width;
        let height = canvas.height;
        
        // Create star layers with fewer stars, no blur - unified across both sections
        const createStarLayers = () => {
            const layers = [];
            const layerConfigs = [
                { count: Math.floor(width * height / 25000), size: [0.5, 1], speed: 0.1, alpha: [0.4, 0.6] },
                { count: Math.floor(width * height / 20000), size: [1, 1.5], speed: 0.25, alpha: [0.5, 0.7] },
                { count: Math.floor(width * height / 30000), size: [1.5, 2], speed: 0.4, alpha: [0.6, 0.8] }
            ];

            layerConfigs.forEach((config, layerIndex) => {
                const stars = Array.from({ length: config.count }).map(() => ({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * (config.size[1] - config.size[0]) + config.size[0],
                    baseAlpha: Math.random() * (config.alpha[1] - config.alpha[0]) + config.alpha[0],
                    twinkleSpeed: Math.random() * 0.01 + 0.005,
                    twinklePhase: Math.random() * Math.PI * 2,
                    parallaxSpeed: config.speed,
                    layer: layerIndex
                }));
                layers.push(stars);
            });

            return layers;
        };

        const starLayers = createStarLayers();
        let scrollProgress = 0;
        let animationId;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Draw stars in layers
            starLayers.forEach((stars, layerIndex) => {
                stars.forEach(star => {
                    const parallaxY = star.y - (scrollProgress * star.parallaxSpeed * 300);
                    const time = performance.now() * 0.001;
                    const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
                    const alpha = star.baseAlpha * twinkle;
                    
                    // Create sharp, clean stars without blur
                    ctx.save();
                    ctx.globalAlpha = alpha;
                    ctx.fillStyle = '#ffffff';
                    
                    ctx.beginPath();
                    ctx.arc(star.x, parallaxY % height, star.r, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.restore();
                });
            });

            animationId = requestAnimationFrame(draw);
        };

        // Update scroll progress
        const updateScrollProgress = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            scrollProgress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height)));
        };

        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress();
        draw();

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            window.removeEventListener('scroll', updateScrollProgress);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Dynamic Sky Light Effect - Unified gradient
    useEffect(() => {
        if (!containerRef.current || !skyOverlayRef.current) return;

        const updateSkyColors = () => {
            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate scroll progress through the entire unified section
            const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height)));
            
            // Unified color transitions from testimonials through WhatsApp to footer
            const colors = [
                { r: 20, g: 20, b: 40 },     // Deep dark blue (start)
                { r: 15, g: 30, b: 35 },     // Dark teal
                { r: 10, g: 40, b: 30 },     // Dark green-blue
                { r: 5, g: 20, b: 15 },      // Very dark green
                { r: 0, g: 0, b: 0 }         // Pure black (end)
            ];

            const getColorAtProgress = (progress) => {
                const segmentSize = 1 / (colors.length - 1);
                const segment = Math.floor(progress / segmentSize);
                const localProgress = (progress % segmentSize) / segmentSize;
                
                const startColor = colors[Math.min(segment, colors.length - 1)];
                const endColor = colors[Math.min(segment + 1, colors.length - 1)];
                
                return {
                    r: Math.round(startColor.r + (endColor.r - startColor.r) * localProgress),
                    g: Math.round(startColor.g + (endColor.g - startColor.g) * localProgress),
                    b: Math.round(startColor.b + (endColor.b - startColor.b) * localProgress)
                };
            };

            const currentColor = getColorAtProgress(progress);
            const overlay = skyOverlayRef.current;
            
            // Create elegant gradient overlay
            overlay.style.background = `
                radial-gradient(ellipse at 50% 0%, 
                    rgba(${currentColor.r + 20}, ${currentColor.g + 20}, ${currentColor.b + 30}, 0.4) 0%,
                    rgba(${currentColor.r + 10}, ${currentColor.g + 10}, ${currentColor.b + 20}, 0.7) 40%,
                    rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.95) 100%
                )
            `;
        };

        // Initial call and scroll listener
        updateSkyColors();
        window.addEventListener('scroll', updateSkyColors);
        
        return () => {
            window.removeEventListener('scroll', updateSkyColors);
        };
    }, []);

    return (
        <div ref={containerRef} className="unified-background-container relative">
            {/* Sky Light Overlay - covers entire container */}
            <div 
                ref={skyOverlayRef}
                className="absolute inset-0 pointer-events-none transition-all duration-700"
                style={{ zIndex: 1 }}
            />

            {/* Parallax Star Canvas - covers entire container */}
            <canvas 
                ref={starCanvasRef} 
                className="absolute left-0 top-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
            />

            {/* Atmospheric light effects */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/[0.02] rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-3/4 right-1/3 w-80 h-80 bg-green-400/[0.02] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
                <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-400/[0.02] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }}></div>
            </div>

            {/* Content sections */}
            <div className="relative" style={{ zIndex: 10 }}>
                {children}
            </div>
        </div>
    );
};

export default UnifiedBackground; 