import React from 'react'
import { FcBrokenLink } from "@react-icons/all-files/fc/FcBrokenLink";
import './error404.scss'
import { useNavigate } from 'react-router-dom'

function Error404() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="error">
                <div className="boader">
                    <div className="box">
                        <div className="icon">
                            <FcBrokenLink />
                        </div>
                        <div className="content">
                            <h4>This page isn't available</h4>
                            <p>The link may be broken, or the page may have been removed.
                                <br></br>Check to see if the link you're trying to open is correct.</p>
                        </div>
                        <div className="bottom">
                            <button className='button-color' onClick={() => navigate(-1)}>Go to back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error404