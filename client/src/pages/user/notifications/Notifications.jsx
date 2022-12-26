import React, { useEffect } from 'react'
import Layout from '../../../components/user/layout/Layout'
import ColumnTwo from './ColumnTwo'

function Notifications() {
    return (
        <div>
            <Layout columnTwo={<ColumnTwo />} />
        </div>
    )
}

export default Notifications