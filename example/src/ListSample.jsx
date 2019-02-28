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

    const item = (length, color) => {
      return Array.from({ length }, (x, i) => {
        return (
          <div key={i} style={{ ...itemStyle, background: color }}>
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
            background: 'yellow'
          }}
          activeStyle={{
            background: 'red'
          }}
          onChange={state => {
            // console.log(state);
          }}
        >
          {item(5, 'green')}
        </List>

        <List
          name={'test1'}
          id={2}
          width={200}
          height={200}
          rows={3}
          style={{
            background: 'orange'
          }}
          activeStyle={{
            background: 'blue'
          }}
        >
          {item(5, 'navy')}
        </List>
      </div>
    );
  }
}

export default ListSample;
