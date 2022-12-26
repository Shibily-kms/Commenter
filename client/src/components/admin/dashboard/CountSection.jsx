import React, { useEffect, useState } from 'react'
import './countSection.scss';
import Spinner from '../../../components/Spinner'
import axios from '../../../config/axios'

function CountSection() {
    const [userCount, setuserCount] = useState({})
    useEffect(() => {
        // Get Counts
        axios.get('/admin/dashboard-count', { withCredentials: true }).then((result) => {
            setuserCount(result.data.MainArray[0])
        })
    }, [])
    return (
        <div>
            <div className="countSection">
                <div className="boader">
                    <div className="row">
                        {userCount ?
                            <div className="col-12 col-sm-6 col-md-3 ">
                                <div className="box">
                                    <div className="top">
                                        <h5>All users</h5>
                                        <h2>{userCount.Total}</h2>
                                    </div>
                                    <div className="bottom">
                                        <div className="one">
                                            <h5>user</h5>
                                            <h4>Count</h4>
                                        </div>
                                        <div className="two">
                                            <h5>user</h5>
                                            <h4>Count</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            : <Spinner />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountSection