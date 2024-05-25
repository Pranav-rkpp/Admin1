import React from 'react'
import ReactDOM from 'react-dom/client'
// import Login from './Components/Login.jsx'
import './index.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import Admin from './Admin.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Admin/>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
)
