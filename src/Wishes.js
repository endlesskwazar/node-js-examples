import React, { Component } from 'react';
import './App.css';
import WishItem from './WishItem';


class Wishes extends Component {

    render() {
    const list = this.props.wishes.map((wish) => <WishItem key={wish.id} wish={wish} removeWish={this.props.removeWish}/>);
        return (
            <div>
                <h2>Wishes List</h2>
                <hr/>
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
}

export default Wishes;
