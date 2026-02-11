import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { HistoryProvider } from './HistoryContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </React.StrictMode>
);
