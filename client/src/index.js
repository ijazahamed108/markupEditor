import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import "./styles/main.css";
import "./styles/markdown.css";

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
