import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {userListReducer, userDeleteReducer, userUpdateReducer, addUserReducer} from './reducers/userReducers'

const reducer = combineReducers({
    userList: userListReducer,
    deleteUser: userDeleteReducer,
    updateUser: userUpdateReducer,
    addUser: addUserReducer

});

const initialState={};

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;