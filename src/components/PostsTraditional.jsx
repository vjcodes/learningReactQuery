import { useEffect, useState } from 'react';

function PostsTraditional() {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:4000/posts");
            const res = await response.json();
            setPosts(res)
        } catch (error) {
            console.log(error)
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    if (isLoading) {
        return <div>Page is loading...</div>
    }

    if (isError) {
        return <div>Error has occurred...</div>
    }

    return (
        <div className='post-list'>
            {posts.map(post => (
                <div className='post-item' key={post.id}>
                    <h3 className='post-title'>{post.title}</h3>
                    <p className='post-body'>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default PostsTraditional;