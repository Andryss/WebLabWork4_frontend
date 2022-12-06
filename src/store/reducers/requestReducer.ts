import {RequestAction, RequestActionType, RequestState} from "../../types/request";

const initialState : RequestState = {
    requests: [],
    loading: false,
    error: null
}

export const requestReducer = (state = initialState, action : RequestAction) : RequestState => {
    switch (action.type) {
        case RequestActionType.FETCH_REQUESTS:
            return {...state, loading: true, error: null, requests: []};
        case RequestActionType.FETCH_REQUESTS_SUCCESS:
            return {...state, loading: false, error: null, requests: action.payload}
        case RequestActionType.FETCH_REQUESTS_ERROR:
            return {...state, loading: false, error: action.payload, requests: []}
        default:
            return state;
    }
}