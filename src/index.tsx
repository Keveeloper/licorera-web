import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// React router DOM imports
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';

// Redux store imports
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
          <App/>
          {/* <RouterProvider router={router} /> */}
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

reportWebVitals();
