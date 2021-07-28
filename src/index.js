import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import FirebaseContext from './context/firebaseContext';
import Firebase from './services/firebase';
import { createStore } from 'redux';
import rootReducers from './reducers';
import './index.css';
import { Provider } from 'react-redux';

const store = new createStore(rootReducers);

ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase}>
            <App />
        </FirebaseContext.Provider>
    </Provider>    
    , 
    document.getElementById('root')
    )