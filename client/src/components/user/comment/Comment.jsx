import React, { useEffect, useRef } from 'react'
import './comment.scss'
import Profile from '../../../assets/icons/profile.jpg'
import { useState } from 'react';
import axios from '../../../config/axios'
import { postDateFormatChange } from '../../../assets/js/user/post-helpers'
import { toast } from 'react-toastify'

// Icon
import { IoTrashSharp } from "@react-icons/all-files/io5/IoTrashSharp";
import { MdSend } from "@react-icons/all-files/md/MdSend";
import { useSelector } from 'react-redux';


function Comment(props) {
    const [input, setInput] = useState('')
    const [comment, setComment] = useState([])
    const { user } = useSelector((state) => state.userAuth)
    const [more, setMore] = useState(false)
    const inputRef = useRef(null);


    const handleInput = (e) => {
        setInput(e.target.value)
    }
    const submitComment = (e) => {
        if (e === undefined || e.charCode == 13) {
            if (input != '') {
                axios.post('/comment', { urId: user.urId, userName: user.userName, postId: props.postId, text: input, profile: user?.profile }, { withCredentials: true }).then((result) => {
                    setInput('')
                    setComment([...comment, result.data.comment])

                })
            }
        }
    }

    const removeComment = (comId) => {
        const confirmBox = window.confirm('Are you delete this comment')
        if (confirmBox) {
            axios.delete('/comment/' + comId + '/' + props.postId, { withCredentials: true }).then((response) => {
                if (response) {
                    toast.success('comment removed')

                    setComment(
                        comment.filter((value) => value.comId !== comId)

                    )
                }
            })
        }
    }
    useEffect(() => {
        if (props?.data !== undefined) {
            if (more) {
                if (props?.data) {
                    setComment(props?.data)
                }
            } else {
                if (props?.data.length > 1) {
                    setComment([props?.data[props.data.length - 1]])
                } else if (props?.data.length > 0) {
                    setComment([props?.data[0]])
                }
            }
        }
        if (props.input) {
            inputRef.current.focus();
        }

    }, [props, more])
    return (
        <div>
            <div className="commentDiv">
                <div className="boader">
                    {props?.data !== undefined ?
                        <>
                            {props?.data?.length - 1 > 0 && !more ?
                                <div className="options" onClick={() => setMore(true)}>
                                    <p>View {props?.data.length - 1} more comment</p>
                                </div>
                                : ''}
                        </>
                        : ""
                    }

                    {comment[0] ?
                        <>
                            <div className="comments">
                                {/* Item Start */}

                                {comment.map((value, index) => {
                                    let time = postDateFormatChange(value.time)
                                    return <>
                                        {value.comId ?
                                            <div className="item-div" key={index}>
                                                <div className="image">
                                                    {value?.profile ?
                                                        <img src={value.profile} alt="" />
                                                        :
                                                        <img src={Profile} alt="" />
                                                    }
                                                </div>
                                                <div className="box">
                                                    <div className="content">
                                                        <p>{value.userName}</p>
                                                        <pre>{value.text}</pre>
                                                    </div>
                                                    <div className="bottom">
                                                        <span>

                                                        </span>
                                                        <span className='time'>
                                                            {time}
                                                        </span>
                                                    </div>
                                                </div>
                                                {value.urId === user.urId || props.urId === user.urId ?
                                                    <div className="delete" onClick={() => removeComment(value.comId)}>
                                                        <IoTrashSharp />
                                                    </div>
                                                    : <></>}
                                            </div>
                                            : <></>}

                                    </>
                                })}
                                {/* Item End */}
                            </div>
                        </>
                        : ''}
                    <div className="commentInput">
                        <div className="box">
                            <div className="reaction-side">
                                <div className="reaction ">
                                    <div className="image">
                                        {user?.profile ?
                                            <img src={user.profile} alt="" />
                                            :
                                            <img src={Profile} alt="" />
                                        }
                                    </div>
                                </div>
                                <div className="comment">
                                    <input ref={inputRef} type="text" value={input} name='comment' onKeyPress={(e) => submitComment(e)}
                                        onChange={handleInput} placeholder='Write comment...' autoComplete="off" />
                                    <div onClick={() => submitComment()}>
                                        <MdSend />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Comment