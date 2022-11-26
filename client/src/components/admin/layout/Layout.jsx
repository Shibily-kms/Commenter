import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import './layout.scss'
import { setTrue, setFalse } from '../../../Redux/features/sidebar/sidebarSlice'

function Layout({ columnTwo }) {
    const dispatch = useDispatch()
   
    const { action } = useSelector((state) => state.sidebarToggle)


    const handleSidebar = ()=>{
        if (action) {
            dispatch(setFalse())
          } else {
            dispatch(setTrue())
          }
    }

    return (
        <>
            <div className="body">
                <div className="page">
                    <div className={action ? "sidebar show-top" : "sidebar"}>
                        <Sidebar /> 
                    </div>
                    <div className="content-div">
                        <div className="content">
                        {columnTwo}
                        </div>
                    </div>
                    {action ? <div className="shadow" onClick={handleSidebar}></div> : ''}
                </div>
                <div className="header">
                    <Header />
                </div>
            </div>
        </>
    )
}

export default Layout