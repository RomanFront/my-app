import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import FirebaseContext from './context/firebaseContext';
import Firebase from './services/firebase';
import './index.css';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase}>
        <App />
    </FirebaseContext.Provider>
    , 
    document.getElementById('root')
    )