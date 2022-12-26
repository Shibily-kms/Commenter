import React, { useEffect, useState } from 'react'
import './report.scss'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Spinner from '../../Spinner'
import { toast } from 'react-toastify'
import axios from '../../../config/axios'


function ReportCom() {
   
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(false)

    const blockPost = (postId, urId, count, reason) => {
        const ask = window.confirm('Are you block this post ?')
        if (ask) {
            axios.post('/admin/block-post', { postId, urId, count, reason }, { withCredentials: true }).then(() => {
                toast.success('This post Blocked')
                setReports((reports) => reports.filter((value) => value.postId !== postId))
            })
        }
    }
    const handleCancel = (postId) => {
        const ask = window.confirm('Are you cancel this report ?')
        if (ask) {
            axios.post('/admin/cancel-report-post', { postId }, { withCredentials: true }).then(() => {
                toast.success('This report cancelled')
                setReports((reports) => reports.filter((value) => value.postId !== postId))
            })
        }
    }

    useEffect(() => {
        setLoading(true)
        axios.get('/admin/reports', { withCredentials: true }).then((result) => {
            setReports(result.data.reports)
            setLoading(false)
        })
    }, [])


    const columns = [
        { field: 'slNo', headerName: 'SlNo', width: 100 },
        { field: 'id', headerName: 'Post ID', width: 170, },
        {
            field: 'reason',
            headerName: 'Reason',
            width: 280,
        },
        { field: 'count', headerName: 'Count', width: 200 },
        {
            field: 'view',
            headerName: 'View Post',
            width: 100,
            renderCell: (value) => {
                return (<><button className='button-gray mx-1' onClick={() => window.open(`/?postId=${value.row.id}`, '_blank', 'noopener,noreferrer')}>View</button></>)
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (value) => {
                return (<><button className='button-red mx-1' onClick={() => blockPost(value.row.id, value.row.urId, value.row.count, value.row.reason)}>Block</button><button className='button-gray' onClick={() => handleCancel(value.row.id)}>Cancel</button></>)
            }
        },

    ];

    const rows = reports ? reports.map((report, index) => {
        return {
            slNo: index + 1,
            id: report.postId,
            count: report.reportCount,
            reason: report.reports[0].reason + ' , ...',
            urId: report.urId

        }
    }) : []
    return (
        <div>
            <div className="boader">
                <div className="title">
                    <h4 >Reports</h4>
                </div>
            </div>
            {loading ?
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

export default ReportCom