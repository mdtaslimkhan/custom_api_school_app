import { ADD_GUEST_TO_LIST, ADD_TO_CART, USER_LOGOUT } from "./constant";

export function addToCart(item){
    return {
        type: ADD_TO_CART,
        data: item
    };
}

export function addGuestToList(item){
    return{
        type: ADD_GUEST_TO_LIST,
        data: item
    }

}
