import React, { useEffect, useState, useRef } from 'react'
import './chatbox.scss'
import { IoIosChatbubbles } from "@react-icons/all-files/io/IoIosChatbubbles";

function StartChat() {

    useEffect(() => {

    }, [])


    return (
        <div>
            <div className="chatBox">
                <div className="boader">

                    <div className="start-content">
                        <div className="start">
                            <span>
                            <IoIosChatbubbles />
                            </span>
                            <p>Select a chat to start messaging</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default StartChat