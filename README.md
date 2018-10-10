# react-dnd-component

> components using react & react-dnd

[![NPM](https://img.shields.io/npm/v/react-dnd-component.svg)](https://www.npmjs.com/package/react-dnd-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-dnd-component
```

## Usage

### List

[demo](https://codesandbox.io/s/ll724prxrq)

```tsx
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

    const item = length => {
      return Array.from({ length }, (x, i) => {
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
          onChange={state => {
            console.log(state);
          }}
        >
          {item(5)}
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
          {item(5)}
        </List>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
```

### Native Files

[demo](https://codesandbox.io/s/6j6x9jp183)

```tsx
import React, { Component } from 'react';
import {
  NativeFiles,
  DragDropContext,
  HTML5Backend
} from 'react-dnd-component';

class App extends Component {
  render() {
    return (
      <NativeFiles>
        {({ canDrop, isOver, files }) => {
          return <FileList canDrop={canDrop} isOver={isOver} files={files} />;
        }}
      </NativeFiles>
    );
  }
}

const style = {
  width: 200,
  height: 200,
  border: '1px solid'
};

class FileList extends React.Component {
  render() {
    const { files, canDrop, isOver } = this.props;
    const isActive = canDrop && isOver;

    if (files.length === 0) {
      return (
        <div style={style}>
          <div>{isActive ? 'Release to drop' : 'Drag file here'}</div>
        </div>
      );
    }

    return <div style={style}>{this.list(files)}</div>;
  }

  list = files => {
    return files.map(file => <div key={file.name}>name: {file.name}</div>);
  };
}

export default DragDropContext(HTML5Backend)(App);
```

## License

MIT © [pjb0811](https://github.com/pjb0811)
