import React from 'react';
import { List } from 'react-dnd-component';

class ListSample extends React.Component {
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

    const item = () => {
      return Array.from({ length: 10 }, (x, i) => {
        return (
          <div key={i} style={{ ...itemStyle, background: 'green' }}>
            {i}
          </div>
        );
      });
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
          {item()}
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

export default ListSample;
