const totalQtyReducer = (state = 0, action) => {

    switch(action.type){

        case 'SET_TOTAL_QTY':
        return action.totalQty;


        default:
        return state;

    }
}

export default totalQtyReducer;