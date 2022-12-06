import React from 'react'
import Layout from '../../../components/user/layout/Layout'
import ColumnThree from '../profile/ColumnThree'
import CoulmnTwo from './CoulmnTwo'
import { useSelector } from 'react-redux'



function SavePost() {
    const { user } = useSelector((state) => state.userAuth)
    return (
        <div>
            <Layout columnTwo={<CoulmnTwo />} columnThree={<ColumnThree profile={user} />} />
        </div>
    )
}

export default SavePost