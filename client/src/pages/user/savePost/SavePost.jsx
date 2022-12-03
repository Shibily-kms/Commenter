import React from 'react'
import Layout from '../../../components/user/layout/Layout'
import ColumnThree from '../profile/ColumnThree'
import CoulmnTwo from './CoulmnTwo'

function SavePost() {
    return (
        <div>
            <Layout columnTwo={<CoulmnTwo />} columnThree={<ColumnThree />} />
        </div>
    )
}

export default SavePost