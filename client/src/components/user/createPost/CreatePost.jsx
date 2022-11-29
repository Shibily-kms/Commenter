import React, { useState, useEffect, useRef } from 'react'
import { FaPhotoVideo } from "@react-icons/all-files/fa/FaPhotoVideo";
import { GrClose } from "@react-icons/all-files/gr/GrClose";
import './createPost.scss'
import Profile from '../../../assets/icons/profile.jpeg'
import { useSelector, useDispatch } from 'react-redux'
import { doPost } from '../../../Redux/features/user/userPostSlice'
import { toast } from 'react-toastify'
import Spinner from '../../Spinner'
import axiosFile from '../../../config/axiosFile'

function CreatePost() {
    // State
    const [show, setShow] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const { user } = useSelector((state) => state.userAuth)
    const [loading, setLoading] = useState(false)
    const { isSuccess, isError, isLoading, message } = useSelector((state) => state.userPost)
    const [form, setForm] = useState({ text: '', file: [], urId: null })
    const [imageData, setImageData] = useState([])
    const dispatch = useDispatch()
    const inputRef = useRef(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (showImg || form.text) {
            if (!showImg) {
                dispatch(doPost(form))
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
                        setForm({
                            ...form
                        })
                        dispatch(doPost(form))
                    }

                }).catch((error) => {
                    console.log(error, 'errpr response');
                })
            }

        } else {
            toast.error('Type Something')
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
        if (isSuccess) {
            setShow(false)
            setShowImg(false)
            setLoading(false)
            setForm({ text: '', file: [], urId: null })
            toast.success(message)
        }
        if (isError) {
            setLoading(false)
            toast.error(message)
        }
    }, [isSuccess, isError])

    return (
        <div>
            <div className="create-post-tag">
                <div className="boader">
                    <div className="image">
                        <img src={Profile} alt="" />
                    </div>
                    <input onClick={() => setShow(true)} type="text" value={form.text ? form.text : ''} placeholder={user ? user.firstName + ', Type something...' : ''} />
                    <div className="icon" onClick={() => setShow(true)}>
                        <FaPhotoVideo />
                    </div>
                </div>
                {show ?
                    <div className="postModal">
                        <div className="pages" >
                            <div className="shadow" onClick={() => setShow(false)}></div>
                            <div className="boader-div">
                                {isLoading || loading ?
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
                                            <textarea name="text" onChange={handelText} id="" cols="20" rows="5" value={form.text ? form.text : ''} placeholder={user ? user.firstName + ', Type something...' : ''}></textarea>
                                            {showImg ? <img src={URL.createObjectURL(showImg)} alt="" /> : ''}
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