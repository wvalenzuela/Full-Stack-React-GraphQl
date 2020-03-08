import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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
const GET_POSTS = gql`
  query postsFeed($page: Int, $limit: Int) {
    postsFeed(page: $page, limit: $limit) {
      posts {
        id
        text
        user {
          avatar
          username
        }
      }
    }
  }
`;
class AddPostMutation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postContent: ''
    };
  }
  changePostContent = value => {
    this.setState({ postContent: value });
  };
  render() {
    const self = this;
    const { children, variables } = this.props;
    const { postContent } = this.state;
    return (
      <Mutation
        mutation={ADD_POST}
        update={(store, { data: { addPost } }) => {
          const data = store.readQuery({
            query: GET_POSTS,
            variables
          });
          data.postsFeed.posts.unshift(addPost);
          store.writeQuery({ query: GET_POSTS, variables, data });
        }}
        optimisticResponse={{
          __typename: 'mutation',
          addPost: {
            __typename: 'Post',
            text: postContent,
            id: -1,
            user: {
              __typename: 'User',
              username: 'Loading...',
              avatar: '/public/loading.gif'
            }
          }
        }}>
        {addPost =>
          React.Children.map(children, function(child) {
            return React.cloneElement(child, {
              addPost,
              postContent,
              changePostContent: self.changePostContent
            });
          })
        }
      </Mutation>
    );
  }
}

export default AddPostMutation;
