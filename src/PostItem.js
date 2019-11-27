import React from 'react';

function PostItem(props) {

    return (
        <tr>
            <td>{props.post.id}</td>
            <td>{props.post.title}</td>
            <td>
                { props.post.completed ? 'Yes' : 'No' }
            </td>
        </tr>
    )

}

export default PostItem;