import React, { useEffect } from 'react'
import './post.scss'
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { RiMessage2Fill } from "@react-icons/all-files/ri/RiMessage2Fill";
import { MdSave } from "@react-icons/all-files/md/MdSave";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { MdSend } from "@react-icons/all-files/md/MdSend";
import Profile from '../../../assets/icons/profile.jpeg'
import { useState } from 'react';
import { postDateFormatChange } from '../../../assets/js/user/post-helpers'



function Post(props) {
    const [image, setImage] = useState(false)
    const [date, setDate] = useState('time')
    useEffect(() => {
        setDate(postDateFormatChange(props.data.createDate))
    }, [])
    return (
        <div>
            <div className="post-model">
                <div className="boader">
                    <div className="top">
                        <div className="profile">
                            <div className="image">
                                <img src={Profile} alt="" />
                            </div>
                            <div>
                                <h5>{props?.self?.firstName + ' ' + props?.self?.lastName}</h5>
                                <p>{date}</p>
                            </div>

                        </div>

                        <div className="options">
                            <BsThreeDots />
                        </div>
                    </div>
                    <div className="content">
                        {props.data.text ?
                            <textarea name="" id="" value={props.data.text} ></textarea>
                            : ''
                        }
                        {props.data.file[0]?.type === 'image' ?
                            <img src={'http://res.cloudinary.com/dayygqvpv/image/upload/v1669717856/' + props.data.file[0].name + '.' + props.data.file[0].format} alt="" />
                            : ''
                        }
                        <div className="reactions-count">
                            <div className="icon">
                                <span className='simpale'><AiFillLike /></span>
                                <span>0</span>
                            </div>
                            <div className="icon">
                                <span className='simpale'><RiMessage2Fill /></span>
                                <span>0</span>
                            </div>
                            <div className="icon">
                                <span className='simpale'><MdSave /></span>
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="comment-side">

                        </div>
                        <div className="reaction-side">
                            <div className="reaction">
                                <AiOutlineLike />
                            </div>
                            <div className="comment">
                                <input type="text" placeholder='Comment...' />
                                <div>
                                    <MdSend />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post