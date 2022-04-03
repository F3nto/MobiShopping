const loginReducer = (state = null, action) => {

    switch(action.type){

        case 'Login':
        return action;


        default:
        return state;

    }

}

export default loginReducer;