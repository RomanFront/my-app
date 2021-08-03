import { 
    FETCH_CARD_LIST, 
    FETCH_CARD_LIST_RESOLVE, 
    FETCH_CARD_LIST_REJECT 
} from "../actions/actionTypes";

const cardListReducer = (state, action) => {
    switch (action.type) {
        case FETCH_CARD_LIST:
            return {
                payload: [],
                err: null,
                isBusy: true,
            }
        case FETCH_CARD_LIST_RESOLVE:
            return {
                payload: action.payload,
                err: null,
                isBusy: false,
            }
        case FETCH_CARD_LIST_REJECT:
            return {
                payload: null,
                err: action.err,
                isBusy: false,
            }
        default:
            return {
                payload: null,
                err: null,
                isBusy: false,
            }
    }
}

export default cardListReducer;