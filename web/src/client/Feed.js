import React, { Component } from 'react';
import PostsQuery from './components/queries/postsFeed';
import FeedList from './components/post/feedlist';
import AddPostMutation from './components/mutations/addPost';
import PostForm from './components/post/form';
class Feed extends Component {
  constructor(props) {
    super(props);
    this.textArea = React.createRef();
  }

  render() {
    const self = this;
    const query_variables = { page: 0, limit: 10 };
    return (
      <div className="container">
        <AddPostMutation variables={query_variables}>
          <PostForm />
        </AddPostMutation>
        <PostsQuery variables={query_variables}>
          <FeedList />
        </PostsQuery>
      </div>
    );
  }
}
export default Feed;
