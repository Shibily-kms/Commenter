import React from 'react'
import './profileTop.scss'
import Profile from '../../../assets/icons/profile.jpg'
import { useSelector } from 'react-redux'
import { RiMessage2Fill } from "@react-icons/all-files/ri/RiMessage2Fill";
import axios from '../../../config/axios'
import { useNavigate } from 'react-router-dom'


function ProfileTop(props) {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.userAuth)
    const handleMessage = () => {
        axios.post('/conversation', { senderId: user.urId, receiverId: props.profile.urId }, { withCredentials: true }).then((result) => {
            navigate('/message', { state: { conversation: result.data } })
        })
    }

    return (
        <div>
            <div className="cover-section">
                <div className="cover">
                    <img src={Profile} alt="" />
                </div>
                <div className="profile">
                    <div className="image">
                        {props.profile?.profile ?
                            <img src={props.profile.profile} alt="" />
                            :
                            <img src={Profile} alt="" />
                        }
                    </div>
                    <div className="name">
                        <h4>{props?.profile?.urId ? props.profile.firstName + ' ' + props.profile.lastName : 'Loading...'}</h4>
                        <p>{props?.profile?.urId ? props.profile.followers.length + ' Followers | ' + props.profile.following.length + ' Following'
                            : 'Loading...'}</p>
                    </div>
                    {props?.profile?.urId === user?.urId ?
                        "" :
                        <div className="message" onClick={handleMessage}>
                            <button className='button-color'><RiMessage2Fill /></button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileTop