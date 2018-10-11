let defaultState = {
     isLoaded: false,
     data: [{}],
     clicked_row: null,
     edited_items: null,
     isEdited: false,
     car_info: null,
     action_flag: 'none'
}

const mainReducer = (state = defaultState ,action) =>{
    switch(action.type){
        case "SELECT_ROW": 
            // console.log('__________main_reducer_dispatch___________');
            // console.log(action.row);
            return {...state, clicked_row: action.row}
            break;
        case "EDITED_ITEMS": 
            // console.log('______________main_reducer_dispatch___________');
            // console.log(action.rows);
            return {
                ...state, 
                edited_items: action.rows,
                isEdited : true
            }
            break;
        case "CAR_INFO": 
            // console.log('______________main_reducer_dispatch___________');
            // console.log(action.rows);
            return {
                ...state, 
                car_info: action.car,
                isEdited : true
            }
            break;
        case "ACTION_FLAG": 
            // console.log('______________main_reducer_dispatch___________');
            // console.log(action.rows);
            return {
                ...state, 
                action_flag: action.is_act,
            }
            break;
    }
    return state;
};

export default mainReducer;
