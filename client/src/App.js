import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

export default () => (
    <div className="container">
        <PostCreate/>
        <hr />
        <PostList/>
    </div>
);