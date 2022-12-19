import React, { useEffect, useState } from 'react'
import './style.scss'
import Nofifi from '../../../components/user/notifi/Notifi'
import { useSelector } from 'react-redux'
import axios from '../../../config/axios'


function ColumnTwo() {
    const { user } = useSelector((state) => state.userAuth)
    const [notification, setNotification] = useState(null)
    useEffect(() => {
        console.log('hi notifi colum 2');
        axios.get('/notifications', { withCredentials: true }).then((result) => {
            console.log(result.data.notifications,'result');
            setNotification(result.data.notifications)
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    return (
        <div>
            <div className="notifications">

                <div className="boader">
                    <h5>Notifications</h5>
                    <div className="items">
                        {notification ?
                            <>
                                {notification.map((value) => {
                                    return <Nofifi  data={value} />
                                })}

                            </>
                            : 'null'
                        }
                    </div>
                </div>

            </div>
        </div >
    )
}

export default ColumnTwo