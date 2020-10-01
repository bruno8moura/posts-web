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

    comments.push({id: commentId, content});

    commentsByPostId[id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            ...comments,
            postId: id
        }
    });

    response.status(201).send(comments);
});

app.post('/events', (req, res) => {
    console.log('Received Event: ', req.body.type);

    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on 4001');
})