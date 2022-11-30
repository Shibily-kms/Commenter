import React from 'react'
import './profileTop.scss'
import Profile from '../../../assets/icons/profile.jpeg'
import { useSelector } from 'react-redux'


function ProfileTop() {
    const { user } = useSelector((state) => state.userAuth)
    return (
        <div>
            <div className="cover-section">
                <div className="cover">
                    <img src={Profile} alt="" />
                </div>
                <div className="profile">
                    <div className="image">
                        <img src={Profile} alt="" />
                    </div>
                    <div className="name">
                        <h4>{user ? user.firstName + ' ' + user.lastName : 'Loading...'}</h4>
                        <p>644 Followers | 600 Following</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileTop