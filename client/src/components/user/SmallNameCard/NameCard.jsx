import React from 'react'
import './nameCard.scss'
import Profile from '../../../assets/icons/profile.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from '../../../config/axios'
import { follow, unfollow } from '../../../Redux/features/user/authSlice'
import { useNavigate } from 'react-router-dom'

function NameCard(props) {
    const { user } = useSelector((state) => state.userAuth)
    const [following, setFollowing] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFollow = () => {

        axios.post('/follow', { followId: props?.data?.urId }, { withCredentials: true }).then((result) => {
            setFollowing(true)
            dispatch(follow({ followId: props?.data?.urId }))
        }).catch((error) => {

        })
    }
    const handleUnFollow = () => {
        axios.post('/unfollow', { followId: props?.data?.urId }, { withCredentials: true }).then((result) => {
            setFollowing(false)
            dispatch(unfollow({ followId: props?.data?.urId }))
        }).catch((error) => {

        })
    }

    useEffect(() => {
        let check = user?.following.filter((urId) => urId === props?.data?.urId)
        check = check === undefined ? [] : check
        if (check[0]) {
            setFollowing(true)
        } else {
            setFollowing(false)
        }
    }, [user, props])

    return (
        <div>
            <div className="nameCard">
                <div className="cardBoader">
                    <div className="cardName" onClick={() => navigate('/' + props?.data?.userName)}>
                        <div className="image">
                            {props?.data?.profile ?
                                <img src={props.data.profile} alt="" />
                                :
                                <img src={Profile} alt="" />
                            }
                        </div>
                        <div>
                            <h5>{props?.data?.firstName + ' ' + props?.data?.lastName}</h5>
                            <p>@{props?.data?.userName}</p>
                        </div>
                    </div>
                    <div className="cardButton">
                        {following ?
                            <button className='button-gray' onClick={handleUnFollow}>Following</button>
                            :
                            <button className='button-color' onClick={handleFollow}>Follow</button>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NameCard