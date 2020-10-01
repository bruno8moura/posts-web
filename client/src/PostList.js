import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
    const [posts, setPosts] = useState({});

    useEffect(()=> {
        async function loadPostList() {
            const list = await axios.get('http://localhost:4002/posts');
            setPosts(list.data);
        }

        loadPostList();
    }, []);
    
    const renderedPosts = Object.values(posts).map( post => {
        return (
            <div
                className="card"
                style={{width: '30%', marginBottom: '20px'}}
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />                    
                </div>
            </div>
        );
    })
    
    return (
        <>
            <h2>Posts</h2>
            <div className="d-flex flex-row flex-wrap justify-content-between">
                {renderedPosts}
            </div>
        </>
    );
}