import * as React from 'react';
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd';
import FileList from '../NativeFiles/FileList';
import { NativeTypes } from 'react-dnd-html5-backend';
// import ItemTypes from './ItemTypes';

function getStyle(backgroundColor: string): React.CSSProperties {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '8rem',
    minWidth: '8rem',
    color: 'white',
    backgroundColor,
    padding: '2rem',
    paddingTop: '1rem',
    margin: '1rem',
    textAlign: 'center',
    float: 'left',
    fontSize: '1rem'
  };
}

const boxTarget = {
  drop(
    props: Props,
    monitor: DropTargetMonitor,
    component: React.Component | null
  ) {
    if (!component) {
      return;
    }
    const hasDroppedOnChild = monitor.didDrop();

    if (hasDroppedOnChild && !props.greedy) {
      return;
    }

    if (props.onDrop) {
      props.onDrop(props, monitor);
    }

    component.setState({
      hasDropped: true,
      hasDroppedOnChild
    });
  }
};

type Props = {
  isOver?: boolean;
  isOverCurrent?: boolean;
  greedy?: boolean;
  connectDropTarget?: ConnectDropTarget;
  canDrop?: boolean;
  droppedFiles: any[];
  onDrop: (props: Props, monitor: DropTargetMonitor) => void;
};

type State = {
  hasDropped: boolean;
  hasDroppedOnChild: boolean;
};

@DropTarget([NativeTypes.FILE], boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop()
}))
class Dustbin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasDropped: false,
      hasDroppedOnChild: false
    };
  }

  render() {
    const {
      greedy,
      isOver,
      isOverCurrent,
      connectDropTarget,
      children,
      canDrop,
      droppedFiles
    } = this.props;
    const { hasDropped, hasDroppedOnChild } = this.state;
    const isActive = canDrop && isOver;

    const text = greedy ? 'greedy' : 'not greedy';
    let backgroundColor = 'rgba(0, 0, 0, .5)';

    if (isOverCurrent || (isOver && greedy)) {
      backgroundColor = 'blue';
    }

    console.log(droppedFiles);

    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={getStyle(backgroundColor)}>
          {hasDropped && (
            <div>
              <div>{text}</div>
              <div>dropped {hasDroppedOnChild && ' on child'}</div>
              <FileList files={droppedFiles} />
            </div>
          )}
          {isActive ? 'Release to drop' : 'Drag file here'}
          <div>{children}</div>
        </div>
      )
    );
  }
}

export default Dustbin;
