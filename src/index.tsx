import { createRoot } from 'react-dom/client';

import App from 'App';

import './index.css';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<App />);
