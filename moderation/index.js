const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (request, response) => {
    const { type, data } = request.body;

    if(type === 'CommentCreated'){   
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        const commentUpdated = {
            ...data,
            status            
        }

        console.log('commentUpdated: ', commentUpdated);

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                ...data,
                status            
            }
        });
    }

    response.send({});
});

app.listen(4003, () => {
    console.log('Listening on 4003');
});