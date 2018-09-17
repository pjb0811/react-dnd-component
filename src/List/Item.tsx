import * as React from 'react';
import {
  DragSource,
  DropTarget,
  ConnectDragSource,
  ConnectDropTarget,
  DropTargetMonitor,
  DragSourceMonitor
} from 'react-dnd';

type Props = {
  index: number;
  listId: string | number;
  listName: string | number;
  item: any;
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;
  connectDropTarget?: ConnectDropTarget;
  removeItem: (index: number) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
};

const itemTarget = {
  hover(props: Props, monitor: DropTargetMonitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;
    const sourceListName = monitor.getItem().listName;

    if (dragIndex === hoverIndex) {
      return;
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
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(<div style={{ opacity }}>{item.child}</div>)
      )
    );
  }
}

export default Item;
