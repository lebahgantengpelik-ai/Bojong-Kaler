
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global error handler for debugging production issues
window.onerror = function(message, source, lineno, colno, error) {
  showError(message as string, error);
  return false;
};

window.onunhandledrejection = function(event) {
  showError(`Unhandled Promise Rejection: ${event.reason}`, event.reason);
};

function showError(message: string, error: any) {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: #ef4444; font-family: sans-serif;">
        <h1 style="font-size: 1.5rem; font-weight: bold;">Terjadi Kesalahan (Runtime Error)</h1>
        <p style="margin-top: 10px;">${message}</p>
        <pre style="margin-top: 10px; font-size: 0.8rem; background: #fef2f2; padding: 10px; border-radius: 8px; overflow: auto;">
          ${error?.stack || 'No stack trace available'}
        </pre>
        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer;">
          Muat Ulang Halaman
        </button>
      </div>
    `;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
