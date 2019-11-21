import React from 'react';
import './WishItem.css';

function WishItem(props) {
    return (
        <li>{props.wish.title}
         <button className="remove-btn" onClick={() => props.removeWish(props.wish.id)}>X</button>
         </li>
    );
}

export default WishItem;