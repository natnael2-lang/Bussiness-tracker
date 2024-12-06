import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import {BrowserRouter } from "react-router-dom"
import { ContextProvider } from './components/BussinessContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
   <ContextProvider>
      <App/>
   </ContextProvider>
                    
  </React.StrictMode>
);


