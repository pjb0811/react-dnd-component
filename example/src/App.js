import React, { Component } from 'react';
import { List, DragDropContext, HTML5Backend } from 'react-dnd-component';

class App extends Component {
  render() {
    const style = {
      display: 'flex',
      justifyContent: 'space-around',
      paddingTop: '20px',
      flexWrap: 'wrap'
    };

    const itemStyle = {
      width: 200,
      height: 200,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: 20
    };

    return (
      <div style={{ ...style }}>
        <List
          onRef={list1 => {
            this.list1 = list1;
          }}
          name={'test1'}
          id={1}
          width={200}
          height={200}
          rows={3}
          style={{
            background: 'yellow',
            margin: 10
          }}
          activeStyle={{
            background: 'red'
          }}
        >
          <div style={{ ...itemStyle, background: 'green' }}>1</div>
          <div style={{ ...itemStyle, background: 'green' }}>2</div>
          <div style={{ ...itemStyle, background: 'green' }}>3</div>
          <div style={{ ...itemStyle, background: 'green' }}>test4</div>
          <div style={{ ...itemStyle, background: 'green' }}>test5</div>
        </List>

        <List
          onRef={list2 => {
            this.list2 = list2;
          }}
          name={'test1'}
          id={2}
          width={200}
          height={200}
          rows={3}
          style={{
            background: 'orange',
            margin: 10
          }}
          activeStyle={{
            background: 'blue'
          }}
        >
          <div style={{ ...itemStyle, background: 'gray' }}>test6</div>
          <div style={{ ...itemStyle, background: 'gray' }}>test7</div>
          <div style={{ ...itemStyle, background: 'gray' }}>test8</div>
          <div style={{ ...itemStyle, background: 'gray' }}>test9</div>
          <div style={{ ...itemStyle, background: 'gray' }}>test10</div>
        </List>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
