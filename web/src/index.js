import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TokenProvider } from './Components/Auth/tokenContext';
import {GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="128621874883-cgadpjcd9oc47lm2vhbkgbvo5ep884u8.apps.googleusercontent.com">
     <TokenProvider>
      <App />
    </TokenProvider>
  </GoogleOAuthProvider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
