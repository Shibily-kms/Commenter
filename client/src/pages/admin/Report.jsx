import React from 'react'
import Layout from '../../components/admin/layout/Layout';
import ReportCom from '../../components/admin/report/ReportCom';

function Report() {
    return (
        <div><div><Layout columnTwo={<ReportCom />} /></div></div>
    )
}

export default Report