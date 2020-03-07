import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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
    this.textArea = React.createRef();
  }
  render() {
    const self = this;
    return (
      <div className="container">
        <div className="postForm">
          <Mutation mutation={ADD_POST}>
            {addPost => (
              <form
                onSubmit={event => {
                  event.preventDefault();
                  addPost({
                    variables: { post: self.textArea.current.value }
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
      </div>
    );
  }
}
export default Feed;
