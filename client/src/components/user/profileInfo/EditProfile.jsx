import React from 'react'
import { FaUserEdit } from "@react-icons/all-files/fa/FaUserEdit";
import { RiSaveFill } from "@react-icons/all-files/ri/RiSaveFill";
import './profileInfo.scss'

function EditProfile(props) {
    return (
        <div>
            <div className={props?.classTitle ? `${props.classTitle} editProfile` : ''} style={{ marginTop: '15px' }}>
                <button className='button-color '><FaUserEdit /> Edit Profile</button>
                <button className='button ' style={{ backgroundColor: '#a8a8a8' }}><RiSaveFill /> Saved Posts</button>
            </div>
        </div>
    )
}

export default EditProfile