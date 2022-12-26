import React from 'react'
import ProfileTop from '../../../components/user/profileTop/ProfileTop'
import Post from '../../../components/user/post/Post'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Spinner from '../../../components/Spinner'
import NullPost from '../../../components/other/nullPost/Nulldefault'
import EditProfile from '../../../components/user/profileInfo/EditProfile'
import '../profile/ColumnTwo'
import axios from '../../../config/axios'
import { FcAddImage } from "@react-icons/all-files/fc/FcAddImage";


function CoulmnTwo() {
  const [savePost, setSavePost] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => state.userAuth)


  useEffect(() => {
    setLoading(true)
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
        <h5 className='subTitle' style={{ marginTop: '10px' }}>Saved Posts</h5>

      </div>
      <div>
        <EditProfile classTitle={'isSmall'} />
      </div>
      <div className="posts">
        <div className="post-one">
          {loading ?
            <>
              <Spinner />
            </>
            :
            <>
              {savePost[0] ? savePost.map((post, index) => {

                return <Post savePage={true} key={index} data={post} />

              }) : <NullPost icon={<FcAddImage />} header='Let start' desc='Save your favorite post' />}
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default CoulmnTwo