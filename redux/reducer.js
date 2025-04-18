import { ADD_GUEST_TO_LIST, ADD_TO_CART, USER_LOGOUT } from "./constant";

const initialState = [];

export const reducer = (state=initialState, action) => {
    switch(action.type){
        case ADD_TO_CART: 
            return action.data;
        case ADD_GUEST_TO_LIST:
            return action.data;
        default:
            return state;
    }

}