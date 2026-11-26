import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { preloadRouteForPath } from './routes/pageLoaders';
import './index.css';

async function bootstrap() {
  const rootEl = document.getElementById('root');
  if (!rootEl) return;

  const appNode = (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

  const ssrPath = rootEl.getAttribute('data-ssr-path');
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

  if (rootEl.hasChildNodes() && ssrPath === currentPath) {
    await preloadRouteForPath(currentPath);
    ReactDOM.hydrateRoot(rootEl, appNode);
  } else {
    ReactDOM.createRoot(rootEl).render(appNode);
  }
}

bootstrap();
