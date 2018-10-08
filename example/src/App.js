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
          onChange={state => {}}
        >
          <div style={{ ...itemStyle, background: 'green' }}>1</div>
          <div style={{ ...itemStyle, background: 'green' }}>2</div>
          <div style={{ ...itemStyle, background: 'green' }}>3</div>
          <div style={{ ...itemStyle, background: 'green' }}>4</div>
          <div style={{ ...itemStyle, background: 'green' }}>5</div>
        </List>

        <List
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
          <div style={{ ...itemStyle, background: 'gray' }}>6</div>
          <div style={{ ...itemStyle, background: 'gray' }}>7</div>
          <div style={{ ...itemStyle, background: 'gray' }}>8</div>
          <div style={{ ...itemStyle, background: 'gray' }}>9</div>
          <div style={{ ...itemStyle, background: 'gray' }}>10</div>
        </List>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
