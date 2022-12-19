
import React, { useEffect } from 'react'
import ColumnTwo from './ColumnTwo';
import ColumnThree from './ColumnThree';
import Header from '../../../components/user/header/Header'
import Sidebar from '../../../components/user/sidebar/Sidebar'
import { setTrue, setFalse } from '../../../Redux/features/sidebar/sidebarSlice'
import { useSelector, useDispatch } from 'react-redux'
import LogoFrame from '../../../components/user/layout/LogoFrame'
import { useLocation, useSearchParams } from 'react-router-dom'
import axios from '../../../config/axios'
import { useState } from 'react';
import Error404 from '../../../components/error/Error404';

function Profile() {
    const dispatch = useDispatch()
    const { action } = useSelector((state) => state.sidebarToggle)
    const location = useLocation();
    const [profile, setProfile] = useState({})
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(false)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        axios.get(location.pathname, { withCredentials: true }).then((response) => {
            setProfile(response.data.profile)
            let postId = searchParams.get('postId')
            if (postId) {
                setPosts(
                    response.data.posts.filter((value) => { 
                        return value.postId === postId
                    })
                )
            } else {
                setPosts(response.data.posts)
            }
        }).catch((error) => {
            setError(true)
        })
    }, [])


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
                        {error ?
                            <>
                                <Error404 />
                            </>
                            :
                            <div className="section-div">

                                <div className="section-one">
                                    <div className="content-div">
                                        <div className="content">
                                            <ColumnTwo posts={posts} profile={profile} />
                                        </div>
                                    </div>
                                </div>

                                <div className="section-two">
                                    <div className=" columnThree">
                                        <div className="content-div">
                                            <div className="content">
                                                <ColumnThree profile={profile} />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        }

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

export default Profile