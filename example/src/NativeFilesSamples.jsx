import React from 'react';
import { NativeFiles } from 'react-dnd-component';
import FileList from './FileList';

class NativeFilesSamples extends React.Component {
  render() {
    return (
      <NativeFiles>
        {props => {
          return <FileList {...props} />;
        }}
      </NativeFiles>
    );
  }
}

export default NativeFilesSamples;
