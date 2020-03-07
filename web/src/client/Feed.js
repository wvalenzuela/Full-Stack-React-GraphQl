import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from './components/loading';
import Error from './components/error';
import Post from './components/post';

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
    this.state = {
      page: 0,
      hasMore: true
    };
  }
  loadMore = fetchMore => {
    const self = this;
    const { page } = this.state;
    fetchMore({
      variables: {
        page: page + 1
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        if (!fetchMoreResult.postsFeed.posts.length) {
          self.setState({ hasMore: false });
          return previousResult;
        }
        self.setState({ page: page + 1 });
        const newData = {
          postsFeed: {
            __typename: 'PostFeed',
            posts: [
              ...previousResult.postsFeed.posts,
              ...fetchMoreResult.postsFeed.posts
            ]
          }
        };
        return newData;
      }
    });
  };
  render() {
    const self = this;
    const { hasMore } = this.state;
    return (
      <Query query={GET_POSTS} variables={{ page: 0, limit: 5 }}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return (
              <Error>
                <p>{error.message}</p>
              </Error>
            );
          }
          const { postsFeed } = data;
          const { posts } = postsFeed;
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
                      text: self.textArea.current
                        ? self.textArea.current.value
                        : '',
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
              <div className="feed">
                <InfiniteScroll
                  loadMore={() => self.loadMore(fetchMore)}
                  hasMore={hasMore}
                  loader={
                    <div className="loader" key={'loader'}>
                      Loading ...
                    </div>
                  }>
                  {posts.map((post, i) => (
                    <Post key={post.id} post={post} />
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
export default Feed;
