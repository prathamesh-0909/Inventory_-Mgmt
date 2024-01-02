import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Login from './components/Login';
import Website from './components/Website';

const root = ReactDOM.createRoot(document.getElementById('root'));
const auth = localStorage.getItem('autentication') === 'true';

root.render(
    <React.StrictMode>
        {!auth ? <Login /> : <Website/>}
    </React.StrictMode>
);