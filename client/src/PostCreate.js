import React, { useState } from 'react';
import axios from 'axios'

export default () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://posts.com/posts',{
            title
        });

        setTitle('');
    }
    return (
    <div>
        <form onSubmit={onSubmit}>
            <h1>Create Post</h1>
            <div className="form-group">
                <label>Title</label>
                <input 
                    className="form-control" 
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
)};