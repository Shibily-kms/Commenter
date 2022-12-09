import React from 'react'
import ProfileTop from '../../../components/user/profileTop/ProfileTop'
import CreatePost from '../../../components/user/createPost/CreatePost'
import Post from '../../../components/user/post/Post'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Spinner from '../../../components/Spinner'
import EditProfile from '../../../components/user/profileInfo/EditProfile'
import './columnTwo.scss'
import { useState } from 'react'

function ColumnTwo(props) {
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useSelector((state) => state.userAuth)

  useEffect(() => {

    if (props?.posts) {
      setIsLoading(false)
    }
  }, [props])

  return (
    <div>
      <div className="userProfile-two">
        <ProfileTop profile={props.profile} />
      </div>
      <div className="addPost" style={{ marginTop: '80px' }}>
        {user?.urId === props?.profile?.urId ?
          <h5 className='subTitle' style={{ marginTop: '10px' }}>Your Posts</h5>
          :
          <h5 className='subTitle' style={{ marginTop: '10px' }}>Posts</h5>
        }
        {user?.urId === props?.profile?.urId ?
          <CreatePost />
          : ""}
      </div>
      <div>
        <EditProfile classTitle={'isSmall'} />
      </div>
      <div className="posts">
        <div className="post-one">
          {isLoading ?
            <>
              <Spinner />
            </>
            :
            <>
              {props.posts.map((post, index) => {
                return <Post key={index} data={post} />
              })}
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default ColumnTwo