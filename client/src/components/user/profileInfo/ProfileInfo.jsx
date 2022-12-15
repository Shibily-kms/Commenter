import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './profileInfo.scss'
import Profile from '../../../assets/icons/profile.jpg'
import { IoIosPin } from "@react-icons/all-files/io/IoIosPin";
import { FaBirthdayCake } from "@react-icons/all-files/fa/FaBirthdayCake";
import { RiUserFollowFill } from "@react-icons/all-files/ri/RiUserFollowFill";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import { FaGlobe } from "@react-icons/all-files/fa/FaGlobe";

function ProfileInfo({ profile }) {
    const { user } = useSelector((state) => state.userAuth)
    useEffect(() => {
    }, [])
    return (
        <div>
            <div className="profileColumnThree">
                <div className="border">
                    <div className="head">
                        <h4>Info</h4>
                    </div>
                    <div className="content">
                        <div className="itemDiv ">

                            <div className="image">
                                {profile?.profile ?
                                    <img src={profile.profile} alt="" />
                                    :
                                    <img src={Profile} alt="" />
                                }
                            </div>
                            <span> {profile ? '@' + profile.userName : ''}</span>
                        </div>
                        {profile?.location ?
                            <div className="itemDiv">
                                <div className="icon">
                                    <IoIosPin />
                                </div>
                                <p>{profile.location}</p>
                            </div>
                            : <></>}
                        {profile?.urId === user?.urId ?
                            <div className="itemDiv">
                                <div className="icon">
                                    <FaBirthdayCake />
                                </div>
                                <p>{profile?.dob ? profile.dob : 'null'}</p>
                            </div>
                            : ''}
                        <div className="itemDiv">
                            <div className="icon">
                                <RiUserFollowFill />
                            </div>
                            {profile?.urId ?
                                <p>{profile?.followers.length} Followers</p>
                                :
                                <p>Loading...</p>
                            }
                        </div>
                        <div className="itemDiv">
                            <div className="icon">
                                <FaUserFriends />
                            </div>
                            {profile?.urId ?
                                <p>{profile?.following.length} Following</p>
                                :
                                <p>Loading...</p>
                            }
                        </div>
                        {profile?.LifeStatus ?
                            <div className="itemDiv">
                                <div className="icon">
                                    <AiFillHeart />
                                </div>
                                <p>{profile.LifeStatus}</p>
                            </div>
                            : <></>}
                        {profile?.Website ?
                            <div className="itemDiv">
                                <div className="icon">
                                    <FaGlobe />
                                </div>
                                <p>{profile.Website}</p>
                            </div>
                            : <></>}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo