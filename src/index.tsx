import React from 'react';
import { App } from './App';
import './index.css';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <HashRouter basename="/github-searchuser">
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
