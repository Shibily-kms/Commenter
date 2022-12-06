import React from 'react'
import './profileTop.scss'
import Profile from '../../../assets/icons/profile.jpeg'

function ProfileTop(props) {

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
                        <h4>{props?.profile?.urId ? props.profile.firstName + ' ' + props.profile.lastName : 'Loading...'}</h4>
                        <p>{props?.profile?.urId ? props.profile.followers.length + ' Followers | ' + props.profile.following.length + ' Following'
                        : 'Loading...'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileTop