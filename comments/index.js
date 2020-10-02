const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (request, response) => {
    response.send(commentsByPostId);
});

app.post('/posts/:id/comments', async (request, response) => {
    const commentId = randomBytes(4).toString('hex');
    const {id} = request.params;
    const {content} = request.body;
 
    const comments = commentsByPostId[id] || [];

    const newComment = {id: commentId, content, status: 'pending'}
    comments.push(newComment);

    commentsByPostId[id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            ...newComment,
            postId: id
        }
    });

    response.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    console.log('Received Event: ', req.body.type);

    const { type, data } = req.body;

    if('CommentModerated' === type){
        const { postId, id, status } = data;
        
        const comments = commentsByPostId[postId];

        const comment =  comments.find(comment => comment.id === id);

        comment.status = status;

        const commentUpdated = {...comment, postId};
        console.log('commentUpdated2: ', commentUpdated);
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: commentUpdated
        });
    }

    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on 4001');
})