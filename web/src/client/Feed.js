import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_POSTS = gql`
  query {
    posts {
      id
      text
      user {
        avatar
        username
      }
    }
  }
`;
const ADD_POST = gql`
  mutation addPost($post: PostInput!) {
    addPost(post: $post) {
      id
      text
      user {
        username
        avatar
      }
    }
  }
`;

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postContent: ''
    };
  }
  handlePostContentChange = event => {
    this.setState({ postContent: event.target.value });
  };
  handleSubmit = event => {
    const self = this;
    event.preventDefault();
    const newPost = {
      text: this.state.postContent
    };

    this.props
      .addPost({
        variables: { post: newPost }
      })
      .then(() => {
        self.setState(prevState => ({ postContent: '' }));
      });
  };
  render() {
    const self = this;
    const { postContent } = this.state;
    return (
      <Query query={GET_POSTS}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading...';
          }
          if (error) {
            return error.message;
          }
          const { posts } = data;
          return (
            <div className="container">
              <div className="postForm">
                <Mutation mutation={ADD_POST}>
                  {addPost => (
                    <form
                      onSubmit={event => {
                        event.preventDefault();
                        const newPost = {
                          text: postContent
                        };

                        addPost({
                          variables: { post: newPost }
                        }).then(() => {
                          self.setState(prevState => ({ postContent: '' }));
                        });
                      }}>
                      <textarea
                        value={postContent}
                        onChange={this.handlePostContentChange}
                        placeholder="Write your custom post!"
                      />
                      <input type="submit" value="Submit" />
                    </form>
                  )}
                </Mutation>
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
        }}
      </Query>
    );
  }
}
export default Feed;
