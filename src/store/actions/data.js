export const saveData = (data) => {

    return{
        
    type : 'SAVE_DATA', data

    }


}

export const removeData = () => {

    return{

        type: 'REMOVE_DATA'


    }

}

export default {saveData, removeData}