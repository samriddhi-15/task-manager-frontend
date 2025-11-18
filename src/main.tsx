import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

async function enableMocking() {
  if (import.meta.env.MODE === 'test') {
    return;
  }
  try {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
    console.log('✅ MSW worker started');
  } catch (error) {
    console.error('❌ Failed to start MSW worker:', error);
    // Continue anyway - the app should still work
  }
}

async function bootstrap() {
  try {
    await enableMocking();
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (error) {
    console.error('❌ Failed to bootstrap app:', error);
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 2rem; font-family: system-ui; text-align: center;">
          <h1>Error loading application</h1>
          <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
          <p style="color: #666; margin-top: 1rem;">Check the browser console for details.</p>
        </div>
      `;
    }
  }
}

void bootstrap();
