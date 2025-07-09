import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

/**
 * Global styles injection for consistent styling across the application
 * These styles will be applied to all components
 */
const globalStyles = document.createElement('style');
globalStyles.innerHTML = `
  body {
    margin: 0;
    background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%);
    min-height: 100vh;
    font-family: Arial, sans-serif;
    background-attachment: fixed; /* Ensures gradient stays fixed during scrolling */
  }
  
  /* Standard content card styling for consistent UI */
  .content-card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    max-width: 800px;
    margin: 2rem auto;
    padding: 1.5rem;
  }
`;
document.head.appendChild(globalStyles);

// Create React root and render application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* BrowserRouter enables client-side routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);