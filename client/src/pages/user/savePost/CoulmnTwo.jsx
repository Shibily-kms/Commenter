import React from 'react'
import ProfileTop from '../../../components/user/profileTop/ProfileTop'
import CreatePost from '../../../components/user/createPost/CreatePost'
import Post from '../../../components/user/post/Post'
import { useSelector, useDispatch } from 'react-redux'
import { getUserPost, reset } from '../../../Redux/features/user/userPostSlice'
import { useEffect, useState } from 'react'
import Spinner from '../../../components/Spinner'
import EditProfile from '../../../components/user/profileInfo/EditProfile'
import '../profile/ColumnTwo'
import axios from '../../../config/axios'



function CoulmnTwo() {
  const dispatch = useDispatch();
  // const { posts, isLoading, isError, message } = useSelector((state) => state.userPost)
  const [savePost, setSavePost] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => state.userAuth)
  useEffect(() => {
    setLoading(true)
    dispatch(getUserPost())
    dispatch(reset())
    axios.get('/save-post', { withCredentials: true }).then((data) => {

      setLoading(false)
      setSavePost(data.data.posts)
    })
  }, [])

  return (
    <div>
      <div className="userProfile-two">
        <ProfileTop profile={user} />
      </div>
      <div className="addPost" style={{ marginTop: '80px' }}>
        <CreatePost />
      </div>
      <div>
        <EditProfile classTitle={'isSmall'} />
      </div>
      <div className="posts">
        <h5 className='subTitle' style={{ marginTop: '10px' }}>Saved Posts</h5>
        <div className="post-one">
          {loading ?
            <>
              <Spinner />
            </>
            :
            <>
              {savePost ? savePost.map((post, index) => {

                return <Post savePage={true} key={index} data={post} />

              }) : ''}
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default CoulmnTwo