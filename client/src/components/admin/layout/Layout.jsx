import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import './layout.scss'


function Layout({ columnTwo }) {
    const navigate = useNavigate()
    const { action } = useSelector((state) => state.sidebarToggle)
    const { admin } = useSelector((state) => state.adminAuth)
    useEffect(() => {
        if (!admin) {
            navigate('/admin/sign-in')
        }
    }, [])

    return (
        <>
            <div className="body">
                <div className="page">
                    <div className={action ? "sidebar show-top" : "sidebar"}>
                        <Sidebar /> 
                    </div>
                    <div className="content">
                        {columnTwo}
                    </div>
                    {action ? <div className="shadow"></div> : ''}
                </div>
                <div className="header">
                    <Header />
                </div>
            </div>
        </>
    )
}

export default Layout