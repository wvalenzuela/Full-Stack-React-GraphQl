import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostHeader from './header';
import PostContent from './content';
import PostForm from './form';
import UpdatePostMutation from '../mutations/updatePost';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }
  changeState = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };
  render() {
    const { post } = this.props;
    const { editing } = this.state;
    return (
      <div className={'post ' + (post.id < 0 ? 'optimistic' : '')}>
        <PostHeader post={post} changeState={this.changeState} />
        {!editing && <PostContent post={post} />}
        {editing && (
          <UpdatePostMutation post={post}>
            <PostForm changeState={this.changeState} />
          </UpdatePostMutation>
        )}
      </div>
    );
  }
}
Post.propTypes = {
  /** Object containing the complete post. */
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Post;
