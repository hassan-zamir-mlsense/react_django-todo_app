import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
const google_client_id="59866668171-8f6ta9ovr16dojfb9uagl65l1u1vd8ud.apps.googleusercontent.com";

root.render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId={google_client_id}>
          <App />
      </GoogleOAuthProvider>
      {/*<BrowserRouter>*/}
      {/*</BrowserRouter>*/}
  </React.StrictMode>
);







// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


// ReactDOM.render(<App/>,document.getElementById('root'))