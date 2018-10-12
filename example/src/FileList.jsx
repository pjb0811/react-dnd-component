import * as React from 'react';

const style = {
  width: 200,
  height: 200,
  border: '1px solid'
};

class FileList extends React.Component {
  render() {
    const { files, canDrop, isOver, removeFiles } = this.props;
    const isActive = canDrop && isOver;

    if (files.length === 0) {
      return (
        <div style={style}>
          <div>{isActive ? 'Release to drop' : 'Drag file here'}</div>
        </div>
      );
    }

    return (
      <div style={style}>
        {this.list(files)}
        <button onClick={removeFiles}>close</button>
      </div>
    );
  }

  list = files => {
    return files.map(file => <div key={file.name}>name: {file.name}</div>);
  };
}

export default FileList;
