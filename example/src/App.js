import React, { Component } from 'react';
import { DragDropContext, HTML5Backend } from 'react-dnd-component';
import ListSample from './ListSample';
import NativeFilesSample from './NativeFilesSamples';

class App extends Component {
  render() {
    return (
      <div style={{ height: 2000 }}>
        <ListSample />
        {/* <NativeFilesSample /> */}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
