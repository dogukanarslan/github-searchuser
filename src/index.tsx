import React from 'react';
import './index.css';
import { App } from './App';
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
