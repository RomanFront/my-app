import { ADD_USER, REMOVE_USER } from './actionTypes';
import { FETCH_CARD_LIST, FETCH_CARD_LIST_REJECT, FETCH_CARD_LIST_RESOLVE } from "./actionTypes";

export const addUserAction = (user) => {
    return {
        type: ADD_USER,
        user,
    }
};

export const removeUserAction = () => {
    return {
        type: REMOVE_USER,
        payload: null,
    }
};

export const fetchCardList = (getData) => {
    return (dispatch, getState) => {
        dispatch(cardListAction());
        getData().on('value', (res) => {
            dispatch(cardListResolveAction(res.val()));
        });
    }
}

export const cardListAction = () => ({
    type: FETCH_CARD_LIST,
})

export const cardListResolveAction = (payload) => ({
    type: FETCH_CARD_LIST_RESOLVE,
    payload,
})

export const cardListRejectAction = (err) => ({
    type: FETCH_CARD_LIST_REJECT,
    err,
})