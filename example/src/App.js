import React, { Component } from 'react';

import { Container } from 'react-dnd-list';

export default class App extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex'
        }}
      >
        <div
          style={{
            flexGrow: 1
          }}
        >
          <Container />
        </div>
        <div
          style={{
            flexGrow: 1
          }}
        >
          {/* <Knight /> */}
        </div>
      </div>
    );
  }
}
