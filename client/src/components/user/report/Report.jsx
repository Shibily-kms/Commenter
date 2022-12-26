import React, { useState } from 'react'
import './report.scss'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../../../config/axios'

// Icons
import { IoClose } from "@react-icons/all-files/io5/IoClose";


function Report(props) {
    const [show, setShow] = useState(true)
    const [reason, setReason] = useState(null)
    const { user } = useSelector((state) => state.userAuth)

    const handleSubmit = (e) => {
        e.preventDefault();
        const obj = {
            reason,
            reporterId: user.urId,
            postId: props.data.postId,
            postedId: props.data.urId
        }
        if (reason) {
            axios.post('/report-post', obj, { withCredentials: true }).then(() => {
                toast.success('Your report Submitted')
                props.data.setRemove(true)
            })
        } else {
            toast.error('Choose you reason')
        }
    }

    return (
        <div>
            {show ?
                <div className="reportDiv">
                    <div className="boader">
                        <div className="top">
                            <h5>Report post</h5>
                            <div className="close-icon round-icon" onClick={() => setShow((show) => !show)}>
                                <IoClose />
                            </div>
                        </div>
                        <div className="content">
                            <div className="title">
                                <h5>Please select a problem</h5>
                                <p>If someone is in immediate danger, get help before reporting to Commenter. Don't wait.</p>
                            </div>
                            <div className="form">
                                <form action="" onSubmit={handleSubmit}>
                                    <div className="checkboxDiv" >
                                        <input id="Nudity" name='reason' value='Nudity' type="radio" onChange={(e) => setReason('Nudity')} />
                                        <label htmlFor="Nudity">Nudity</label>
                                    </div>
                                    <div className="checkboxDiv">
                                        <input id="Spam" name='reason' value='Spam' type="radio" onChange={(e) => setReason('Spam')} />
                                        <label htmlFor="Spam">Spam</label>
                                    </div>
                                    <div className="checkboxDiv">
                                        <input id="Violence" name='reason' value='Violence' type="radio" onChange={(e) => setReason('Violence')} />
                                        <label htmlFor="Violence">Violence</label>
                                    </div>
                                    <div className="checkboxDiv">
                                        <input id="Terrorism" name='reason' value='Terrorism' type="radio" onChange={(e) => setReason('Terrorism')} />
                                        <label htmlFor="Terrorism">Terrorism</label>
                                    </div>
                                    <div className="checkboxDiv">
                                        <input id="Hate" name='reason' value='Hate speech' type="radio" onChange={(e) => setReason('Hate speech')} />
                                        <label htmlFor="Hate">Hate speech</label>
                                    </div>
                                    <div className="checkboxDiv">
                                        <input id="False" name='reason' value='False information' type="radio" onChange={(e) => setReason('False information')} />
                                        <label htmlFor="False">False information</label>
                                    </div>
                                    <div className="checkboxDiv">
                                        <input id="Suicide" name='reason' value='Suicide or Self-injury' type="radio" onChange={(e) => setReason('Suicide or Self-injury')} />
                                        <label htmlFor="Suicide">Suicide or Self-injury</label>
                                    </div>
                                    <div className="checkboxDiv">
                                        <input id="Harassment" name='reason' value='Harassment' type="radio" onChange={(e) => setReason('Harassment')} />
                                        <label htmlFor="Harassment">Harassment</label>
                                    </div>
                                    <div className="checkboxDiv">
                                        <input id="Something" name='reason' value='Something else' type="radio" onChange={(e) => setReason('Something else')} />
                                        <label htmlFor="Something">Something else</label>
                                    </div>
                                    <div className="button-div mt-2">
                                        <button className='button-color w-100'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
        </div>
    )
}

export default Report