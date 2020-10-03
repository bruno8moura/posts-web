const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
    if(type === 'PostCreated'){        
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
        
        return;
    }

    if(type === 'CommentCreated'){
        const { id, content, status, postId } = data;

        const post = posts[postId];
        post.comments.push({id, content, status});

        return;
    }

    if(type === 'CommentUpdated'){
        const { id, content, status, postId } = data;

        const foundPost = posts[postId];
        const foundComment = foundPost.comments.find(comment => comment.id === id);
        foundComment.status = status;
        foundComment.content = content;

        return;
    }
};

app.get('/posts', (req, res) => {
    return res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvents(type, data);

    return res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on 4002');

    const {data: events} = await axios.get('http://localhost:4005/events');

    for (const event of events){
        console.log('Processiong event: ', event.type);

        handleEvents(event.type, event.data);
    }
})