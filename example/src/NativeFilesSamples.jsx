import React from 'react';
import { NativeFiles } from 'react-dnd-component';
import FileList from './FileList';

class NativeFilesSamples extends React.Component {
  render() {
    return (
      <NativeFiles>
        {({ isActive, files }) => {
          return <FileList files={files} />;
        }}
      </NativeFiles>
    );
  }
}

export default NativeFilesSamples;
