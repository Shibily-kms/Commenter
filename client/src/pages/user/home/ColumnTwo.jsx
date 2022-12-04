import React, { useEffect, useState } from 'react'
import CreatePost from '../../../components/user/createPost/CreatePost'
import Post from '../../../components/user/post/Post'
import axios from '../../../config/axios'
import Spinner from '../../../components/Spinner'


function ColumnTwo() {
    console.log('hi2');
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [author, setAuthor] = useState({})
    useEffect(() => {
        setLoading(true)
        axios.get('/post', { withCredentials: true }).then((result) => {
            setLoading(false)
            setPosts(result.data.posts)
        })

    }, [])

    return (
        <div>
            <div className="user-home-two">
                <div className="createPost">
                    <CreatePost />
                </div>
                <div className="all-post">
                    {loading ?
                        <Spinner />
                        :
                        <>
                            {posts != [] ?
                                <>
                                    {posts.map((item) => {

                                        return <Post data={item} />
                                    })}
                                </> : ''}
                        </>}
                </div>
            </div>
        </div>
    )
}

export default ColumnTwo