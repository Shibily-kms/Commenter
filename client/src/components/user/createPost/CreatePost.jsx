import React, { useState, useEffect, useRef } from 'react'
import { FaPhotoVideo } from "@react-icons/all-files/fa/FaPhotoVideo";
import { GrClose } from "@react-icons/all-files/gr/GrClose";
import './createPost.scss'
import Profile from '../../../assets/icons/profile.jpg'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../Spinner'
import axiosFile from '../../../config/axiosFile'
import Post from '../../../components/user/post/Post'
import axios from '../../../config/axios'

function CreatePost() {
    // State
    const [show, setShow] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const { user } = useSelector((state) => state.userAuth)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ text: '', file: [], urId: null })
    const [ready, setReady] = useState(false)
    const inputRef = useRef(null);
    const [post, setPost] = useState([])

    const handelText = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            urId: user.urId
        })
    };

    const handleImageFileClick = () => {
        inputRef.current.click();
    }

    const doPost = (formData) => {
        axios.post('/post', formData, { withCredentials: true }).then((result) => {
            setPost([result.data.post, ...post])
            setLoading(false)
            setShow(false)
            setShowImg(false)
            setForm({ text: '', file: [], urId: null })
            toast.success(result.data.message)
        }).catch((error) => {
            toast.error(error.response.data.message)
            setLoading(false)

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (showImg || form.text) {
            if (!showImg) {
                doPost(form)
            } else {
                setLoading(true)
                const formData = new FormData()
                formData.append('file', showImg)
                formData.append('upload_preset', 'commenter');
                formData.append('cloud_name', 'dayygqvpv')
                await axiosFile.post('/image/upload', formData).then((response) => {
                    if (response) {
                        let obj = {
                            format: response.data.format,
                            name: response.data.public_id,
                            type: response.data.resource_type,
                        }
                        setForm({
                            ...form,
                            file: [...form.file, obj]
                        })
                        setReady(true)
                    }

                }).catch((error) => {
                    toast.error('Network down')
                    setLoading(false)
                })
            }

        } else {
            toast.error('Type Something')
            setLoading(false)
        }

    }
    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        setForm({
            ...form,
            urId: user.urId
        })
        setShowImg(event.target.files[0])
    }
    useEffect(() => {
        if (ready) {
            doPost(form)
            setReady(false)
        }
    }, [ready])

    return (
        <div>
            <div className="create-post-tag">
                <div className="boader">
                    <div className="image">
                        {user?.profile ?
                            <img src={user.profile} alt="" />
                            :
                            <img src={Profile} alt="" />
                        }
                    </div>
                    <input onClick={() => setShow(true)} type="text" value={form.text ? form.text : ''} placeholder={user ? user.firstName + ', Type something...' : ''} />
                    <div className="icon" onClick={() => setShow(true)}>
                        <FaPhotoVideo />
                    </div>
                </div>
                {post[0] ?
                    <div className="newPost">
                        {post.map((item, index) => {
                            return <Post data={item} key={index} />
                        })}
                    </div>
                    : ''}
                {show ?
                    <div className="postModal">
                        <div className="pages" >
                            <div className="shadow" onClick={() => setShow(false)}></div>
                            <div className="boader-div">
                                {loading ?
                                    <div className="loading">
                                        <Spinner />
                                    </div> : ''
                                }
                                <div className="top">
                                    <h4>Create Post</h4>
                                    <div className="round-icon" onClick={() => setShow(false)}>
                                        <GrClose />
                                    </div>
                                </div>
                                <div className="content">
                                    <form action="" onSubmit={handleSubmit} enctype="multipart/form-data">
                                        <div className="section-one">
                                            <div className="profile">
                                                <div className="image">
                                                    <img src={Profile} alt="" />
                                                </div>
                                                <div>
                                                    <h5>{user.firstName + ' ' + user.lastName}</h5>
                                                </div>
                                                <div className="icon">
                                                    <div className="round-icon" onClick={handleImageFileClick} >
                                                        <FaPhotoVideo />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="file" onChange={handleFileChange} ref={inputRef} hidden name='file' accept="image/*,video/*" />
                                        <div className="section-two">
                                            <textarea autoFocus name="text" onChange={handelText} id="" cols="20" rows="5" value={form.text ? form.text : ''} placeholder={user ? user.firstName + ', Type something...' : ''}></textarea>
                                            {showImg ? <div className='showImage'>
                                                <img src={URL.createObjectURL(showImg)} alt="" />
                                                <div className="round-icon" onClick={() => setShowImg(false)}>
                                                    <GrClose />
                                                </div>
                                            </div> : ''}
                                        </div>

                                        <div className="section-three">
                                            <button type='submit' className='button button-color'>Post</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                    : ''
                }
            </div >
        </div >
    )
}

export default CreatePost