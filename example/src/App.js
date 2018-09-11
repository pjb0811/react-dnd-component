import React, { Component } from 'react';

import { Container, Card } from 'react-dnd-list';

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
          <Container>
            <div>test1</div>
            <div>test2</div>
            <div>test3</div>
          </Container>
        </div>
        <div
          style={{
            flexGrow: 1
          }}
        >
          <Container>
            <div>test4</div>
            <div>test5</div>
          </Container>
        </div>
      </div>
    );
  }
}
