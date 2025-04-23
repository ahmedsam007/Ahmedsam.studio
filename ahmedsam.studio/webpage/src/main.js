import React from 'react';
import { createRoot } from 'react-dom/client';
import GlobeComponent from './Globe';

// Remove all globe-related imports and code

// Wait for DOM to be fully loaded
window.addEventListener('load', () => {
    const container = document.getElementById('globeViz');
    if (!container) {
        console.error('Globe container not found');
        return;
    }

    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <GlobeComponent />
        </React.StrictMode>
    );
}); 