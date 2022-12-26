import React, { useEffect, useState } from 'react'
import './layout.scss'
import './messageLayout.scss'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import { setTrue, setFalse } from '../../../Redux/features/sidebar/sidebarSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import LogoFrame from './LogoFrame'
import Chatbox from '../chat/Chatbox'
import StartChat from '../chat/StartChat'
import ChatFriends from '../chat-frients/ChatFriends'
import axios from '../../../config/axios'
import Spinner from '../../Spinner'
import NullPost from '../../other/nullPost/Nulldefault'


function MessageLayout() {
    const dispatch = useDispatch()
    const location = useLocation()
    const { action } = useSelector((state) => state.sidebarToggle)
    const { user } = useSelector((state) => state.userAuth)
    const [conversation, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSidebar = () => {
        if (action) {
            dispatch(setFalse())
        } else {
            dispatch(setTrue())
        }
    }

    useEffect(() => {
        if (location.state) {
            setCurrentChat(location.state.conversation)
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        axios.get('/conversation/' + user?.urId, { withCredentials: true }).then((res) => {
            setLoading(false)
            setConversation(res.data.conversation)
        })
    }, [user])

    useEffect(() => {
        axios.get('/message/' + currentChat?.conId, { withCredentials: true }).then((res) => {
            setMessages(res.data.messages)
        })
    }, [currentChat])


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
                    <div className=" messageDiv ">
                        <div className="section-div">

                            <div className="section-one">
                                <div className={currentChat ? "content-div " : 'content-div mobile'}>
                                    <div className="content">
                                        {currentChat ?
                                            <Chatbox current={currentChat} messages={messages} setCurrent={setCurrentChat} />
                                            : <StartChat />
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="section-two">

                                <div className={currentChat ? " columnThree mobile" : 'columnThree'}  >
                                    <div className="content-div">
                                        <div className="content">
                                            <div className="friendsList">
                                                {loading ?
                                                    <Spinner /> :
                                                    <>
                                                        {conversation[0] ?
                                                            <>
                                                                {conversation.map((value) => {
                                                                    return <>
                                                                        <div onClick={() => setCurrentChat(value)}>
                                                                            <ChatFriends data={value} current={user} />
                                                                        </div>
                                                                    </>
                                                                })}
                                                            </>

                                                            : <p className='text-center mt-5'>No conversations!</p>
                                                        }
                                                    </>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

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

export default MessageLayout