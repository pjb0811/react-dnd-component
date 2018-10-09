import * as React from 'react';
import {
  DropTarget,
  DropTargetConnector,
  ConnectDropTarget,
  DropTargetMonitor
} from 'react-dnd';

const style: React.CSSProperties = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center'
};

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
  children: (
    params: { isActive: boolean | undefined; files: any[] }
  ) => React.Component;
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
    const isActive = canDrop && isOver;

    if (!canDrop && !droppedFiles.length) {
      return null;
    }

    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={style}>{children({ isActive, files: droppedFiles })}</div>
      )
    );
  }
}

export default TargetBox;
