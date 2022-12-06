import React from 'react'
import './layout.scss'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import { setTrue, setFalse } from '../../../Redux/features/sidebar/sidebarSlice'
import { useSelector, useDispatch } from 'react-redux'
import LogoFrame from './LogoFrame'

function Layout({ columnTwo, columnThree }) {
    const dispatch = useDispatch()

    const { action } = useSelector((state) => state.sidebarToggle)


    const handleSidebar = () => {
        if (action) {
            dispatch(setFalse())
        } else {
            dispatch(setTrue())
        }
    }

    return (
        <>
            <div className="user-body">
                <div className="page">
                    <div className={action ? "sidebar show-top" : "sidebar"}>
                        <Sidebar />
                        <div className="pt-4">
                            <LogoFrame />
                        </div>
                    </div>
                    <div className="contentBody ">
                        <div className="section-div">
                            {columnTwo ?
                                <div className="section-one">
                                    <div className="content-div">
                                        <div className="content">
                                            {columnTwo}
                                        </div>
                                    </div>
                                </div>
                                : ''
                            }
                            <div className="section-two">
                                {columnThree ?
                                    <div className=" columnThree">
                                        <div className="content-div">
                                            <div className="content">
                                                {columnThree}
                                            </div>
                                        </div>
                                    </div>
                                    : ''
                                }
                            </div>
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