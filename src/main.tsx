import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './index.css';
import store from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
