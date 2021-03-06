const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', async (req, res) => {
    const anEvent = req.body;
    console.log('anEvent: ', anEvent);

    events.push(anEvent);

    await axios.post('http://posts-clusterip-srv:4000/events', anEvent);
    await axios.post('http://comments-clusterip-srv:4001/events', anEvent);
    await axios.post('http://query-clusterip-srv:4002/events', anEvent);
    await axios.post('http://moderation-clusterip-srv:4003/events', anEvent);

    res.send({status: 'OK'});
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Listening on 4005');
});