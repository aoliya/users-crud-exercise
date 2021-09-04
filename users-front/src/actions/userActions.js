import axios from 'axios';

export const getUsers = () => async(dispatch) => {
    try{
        dispatch ({type: "USER_LIST_REQUEST"})

        const {data} = await axios.get("http://localhost:5000/users")

        dispatch({
            type: "USER_LIST_SUCCESS",
            payload: data
        })
    }catch(error){
        dispatch({
            type: "USER_LIST_FAIL",
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const handleRowDelete = (id) => async(dispatch) => {
    try{
        dispatch({
            type: "USER_DELETE_REQUEST"
        })
        await axios.delete(`http://localhost:5000/users/user/${id}`)

        dispatch({
            type: "USER_DELETE_SUCCESS"
        
        })
    }catch(error){
        dispatch({
            type: "USER_DELETE_FAIL",
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const handleRowUpdate  = (newData, oldData) => async (dispatch) => {
    try{
        dispatch({
            type: "USER_UPDATE_REQUEST"
        })

        const config = {
            headers: {
            'Content-Type': 'application/json',    
            }
        }
        const {data} = await axios.put(`http://localhost:5000/users/edit/${oldData.ID}`, newData,
            config
          )
        
        dispatch({
            type: "USER_UPDATE_SUCCESS",
            payload: data
             })
        
    }catch(error){
        dispatch({
            type: "USER_UPDATE_SUCCESS",
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const handleAddUser  = (newData) => async (dispatch) => {
    try{
        dispatch({
            type: "ADD_USER_REQUEST"
        })
        const config = {
            headers: {
                  "Content-type": "application/json"
             }
        }

        const {data} = await axios.post(`http://localhost:5000/users/add`, newData, config)
        
        dispatch({
            type: "ADD_USER_SUCCESS",
            payload: data
             })
        
    }catch(error){
        dispatch({
            type: "ADD_USER_FAIL",
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}