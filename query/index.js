const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    return res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if(type === 'PostCreated'){        
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
        
        return res.send({});
    }

    if(type === 'CommentCreated'){
        console.log('CommentCreated: ', data);
        const { id, content, status, postId } = data;

        const post = posts[postId];
        //const newComment = data[post.comments.length];
        post.comments.push({id, content, status});

        return res.send({});
    }

    if(type === 'CommentUpdated'){
        console.log('commentUpdated: ', data);
        const { id, content, status, postId } = data;

        const foundPost = posts[postId];
        console.log('foundPost: ', foundPost);
        const foundComment = foundPost.comments.find(comment => comment.id === id);
        foundComment.status = status;
        foundComment.content = content;

        return res.send({});
    }

    return res.send({});
});

app.listen(4002, () => {
    console.log('Listening on 4002');
})