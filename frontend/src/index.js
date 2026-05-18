import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 1. Import Redux tools
import { store } from './store/store';
import { Provider } from 'react-redux';

// 2. Import React Query tools
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 3. Create a new query client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 4. Wrap your app in both providers */}
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);