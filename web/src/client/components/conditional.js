import React, { Component } from 'react';

class conditional extends Component {
  render() {
    const { shoulRender } = this.state;
    return (
      <div className="conditional">
        {shoulRender === true && <p>Successful conditional rendering!</p>}
      </div>
    );
  }
}

export default conditional;
