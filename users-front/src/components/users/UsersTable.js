import React, { useEffect, forwardRef } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import MaterialTable from 'material-table';
import './UsersTable.css';
// import axios from 'axios';
import {getUsers, 
        handleRowDelete, 
        handleRowUpdate, 
        handleAddUser
    } from '../../actions/userActions';
import Loader from '../loader/loader';
import Message from '../message/message';


// icons
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const columns = [
    { title: 'ID', field: 'ID', width: 90 },
    { title: 'Full name', field: 'Fullname', width: 150, validate: rowData => rowData.Fullname === undefined ? "Fullname required" : true },
    { title: 'Email', field: 'Email', width: 150, validate: rowData =>{ 
      if(rowData.Email === undefined){
          return "Email required"
      }else if(!rowData.Email.includes('@' && '.')){
        return "Invalid Email adress"
      }
      return true;
    
    }}

]

export default function UsersTable() {
    
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, usersData} = userList;

    const deleteUser = useSelector(state => state.deleteUser)
    const {loading: loadingDelete, error:errorDelete, success: successDelete} = deleteUser

    const updateUser = useSelector(state => state.updateUser)
    const {loading: loadingUpdate, error:errorUpdate, success: successUpdate} = updateUser
    
    useEffect(() => {
        dispatch(getUsers())
        
    }, [dispatch, successDelete])

    const deleteHandler = (oldData) => {
        dispatch(handleRowDelete(oldData.ID))
    }

    const addRowHandler = (newData) => {
        dispatch(handleAddUser(newData))
        dispatch(getUsers())
    }

    const updateUserHandler = (newData, oldData) => {
        dispatch(handleRowUpdate(newData, oldData))
        dispatch(getUsers())
    }

    return (
        
        <div className="users-table">
            <h1>Enigma exercise</h1>
            {loadingDelete && <Loader />}
            {loading ? <Loader /> : error ? <Message>{error}</Message> 
            : 
            
            <MaterialTable
                title="Registered Users"
                columns={columns}
                data={usersData}
                icons={tableIcons}
                options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
                editable={{
                    onRowAdd: (newData) => new Promise(() => { addRowHandler(newData) }),
                    
                    onRowUpdate: (newData, oldData) => new Promise(() => {
                        updateUserHandler(newData, oldData)
                    }),
                    
                    onRowDelete: (oldData) => new Promise(() => {deleteHandler(oldData)})
                    
                }}

            />
            
            }
            
        </div>

    )
}

