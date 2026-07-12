import '@fontsource/archivo-black/400.css';
import '@fontsource-variable/noto-sans-tc/wght.css';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/plus-jakarta-sans';
import { MotionConfig } from 'motion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App.jsx';
import './components/metal/RenaissMetalButton.css';
import { I18nProvider } from './i18n/I18nProvider.jsx';
import './styles/global.css';
import './styles/site.css';
import './styles/projects.css';
import './styles/responsive.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
);
