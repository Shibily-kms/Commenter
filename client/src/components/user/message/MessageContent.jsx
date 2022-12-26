import React, { useEffect, useState, useRef } from 'react'
import './messageContent.scss';
import { messageDateFormatChange } from '../../../assets/js/user/post-helpers'

// Icons

import { IoCheckmarkDone } from "@react-icons/all-files/io5/IoCheckmarkDone";
import { useSelector } from 'react-redux';

function MessageContent({ current, data }) {
    const { user } = useSelector((state) => state.userAuth)
    const [messages, setMessages] = useState([])
    const scrollRef = useRef()
    useEffect(() => {

        let added = []
        for (let i = 0; i < data.length; i++) {
            if (i === 0) {
                added.push({ text: 'Started at ' + new Date(current?.createdAt).toDateString(), date: true })
                added.push({ text: new Date(data[i]?.createdAt).toDateString(), date: true })
                added.push(data[i])
            } else {
                if (new Date(data[i]?.createdAt).toDateString() === new Date(data[i - 1]?.createdAt).toDateString()) {
                    added.push(data[i])
                } else {
                    added.push({ text: new Date(data[i]?.createdAt).toDateString(), date: true })
                    added.push(data[i])
                }
            }
        }
        setMessages(added)
        scrollRef.current?.scrollIntoView()
    }, [data])

    return (
        <div>
            <div className="messageContent">
                <div className="wrapper">
                    {messages ?
                        <>
                            {messages.map((one) => { 
                                return <div className={one.date ? 'centerBoader' : user.urId !== one.sender ? "leftBoader" : 'rightBoader'} ref={scrollRef} >
                                    <div className="box">
                                        <>
                                            {/* <p className='name'>Name</p> */}
                                            <pre>{one?.text}</pre>
                                            {one.date ?
                                                ""
                                                :
                                                <>
                                                    <div className="last">
                                                        <IoCheckmarkDone />
                                                        <p>{messageDateFormatChange(one?.createdAt)}</p>
                                                    </div>
                                                </>
                                            }
                                        </>
                                    </div>
                                </div>


                            })}

                        </>
                        :
                        'loading'}


                </div>
            </div>
        </div>
    )
}

export default MessageContent