import React from 'react'
import { FaUserEdit } from "@react-icons/all-files/fa/FaUserEdit";
import { RiSaveFill } from "@react-icons/all-files/ri/RiSaveFill";
import './profileInfo.scss'
import { useNavigate } from 'react-router-dom'

function EditProfile(props) {
    const navigate = useNavigate()
    return (
        <div>
            <div className={props?.classTitle ? `${props.classTitle} editProfile` : ''} style={{ marginTop: '15px' }}>
                <button className='button-color '><FaUserEdit /> Edit Profile</button>
                <button className='button' onClick={() => {navigate('/save-posts') }} style={{ backgroundColor: '#a8a8a8' }}><RiSaveFill /> Saved Posts</button>
            </div>
        </div>
    )
}

export default EditProfile