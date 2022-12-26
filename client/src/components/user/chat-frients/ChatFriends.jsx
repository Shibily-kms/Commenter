import React, { useEffect, useState } from 'react'
import Profile from '../../../assets/icons/profile.jpg'
import './chatfrients.scss';
import axios from '../../../config/axios'
function ChatFriends({ data, current }) {
    const [user, setUser] = useState({})
    useEffect(() => {
        const friendId = data.members.find((m) => m !== current.urId)
        axios.get('/users/' + friendId, { withCredentials: true }).then((res) => {
            setUser(res.data.user)
        })


    }, [data, current])
    return (
        <div>
            <div className="FriendsList">
                <div className="boader">
                    <div className="side-one">
                        <div className="profile">
                            <div className="image">
                                {user?.profile ?
                                    <img src={user.profile} alt="" />
                                    :
                                    <img src={Profile} alt="" />
                                }
                            </div>
                        </div>
                        <div className="content">
                            <h5>{user?.firstName + " " + user?.lastName} </h5>
                            {/* <p>Last Message</p> */}
                        </div>
                    </div>
                    {/* <div className="side-two">
                        <div className="last">

                            <span className="count">22
                            </span>
                            <p>02:30 PM</p>

                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ChatFriends