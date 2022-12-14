import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import SearchContext from './context/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SearchContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SearchContext>
  </BrowserRouter>,
);
