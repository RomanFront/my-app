import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import FirebaseContext from './context/firebaseContext';
import Firebase from './services/firebase';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <FirebaseContext.Provider value={new Firebase}>
            <App />
        </FirebaseContext.Provider>
    </BrowserRouter>
    , 
    document.getElementById('root')
    )