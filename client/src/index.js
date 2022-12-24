import React from 'react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import Context from './Context';
// import "dotenv/config"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Context>
    <App />
    </Context>
    </BrowserRouter>
);
reportWebVitals();
serviceWorkerRegistration.register();