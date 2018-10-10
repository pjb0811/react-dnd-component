import React from 'react';
import { NativeFiles } from 'react-dnd-component';
import FileList from './FileList';

class NativeFilesSamples extends React.Component {
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

export default NativeFilesSamples;
