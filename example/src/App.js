import React, { Component } from 'react';
import { List, DragDropContext, HTML5Backend } from 'react-dnd-component';

class App extends Component {
  render() {
    const style = {
      display: 'flex',
      justifyContent: 'space-around',
      paddingTop: '20px'
    };

    const itemStyle = {
      width: 200,
      height: 100,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: 20
    };

    return (
      <div style={{ ...style }}>
        <List
          name={'test1'}
          id={1}
          width={200}
          height={600}
          itemWidth={200}
          itemHeight={100}
          style={{
            background: 'yellow'
          }}
          activeStyle={{
            background: 'red'
          }}
        >
          <div style={{ ...itemStyle, background: 'green' }}>test1</div>
          <div style={{ ...itemStyle, background: 'green' }}>test2</div>
          <div style={{ ...itemStyle, background: 'green' }}>test3</div>
          <div style={{ ...itemStyle, background: 'green' }}>test4</div>
          <div style={{ ...itemStyle, background: 'green' }}>test5</div>
        </List>

        {/*
        <List
          name={'test1'}
          id={2}
          width={200}
          height={600}
          style={{
            background: 'orange'
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
        */}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
