import React, { useEffect, useState, useRef } from 'react'
import './chatbox.scss'
import { io } from 'socket.io-client'
import Profile from '../../../assets/icons/profile.jpg'
import MessageContent from '../message/MessageContent';
import axios from '../../../config/axios'
import { useSelector } from 'react-redux';


// Icon
import { IoChevronBack } from "@react-icons/all-files/io5/IoChevronBack";
import { IoMdSend } from "@react-icons/all-files/io/IoMdSend";


function Chatbox({ current, messages, setCurrent }) {
    const { user } = useSelector((state) => state.userAuth)
    const [now, setNow] = useState(null)
    const [newMessage, setNewMessage] = useState('')
    const [allMessage, setAllMessage] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const socket = useRef()


    const handleSubmit = (e) => {

        if (e.type === 'click' || e.charCode === 13) {
            if (newMessage !== '') {
                const message = {
                    sender: user.urId,
                    text: newMessage,
                    conId: current.conId
                }
                const receiverId = current.members.find((m) => m !== user.urId)
                socket.current.emit('sendMessage', {
                    senderId: user.urId,
                    receiverId: receiverId,
                    text: newMessage
                })
                axios.post('/message', message, { withCredentials: true }).then((res) => {
                    setAllMessage([...allMessage, res.data.savedMessage])
                    setNewMessage('')
                })
            }
        }
    }



    useEffect(() => {
        socket.current = io('ws://localhost:8900')
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: new Date()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && current?.members.includes(arrivalMessage.sender) &&
            setAllMessage((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        socket.current.emit('addUser', user.urId)
        socket.current.on('getUsers', users => {

        })
    }, [user])

    useEffect(() => {
        const friendId = current.members.find((m) => m !== user.urId)
        axios.get('/users/' + friendId, { withCredentials: true }).then((res) => {

            setNow(res.data.user)
        })

        setAllMessage(messages)

    }, [user, current, messages])
    return (
        <div>
            <div className="chatBox">
                <div className="boader">
                    <div className="top">
                        <div className="profile">
                            <div className="round-icon back" onClick={() => setCurrent(null)}>
                                <IoChevronBack />
                            </div>
                            <div className="image">
                                {now?.profile ?
                                    <img src={now?.profile} alt="" />
                                    :
                                    <img src={Profile} alt="" />
                                }
                            </div>
                            <div className="name">
                                <h5>{now?.firstName + ' ' + now?.lastName}</h5>
                                <h6>{now?.userName}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <MessageContent current={current} data={allMessage} />
                    </div>
                    <div className="bottom">
                        <input type="text" onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => handleSubmit(e)}
                            value={newMessage} placeholder='Type someting...' />
                        <div className="round-icon icon" onClick={handleSubmit}>
                            <IoMdSend />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatbox