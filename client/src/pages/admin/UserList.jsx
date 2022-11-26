import React from 'react'
import Layout from '../../components/admin/layout/Layout';
import UserListComponent from '../../components/admin/userList/UserList'


function UserList() {

    return (
        <div><Layout columnTwo={<UserListComponent />} /></div>
    )
}

export default UserList