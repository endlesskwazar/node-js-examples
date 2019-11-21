import React, { Component } from 'react';
import './App.css';
import Wishes from './Wishes';
import AddWish from './AddWish';


class App extends Component {

  constructor() {
    super();
    this.state = {
      wishes: [
        { id: 1, title: 'Some' },
        { id: 2, title: 'Some 2' }
      ]
    }
    this.addWish = this.addWish.bind(this);
    this.removeWish = this.removeWish.bind(this);
  }

  addWish(title) {
    var maxid = 0;

    // eslint-disable-next-line
    this.state.wishes.map(function(obj){     
        if (obj.id > maxid) maxid = obj.id;    
    });

    this.setState(state => {
      const wishes = [...state.wishes, {id: ++maxid, title}];

      return {
        wishes
      }
    });
  }

  removeWish(id) {
    this.setState(state => {
      const wishes = state.wishes.filter(item => item.id !== id);

      return {
        wishes
      }
    });
  }

  render() {
    return (
      <div className="container">
        <AddWish addWish={this.addWish}/>
        <Wishes wishes={this.state.wishes} removeWish={this.removeWish}></Wishes>
      </div>
    );
  }

}

export default App;
