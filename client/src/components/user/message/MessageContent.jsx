import React, { useEffect, useState, useRef } from 'react'
import './messageContent.scss';
import { messageDateFormatChange } from '../../../assets/js/user/post-helpers'


// Icons

import { IoCheckmarkDone } from "@react-icons/all-files/io5/IoCheckmarkDone";
import { useSelector } from 'react-redux';

function MessageContent({ current, data }) {
    const { user } = useSelector((state) => state.userAuth)
    const scrollRef = useRef()
    useEffect(() => {
        scrollRef.current?.scrollIntoView()
    }, [data])

    return (
        <div>
            <div className="messageContent">
                <div className="wrapper">
                    {data ?
                        <>
                            {data.map((one) => {
                                return <div className={user.urId !== one.sender ? "leftBoader" : 'rightBoader'} ref={scrollRef} >
                                    <div className="box">
                                        {/* <p className='name'>Name</p> */}
                                        <pre>{one?.text}</pre>
                                        <div className="last">
                                            <IoCheckmarkDone />
                                            <p>{messageDateFormatChange(one?.createdAt)}</p>
                                        </div>
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