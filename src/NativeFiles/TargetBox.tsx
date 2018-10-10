import * as React from 'react';
import {
  DropTarget,
  DropTargetConnector,
  ConnectDropTarget,
  DropTargetMonitor
} from 'react-dnd';

const boxTarget = {
  drop(props: Props, monitor: DropTargetMonitor) {
    if (props.onDrop) {
      props.onDrop(props, monitor);
    }
  }
};

type Props = {
  accepts: string[];
  connectDropTarget?: ConnectDropTarget;
  isOver?: boolean;
  canDrop?: boolean;
  onDrop: (props: Props, monitor: DropTargetMonitor) => void;
  droppedFiles: any[];
  children: (params: any) => React.Component;
};

@DropTarget(
  (props: Props) => props.accepts,
  boxTarget,
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)
class TargetBox extends React.Component<Props> {
  render() {
    const {
      canDrop,
      isOver,
      connectDropTarget,
      droppedFiles,
      children
    } = this.props;

    return (
      connectDropTarget &&
      connectDropTarget(
        <div>{children({ canDrop, isOver, files: droppedFiles })}</div>
      )
    );
  }
}

export default TargetBox;
