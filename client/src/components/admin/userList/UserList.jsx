import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { getUserList, userBlockOrUnblock, reset } from '../../../Redux/features/admin/userList'
import { useSelector, useDispatch } from 'react-redux'
import './user-list.scss'
import Spinner from '../../Spinner'
import { toast } from 'react-toastify'

function UserList() {
  const dispatch = useDispatch()
  const { users, isLoading, isError, isSuccess, message } = useSelector((state) => state.userList);
  const changeUserStatus = (urId) => {
    const ask = window.confirm('Are change this satatus ?');
    if (ask) {
      dispatch(userBlockOrUnblock(urId))
      dispatch(reset())
    }
  }
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success(message)
    }
    dispatch(getUserList())
    dispatch(reset())
  }, [isError, isSuccess])


  const columns = [
    { field: 'slNo', headerName: 'SlNo', width: 80 },
    { field: 'id', headerName: 'UrId', width: 100, },
    { field: 'name', headerName: 'User name', width: 200 },
    {
      field: 'email',
      headerName: 'Email Id',
      width: 250,
    },
    {
      field: 'mobile',
      headerName: 'Mobile',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (value) => {
        return (<><button onClick={() => dispatch(changeUserStatus(value.row.id))} className={value.row.status === "Active" ? 'button-red' : 'button-green'}>{value.row.status === "Active" ? 'Block' : 'Unblock'}</button></>)
      }
    },
  ];

  const rows = users ? users.map((user, index) => {
    return {
      slNo: index + 1,
      id: user.urId,
      name: user.userName,
      email: user.emailId,
      mobile: user.mobile,
      status: user.status
    }
  }) : []

  return (
    <div>
      <div className="boader">
        <div className="title">
          <h4 >User List</h4>
        </div>
      </div>
      {isLoading ?
        <Spinner />
        :
        <Box mt={'10px'} sx={{ height: '510px', width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={8}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      }

    </div>
  )
}

export default UserList;