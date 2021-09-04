export const userListReducer = (state = {usersData:[]}, action) => {
    switch(action.type){
        case "USER_LIST_REQUEST":
            return {loading: true, usersData: []}
        case "USER_LIST_SUCCESS":
            return {loading: false, usersData: action.payload}
        case "USER_LIST_FAILS":
            return {loading: false, error:action.payload}
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case "USER_DELETE_REQUEST":
            return {loading: true}
        case "USER_DELETE_SUCCESS":
            return{loading: false, success:true}
        case "USER_DELETE_FAIL":
            return{loading: false, error:action.payload}
        default: 
           return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch(action.type){
        case "USER_UPDATE_REQUEST":
            return {loading: true}
        case "USER_UPDATE_SUCCESS":
            return{loading: false, success:true, usersData: action.payload}
        case "USER_UPDATE_FAIL":
            return{loading: false, error:action.payload}
        
        default: 
           return state
    }
}

export const addUserReducer = (state = {}, action) => {
    switch(action.type){
        case "ADD_USER_REQUEST":
            return {loading: true}
        case "ADD_USER_SUCCESS":
            return{loading: false, success:true, usersData: action.payload}
            
        case "ADD_USER_FAIL":
            return{loading: false, error:action.payload}
        
        default: 
           return state
    }
}