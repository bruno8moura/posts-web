import React from 'react';

export default ({ comments }) => {
    const renderedComments = comments?.map(comment => {
        if(comment.status === 'approved'){
            return (<li key={comment.id}>{comment.content}</li>);
        }

        if(comment.status === 'pending'){
            return (<li key={comment.id}>{'This comment is awaiting moderation.'}</li>);
        }
        
        if(comment.status === 'rejected'){
            return (<li key={comment.id}>{'This comment has been rejected.'}</li>);
        }
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    );
};