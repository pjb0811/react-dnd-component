import * as React from 'react';
import { DropTargetMonitor } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import TargetBox from './TargetBox';

type Props = {
  children: (params: any) => React.Component<{}, {}, any>;
};

type State = {
  files: any[];
};

class Container extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { files: [] };
  }

  render() {
    const { FILE } = NativeTypes;
    const { children } = this.props;
    const { files } = this.state;

    return (
      <TargetBox
        accepts={[FILE]}
        files={files}
        onDrop={this.handleFileDrop}
        children={children}
        removeFiles={this.removeFiles}
      />
    );
  }

  handleFileDrop = (_item: any, monitor: DropTargetMonitor) => {
    if (monitor) {
      const files = monitor.getItem().files;
      this.setState({ files });
    }
  };

  removeFiles = () => {
    this.setState({
      files: []
    });
  };
}

export default Container;
