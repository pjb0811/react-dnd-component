import * as React from 'react';
import {
  DragSource,
  DropTarget,
  ConnectDragSource,
  ConnectDropTarget,
  DropTargetMonitor,
  DragSourceMonitor
} from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { XYCoord } from 'dnd-core';
// import styles from './item.css';

type Props = {
  index: number;
  listId: string | number;
  listName: string | number;
  item: any;
  style: any;
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;
  connectDropTarget?: ConnectDropTarget;
  removeItem: (index: number) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
};

const itemTarget = {
  hover(props: Props, monitor: DropTargetMonitor, component: Element) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;
    const sourceListName = monitor.getItem().listName;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = (findDOMNode(
      component
    ) as Element).getBoundingClientRect();
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;
    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

    /* if (hoverClientX < hoverMiddleX || hoverClientY < hoverMiddleY) {
      return;
    } */

    if (dragIndex < hoverIndex) {
      if (hoverClientX < hoverMiddleX / 2 || hoverClientY < hoverMiddleY / 2) {
        return;
      }
    }

    if (dragIndex > hoverIndex) {
      if (hoverClientX > hoverMiddleX || hoverClientY > hoverMiddleY) {
        return;
      }
    }

    if (props.listName === sourceListName && props.listId === sourceListId) {
      props.moveItem(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  }
};

const itemSource = {
  beginDrag(props: Props) {
    return {
      index: props.index,
      listId: props.listId,
      listName: props.listName,
      item: props.item
    };
  },

  endDrag(props: Props, monitor: DragSourceMonitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (
      dropResult &&
      dropResult.listName === item.listName &&
      dropResult.listId !== item.listId
    ) {
      props.removeItem(item.index);
    }
  }
};

@DropTarget('ITEM', itemTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('ITEM', itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Item extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      item,
      // style,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div style={{ opacity, position: 'relative' }}>{item.child}</div>
        )
      )
    );
  }
}

export default Item;
