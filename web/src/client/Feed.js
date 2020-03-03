import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';

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
    const { postContent } = this.state;
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
          <Query query={GET_POSTS}>
            {({ loading, error, data }) => {
              if (loading) {
                return 'Loading...';
              }
              if (error) {
                return error.message;
              }
              const { posts } = data;
              return posts.map((post, i) => (
                <div key={post.id} className="post">
                  <div className="header">
                    <img src={post.user.avatar} />
                    <h2>{post.user.username}</h2>
                  </div>
                  <p className="content">{post.text}</p>
                </div>
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}
const ADD_POST_MUTATION = graphql(ADD_POST, {
  name: 'addPost'
});

const GET_POSTS_QUERY = graphql(GET_POSTS, {
  props: ({ data: { loading, error, posts } }) => ({
    loading,
    error,
    posts
  })
});
export default compose(GET_POSTS_QUERY, ADD_POST_MUTATION)(Feed);
