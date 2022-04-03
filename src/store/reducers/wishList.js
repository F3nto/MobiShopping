const wishListReducer = (state = null, action) => {

    switch(action.type){

        case 'ADD_TO_WISHLIST':
        return action.wishList

        default:
        return state
    
    }

}
export default wishListReducer;