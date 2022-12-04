import React from 'react'
import './nameCard.scss'
import Profile from '../../../assets/icons/profile.jpeg'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from '../../../config/axios'


function NameCard(props) {
    const { user } = useSelector((state) => state.userAuth)
    const [follow, setFollow] = useState(false)


    const handleFollow = () => {
        console.log(props?.data?.urId, 'urId');
        axios.post('/follow', { followId: props?.data?.urId }, { withCredentials: true }).then((result) => {
            console.log('followed');
            setFollow(true)
        }).catch((error) => {
            console.log('followed error');
        })
    }

    useEffect(() => {
        let check = user?.following.filter((urId) => urId === props?.data?.urId)
        check = check === undefined ? [] : check
        if (check[0]) {
            setFollow(true)
        } else {
            setFollow(false)
        }
    }, [user, props])
    return (
        <div>
            <div className="nameCard">
                <div className="cardBoader">
                    <div className="cardName">
                        <div className="image">
                            <img src={Profile} alt="" />
                        </div>
                        <div>
                            <h5>{props?.data?.firstName + ' ' + props?.data?.lastName}</h5>
                            <p>@{props?.data?.userName}</p>
                        </div>
                    </div>
                    <div className="cardButton">
                        {follow ?
                            <button className='button-gray'>Unfollow</button>
                            :
                            <button className='button-color' onClick={handleFollow}>Follow</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NameCard