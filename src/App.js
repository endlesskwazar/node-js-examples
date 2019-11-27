import React, { Component } from 'react';
import PostItem from './PostItem';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      posts: [],
      error: null
    }
  }

  componentDidMount() {
    this.setState({isLoading:true});
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(json => {
        setTimeout(() => {
          this.setState({posts: json, isLoading:false});
        }, 3000);
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const {isLoading, posts, error} = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <h1>Posts</h1>
        <table style={{width: '100%', textAlign: 'center'}}>
          <thead style={{border: 'solid 1px black'}}>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>

          <tbody> 
            {posts.map(post => <PostItem post={post} key={post.id} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
