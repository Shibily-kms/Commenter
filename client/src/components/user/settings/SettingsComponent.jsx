import React from 'react'
import { useNavigate } from 'react-router-dom'
import './settingsComponent.scss'
// Icons
import { FaUserEdit } from "@react-icons/all-files/fa/FaUserEdit";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import { RiLockPasswordFill } from "@react-icons/all-files/ri/RiLockPasswordFill";
import { MdVerifiedUser } from "@react-icons/all-files/md/MdVerifiedUser";


function SettingsComponent() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="settings">
                <div className="boader">
                    <div className="top">
                        <h5>Settings</h5>
                    </div>
                    <div className="content">
                        <div className="item-div" onClick={() => navigate('edit-profile')}>
                            <div className="one">
                                <FaUserEdit />
                                <span>Edit profile</span>
                            </div>
                            <div className="two">
                                <IoIosArrowForward />
                            </div>
                        </div>
                        <div className="item-div" onClick={() => navigate('change-password')}>
                            <div className="one">
                                <RiLockPasswordFill />
                                <span>Change password</span>
                            </div>
                            <div className="two">
                                <IoIosArrowForward />
                            </div>
                        </div>
                        {/* <div className="item-div" onClick={() => navigate('privacy-and-security')}>
                            <div className="one">
                                <MdVerifiedUser />
                                <span>Privacy and security</span>
                            </div>
                            <div className="two">
                                <IoIosArrowForward />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default SettingsComponent