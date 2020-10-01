const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.use(bodyParser.json());

const posts = {};

app.get('/posts', (request, response) => {
    response.send(posts);
});

app.post('/posts', async (request, response) => {
    const id = randomBytes(4).toString('hex');
    const {title} = request.body;

    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: posts[id]
    });

    response.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received Event: ', req.body.type);

    res.send({});
});

app.listen(4000, () => {
    console.log('Listening on 4000');
})