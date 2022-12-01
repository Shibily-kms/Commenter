import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './profileInfo.scss'
import Profile from '../../../assets/icons/profile.jpeg'
import { HiUser } from "@react-icons/all-files/hi/HiUser";
import { IoIosPin } from "@react-icons/all-files/io/IoIosPin";
import { FaBirthdayCake } from "@react-icons/all-files/fa/FaBirthdayCake";
import { RiUserFollowFill } from "@react-icons/all-files/ri/RiUserFollowFill";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import { FaGlobe } from "@react-icons/all-files/fa/FaGlobe";

function ProfileInfo() {
    const { user } = useSelector((state) => state.userAuth)
    useEffect(() => {
        console.log('profile info effect');
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
                                <img src={Profile} alt="" />
                            </div>
                            <span> {user ? '@' + user.userName : ''}</span>
                        </div>
                        <div className="itemDiv">
                            <div className="icon">
                                <HiUser />
                            </div>
                            <p>Gender</p>
                        </div>
                        <div className="itemDiv">
                            <div className="icon">
                                <IoIosPin />
                            </div>
                            <p>Location</p>
                        </div>
                        <div className="itemDiv">
                            <div className="icon">
                                <FaBirthdayCake />
                            </div>
                            <p>Date of Birth</p>
                        </div>
                        <div className="itemDiv">
                            <div className="icon">
                                <RiUserFollowFill />
                            </div>
                            <p>0 Followers</p>
                        </div>
                        <div className="itemDiv">
                            <div className="icon">
                                <FaUserFriends />
                            </div>
                            <p>0 Following</p>
                        </div>
                        <div className="itemDiv">
                            <div className="icon">
                                <AiFillHeart />
                            </div>
                            <p>Single</p>
                        </div>
                        <div className="itemDiv">
                            <div className="icon">
                                <FaGlobe />
                            </div>
                            <p>Website</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo