import userReducer from './userReducer';
import { combineReducers } from 'redux';
import cardListReducer from './cardListReducer';

export const rootReducer = combineReducers({
    user: userReducer,
    cardList: cardListReducer,
})