import React, { useEffect } from 'react'
import Layout from '../../../components/user/layout/Layout'
import ColumnTwo from './ColumnTwo'

function Notifications() {
    useEffect(()=>{console.log('notification use effect');},[])
    return (
        <div>
            <Layout columnTwo={<ColumnTwo />} />
        </div>
    )
}

export default Notifications