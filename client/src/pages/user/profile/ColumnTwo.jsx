import React from 'react'
import ProfileTop from '../../../components/user/profileTop/ProfileTop'
import CreatePost from '../../../components/user/createPost/CreatePost'
import Post from '../../../components/user/post/Post'
import { useSelector, useDispatch } from 'react-redux'
import { getUserPost,reset } from '../../../Redux/features/user/userPostSlice'
import { useEffect } from 'react'
import Spinner from '../../../components/Spinner'

function ColumnTwo() {
  const dispatch = useDispatch();
  const { posts, isLoading, isError, message } = useSelector((state) => state.userPost)
  const { user } = useSelector((state) => state.userAuth)
  useEffect(() => {
    dispatch(getUserPost())
    dispatch(reset())
  }, [])

  return (
    <div>
      <div className="userProfile-two">
        <ProfileTop />
      </div>
      <div className="addPost" style={{ marginTop: '80px' }}>
        <CreatePost />
      </div>
      <div className="posts">
        <h5 className='subTitle' style={{ marginTop: '10px' }}>Your Posts</h5>
        <div className="post-one">
          {isLoading ?
            <>
              <Spinner />
            </>
            :
            <>
              {posts.map((post, index) => {
                return <Post key={index} data={post} self={user} />
              })}
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default ColumnTwo