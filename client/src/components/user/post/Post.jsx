import React, { useEffect } from 'react'
import './post.scss'
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { RiMessage2Fill } from "@react-icons/all-files/ri/RiMessage2Fill";
import { MdSave } from "@react-icons/all-files/md/MdSave";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { MdSend } from "@react-icons/all-files/md/MdSend";
import { RiShareForwardFill } from "@react-icons/all-files/ri/RiShareForwardFill";
import { BsTrashFill } from "@react-icons/all-files/bs/BsTrashFill";
import { GrFormClose } from "@react-icons/all-files/gr/GrFormClose";
import Profile from '../../../assets/icons/profile.jpeg'
import { useState } from 'react';
import { postDateFormatChange } from '../../../assets/js/user/post-helpers'
import { useSelector, useDispatch } from 'react-redux'
import { likePost, removePost } from '../../../Redux/features/user/userPostSlice'
import axios from '../../../config/axios'



function Post(props) {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userAuth)
    const [date, setDate] = useState('time')
    const [show, setShow] = useState(false)
    const [postLike, setPostLike] = useState(false)
    const [data, setData] = useState({ urId: null, postId: null, like: false })
    const [save, setSave] = useState(false)


    const handleShow = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }
    const handleLike = () => {
        dispatch(likePost(data))
    }
    const handleSave = () => {
        console.log({ urId: user?.urId, postId: props?.data?.postId }, 'put data');
        axios.put('/save-post', { urId: user?.urId, postId: props?.data?.postId }, { withCredentials: true }).then((result) => {
            if (result) {
                setSave(true)
            }
        }).catch((error) => {
            console.log('some error occurd');
        })
    }
    const handleRemove = () => {
        const confirmBox = window.confirm('Are you delete this post')
        if (confirmBox) {
            setShow(false)
            dispatch(removePost({ urId: user?.urId, postId: props?.data?.postId }))
        }
    }

    useEffect(() => {
        console.log(props, 'reacitoans');
        let arr = props?.data?.reactions.filter(item => item == user?.urId)
        if (arr[0]) {
            setPostLike(true)
        } else {
            setPostLike(false)
        }
        let checkSave = user?.savePost.filter(item => item == props.data.postId)
        checkSave = checkSave === undefined ? [] : checkSave
        if (checkSave[0]) {
            setSave(true)
        } else {
            setSave(false)
        }


        setDate(postDateFormatChange(props.data.createDate))
        setData({
            ...data,
            urId: user?.urId,
            postId: props?.data?.postId,
            like: postLike ? false : true
        })

    }, [props, postLike, setSave])
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
                            <div className="DropIcon" onClick={handleShow}>
                                {show ? <GrFormClose /> : <BsThreeDots />}
                            </div>
                            {show ?
                                <div className="DropBox">
                                    {save ? <div className="itemDiv" >
                                        <MdSave />
                                        <p >Goto Save </p>
                                    </div>
                                        :
                                        <div className="itemDiv" onClick={handleSave}>
                                            <MdSave />
                                            <p>Save </p>
                                        </div>
                                    }
                                    <div className="itemDiv">
                                        <RiShareForwardFill />
                                        <p>Share</p>
                                    </div>

                                    {user.urId === props.data.urId ?
                                        <div className="itemDiv" onClick={handleRemove}>
                                            <BsTrashFill />
                                            <p>Remove</p>
                                        </div>
                                        : ''
                                    }

                                </div>
                                : ''}
                        </div>
                    </div>
                    <div className="content">
                        {props.data.text ?
                            <pre >{props.data.text}</pre>
                            : ''
                        }
                        {props.data.file[0]?.type === 'image' ?
                            <img src={'http://res.cloudinary.com/dayygqvpv/image/upload/v1669717856/' + props.data.file[0].name + '.' + props.data.file[0].format} alt="" />
                            : ''
                        }
                        <div className="reactions-count">
                            <div style={{ display: 'flex' }}>
                                <div className="icon">
                                    <span className='simpale bg-primary'><AiFillLike /></span>
                                    <span>{props.data.reactCount}</span>
                                </div>
                                <div className="icon">
                                    <span className='simpale ' style={{ backgroundColor: '#ce1085' }}><RiMessage2Fill /></span>
                                    <span>0</span>
                                </div>
                            </div>
                            <div>
                                <div className="icon">
                                    <span className='simpale bg-secondary'><MdSave /></span>
                                    <span>0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="comment-side">

                        </div>
                        <div className="reaction-side">
                            <div className="reaction ">
                                <div className={postLike ? 'likeAnimation' : ''} onClick={handleLike}>
                                    {postLike ? <AiFillLike /> : <AiOutlineLike />}
                                </div>
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