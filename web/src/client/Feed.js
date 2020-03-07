import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import PostsFeedQuery from './components/queries/postsFeed';
import FeedList from './components/post/feedlist';

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

class Feed extends Component {
  constructor(props) {
    super(props);
    this.textArea = React.createRef();
  }

  render() {
    const self = this;
    return (
      <div className="container">
        <div className="postForm">
          <Mutation
            mutation={ADD_POST}
            update={(store, { data: { addPost } }) => {
              const variables = { page: 0, limit: 5 };
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
                text: self.textArea.current ? self.textArea.current.value : '',
                id: -1,
                user: {
                  __typename: 'User',
                  username: 'Loading...',
                  avatar: '/public/loading.gif'
                }
              }
            }}>
            {addPost => (
              <form
                onSubmit={event => {
                  event.preventDefault();
                  addPost({
                    variables: {
                      post: { text: self.textArea.current.value }
                    }
                  });
                }}>
                <textarea
                  ref={this.textArea}
                  placeholder="Write your custom post!"
                />
                <input type="submit" value="Submit" />
              </form>
            )}
          </Mutation>
        </div>
        <PostsFeedQuery>
          <FeedList />
        </PostsFeedQuery>
      </div>
    );
  }
}
export default Feed;
