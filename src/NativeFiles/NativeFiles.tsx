import * as React from 'react';
import { DropTargetMonitor } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import TargetBox from './TargetBox';

type Props = {
  children: (
    params: { isActive: boolean | undefined; files: any[] }
  ) => React.Component;
};

type State = {
  droppedFiles: any[];
};

class Container extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { droppedFiles: [] };
  }

  render() {
    const { FILE } = NativeTypes;
    const { children } = this.props;
    const { droppedFiles } = this.state;

    return (
      <TargetBox
        accepts={[FILE]}
        droppedFiles={droppedFiles}
        onDrop={this.handleFileDrop}
        children={children}
      />
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
