import * as React from 'react';
import {
  DragSource,
  DropTarget,
  ConnectDragSource,
  ConnectDropTarget,
  DropTargetMonitor
} from 'react-dnd';

type Props = {
  id: string;
  child: React.ReactChild;
  listId: string | number;
  listName: string | number;
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;
  connectDropTarget?: ConnectDropTarget;
  moveItem: (id: string, afterId: string) => void;
  removeItem: (index: string) => void;
};

const itemTarget = {
  hover(props: Props, monitor: DropTargetMonitor) {
    const draggedId = monitor.getItem().id;
    const afterId = props.id;
    const sourceListId = monitor.getItem().listId;
    const sourceListName = monitor.getItem().listName;

    if (draggedId === afterId) {
      return;
    }

    if (props.listName === sourceListName && props.listId === sourceListId) {
      props.moveItem(draggedId, props.id);
    }
  }
};

const itemSource = {
  beginDrag(props: Props) {
    return {
      id: props.id,
      child: props.child,
      listId: props.listId,
      listName: props.listName
    };
  },

  endDrag(props: any, monitor: any) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    console.log(item, dropResult);

    if (
      dropResult &&
      dropResult.listName === item.listName &&
      dropResult.listId !== item.listId
    ) {
      props.removeItem(item.id);
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
  public render() {
    const {
      child,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(<div style={{ opacity }}>{child}</div>)
      )
    );
  }
}

export default Item;
