import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import FirebaseContext from './context/firebaseContext';
import Firebase from './services/firebase';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import './index.css';
import logger from 'redux-logger';
import { Provider } from 'react-redux';

const store = new createStore(
    rootReducer, 
    +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
    applyMiddleware(thunk, logger)
    );

ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase}>
            <App />
        </FirebaseContext.Provider>
    </Provider>    
    , 
    document.getElementById('root')
    )

export default store;