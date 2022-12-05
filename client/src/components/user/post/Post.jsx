import React, { useEffect } from 'react'
import './post.scss'
import Profile from '../../../assets/icons/profile.jpeg'
import Comment from '../comment/Comment'
import { useState } from 'react';
import { postDateFormatChange } from '../../../assets/js/user/post-helpers'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../../config/axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { addSavePost, removeSavePost } from '../../../Redux/features/user/authSlice'

// Icons
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { RiMessage2Fill } from "@react-icons/all-files/ri/RiMessage2Fill";
import { MdSave } from "@react-icons/all-files/md/MdSave";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { AiOutlineLink } from "@react-icons/all-files/ai/AiOutlineLink";
import { BsTrashFill } from "@react-icons/all-files/bs/BsTrashFill";
import { GrFormClose } from "@react-icons/all-files/gr/GrFormClose";
import { BiComment } from "@react-icons/all-files/bi/BiComment";



function Post(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [post, setPost] = useState({})
    const { user } = useSelector((state) => state.userAuth)

    const [date, setDate] = useState('loading...')
    // Sub
    const [show, setShow] = useState(false)
    const [postLike, setPostLike] = useState(false)
    const [save, setSave] = useState(false)
    const [remove, setRemove] = useState(false)


    const handleShow = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }
    const handleLike = (likeStatus) => {
        axios.put('/like', { urId: user.urId, postId: post.postId, like: likeStatus ? true : false }, { withCredentials: true }).then((result) => {
            if (result.data.like) {
                setPostLike(true)
                setPost({
                    ...post,
                    reactCount: post.reactCount + 1,
                })
            } else {
                setPost({
                    ...post,
                    reactCount: post.reactCount - 1,
                })
                setPostLike(false)
            }
        })
    }
    const handleSave = () => {
        axios.put('/save-post', { urId: user?.urId, postId: post?.postId }, { withCredentials: true }).then((result) => {
            if (result) {
               
                dispatch(addSavePost({ postId: post.postId }))
                setSave(true)
            }
        }).catch((error) => {
           
        })
    }
    const handleRemoveSave = () => {
        axios.delete('/save-post/' + user.urId + '/' + post.postId, { withCredentials: true }).then((result) => {
            setRemove(true)
            toast.success('Post removed form save list')
            dispatch(removeSavePost({ postId: post.postId }))
        }).catch((error) => {
         
        })
    }
    const handleRemove = () => {
        const confirmBox = window.confirm('Are you delete this post')
        if (confirmBox) {
            setShow(false)
            axios.delete('/delete-post/' + post.urId + '/' + post.postId, { withCredentials: true }).then((result) => {
                if (result) {
                    toast.success('Post removed')
                    setRemove(true)
                }
            })
        }
    }

    useEffect(() => {
      
        let arr = props?.data?.reactions.filter(item => item == user?.urId)
        arr = arr === undefined ? [] : arr
        if (arr[0]) {
            setPostLike(true)
        } else {
            setPostLike(false)
        }

        let checkSave = user?.savePost.filter(item => item == props?.data?.postId)
        checkSave = checkSave === undefined ? [] : checkSave
        if (checkSave[0]) {
            setSave(true)
        } else {
            setSave(false)
        }


        setDate(postDateFormatChange(props?.data?.createDate))


        if (props?.data) {
            setPost(props.data)
        }

    }, [props])
    return (
        <div>
            <div className={remove ? 'post-model d-none' : 'post-model'} >
                <div className="boader">
                    <div className="top">
                        <div className="profile">
                            <div className="image">
                                <img src={Profile} alt="" />
                            </div>
                            <div>
                                <h5>{post?.firstName + ' ' + post?.lastName}</h5>
                                <p>{date}</p>
                            </div>

                        </div>

                        <div className="options">
                            <div className="DropIcon" onClick={handleShow}>
                                {show ? <GrFormClose /> : <BsThreeDots />}
                            </div>
                            {show ?
                                <div className="DropBox">
                                    {save ?
                                        <>
                                            {props?.savePage ?
                                                <div onClick={handleRemoveSave} className="itemDiv" >
                                                    <MdSave />
                                                    <p >Clear</p>
                                                </div>
                                                :
                                                <div className="itemDiv" onClick={() => { navigate('/save-posts') }}>
                                                    <MdSave />
                                                    <p >Goto Save </p>
                                                </div>

                                            }
                                        </>
                                        :
                                        <div className="itemDiv" onClick={handleSave}>
                                            <MdSave />
                                            <p>Save </p>
                                        </div>
                                    }
                                    <div className="itemDiv">
                                        <AiOutlineLink />
                                        <p>Copy Link</p>
                                    </div>

                                    {user?.urId === post?.urId ?
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

                    <>
                        <div className="content">
                            {post?.text ?
                                <pre >{post.text}</pre>
                                : ''
                            }

                            {props.data?.file[0]?.type === 'image' ?
                                <img src={'http://res.cloudinary.com/dayygqvpv/image/upload/v1669717856/' + props.data.file[0].name + '.' + props.data.file[0].format} alt="" />
                                : ''
                            }

                            <div className="reactions-count">
                                <div style={{ display: 'flex' }}>
                                    <div className="icon">
                                        <span className='simpale bg-primary'><AiFillLike /></span>
                                        <span>{post?.reactCount}</span>
                                    </div>
                                    <div className="icon">
                                        <span className='simpale ' style={{ backgroundColor: '#ce1085' }}><RiMessage2Fill /></span>
                                        <span>{post?.commentCount}</span>
                                    </div>
                                </div>
                                {/* <div>
                                    <div className="icon">
                                        <span className='simpale bg-secondary'><MdSave /></span>
                                        <span>0</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="like-div">
                            <hr />
                            <div className="box">
                                <div className={postLike ? 'like like-color' : 'like'} onClick={() => { handleLike(postLike ? false : true) }}>
                                    <span className={postLike ? 'icon likeAnimation' : 'icon'}>
                                        {postLike ? <AiFillLike /> : <AiOutlineLike />}
                                    </span>
                                    <span className='text'>Like</span>
                                </div>
                                <div className="comment">
                                    <span className='icon'>
                                        <BiComment />
                                    </span>
                                    <span className='text'>Comment</span>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="bottom">

                            <div className="comment-side">
                                <Comment data={post.comments} postId={post.postId} urId={post.urId} />
                            </div>

                        </div>
                    </>

                </div>
            </div>
        </div>
    )
}

export default Post