import * as React from 'react';
import Dustbin from './Dustbin';
import { DropTargetMonitor } from 'react-dnd';

export interface ContainerState {
  droppedFiles: any[];
}

class Container extends React.Component<{}, ContainerState> {
  constructor(props: {}) {
    super(props);
    this.state = { droppedFiles: [] };
  }

  render() {
    const { droppedFiles } = this.state;

    return (
      <div>
        <Dustbin droppedFiles={droppedFiles} onDrop={this.handleFileDrop}>
          <Dustbin droppedFiles={droppedFiles} onDrop={this.handleFileDrop} />
        </Dustbin>
      </div>
    );
  }

  handleFileDrop = (_item: any, monitor: DropTargetMonitor) => {
    if (monitor) {
      const droppedFiles = monitor.getItem().files;
      this.setState({ droppedFiles });
    }
  };
}

export default Container;
