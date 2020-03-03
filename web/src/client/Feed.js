import React, { Component } from 'react';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postContent: ''
    };
  }
  handlePostContentChange = event => {
    this.setState({ postContent: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const newPost = {
      id: this.state.posts.length + 1,
      text: this.state.postContent,
      user: {
        avatar: '/uploads/avatar3.png',
        username: 'Fake User'
      }
    };
    this.setState(prevState => ({
      posts: [newPost, ...prevState.posts],
      postContent: ''
    }));
  };
  render() {
    const { posts, postContent } = this.state;
    return (
      <div>
        <div className="postForm">
          <form onSubmit={this.handleSubmit}>
            <textarea
              value={postContent}
              onChange={this.handlePostContentChange}
              placeholder="Write your custom post!"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="feed">
          {posts.map((post, i) => (
            <div key={post.id} className="post">
              <div className="header">
                <img src={post.user.avatar} />
                <h2>{post.user.username}</h2>
              </div>
              <p className="content">{post.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Feed;
