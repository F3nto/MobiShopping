const cartReducer = (state = null, action) => {

    switch(action.type){

        case 'ADD_TO_CART':
        return action.products


        default:
        return state
    }

}

export default cartReducer;