import React, { Component } from 'react';
import { List, DragDropContext, HTML5Backend } from 'react-dnd-component';

class App extends Component {
  render() {
    const style = {
      display: 'flex',
      justifyContent: 'space-around',
      paddingTop: '20px'
    };

    return (
      <div style={{ ...style }}>
        <List
          name={'test1'}
          id={1}
          width={200}
          height={200}
          style={{
            background: 'yellow'
          }}
          activeStyle={{
            background: 'red'
          }}
        >
          <div style={{ width: 100, height: 100 }}>test1</div>
          <div style={{ width: 100, height: 100 }}>test2</div>
          <div style={{ width: 100, height: 100 }}>test3</div>
          <div style={{ width: 100, height: 100 }}>test4</div>
          <div style={{ width: 100, height: 100 }}>test5</div>
          <div style={{ width: 100, height: 100 }}>test6</div>
          <div style={{ width: 100, height: 100 }}>test1</div>
          <div style={{ width: 100, height: 100 }}>test2</div>
          <div style={{ width: 100, height: 100 }}>test3</div>
          <div style={{ width: 100, height: 100 }}>test4</div>
          <div style={{ width: 100, height: 100 }}>test5</div>
          <div style={{ width: 100, height: 100 }}>test6</div>
          <div style={{ width: 100, height: 100 }}>test1</div>
          <div style={{ width: 100, height: 100 }}>test2</div>
          <div style={{ width: 100, height: 100 }}>test3</div>
          <div style={{ width: 100, height: 100 }}>test4</div>
          <div style={{ width: 100, height: 100 }}>test5</div>
          <div style={{ width: 100, height: 100 }}>test6</div>
        </List>
        <List
          name={'test1'}
          id={2}
          width={200}
          height={200}
          activeStyle={{
            background: 'blue'
          }}
        >
          <div>test7</div>
          <div>test8</div>
          <div>test9</div>
          <div>test10</div>
          <div>test11</div>
          <div>test12</div>
        </List>
        {/* <List name={'test2'} id={3} />
        <List name={'test2'} id={4} /> */}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
